import { StatusBar } from 'expo-status-bar';
import { LogBox } from "react-native";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
//import HomeScreen from './src/screens/HomeScreen';
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
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PollCreation from './src/screens/PollCreationScreen';
import PollRequest from './src/screens/PollRequestScreen';
import Profile from './src/screens/ProfileTopNavigation';
//import NotificationScreen from './src/screens/NotificationScreen';
import BaseNavigationScreen from './src/screens/BaseNavigationScreen';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import MySquadScreen from './src/screens/MySquadScreen';//profile screen
import PersonalPollScreen from './src/screens/PersonalPollScreen';//profile screen
import SquadScreen from './src/screens/SquadScreen';//profile screen
import TrendingPollScreen from './src/screens/TrendingPollScreen';//home page
import MySquadPollScreen from './src/screens/MySquadPollScreen';//home page
import PublicPollSquadScreen from './src/screens/PublicPollSquadScreen'; //homepage screen 
import PasswordResetScreen from './src/screens/PasswordResetScreen';
import TestWorkScreen from './src/screens/TestWorkScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import PollContentScreen from './src/screens/PollContentScreen';
import MediaPreviewScreen from './src/screens/MediaPreviewScreen';
import PersonalClosedPollScreen from './src/screens/PersonalClosedPollScreen';
import PersonalOpenPOlls from './src/screens/PersonalOpenPOlls';
import PollResponse from './src/screens/PollResponse';
import SwayingScreen from './src/screens/SwayingScreen';
import HomeScreen from './src/screens/HomeTopNavigation';
import NotificationScreen from './src/screens/NotificationTopNavigation';
  
//this is the create stack navigator method: src from the navigation docs on the internet
const Stack = createNativeStackNavigator();
LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const Tab = createBottomTabNavigator();
function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Poll Creation" component={PollCreation} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}



 



//const HomeTopTabNavigator = createAppContainer(TopHomeTabNavigator)
//const ProfileTopTabNavigator = createAppContainer(TopProflileTabNavigator)
//function HomeScreenTopTabNavigator(){return(<HomeTopTabNavigator><HomeScreen/></HomeTopTabNavigator>) }
//function ProfileScreenTopTabNavigator(){return(<ProfileTopTabNavigator><Profile/></ProfileTopTabNavigator>)}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      {/*<Stack.Screen name="Home"component={HomeScreen}options={{ title: 'Welcome' }}/>*/}
        <Stack.Screen options={{headerShown : false}}   name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RootNavigation" options={{headerShown: false}} component={BottomTabs} /> 
       {/**<Stack.Screen name= "HomeScreenTopNavigator"    options={{headerShown:false}} component={HomeScreenTopNavigator}/>
        <Stack.Screen  name = "ProfileScreenTopTabNavigator" options={{headerShow:false}} component={ProfileScreenTopTabNavigator}/> */}
        <Stack.Screen options={{headerShown: false}} name="SignupScreen"  component={SignupScreen} />
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
    justifyContent: 'center',
  },
});
