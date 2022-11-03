import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,TouchableOpacity} from 'react-native'
import React from 'react'
import NotificationScreen from './NotificationTopNavigation';
import HomeScreen from './HomeTopNavigation';
import Profile from './ProfileTopNavigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ExploreScreen from './ExploreScreen';
import PollCreation from './PollCreationScreen';
import { Ionicons } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <><KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={[styles.squadLogoContainer, { flexDirection: 'column' }]}>
        <Image
          source={require('/Users/sheldonotieno/Squad/assets/squad-logo.png')}
          style={styles.squadLogo}
          resizeMode='contain'
        ></Image>
      </View>
    </KeyboardAvoidingView>
    <Tab.Navigator
    initialRouteName="Home"
   // tabBarOptions= {{//activeTintColor: '#1145FD',}}
    >
     <Tab.Screen  
     component={HomeScreen}
     options={{
     tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
             name="home"
             size={24}
            color={tabInfo.focused ?'#1145FD': "#8e8e93"}/>
          )
     }
        }}
     /> 
      <Tab.Screen
      component={ExploreScreen}
      options={{
             tabBarLabel: "Explore",
             tabBarOptions: {
              activeTintColor: '#1145FD',
           },
            tabBarIcon: (tabInfo) => {
             return (
               <Ionicons
                name="globe"
                  size={24}
                color={tabInfo.focused ? '#1145FD' : "#8e8e93"}/>
             )
            }
          }}
      />
      <Tab.Screen
       component={PollCreation}
       options={{
              tabBarLabel: "Poll Creation",
              tabBarOptions: {
               activeTintColor: '#1145FD',
            },
             tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                name="duplicate"
                size={24}
                color={tabInfo.focused ? '#1145FD' : "#8e8e93"}/>
              )
             }
           }}
      />

<Tab.Screen
       component={NotificationScreen}
       options={{
              tabBarLabel: "Notification",
              tabBarOptions: {
               activeTintColor: '#1145FD',
            },
             tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="notifications"
                  size={24}
                 color={tabInfo.focused ? '#1145FD' : "#8e8e93"}/>
              )
             }
           }}
      />

<Tab.Screen
       component={Profile}
       options={{
              tabBarLabel: "Profile",
              tabBarOptions: {
               activeTintColor: '#1145FD',
            },
             tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="person-circle"
                  size={24}
                 color={tabInfo.focused ? '#1145FD' : "#8e8e93"}/>
              )
             }
           }}
      />  
      </Tab.Navigator></>
  )
}


export default BottomNavigation

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
