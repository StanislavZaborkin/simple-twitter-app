import { call, put, select, takeLatest } from 'redux-saga/effects';

import * as API from '../api/index.ts';

import {
  getPostsSuccess,
  getPostsError,
  getPostsRequest,
  GetPostsResponse,
} from '../slices';
import { User } from '../../../types/user.ts';
import showAlert from '../../../services/showAlert.tsx';
import { selectUser } from '../../Login/slices';

function* getPosts(): Generator {
  try {
    const user = (yield select(selectUser)) as User;
    const result = (yield call(API.getPosts, user.id)) as GetPostsResponse;
    yield put(getPostsSuccess(result));
  } catch (e) {
    yield put(getPostsError());
    console.error(e);
    showAlert({ text: 'Username or password is incorrect', type: 'error' });
  }
}

export function* homeSaga() {
  yield takeLatest(getPostsRequest, getPosts);
}
