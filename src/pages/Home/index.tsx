import React, { useEffect } from 'react';

import { Index, InfiniteLoader, List, ListRowProps } from 'react-virtualized';

import PostCard from './components/PostCard';
import LoaderSpinner from '../../components/LoaderSpinner';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import {
  clearState,
  getPostsRequest,
  selectLoading,
  selectPosts,
  selectTotal,
} from './slices';

import { FOOTER_HEIGHT } from '../../constants/ui.ts';

import { Post } from '../../interfaces/post.ts';

import styles from './Home.module.css';

const PADDING_TOP = 20;

const Row = ({ style, post }: { style: React.CSSProperties; post: Post }) => {
  return (
    <div style={style}>
      <PostCard post={post} />
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

    return () => {
      dispatch(clearState());
    };
  }, []);

  const rowRenderer = ({ key, index, style }: ListRowProps) => {
    return <Row key={key} style={style} post={posts[index]} />;
  };

  function isRowLoaded({ index }: Index) {
    return !!posts[index];
  }

  const loadMoreRows = () => {
    // we have to return a promise here, because it is required by InfiniteLoader
    if (loading || posts.length === total) return Promise.resolve();
    dispatch(getPostsRequest());
    return Promise.resolve();
  };

  return (
    <div className={styles.homeWrapper}>
      <div className={styles.list}>
        <LoaderSpinner show={loading} />
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
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
              height={window.innerHeight - FOOTER_HEIGHT - PADDING_TOP}
            />
          )}
        </InfiniteLoader>
      </div>
    </div>
  );
};

export default HomePage;
