import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
  const previousToken = await AsyncStorage.getItem('pushtoken');
  console.log(previousToken);
  if (previousToken) {
    return;
  }
  console.log("--------1");
  const { status } = await Permissions.askAsync(Permissions.REMOTE_NOTIFICATIONS);
  console.log("--------2");
  if (status !== 'granted') {
    return;
  }

  const token = await Notifications.getExpoPushTokenAsync();
  console.log("-----3");
  await axios.post(PUSH_ENDPOINT, { token: { token } });
  console.log("------4");
  AsyncStorage.setItem('pushtoken', token);
};
