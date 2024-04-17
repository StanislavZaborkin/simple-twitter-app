import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import React, { useEffect } from 'react';
import {
  getPostsRequest,
  selectLoading,
  selectPosts,
  selectTotal,
} from './slices';
import { Index, InfiniteLoader, List, ListRowProps } from 'react-virtualized';
import PostItem from './components/Post';
import { Post } from '../../interfaces/post.ts';

import styles from './Home.module.css';
import { CircularProgress } from '@mui/material';

const Row = ({ style, post }: { style: React.CSSProperties; post: Post }) => {
  return (
    <div style={style}>
      <PostItem post={post} />
    </div>
  );
};

const HomePage = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectLoading);
  const total = useAppSelector(selectTotal);

  useEffect(() => {
    dispatch(getPostsRequest());
  }, []);

  const rowRenderer = ({ key, index, style }: ListRowProps) => {
    return <Row key={key} style={style} post={posts[index]} />;
  };

  function isRowLoaded({ index }: Index) {
    return !!posts[index];
  }

  const loadMoreRows = () => {
    if (loading || posts.length === total) return;
    dispatch(getPostsRequest());
  };

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.list}>
        {loading ? (
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        ) : null}
        <InfiniteLoader
          threshold={20}
          isRowLoaded={isRowLoaded}
          // @ts-ignore
          loadMoreRows={loadMoreRows}
          rowCount={total}>
          {({ onRowsRendered, registerChild }) => (
            <List
              width={600}
              rowHeight={200}
              ref={registerChild}
              rowCount={posts.length}
              rowRenderer={rowRenderer}
              onRowsRendered={onRowsRendered}
              height={window.innerHeight - 100}
            />
          )}
        </InfiniteLoader>
      </div>
    </div>
  );
};

export default HomePage;
