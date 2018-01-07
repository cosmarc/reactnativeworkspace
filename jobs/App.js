import React from 'react';
import { Notifications } from 'expo';
import { StyleSheet, View, Alert } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import registerForNotifications from './services/push_notifications';
import configureStore from './store';
import AuthScreen from './screens/authscreen';
import WelcomeScreen from './screens/welcomescreen';
import MapScreen from './screens/mapscreen';
import DeckScreen from './screens/deckscreen';
import ReviewScreen from './screens/reviewscreen';
import SettingsScreen from './screens/settingsscreen';

export default class App extends React.Component {

  componentDidMount() {
    registerForNotifications();

    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;
      // check also the text because some push notifications can be only for developer
      // TODO: learn more about origin
      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok.' }]
        );
    }
    });
  }

  render() {
    const { persistor, store } = configureStore();
    const MainNavigator = TabNavigator({ // routes configuration
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, {
          tabBarPosition: 'bottom', // more for Android
          swipeEnabled: false, // on Android true by default
          backBehavior: 'none', // for Android to avoid going back to WelcomeScreen
          tabBarOptions: {
            labelStyle: { fontSize: 12 }
          }
        })
      }
    }, { // configuration options object
      lazy: true,
      navigationOptions: {
        tabBarVisible: false
      }
    });

    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            <MainNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
