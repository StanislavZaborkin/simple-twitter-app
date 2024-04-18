import { call, put, takeLatest } from 'redux-saga/effects';

import * as API from '../api';

import { loginRequest, loginError, loginSuccess } from '../slices';
import { setToken } from '../../../api';
import { User } from '../../../interfaces/user.ts';
import showAlert from '../../../services/showAlert';

function* login(action: ReturnType<typeof loginRequest>): Generator {
  try {
    const { username, password, callback } = action.payload;
    // yield returns unknown type, so we need to cast it to User
    const result = (yield call(API.login, { username, password })) as User;
    setToken(result.token);
    yield put(loginSuccess(result));
    callback();
  } catch (e) {
    yield put(loginError());
    console.error(e);
    showAlert({ text: 'Username or password is incorrect', type: 'error' });
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest, login);
}
