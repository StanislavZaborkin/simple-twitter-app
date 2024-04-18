import { sget } from '../../../api';
import { Post } from '../../../interfaces/post.ts';

export const getPostById = async (postId: number): Promise<Post[]> => {
  const url = `posts/${postId}`;
  return sget({
    url,
  });
};
