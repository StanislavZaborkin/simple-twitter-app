import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { getPostsRequest, selectPosts } from './slices';
import PostItem from './components/Post';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    dispatch(getPostsRequest());
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
      {posts.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
    </div>
  );
};

export default HomePage;
