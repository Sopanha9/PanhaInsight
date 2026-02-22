import type { Metadata } from "next";
import "./globals.css";
import "highlight.js/styles/github-dark.css";
import Link from "next/link";
import {
  Noto_Serif_Khmer,
  Kantumruy_Pro,
  Noto_Sans_Khmer,
  JetBrains_Mono,
} from "next/font/google";

const notoSerifKhmer = Noto_Serif_Khmer({
  subsets: ["khmer", "latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif-khmer",
});

const kantumruyPro = Kantumruy_Pro({
  subsets: ["khmer", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-kantumruy-pro",
});

const notoSansKhmer = Noto_Sans_Khmer({
  subsets: ["khmer", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-khmer",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "PanhaInsight",
    template: "%s | PanhaInsight",
  },
  description: "A blog built with Next.js and Markdown",
  openGraph: {
    images: ["/images/me.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${notoSansKhmer.variable} ${notoSerifKhmer.variable} ${kantumruyPro.variable} ${jetbrainsMono.variable}`}
      >
        <nav className="nav">
          <div className="nav-content">
            <Link href="/" className="nav-brand">
              <div className="nav-logo">
                <img src="/images/me.jpg" alt="Logo" />
              </div>
              <span className="nav-title">Panha!nsight.</span>
            </Link>
            <div className="nav-links">
              <Link href="/podcast" className="nav-link">
                Podcast
              </Link>
            </div>
          </div>
        </nav>

        <main className="main">{children}</main>

        <footer className="footer">
          <div className="footer-content">
            <p>
              &copy; {new Date().getFullYear()} My Blog. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
