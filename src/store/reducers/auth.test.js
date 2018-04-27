import reducer from './auth';

import * as actionTypes from '../actions/actionTypes';

describe('Auth reducer', () => {

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      timeoutId: null,
      authRedirectPath: '/'
    });
  });

  it('should store a token upon login', () => {
    expect(reducer({
      token: null,
      userId: null,
      error: null,
      loading: false,
      timeoutId: null,
      authRedirectPath: '/'
    }, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'test-token',
      userId: 'test-id'
    })).toEqual({
      token: 'test-token',
      userId: 'test-id',
      error: null,
      loading: false,
      timeoutId: null,
      authRedirectPath: '/'
    });
  });
});