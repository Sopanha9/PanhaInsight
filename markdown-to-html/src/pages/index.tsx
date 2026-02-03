import { GetStaticProps } from 'next';
import Link from 'next/link';
import { postsLoader } from '../lib/postsLoader';
import { Post } from '../types/post';
import Layout from '../components/Layout';

interface Props {
  posts: Post[];
}

const Home: React.FC<Props> = ({ posts }) => {
  return (
    <Layout>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/${post.slug}`}>
              <a>{post.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await postsLoader();
  return {
    props: {
      posts,
    },
  };
};

export default Home;