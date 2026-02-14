import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// In-memory rate limiting (use Redis in production)
const loginAttempts = new Map<
  string,
  { count: number; firstAttempt: number; lockedUntil?: number }
>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const LOCKOUT_MS = 30 * 60 * 1000; // 30 minutes lockout

function getClientId(request: NextRequest): string {
  // Use IP + User-Agent for fingerprinting
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : request.ip || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  return crypto.createHash("sha256").update(`${ip}:${userAgent}`).digest("hex");
}

function checkRateLimit(clientId: string): {
  allowed: boolean;
  message?: string;
} {
  const now = Date.now();
  const record = loginAttempts.get(clientId);

  // Check if account is locked
  if (record?.lockedUntil && now < record.lockedUntil) {
    const minutesLeft = Math.ceil((record.lockedUntil - now) / 60000);
    return {
      allowed: false,
      message: `Account temporarily locked. Try again in ${minutesLeft} minute(s).`,
    };
  }

  // Reset if window expired
  if (!record || now - record.firstAttempt > WINDOW_MS) {
    loginAttempts.set(clientId, { count: 1, firstAttempt: now });
    return { allowed: true };
  }

  // Check if exceeded max attempts
  if (record.count >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_MS;
    return {
      allowed: false,
      message: `Too many failed attempts. Account locked for 30 minutes.`,
    };
  }

  // Increment attempt counter
  record.count++;
  return { allowed: true };
}

// Constant-time string comparison to prevent timing attacks
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export async function POST(request: NextRequest) {
  try {
    const clientId = getClientId(request);

    // Check rate limit
    const rateLimitResult = checkRateLimit(clientId);
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: rateLimitResult.message },
        { status: 429 }, // Too Many Requests
      );
    }

    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Verify password
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminToken = process.env.ADMIN_TOKEN;

    if (!adminPassword || !adminToken) {
      console.error("❌ Missing environment variables!");
      return NextResponse.json(
        { error: "Admin authentication not configured" },
        { status: 500 },
      );
    }

    // DEBUG: Log for troubleshooting
    console.log("🔐 Login attempt:", {
      passwordLength: password.length,
      expectedPasswordLength: adminPassword.length,
    });

    // Use plaintext comparison (constant-time to prevent timing attacks)
    const isPasswordValid = safeCompare(password, adminPassword);

    console.log("✅ Password validation result:", isPasswordValid);

    if (!isPasswordValid) {
      // Don't reveal whether it's a password or username issue
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Success - reset rate limit counter
    loginAttempts.delete(clientId);

    // Create response with authentication cookie
    const response = NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 },
    );

    // Set secure HTTP-only cookie with the admin token
    response.cookies.set("admin_token", adminToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Changed from 'lax' to 'strict' for better CSRF protection
      maxAge: 60 * 60 * 24 * 2, // Reduced to 2 days instead of 7
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 },
    );
  }
}
