    import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
    StatusBar,Dimensions,TouchableOpacity} from 'react-native'
    import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
    import SquadActivityScreen from './SquadActivityScreen';
    import PollActivityScreen from './PollActivityScreen';
    import React, { useEffect, useState } from 'react';
    import { API, graphqlOperation } from 'aws-amplify';
    import { useUserContext } from '../../UserContext';
    import { notificationsByUserID } from '../graphql/queries';
    import { getNotification } from '../graphql/queries';
    import { useSafeAreaInsets } from 'react-native-safe-area-context';
    import * as Device from 'expo-device';
    import * as Notifications from 'expo-notifications';

    

    //setting up for the notification for the sender 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


Notifications.scheduleNotificationAsync({
  content: {
    title: 'Look at that notification',
    body: "I'm so proud of myself!",
  },
  trigger: null,
});
// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
// async function sendPushNotification(expoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' }, //data goes here i.e the poll goes here
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = await Notifications.getExpoPushTokenAsync({
//       projectId: Constants.expoConfig.extra.eas.projectId,
//     });
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }


   const NotificationScreen=()=>{
    const Tab = createMaterialTopTabNavigator();
      //const insets = useSafeAreaInsets();
      const { user } = useUserContext();
  const [squadAddRequestsArray, setSquadAddRequestsArray] = useState([]);
  const [squadJoinRequestArray, setSquadJoinRequestArray] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      // Check if the user and user.id exist before making the API request
      if (!user || !user.id) {
        console.log('User or User ID is not available');
        return;
      }
  
      try {
        console.log("Fetching notifications for user ID:", user.id);
  
        // Make sure you're using the correct variable for the query (user.id)
        const notificationData = await API.graphql(
          graphqlOperation(notificationsByUserID, { userID: user.id })
        );
  
        const notifications = notificationData?.data?.notificationsByUserID?.items;

        // Check if notifications exist and grab the first one
        if (notifications && notifications.length > 0) {
          const notification = notifications[0];  // Get the first notification
          console.log("here is the squadAddrequest", notification.squadAddRequestsArray); // This should no longer be undefined
          console.log("here is the squadjoinrequest", notification.SquadJoinRequestArray); // Access it correctly now
  
          setSquadAddRequestsArray(notification.squadAddRequestsArray || []);
          setSquadJoinRequestArray(notification.SquadJoinRequestArray || []);
        } else {
          console.log("No notifications found");
        }
      } catch (error) {
        console.log('Error fetching notifications:', error);
      }
    };
  
    if (user && user.id) {
      fetchNotifications(); // Only fetch if user and user.id are available
    }
  }, [user]);
  
      return (
        <Tab.Navigator
        style={[{ marginTop: -2 }, { marginEnd: 5 }, { marginStart: 5 }, { backgroundColor: "#F4F8FB" }, { borderRadius: 9 }]}
        screenOptions={{
          tabBarLabelStyle: { color: '#1145FD', fontWeight: '600' },
          tabBarStyle: { backgroundColor: "#F4F8FB" },
        }}
      >
        <Tab.Screen name="Poll Notifications" component={PollActivityScreen} />
        <Tab.Screen
      name="Squad Notifications"
      component={SquadActivityScreen}
     initialParams={{ 
    squadAddRequestsArray: squadAddRequestsArray, 
    squadJoinRequestArray: squadJoinRequestArray 
  }}
/>

      </Tab.Navigator>
  )
}  

   
  
const styles = StyleSheet.create({
    container:{
    flex:1,
    justifyContent:"flex-start",
    alignItems:"center",
    backgroundColor: "#F4F8FB",
    },
    squadLogo:{
        width:100,
        height:35,
        marginRight:250,
        marginTop:70  
    }
})

export default NotificationScreen