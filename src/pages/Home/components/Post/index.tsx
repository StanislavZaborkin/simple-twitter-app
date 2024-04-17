import { Post } from '../../../../types/post.ts';

interface PostProps {
  post: Post;
}

const PostItem = ({ post }: PostProps) => <div key={post.id}>{post.title}</div>;

export default PostItem;
