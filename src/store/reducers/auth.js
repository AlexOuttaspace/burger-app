import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  timeoutId: null,
  authRedirectPath: '/'
}

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true
  }
}

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.idToken,
    userId: action.userId,
    loading: false
  }
}

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  }
}

const authLogout = (state, action) => {
  clearTimeout(state.timeoutId);

  return {
    ...state,
    token: null,
    userId: null,
    timeoutId: null
  }
}

const authSetTimeoutId = (state, action) => {
  return {
    ...state,
    timeoutId: action.timeoutId
  }
}

const setAuthRedirectPath = (state, action) => {
  return {
    ...state,
    authRedirectPath: action.path
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.AUTH_SET_TIMEOUT_ID:
      return authSetTimeoutId(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action)
    default:
      return state;
  }
}

export default reducer;