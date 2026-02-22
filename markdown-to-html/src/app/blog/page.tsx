import { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "All blog posts",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container py-12">
      <header className="page-header">
        <h1 className="page-title">All Posts</h1>
      </header>

      <section>
        {posts.length === 0 ? (
          <p style={{ color: "var(--text-secondary)" }}>
            No posts yet. Check back soon!
          </p>
        ) : (
          <div className="post-list">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="post-item">
                  <div className="post-item-body">
                    <h3 className="post-item-title">{post.title}</h3>
                    <div className="post-item-meta">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      {post.author && <span>By {post.author}</span>}
                    </div>
                    {post.summary && (
                      <p className="post-item-summary">{post.summary}</p>
                    )}
                    {Array.isArray(post.tags) && post.tags.length > 0 && (
                      <div className="post-item-tags">
                        {post.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
