// notificationUtils.js
import { Notifications } from 'expo-notifications';


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

