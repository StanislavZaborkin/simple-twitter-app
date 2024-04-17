import { sget } from '../../../api';
import { Post } from '../../../interfaces/post.ts';

export const getPosts = async (skip: number): Promise<Post[]> => {
  const url = `posts?limit=20&skip=${skip}`;
  return sget({
    url,
  });
};
