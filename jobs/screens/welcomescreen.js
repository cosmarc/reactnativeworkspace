import _ from 'lodash';
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

import Slides from '../components/slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp, bla bla bla bla bla', color: '#03A9F4' },
  { text: 'Use this app to get a job', color: '#009688' },
  { text: 'Set your location, then swipe', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  state = { token: null }

  async componentWillMount() {
    const token = await AsyncStorage.getItem('fb_token');

    if (token) {
      this.setState({ token: true });
      this.props.navigation.navigate('map');
    } else {
        this.setState({ token: false });
    }
  }

  onSlidesComplete = () => {
    this.props.navigation.navigate('auth');
  }

  render() {
    // we use loadash because we wanna check if token is null or false.
    // search for the token into AsyncStorage
    // and display loading screen until it is retrieved in componentWillMount
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }

    return (
      <View style={{ flex: 1 }}>
        {/*no .bind(this) needed for onSlidesComplete because we used the arrow function*/}
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
      </View>
    );
  }
}
export default WelcomeScreen;
