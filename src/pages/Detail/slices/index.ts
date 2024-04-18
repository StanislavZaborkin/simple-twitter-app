import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../../interfaces/post.ts';
import { logout } from '../../Login/slices';

export interface DetailSliceState {
  post: Post;
  loading: boolean;
}

const initialState: DetailSliceState = {
  post: {} as Post,
  loading: false,
};

export const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: () => ({
    getPostRequest(state, _action: PayloadAction<number>) {
      state.loading = true;
      state.post = {} as Post;
    },
    getPostSuccess(state, action: PayloadAction<Post>) {
      state.loading = false;
      state.post = action.payload;
    },
    getPostError(state) {
      state.loading = false;
    },
  }),
  selectors: {
    selectLoading: (auth) => auth.loading,
    selectPost: (auth) => auth.post,
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => {
      return initialState;
    });
  },
});

export const { getPostRequest, getPostError, getPostSuccess } =
  detailSlice.actions;

export const { selectLoading, selectPost } = detailSlice.selectors;
