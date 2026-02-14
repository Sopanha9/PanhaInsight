# Markdown to HTML Blog with Next.js 14

A modern, fast, and SEO-friendly blog built with Next.js 14 App Router, TypeScript, and Tailwind CSS. Write your posts in Markdown and they're automatically converted to beautiful HTML pages.

## Features

✨ **Modern Stack**

- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- Server Components by default

📝 **Markdown Support**

- Write posts in Markdown with frontmatter
- Automatic syntax highlighting for code blocks
- Sanitized HTML output
- Support for tags, authors, and metadata

🚀 **Performance**

- Static site generation with `generateStaticParams()`
- Automatic route generation
- Optimized images and assets

🔍 **SEO Optimized**

- Automatic sitemap generation
- RSS feed support
- Meta tags and Open Graph
- Semantic HTML

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Create Your First Post

Create a new Markdown file in `content/posts/`:

```markdown
---
title: "My First Post"
date: "2024-01-15"
summary: "This is my first blog post!"
tags: ["intro", "blog"]
author: "Your Name"
---

# My First Post

Welcome to my blog! This is the content of my first post.
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog!

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
markdown-to-html/
├── content/
│   └── posts/              # Your Markdown posts
│       ├── post-1.md
│       └── post-2.md
├── src/
│   ├── app/
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx    # Individual blog post
│   │   │   └── page.tsx        # Blog list page
│   │   ├── rss.xml/
│   │   │   └── route.ts        # RSS feed
│   │   ├── sitemap.xml/
│   │   │   └── route.ts        # Sitemap
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── lib/
│   │   └── posts.ts            # Post loading utilities
│   └── types/
│       └── post.ts             # TypeScript types
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## Frontmatter Fields

Each Markdown post should include frontmatter at the top:

```yaml
---
title: "Post Title" # Required
date: "2024-01-15" # Required (YYYY-MM-DD)
summary: "Brief description" # Required
tags: ["tag1", "tag2"] # Optional array
author: "Author Name" # Optional
coverImage: "/images/pic.jpg" # Optional
---
```

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Remark & Rehype (Markdown processing)
- gray-matter (Frontmatter parsing)
- highlight.js (Syntax highlighting)

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.
