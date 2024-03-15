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
import MapMarkerSCreen from "./src/screens/MapMarkerSCreen";
import CalendarScreen from "./src/screens/CalendarScreen";
import { Amplify, Auth, Hub } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import {Storage, API,graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from "react";
import {getUser} from './src/graphql/queries'
import {createUser} from './src/graphql/mutations'
import AccountSettingScreen from "./src/screens/AccountSettingScreen";
import ChangePasswordScreen from "./src/screens/ChangePasswordScreen";
import DeleteProfileScreen from "./src/screens/DeleteProfileScreen";
import DeleteProfileConfirmationScreen from "./src/screens/DeleteProfileConfirmationScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";
import ExploreUserScreen from "./src/screens/ExploreUserScreen";
import ExploreSquadronScreen from "./src/screens/ExploreSquadronScreen";
import ExplorePollScreen from "./src/screens/ExplorePollScreen";
import WordPollCreationScreen from "./src/screens/WordPollCreationScreen"
import SquadCreatedScreen from "./src/screens/SquadCreatedScreen";
import SquadJoinedScreen from "./src/screens/SquadJoinedScreen";
import PersonalPollDisplayScreen from './src/screens/PersonalPollDisplayScreen'
import { UserProvider } from "./UserContext"

Amplify.configure(awsconfig);
 ///run this once when the app is opened


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
            tabBarLabel: "Create",
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
  const [user, setUser] = useState(null);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authUser = await Auth.currentAuthenticatedUser();
        setUser(authUser);
      } catch (error) {
        console.log("User not authenticated");
      }
    };

    checkAuth();
  }, []);
  
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Main" options={{ headerShown: false }} component={MainScreen}initialParams={{ user }} />
       <Stack.Screen options={{headerShown : false}} name="LoginScreen" component={LoginScreen}/>
       <Stack.Screen options={{headerShown : false}} name="RootNavigation" component={BottomTabs}/>
        <Stack.Screen options={{headerShown : false}} name="NewTestWorkScreen" component={NewTestScreenWork}/>
        <Stack.Screen options={{headerShown: false}} name="SignupScreen"  component={SignupScreen} />
        <Stack.Screen options={{headerShown:false}} name ="PollContentScreen" component={PollContentScreen}/>
        <Stack.Screen options={{headerShown:false}} name="PasswordResetScreen" component={PasswordResetScreen}/> 
        <Stack.Screen options={{headerShown: false}} name="SquadCreationScreen"  component={SquadCreationScreen} />
        <Stack.Screen options={{headerShown: false}} name="PhoneOTPScreen"  component={ PhoneOTPScreen} />
        <Stack.Screen options={{headerShown: false}} name="EmailOTPScreen"  component={EmailOTPScreen} />
        <Stack.Screen options={{headerShown: false}} name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
        <Stack.Screen options={{headerShown: false}} name="AgeGenderLocationScreen" component={AgeGenderLocationScreen}/>
        <Stack.Screen options={{headerShown:false}}  name="CalendarScreen" component={CalendarScreen}/>
        <Stack.Screen options={{headerShown:false}} name="MapMarkerScreen" component={MapMarkerSCreen}/>
        <Stack.Screen options={{headerShown: false}} name="GoogleSignInLoading" component={GoogleSignInLoadingScreen}/>
        <Stack.Screen options={{headerShown: false}} name="PersonalInterestScreen" component={PersonalInterests}/>
        <Stack.Screen options={{headerShown: false}} name="ProfilePictureUploadScreen" component={ProfilePictureUpload}/>
        <Stack.Screen options={{headerShown: false}} name="UploadProfPictureScreen" component={UploadProfPicture}/>
        <Stack.Screen options={{headerShown: false}} name="ChangeProfilePictureScreen" component={ChangeProfilePictureScreen}/>
        <Stack.Screen options={{headerShown: false}} name="PhoneNumberScreen" component={PhoneNumberScreen}/>
        <Stack.Screen options={{headerShown: false}} name="TestWorkScreen" component={TestWorkScreen}/>
        <Stack.Screen options={{headerShown:false}} name = "AccountSettingScreen" component={AccountSettingScreen}/>
        <Stack.Screen options={{headerShown:false,}} name="ChangePasswordScreen" component={ChangePasswordScreen}/>
        <Stack.Screen options= {{headerShown:false}} name="DeleteProfile" component={DeleteProfileScreen}/>
        <Stack.Screen options={{headerShown:false}} name="DeleteProfileConfirmation" component={DeleteProfileConfirmationScreen}/>
        <Stack.Screen options={{headerShown:false}} name="EditProfileScreen" component={EditProfileScreen}/>
        <Stack.Screen options={{headerShown:false}} name="ExplorePollScreen" component={ExplorePollScreen}/>
        <Stack.Screen options={{headerShown:false}} name="ExploreSquadronScreen" component={ExploreSquadronScreen}/>
        <Stack.Screen options={{headerShown:false}} name="ExploreUserScreen" component={ExploreUserScreen}/>
        <Stack.Screen options={{headerShown:false}} name= "WordPollCreationScreen" component={WordPollCreationScreen}/>
        <Stack.Screen options={{headerShown:false}} name = "SquadCreatedScreen" component={SquadCreatedScreen}/>
        <Stack.Screen options={{headerShown:false}} name = "SquadJoinedScreen" component={SquadJoinedScreen}/>
        <Stack.Screen options={{headerShown:false}} name = "PersonalPollDisplayScreen" component={PersonalPollDisplayScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
    
  );
}
const MainScreen = ({ route }) => {
  const { user } = route.params;

  if (user) {
    // User is authenticated, render BottomTabs
    return <BottomTabs />;
  } else {
    // User is not authenticated, render LoginScreen
    return <LoginScreen />;
  }
};

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
    marginTop:40  
}


});
