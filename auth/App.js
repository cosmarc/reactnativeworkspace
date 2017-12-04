import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'firebase';

import { Header, Button, CardSection, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

export default class App extends React.Component {
  state = { loggedIn: null };
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'YOUR_FIREBASE_API_KEY',
      authDomain: 'authentication-c6022.firebaseapp.com',
      databaseURL: 'https://authentication-c6022.firebaseio.com',
      projectId: 'authentication-c6022',
      storageBucket: 'authentication-c6022.appspot.com',
      messagingSenderId: 'YOUR_MESSAGE_SENDER_ID'
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return (
            <Spinner size="large" style={styles.container} />
      );
    }
}
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header headerText="Authentication" />
          {this.renderContent()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
