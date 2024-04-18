import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../../interfaces/post.ts';
import { logout } from '../../Login/slices';

export interface HomeSliceState {
  posts: Post[];
  skip: number;
  total: number;
  loading: boolean;
}

export interface GetPostsResponse {
  limit: number;
  posts: Post[];
  skip: number;
  total: number;
}

const initialState: HomeSliceState = {
  skip: 0,
  total: 0,
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
      state.posts = [...state.posts, ...action.payload.posts];
      state.total = action.payload.total;
      state.skip = state.posts.length;
      state.loading = false;
    },
    getPostsError(state) {
      state.loading = false;
    },
  }),
  selectors: {
    selectPosts: (auth) => auth.posts,
    selectLoading: (auth) => auth.loading,
    selectSkip: (auth) => auth.skip,
    selectTotal: (auth) => auth.total,
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      return initialState;
    });
  },
});

export const { getPostsRequest, getPostsError, getPostsSuccess } =
  homeSlice.actions;

export const { selectPosts, selectLoading, selectSkip, selectTotal } =
  homeSlice.selectors;
