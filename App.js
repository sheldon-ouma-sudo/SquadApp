import { LogBox } from "react-native";
import { View, Text,KeyboardAvoidingView,Image, StyleSheet, StatusBar,Dimensions,TouchableOpacity} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import SquadCreationScreen from './src/screens/SquadCreationScreen';
import PhoneOTPScreen from './src/screens/PhoneOTPScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import EmailOTPScreen from './src/screens/EmailOTPScreen';
import AgeGenderLocationScreen from './src/screens/AgeGenderLocationScreen';
import PersonalInterests from './src/screens/PersonalInterests';
import ProfilePictureUpload from './src/screens/ProfilePictureUpload';
import GoogleSignInLoadingScreen from './src/screens/GoogleSignInLoadingScreen';
import UploadProfPicture from './src/screens/UploadProfPictureScreen';
import ChangeProfilePictureScreen from './src/screens/ChangeProfilePictureScreen';
import PhoneNumberScreen from './src/screens/PhoneNumberScreen';
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PollCreation from './src/screens/PollCreationScreen';
import Profile from './src/screens/ProfileTopNavigation';
import PasswordResetScreen from './src/screens/PasswordResetScreen';
import TestWorkScreen from './src/screens/TestWorkScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import HomeScreen from './src/screens/HomeTopNavigation';
import NotificationScreen from './src/screens/NotificationTopNavigation';
import PollContentScreen from "./src/screens/PollContentScreen";
import NewTestScreenWork from "./src/screens/NewTestScreen";
//import config from './src/aws-exports'
///import Amplify from "@aws-amplify/core";

//Amplify.configure(config)

const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const Tab = createBottomTabNavigator();
function BottomTabs() {
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
    <Tab.Navigator>
        <Tab.Screen options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarOptions: {
            activeTintColor: '#1145FD',
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="home"
                size={24}
                color={tabInfo.focused ? '#1145FD' : "#8e8e93"} />
            );
          }
        }}
          name="Home"
          component={HomeScreen} />
        <Tab.Screen options={{
          headerShown: false,
          tabBarLabel: "Explore",
          tabBarOptions: {
            activeTintColor: '#1145FD',
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="globe"
                size={24}
                color={tabInfo.focused ? '#1145FD' : "#8e8e93"} />
            );
          }
        }}
          name="Explore"
          component={ExploreScreen} />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarLabel: "Poll Creation",
            tabBarOptions: {
              activeTintColor: '#1145FD',
            },
            tabBarIcon: (tabInfo) => {
              return (
                <Ionicons
                  name="duplicate"
                  size={24}
                  color={tabInfo.focused ? '#1145FD' : "#8e8e93"} />
              );
            }
          }} name="Poll Creation"
          component={PollCreation} />
        <Tab.Screen options={{
          headerShown: false,
          tabBarLabel: "Notification",
          tabBarOptions: {
            activeTintColor: '#1145FD',
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="notifications"
                size={24}
                color={tabInfo.focused ? '#1145FD' : "#8e8e93"} />
            );
          }
        }}
          name="Notification"
          component={NotificationScreen} />
        <Tab.Screen options={{
          headerShown: false,
          tabBarLabel: "Profile",
          tabBarOptions: {
            activeTintColor: '#1145FD',
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="person-circle"
                size={24}
                color={tabInfo.focused ? '#1145FD' : "#8e8e93"} />
            );
          }
        }}
          name="Profile"
          component={Profile} />
      </Tab.Navigator></>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown : false}}   name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RootNavigation" options={{headerShown: false}} component={BottomTabs} /> 
        <Stack.Screen options={{headerShown : false}} name="NewTestWorkScreen" component={NewTestScreenWork}/>
        <Stack.Screen options={{headerShown: false}} name="SignupScreen"  component={SignupScreen} />
        <Stack.Screen options={{headerShown:false}} name ="PollContentScreen" component={PollContentScreen}/>
        <Stack.Screen options={{headerShown:false}} name="PasswordResetScreen" component={PasswordResetScreen}/> 
        <Stack.Screen options={{headerShown: false}} name="SquadCreationScreen"  component={SquadCreationScreen} />
        <Stack.Screen options={{headerShown: false}} name="PhoneOTPScreen"  component={ PhoneOTPScreen} />
        <Stack.Screen options={{headerShown: false}} name="EmailOTPScreen"  component={EmailOTPScreen} />
        <Stack.Screen options={{headerShown: false}} name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen options={{headerShown: false}} name="AgeGenderLocationScreen" component={AgeGenderLocationScreen}/>
        <Stack.Screen options={{headerShown: false}} name="GoogleSignInLoading" component={GoogleSignInLoadingScreen}/>
        <Stack.Screen options={{headerShown: false}} name="PersonalInterestScreen" component={PersonalInterests}/>
        <Stack.Screen options={{headerShown: false}} name="ProfilePictureUploadScreen" component={ProfilePictureUpload}/>
        <Stack.Screen options={{headerShown: false}} name="UploadProfPictureScreen" component={UploadProfPicture}/>
        <Stack.Screen options={{headerShown: false}} name="ChangeProfilePictureScreen" component={ChangeProfilePictureScreen}/>
        <Stack.Screen options={{headerShown: false}} name="PhoneNumberScreen" component={PhoneNumberScreen}/>
        <Stack.Screen options={{headerShown: false}} name="TestWorkScreen" component={TestWorkScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F8FB',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom:-690
  },
  squadLogo:{
    width:100,
    height:35,
    marginRight:250,
    marginTop:70  
}


});
