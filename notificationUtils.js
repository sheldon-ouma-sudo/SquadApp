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

export const sendPollCreationNotification = async (recipientUserIds, pollId) => {
  // Implement logic to send push notifications to recipients
  for (const userId of recipientUserIds) {
    try {
      const response = await API.graphql(graphqlOperation(createNotification, {
        input: {
          userID: userId,
          pollRequestsArray: [pollId],
        }
      }));
      console.log('Notification created successfully', response.data?.createNotification.id);
    } catch (error) {
      console.log('Error creating the notification item', error);
    }
  }
};
