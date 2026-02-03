import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markdownToHtml from '../lib/markdownToHtml';
import { Post } from '../types/post';

const postsDirectory = path.join(process.cwd(), 'posts');

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = fs.readdirSync(postsDirectory);
  const paths = filenames.map((filename) => {
    const slug = filename.replace(/\.md$/, '');
    return { params: { slug } };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const htmlContent = await markdownToHtml(content || '');

  const post: Post = {
    title: data.title,
    date: data.date,
    slug,
    content: htmlContent,
  };

  return {
    props: {
      post,
    },
  };
};

const PostPage = ({ post }: { post: Post }) => {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <p>{post.date}</p>
    </article>
  );
};

export default PostPage;