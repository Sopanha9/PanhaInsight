import Link from "next/link";
import { getRecentPosts } from "@/lib/posts";
import HomeClient from "./HomeClient";

const cardColors = [
  "from-purple-900/40 to-purple-800/40 border-purple-700/50",
  "from-indigo-900/40 to-indigo-800/40 border-indigo-700/50",
  "from-orange-900/40 to-orange-800/40 border-orange-700/50",
  "from-blue-900/40 to-blue-800/40 border-blue-700/50",
  "from-pink-900/40 to-pink-800/40 border-pink-700/50",
];

export default function HomePage() {
  const recentPosts = getRecentPosts(20);

  return (
    <div className="container py-12">
      {/* Social Links Section */}
      <div className="social-links">
        <Link href="https://p-devportfolio.vercel.app/" className="social-link">
          <svg className="social-icon" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
          <span>Portfolio</span>
        </Link>
        <Link href="https://www.facebook.com/SooPanha999" className="social-link">
          <svg className="social-icon" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <span>Facebook</span>
        </Link>
        <Link
          href="https://www.youtube.com/@Pdev9/featured"
          target="_blank"
          rel="noopener noreferrer"
          className="social-link"
        >
          <svg className="social-icon" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
          <span>YouTube</span>
        </Link>
      </div>

      <header className="page-header">
        <h1 className="page-title">I Write, I Read, I Code.</h1>
      </header>

      <section>
        {recentPosts.length === 0 ? (
          <p style={{ color: "var(--text-secondary)" }}>
            No posts yet. Check back soon!
          </p>
        ) : (
          <HomeClient posts={recentPosts} />
        )}
      </section>
    </div>
  );
}
