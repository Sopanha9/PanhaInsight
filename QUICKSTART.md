# Quick Start Guide

## Installation

```bash
cd markdown-to-html
npm install
```

## Run the Project

```bash
npm run dev
```

Visit http://localhost:3000

## What's Been Built

✅ **Folder Structure**

- `content/posts/` - Markdown files (3 example posts included)
- `src/app/` - Next.js App Router pages
- `src/lib/posts.ts` - Post loading and Markdown processing
- `src/types/post.ts` - TypeScript interfaces

✅ **Routes**

- `/` - Home page with recent posts
- `/blog` - All blog posts
- `/blog/[slug]` - Individual post pages
- `/sitemap.xml` - SEO sitemap
- `/rss.xml` - RSS feed

✅ **Features**

- ✨ Frontmatter parsing (title, date, summary, tags, author)
- ✨ Markdown → HTML conversion
- ✨ Syntax highlighting for code blocks
- ✨ HTML sanitization
- ✨ Static site generation
- ✨ SEO metadata
- ✨ Responsive design with Tailwind CSS

## Next Steps

### 1. Install Dependencies

Run `npm install` in the `markdown-to-html` folder.

### 2. Create Your Posts

Add `.md` files to `content/posts/` with this format:

```markdown
---
title: "Your Title"
date: "2024-01-15"
summary: "Brief description"
tags: ["tag1", "tag2"]
author: "Your Name"
---

# Your Content Here

Write your post content in Markdown...
```

### 3. Customize

- **Blog Name**: Edit `src/app/layout.tsx`
- **Styling**: Modify `src/app/globals.css`
- **Code Theme**: Change highlight.js theme in `src/app/layout.tsx`
- **Home Page**: Update `src/app/page.tsx`

### 4. Deploy

Push to GitHub and deploy on Vercel:

```bash
git add .
git commit -m "Initial blog setup"
git push
```

Then import your repo on [vercel.com](https://vercel.com)

## Example Posts Included

1. **Getting Started with Next.js 14** - Introduction to Next.js features
2. **Understanding TypeScript Generics** - TypeScript tutorial
3. **CSS Grid Layout** - CSS guide with examples

## Need Help?

Check the main README.md for detailed documentation!
