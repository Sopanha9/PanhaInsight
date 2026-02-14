"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success",
  );
  const router = useRouter();

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug,
          summary,
          content,
          author,
          tags,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Post created successfully!");
        setMessageType("success");
        setTitle("");
        setSlug("");
        setSummary("");
        setContent("");
        setAuthor("");
        setTags("");
      } else {
        setMessage(data.error || "Failed to create post");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      padding: "2rem 1rem",
      backgroundColor: "var(--bg-primary)",
    },
    wrapper: {
      maxWidth: "56rem",
      margin: "0 auto",
    },
    header: {
      textAlign: "center" as const,
      marginBottom: "3rem",
    },
    title: {
      fontSize: "3.75rem",
      fontWeight: 700,
      marginBottom: "0.75rem",
      letterSpacing: "-0.02em",
      color: "var(--text-primary)",
      fontFamily:
        "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    subtitle: {
      fontSize: "1.125rem",
      marginBottom: "1.5rem",
      color: "var(--text-secondary)",
    },
    backButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.75rem 1.5rem",
      borderRadius: "0.5rem",
      fontWeight: 600,
      transition: "opacity 0.2s",
      backgroundColor: "var(--accent-blue)",
      color: "var(--text-primary)",
      textDecoration: "none",
      cursor: "pointer",
    },
    alert: {
      marginBottom: "2rem",
      padding: "1rem",
      borderRadius: "0.5rem",
      border: "1px solid",
      backdropFilter: "blur(8px)",
      transition: "all 0.3s",
    },
    alertSuccess: {
      borderColor: "#22c55e",
      backgroundColor: "rgba(34, 197, 94, 0.1)",
    },
    alertError: {
      borderColor: "#ef4444",
      backgroundColor: "rgba(239, 68, 68, 0.1)",
    },
    alertText: {
      fontWeight: 600,
    },
    alertTextSuccess: {
      color: "#4ade80",
    },
    alertTextError: {
      color: "#f87171",
    },
    form: {
      borderRadius: "1rem",
      border: "1px solid var(--border-color)",
      padding: "2.5rem",
      backgroundColor: "var(--bg-card)",
      transition: "all 0.3s",
    },
    fieldGroup: {
      marginBottom: "2rem",
    },
    label: {
      display: "block",
      fontSize: "0.875rem",
      fontWeight: 600,
      marginBottom: "0.75rem",
      color: "var(--text-primary)",
    },
    required: {
      color: "var(--accent-orange)",
    },
    input: {
      width: "100%",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      border: "1px solid var(--border-color)",
      backgroundColor: "var(--bg-secondary)",
      color: "var(--text-primary)",
      fontWeight: 500,
      transition: "all 0.2s",
      outline: "none",
      fontSize: "1rem",
    },
    textarea: {
      width: "100%",
      padding: "0.75rem 1rem",
      borderRadius: "0.5rem",
      border: "1px solid var(--border-color)",
      backgroundColor: "var(--bg-secondary)",
      color: "var(--text-primary)",
      fontWeight: 500,
      transition: "all 0.2s",
      outline: "none",
      fontSize: "1rem",
      resize: "vertical" as const,
    },
    textareaCode: {
      fontFamily: "monospace",
      fontSize: "0.875rem",
    },
    hint: {
      fontSize: "0.75rem",
      marginTop: "0.5rem",
      color: "var(--text-muted)",
    },
    fieldGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "1.5rem",
      marginBottom: "2rem",
    },
    buttonContainer: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "1rem",
      paddingTop: "1rem",
    },
    submitButton: {
      flex: 1,
      padding: "1rem 1.5rem",
      color: "white",
      fontWeight: 600,
      borderRadius: "0.5rem",
      transition: "all 0.2s",
      outline: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
    },
    clearButton: {
      padding: "1rem 1.5rem",
      fontWeight: 600,
      borderRadius: "0.5rem",
      transition: "all 0.2s",
      outline: "none",
      backgroundColor: "var(--bg-secondary)",
      color: "var(--text-secondary)",
      border: "1px solid var(--border-color)",
      cursor: "pointer",
      fontSize: "1rem",
    },
    tipsContainer: {
      marginTop: "2rem",
      borderRadius: "0.75rem",
      border: "1px solid var(--accent-purple)",
      padding: "1.5rem",
      backgroundColor: "var(--bg-secondary)",
    },
    tipsTitle: {
      fontSize: "1.125rem",
      fontWeight: 700,
      marginBottom: "1.25rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      justifyContent: "center",
      color: "var(--text-primary)",
    },
    tipsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "0.75rem 2rem",
    },
    tipItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
    },
    code: {
      padding: "0.25rem 0.5rem",
      borderRadius: "0.25rem",
      fontSize: "0.75rem",
      fontFamily: "monospace",
      whiteSpace: "nowrap" as const,
      backgroundColor: "var(--bg-primary)",
      color: "var(--accent-orange)",
    },
    tipText: {
      fontSize: "0.875rem",
      color: "var(--text-secondary)",
    },
  };

  return (
    <div style={styles.container}>
      <style jsx>{`
        @media (min-width: 640px) {
          .field-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .button-container {
            flex-direction: row;
          }
          .tips-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 768px) {
          .form-padding {
            padding: 2.5rem;
          }
        }
      `}</style>

      <div style={styles.wrapper}>
        <div style={styles.header}>
          <h1 style={styles.title}>Create Post</h1>
          <p style={styles.subtitle}>
            Write your article in Markdown, publish to the blog
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link href="/" style={styles.backButton}>
              ← Back to Home
            </Link>
            <button
              onClick={handleLogout}
              type="button"
              style={{
                ...styles.backButton,
                backgroundColor: "var(--accent-red, #ef4444)",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {message && (
          <div
            style={{
              ...styles.alert,
              ...(messageType === "success"
                ? styles.alertSuccess
                : styles.alertError),
            }}
          >
            <p
              style={{
                ...styles.alertText,
                ...(messageType === "success"
                  ? styles.alertTextSuccess
                  : styles.alertTextError),
              }}
            >
              {message}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={styles.form}
          className="form-padding"
        >
          <div style={styles.fieldGroup}>
            <label htmlFor="title" style={styles.label}>
              Post Title <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter your post title"
              required
              style={styles.input}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-blue)";
                e.currentTarget.style.boxShadow =
                  "0 0 0 3px rgba(59, 130, 246, 0.1)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="slug" style={styles.label}>
              URL Slug <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="auto-generated-from-title"
              required
              style={styles.input}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-blue)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border-color)";
              }}
            />
            <p style={styles.hint}>Auto-generated from title (editable)</p>
          </div>

          <div style={styles.fieldGrid} className="field-grid">
            <div style={styles.fieldGroup}>
              <label htmlFor="summary" style={styles.label}>
                Summary <span style={styles.required}>*</span>
              </label>
              <textarea
                id="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Brief summary of your post"
                required
                rows={3}
                style={{ ...styles.textarea, resize: "none" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-blue)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-color)";
                }}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label htmlFor="author" style={styles.label}>
                Author
              </label>
              <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name (optional)"
                style={styles.input}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent-blue)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-color)";
                }}
              />
            </div>
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="tags" style={styles.label}>
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="tag1, tag2, tag3"
              style={styles.input}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-blue)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border-color)";
              }}
            />
            <p style={styles.hint}>Comma separated</p>
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="content" style={styles.label}>
              Post Content <span style={styles.required}>*</span>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post in Markdown..."
              required
              rows={14}
              style={{ ...styles.textarea, ...styles.textareaCode }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--accent-blue)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border-color)";
              }}
            />
            <p style={styles.hint}>
              Markdown syntax supported with syntax highlighting
            </p>
          </div>

          <div style={styles.buttonContainer} className="button-container">
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.submitButton,
                backgroundColor: loading
                  ? "var(--accent-purple)"
                  : "var(--accent-blue)",
                opacity: loading ? 0.5 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "⏳ Publishing..." : "🚀 Publish Post"}
            </button>
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setSlug("");
                setSummary("");
                setContent("");
                setAuthor("");
                setTags("");
              }}
              style={styles.clearButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--border-color)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
              }}
            >
              ↻ Clear Form
            </button>
          </div>

          <div style={styles.tipsContainer}>
            <h3 style={styles.tipsTitle}>📝 Markdown Formatting Guide</h3>
            <div style={styles.tipsGrid} className="tips-grid">
              <div style={styles.tipItem}>
                <code style={styles.code}># H1</code>
                <span style={styles.tipText}>Largest heading</span>
              </div>
              <div style={styles.tipItem}>
                <code style={styles.code}>## H2</code>
                <span style={styles.tipText}>Medium heading</span>
              </div>
              <div style={styles.tipItem}>
                <code style={styles.code}>**bold**</code>
                <span style={styles.tipText}>Bold text</span>
              </div>
              <div style={styles.tipItem}>
                <code style={styles.code}>*italic*</code>
                <span style={styles.tipText}>Italic text</span>
              </div>
              <div style={styles.tipItem}>
                <code style={styles.code}>`code`</code>
                <span style={styles.tipText}>Inline code</span>
              </div>
              <div style={styles.tipItem}>
                <code style={styles.code}>[link](url)</code>
                <span style={styles.tipText}>Links</span>
              </div>
              <div style={styles.tipItem}>
                <code style={styles.code}>- item</code>
                <span style={styles.tipText}>Bullet list</span>
              </div>
              <div style={styles.tipItem}>
                <code style={styles.code}>```</code>
                <span style={styles.tipText}>Code block</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
