import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';


class LoginForm extends Component {
state = { email: '', password: '', loading: false };

  onButtonPress = async () => {
    const { email, password } = this.state;
    this.setState({ error: '', loading: true });

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.onLoginSuccess();
    } catch (err) {
      try {
        console.log({ error1: err });
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        this.onLoginSuccess();
      } catch (err2) {
        console.log({ error2: err2 });
        this.onLoginFail();
      }
    }
  }

  onLoginFail = () => {
    this.setState({ error: 'Authentication Failed', loading: false });
  }

  onLoginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  renderButton() {
    if (this.state.loading) {
      return (<Spinner size="small" />);
    }

    return (
      <Button onPress={this.onButtonPress}>
        Log In
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>
        <CardSection>
          <Input
            // for boolean props we just need to specify the prop
            // same as secureTextEntry={true}
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};
export default LoginForm;
