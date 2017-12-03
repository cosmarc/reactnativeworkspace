import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';
import SignUpForm from './components/signupform';
import SignInForm from './components/signinform';

export default class App extends React.Component {
    componentDidMount() {
        const config = {
            apiKey: "YOUR_API_KEY",
            authDomain: "one-time-password-b8e21.firebaseapp.com",
            databaseURL: "https://one-time-password-b8e21.firebaseio.com",
            projectId: "one-time-password-b8e21",
            storageBucket: "one-time-password-b8e21.appspot.com",
            messagingSenderId: "331506483140"
        };
        firebase.initializeApp(config);
    }
    render() {
        return (
          <View style={styles.container}>
            <SignUpForm />
            <SignInForm />
          </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
