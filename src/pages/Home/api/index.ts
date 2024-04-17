import { sget } from '../../../api';
import { Post } from '../../../types/post.ts';

export const getPosts = async (userId: number): Promise<Post[]> => {
  const url = `posts/user/${userId}`;
  return sget({
    url,
  });
};
