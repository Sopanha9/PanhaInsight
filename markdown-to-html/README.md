# Markdown to HTML Converter

This project is a simple Next.js application that converts Markdown files into HTML. It allows users to create and view blog posts written in Markdown format, leveraging the power of Next.js for server-side rendering and static site generation.

## Features

- Dynamic routing for individual posts
- Markdown to HTML conversion
- Frontmatter support for post metadata
- List of posts on the homepage
- Consistent layout across pages

## Folder Structure

```
markdown-to-html
├── public
│   └── images
├── src
│   ├── pages
│   │   ├── index.tsx
│   │   └── [slug].tsx
│   ├── components
│   │   └── Layout.tsx
│   ├── lib
│   │   ├── markdownToHtml.ts
│   │   └── postsLoader.ts
│   ├── types
│   │   └── post.ts
│   └── styles
│       └── globals.css
├── posts
│   ├── example-post.md
│   └── another-post.md
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd markdown-to-html
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- Add new Markdown posts in the `posts` directory. Each post should have a YAML frontmatter section for metadata.
- The homepage will automatically list all posts, linking to their respective pages.
- Each post page will render the Markdown content as HTML.

## Technologies Used

- Next.js
- TypeScript
- Markdown-it (or similar library for Markdown conversion)
- gray-matter (for parsing frontmatter)

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.