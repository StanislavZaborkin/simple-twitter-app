import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../../types/post.ts';

export interface HomeSliceState {
  posts: Post[];
  loading: boolean;
}

export interface GetPostsResponse {
  limit: number;
  posts: Post[];
  skip: number;
  total: number;
}

const initialState: HomeSliceState = {
  posts: [],
  loading: false,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: () => ({
    getPostsRequest(state) {
      state.loading = true;
    },
    getPostsSuccess(state, action: PayloadAction<GetPostsResponse>) {
      state.posts = action.payload.posts;
      state.loading = false;
    },
    getPostsError(state) {
      state.loading = false;
    },
  }),
  selectors: {
    selectPosts: (auth) => auth.posts,
    selectLoading: (auth) => auth.loading,
  },
});

export const { getPostsRequest, getPostsError, getPostsSuccess } =
  homeSlice.actions;

export const { selectPosts, selectLoading } = homeSlice.selectors;
