export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  content: string;
  author?: string;
  coverImage?: string;
}
