import {put, call} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import axios from 'axios';
import * as actions from '../actions/';

const API_KEY = 'AIzaSyBbupLLAm4YbreeMjjlLbFRgllHz1K73MM';
const SIGN_UP_API_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
const SIGN_IN_API_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;

export function* logoutSaga(action) {
  yield call([localStorage, 'removeItem'], 'token')
  yield call([localStorage, 'removeItem'], 'expirationDate')
  yield call([localStorage, 'removeItem'], 'userId')
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  const url = action.isSignup ? SIGN_UP_API_URL : SIGN_IN_API_URL;
  try {
    const res = yield axios.post(url, authData)

    const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
    yield localStorage.setItem('token', res.data.idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', res.data.localId);
    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error));
  }
}

export function* authCheckStateSaga(action){
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));

    if (expirationDate > new Date()) {
      const userId = yield localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
    } else {
      yield put(actions.logout());
    }
  } 
}