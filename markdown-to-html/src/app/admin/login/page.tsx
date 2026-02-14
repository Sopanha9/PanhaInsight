"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push(redirect);
        router.refresh();
      } else {
        setError(data.error || "Invalid password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: linear-gradient(
            135deg,
            #0f172a 0%,
            #1e293b 50%,
            #0f172a 100%
          );
          position: relative;
          overflow: hidden;
        }

        .login-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image:
            radial-gradient(
              circle at 20% 50%,
              rgba(120, 119, 198, 0.15) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 80%,
              rgba(88, 166, 255, 0.1) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 40% 20%,
              rgba(139, 92, 246, 0.1) 0%,
              transparent 50%
            );
          pointer-events: none;
        }

        .login-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: rgba(30, 41, 59, 0.8);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 40px;
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.05),
            0 20px 60px rgba(0, 0, 0, 0.5),
            0 0 100px rgba(88, 166, 255, 0.1);
          animation: fadeIn 0.6s ease-out;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
        }

        .logo {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #667eea 0%, #58a6ff 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 700;
          color: white;
          box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
        }

        .header {
          text-align: center;
          margin-bottom: 32px;
        }

        .title {
          font-size: 28px;
          font-weight: 700;
          color: #f1f5f9;
          margin: 0 0 8px 0;
          letter-spacing: -0.02em;
          font-family:
            -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .subtitle {
          font-size: 14px;
          color: #94a3b8;
          margin: 0;
          font-weight: 400;
          line-height: 1.5;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .label {
          font-size: 13px;
          font-weight: 600;
          color: #cbd5e1;
          letter-spacing: 0.01em;
        }

        .input-wrapper {
          position: relative;
        }

        .input {
          width: 100%;
          height: 48px;
          padding: 0 16px;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 12px;
          color: #f1f5f9;
          font-size: 15px;
          font-weight: 400;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .input::placeholder {
          color: #64748b;
        }

        .input:focus {
          border-color: #667eea;
          background: rgba(15, 23, 42, 0.8);
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
        }

        .input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .error-message {
          padding: 12px 16px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 12px;
          color: #fca5a5;
          font-size: 13px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          animation: fadeIn 0.3s ease-out;
        }

        .button {
          width: 100%;
          height: 48px;
          padding: 0 24px;
          background: linear-gradient(135deg, #667eea 0%, #58a6ff 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
          position: relative;
          overflow: hidden;
        }

        .button::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s ease;
        }

        .button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
        }

        .button:hover:not(:disabled)::before {
          left: 100%;
        }

        .button:active:not(:disabled) {
          transform: translateY(0);
        }

        .button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .footer {
          margin-top: 24px;
          text-align: center;
        }

        .footer-text {
          font-size: 12px;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        .lock-icon {
          width: 12px;
          height: 12px;
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 32px 24px;
          }

          .title {
            font-size: 24px;
          }
        }
      `}</style>

      <div className="login-container">
        <div className="login-card">
          {/* Logo */}
          <div className="logo-container">
            <div className="logo">P</div>
          </div>

          {/* Header */}
          <div className="header">
            <h1 className="title">Admin Login</h1>
            <p className="subtitle">
              Enter your password to access the admin panel
            </p>
          </div>

          {/* Form */}
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="input-wrapper">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  disabled={loading}
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div className="error-message">
                <svg
                  className="lock-icon"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="button">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Footer */}
          <div className="footer">
            <p className="footer-text">
              <svg
                className="lock-icon"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Secure authentication
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
