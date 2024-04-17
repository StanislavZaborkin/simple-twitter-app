import { call, put, takeLatest } from 'redux-saga/effects';

import * as API from '../api';

import { loginRequest, loginError, loginSuccess } from '../slices';
import { setToken } from '../../../api';
import { User } from '../../../types/user.ts';
import showAlert from '../../../services/showAlert.tsx';

function* login(action: ReturnType<typeof loginRequest>): Generator {
  try {
    const result = (yield call(API.login, action.payload)) as User;
    setToken(result.token);
    yield put(loginSuccess(result));
  } catch (e) {
    yield put(loginError());
    console.error(e);
    showAlert({ text: 'Username or password is incorrect', type: 'error' });
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest, login);
}
