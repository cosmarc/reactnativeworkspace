import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/Deck';

const DATA = [
    { id: 1, text: 'Card#1', uri: 'http://lorempixel.com/output/abstract-q-c-640-480-2.jpg'},
    { id: 2, text: 'Card#2', uri: 'http://lorempixel.com/output/abstract-q-c-640-480-3.jpg'},
    { id: 3, text: 'Card#3', uri: 'http://lorempixel.com/output/abstract-q-c-640-480-5.jpg'},
    { id: 4, text: 'Card#4', uri: 'http://lorempixel.com/output/abstract-q-c-640-480-9.jpg'},
    { id: 5, text: 'Card#5', uri: 'http://lorempixel.com/output/abstract-q-c-640-480-4.jpg'},
    { id: 6, text: 'Card#6', uri: 'http://lorempixel.com/output/abstract-q-c-640-480-10.jpg'}

];

export default class App extends React.Component {

    renderCard(item) {
        return (
            <Card
                key={item.id}
                title={item.text}
                image={{uri: item.uri }}
            >
                <Text style={{ marginBottom: 10}}>
                    Some bgfdfdgdf text.
                </Text>
                <Button
                    icon={{ name: 'code' }}
                    backgroundColor="#03A9F6"
                    title="View Now!"
                />
            </Card>
        );
    }
    renderNoMoreCards() {
        return (
            <Card title="All Done!">
                <Text style={{ marginBottom: 10 }}>
                    There's no more content here!
                </Text>
                <Button
                    backgroundColor = "#03A9F4"
                    title="Get more!"
                />
            </Card>
        );
    }
  render() {
    return (
      <View style={styles.container}>
        <Deck
        data={DATA}
        renderCard={this.renderCard}
        renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
