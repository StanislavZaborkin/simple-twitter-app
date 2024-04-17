import { call, put, select, takeLatest } from 'redux-saga/effects';

import * as API from '../api/index.ts';

import {
  getPostsSuccess,
  getPostsError,
  getPostsRequest,
  GetPostsResponse,
  selectSkip,
} from '../slices';

function* getPosts(): Generator {
  try {
    const skip = (yield select(selectSkip)) as number;
    const result = (yield call(API.getPosts, skip)) as GetPostsResponse;
    yield put(getPostsSuccess(result));
  } catch (e) {
    yield put(getPostsError());
    console.error(e);
  }
}

export function* homeSaga() {
  yield takeLatest(getPostsRequest, getPosts);
}
