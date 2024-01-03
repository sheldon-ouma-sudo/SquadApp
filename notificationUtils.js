// notificationUtils.js

import { Notifications } from 'expo-notifications';
import { API, graphqlOperation } from 'aws-amplify';
import { createNotification } from './src/graphql/mutations';

export const registerForPushNotificationsAsync = async () => {
  let token = null;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus === 'granted') {
    token = (await Notifications.getExpoPushTokenAsync()).data;
  }

  return token;
};

export const updateExpoPushToken = async (userId, expoPushToken) => {
  // Update the Expo Push Token for the user in your backend (Amplify)
  const input = { id: userId, expoPushToken };
  await API.graphql(graphqlOperation(createNotification, { input }));
};

export const sendPollCreationNotification = async (recipientUserIds) => {
  // Implement logic to send push notifications to recipients
  // You can use Expo's `sendPushNotification` function here
};
