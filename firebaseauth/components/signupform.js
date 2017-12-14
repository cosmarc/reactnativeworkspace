import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-one-time-password-b8e21.cloudfunctions.net';

class SignUpForm extends Component {
    state  = { phone: ''};

    // using an arrow function is equivalent to a normal function but this is automatically bound
    // wherever we pass the function as callback (ES 2017)
    // otherwise where we pass the function as callback we have to add
    // handleSubmit.bind(this)
    handleSubmit = async () => {
        // async await system from ES 2017
        // response can be used right after await
        try {
            /*let response = */await axios.post(`${ROOT_URL}/creatUser`, { phone: this.state.phone });
            await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone });
        } catch (err) {
            console.log(err);
        }
    }
// OLD Version
    // handleSubmit = () => {
    //     axios.post(`${ROOT_URL}/creatUser`, {
    //         phone: this.state.phone
    //     }).then(() => {
    //         axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone})
    //     })
    // }
    render() {
        return (
            <View>
                <View style={{marginBottom: 10}}>
                    <FormLabel>Enter Phone Number</FormLabel>
                    <FormInput
                        value={this.state.phone}
                        onChangeText={phone => this.setState({ phone })}
                    />
                </View>
                <Button
                    onPress={this.handleSubmit}
                    title="Submit" />
            </View>
        );
    }
}

export default SignUpForm;
