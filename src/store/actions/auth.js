import * as actionTypes from './actionTypes';
import axios from 'axios';

const API_KEY = 'AIzaSyBbupLLAm4YbreeMjjlLbFRgllHz1K73MM';
const SIGN_UP_API_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;
const SIGN_IN_API_URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken,
    userId
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId')
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const authSetTimeoutId = timeoutId => {
  return {
    type: actionTypes.AUTH_SET_TIMEOUT_ID,
    timeoutId
  }
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    const timeoutId = setTimeout( () => {
      dispatch(logout());
    }, expirationTime * 1000);
    dispatch(authSetTimeoutId(timeoutId));
  }
}



export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    
    const url = isSignup ? SIGN_UP_API_URL : SIGN_IN_API_URL;

    axios.post(url, authData)
      .then(res => {
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(checkAuthTimeout(res.data.expiresIn));
      })
      .catch(err => {
        dispatch(authFail(err.response.data.error));
      })
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
}


export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
      } else {
        dispatch(logout());
      }
    } 
  }
}