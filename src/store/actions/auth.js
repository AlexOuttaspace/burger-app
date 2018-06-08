import * as actionTypes from './actionTypes';

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
  //localStorage.removeItem('token');
  //localStorage.removeItem('userId');
  //localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT_START
  };
};

export const logoutSucceed = () => {
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
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime
  }
}



export const auth = (email, password, isSignup) => {
  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignup
  }
}

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  }
}


export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  }
}