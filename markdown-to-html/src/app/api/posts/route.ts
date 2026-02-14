import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface PostPayload {
  title: string;
  slug: string;
  summary: string;
  content: string;
  author?: string;
  tags?: string[];
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const token = request.cookies.get("admin_token")?.value;
    const expectedToken = process.env.ADMIN_TOKEN;

    if (!token || token !== expectedToken) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in." },
        { status: 401 },
      );
    }

    const body: PostPayload = await request.json();

    // Validate required fields
    if (!body.title || !body.slug || !body.summary || !body.content) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, slug, summary, and content are required",
        },
        { status: 400 },
      );
    }

    // Validate slug format
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(body.slug)) {
      return NextResponse.json(
        {
          error:
            "Invalid slug format. Use lowercase letters, numbers, and hyphens only",
        },
        { status: 400 },
      );
    }

    // Get posts directory
    const postsDirectory = path.join(process.cwd(), "content", "posts");

    // Ensure directory exists
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    // Check if post already exists
    const filePath = path.join(postsDirectory, `${body.slug}.md`);
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `A post with slug "${body.slug}" already exists` },
        { status: 409 },
      );
    }

    // Create frontmatter
    const now = new Date().toISOString();
    const frontmatter = {
      title: body.title,
      date: now,
      summary: body.summary,
      author: body.author || "",
      tags: body.tags || [],
    };

    // Create markdown file content
    const fileContent = `---
${Object.entries(frontmatter)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}: [${value.map((v) => `"${v}"`).join(", ")}]`;
    }
    return `${key}: "${value}"`;
  })
  .join("\n")}
---

${body.content}`;

    // Write file
    fs.writeFileSync(filePath, fileContent, "utf8");

    return NextResponse.json(
      {
        message: "Post created successfully",
        slug: body.slug,
        title: body.title,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post. Please try again." },
      { status: 500 },
    );
  }
}

// Optional: GET to list all posts
export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), "content", "posts");

    if (!fs.existsSync(postsDirectory)) {
      return NextResponse.json({ posts: [] });
    }

    const files = fs.readdirSync(postsDirectory);
    const posts = files
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(".md", ""));

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error listing posts:", error);
    return NextResponse.json(
      { error: "Failed to list posts" },
      { status: 500 },
    );
  }
}
