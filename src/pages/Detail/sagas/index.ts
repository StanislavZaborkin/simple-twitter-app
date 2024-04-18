import { call, put, takeLatest } from 'redux-saga/effects';

import * as API from '../api/index.ts';

import { getPostSuccess, getPostError, getPostRequest } from '../slices';

import { Post } from '../../../interfaces/post.ts';

function* getPost(action: ReturnType<typeof getPostRequest>): Generator {
  try {
    // yield returns unknown type, so we need to cast it to Post
    const result = (yield call(API.getPostById, action.payload)) as Post;
    yield put(getPostSuccess(result));
  } catch (e) {
    yield put(getPostError());
    console.error(e);
  }
}

export function* detailSaga() {
  yield takeLatest(getPostRequest, getPost);
}
