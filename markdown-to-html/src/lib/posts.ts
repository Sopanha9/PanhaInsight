import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";
import { Post } from "../types/post";

const postsDirectory = path.join(process.cwd(), "content", "posts");

/**
 * Get all post slugs
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

/**
 * Get post data by slug (without HTML content)
 */
export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      summary: data.summary || "",
      tags: Array.isArray(data.tags) ? data.tags : [],
      content, // Raw markdown
      author: data.author,
      coverImage: data.coverImage,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Convert markdown content to HTML
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const sanitizeSchema = {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      "*": [...(defaultSchema.attributes?.["*"] || []), "className"],
      code: [...(defaultSchema.attributes?.code || []), "className"],
      span: [...(defaultSchema.attributes?.span || []), "className"],
    },
  };

  const result = await unified()
    .use(remarkParse)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .use(remarkRehype as any)
    .use(rehypeHighlight)
    .use(rehypeSanitize, sanitizeSchema)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}

/**
 * Get post data with HTML content
 */
export async function getPostBySlugWithHtml(
  slug: string,
): Promise<(Post & { htmlContent: string }) | null> {
  const post = getPostBySlug(slug);
  if (!post) return null;

  const htmlContent = await markdownToHtml(post.content);

  return {
    ...post,
    htmlContent,
  };
}

/**
 * Get all posts sorted by date (descending)
 */
export function getAllPosts(): Post[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      // Sort by date descending (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return posts;
}

/**
 * Get recent posts (limited)
 */
export function getRecentPosts(limit: number = 5): Post[] {
  const allPosts = getAllPosts();
  return allPosts.slice(0, limit);
}
