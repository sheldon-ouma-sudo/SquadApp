import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import PollCreation from './PollCreationScreen';
import PollRequest from './PollRequestScreen';
import Profile from './ProfileScreen';
import HomeScreen from './HomeScreen';
import NotificationScreen from './NotificationScreen';
    
  

    //this is the create stack navigator method: src from the navigation docs on the internet
    const Stack = createNativeStackNavigator();

    const TabNavigator = createBottomTabNavigator({
        Home: {
            screen: HomeScreen,
            navigationOptions: {
              tabBarLabel: "User",
              tabBarOptions: {
                activeTintColor: "#006600",
              },
              tabBarIcon: (tabInfo) => {
                return (
                  <Ionicons
                    name="md-person-circle-outline"
                    size={24}
                    color={tabInfo.focused ? "#006600" : "#8e8e93"}
                  />
                );
              },
            },
          },
      PollRequest: {
        screen: PollRequest,
        navigationOptions: {
          tabBarLabel: "User",
          tabBarOptions: {
            activeTintColor: "#006600",
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-person-circle-outline"
                size={24}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            );
          },
        },
      },
      PollCreation: {
        screen: PollCreation,
        navigationOptions: {
          tabBarLabel: "User",
          tabBarOptions: {
            activeTintColor: "#006600",
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-person-circle-outline"
                size={24}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            );
          },
        },
      },
      Notification: {
        screen: NotificationScreen,
        navigationOptions: {
          tabBarLabel: "User",
          tabBarOptions: {
            activeTintColor: "#006600",
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-person-circle-outline"
                size={24}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            );
          },
        },
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          tabBarLabel: "Setting",
          tabBarOptions: {
            activeTintColor: "#006600",
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-settings-outline"
                size={24}
                color={tabInfo.focused ? "#006600" : "#8e8e93"}
              />
            );
          },
        },
      },
    });
      
    const Navigator = createAppContainer(TabNavigator);
       
export default function App() {
    return (
      <Navigator>
        <HomeScreen />
      </Navigator>
    );
  }
