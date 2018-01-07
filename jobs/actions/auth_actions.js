import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

// This is an async action creator function made using redux thunk
export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  if (token) {
    // Dispatch an action saying that FB login is done
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // Start up Login process
    doFacebookLogin(dispatch);
  }
}

const doFacebookLogin = async dispatch => {
  // type : if the auth was successful
  // token: token
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('889212567910893', {
    permissions: ['public_profile']
  });

  if (type === 'cancel') { // something went wrong with the login
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }
  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
};
