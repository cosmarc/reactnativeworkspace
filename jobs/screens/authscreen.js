import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    // temporary clear the token to invoke again the login.
    // AsyncStorage.removeItem('fb_token');

    // not needed, just to try to move the user faster to map screen
    //this.onAuthComplete(this.props);
  }

// it's called when the component is about to be rerendered
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

// send the user directly to the map screen if the token exists
  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('map');
    }
  }

  render() {
    return (
      <View>
      </View>
    );
  }
}

// usually it's called with the global state object
// but now we destructure it because we need just
// auth state
// this function maps the props of the component
// with the redux state
function mapStateToProps({ auth }) {
  return { token: auth.token };
}
// connect means binding all actions imported from actions to auth screen
export default connect(mapStateToProps, actions) (AuthScreen);
