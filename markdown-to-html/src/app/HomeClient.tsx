"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Post } from "@/types/post";

interface HomeClientProps {
  posts: Post[];
}

export default function HomeClient({ posts }: HomeClientProps) {
  const [selectedTag, setSelectedTag] = useState("All");

  const tags = useMemo(() => {
    const allTags = posts.flatMap((post) => post.tags || []);
    const uniqueTags = Array.from(new Set(allTags)).sort((a, b) =>
      a.localeCompare(b),
    );
    return ["All", ...uniqueTags];
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedTag === "All") return posts;
    return posts.filter((post) => post.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  return (
    <section>
      <div className="filter-bar">
        <label className="filter-label" htmlFor="category-filter">
          Category
        </label>
        <select
          id="category-filter"
          className="filter-select"
          value={selectedTag}
          onChange={(event) => setSelectedTag(event.target.value)}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {filteredPosts.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>
          No posts found for this category.
        </p>
      ) : (
        <div className="post-list">
          {filteredPosts.map((post) => (
            <Link key={post.slug} href={`/${post.slug}`}>
              <article className="post-item">
                <div className="post-item-content">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="post-item-image"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className="post-item-image">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

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
                    </div>

                    {post.summary && (
                      <p className="post-item-summary">{post.summary}</p>
                    )}

                    {Array.isArray(post.tags) && post.tags.length > 0 && (
                      <div className="post-item-tags">
                        {post.tags.map((tag) => (
                          <span key={tag} className="tag">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
