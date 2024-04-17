import { fork } from 'redux-saga/effects';

import { authSaga } from '../../pages/Login/sagas';
import { homeSaga } from '../../pages/Home/sagas';

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(homeSaga);
}
