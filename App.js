      import { StatusBar } from 'expo-status-bar';
      import { LogBox } from "react-native";
      import { StyleSheet, Text, View } from 'react-native';
      import { NavigationContainer } from '@react-navigation/native';
      import { createNativeStackNavigator } from '@react-navigation/native-stack';
      import LoginScreen from './src/screens/LoginScreen';
      import HomeScreen from './src/screens/HomeScreen';
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
      import { createBottomTabNavigator } from "react-navigation-tabs";
      import PollCreation from './src/screens/PollCreationScreen';
      import PollRequest from './src/screens/PollRequestScreen';
      import Profile from './src/screens/ProfileScreen';
      import NotificationScreen from './src/screens/NotificationScreen';
      import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
      import MySquadScreen from './src/screens/MySquadScreen';//profile screen
      import PersonalPollScreen from './src/screens/PersonalPollScreen';//profile screen
      import SquadScreen from './src/screens/SquadScreen';//profile screen
      import TrendingPollScreen from './src/screens/TrendingPollScreen';//home page
      import MySquadPollScreen from './src/screens/MySquadPollScreen';//home page
      import PublicPollSquadScreen from './src/screens/PublicPollSquadScreen'; //homepage screen 
      import PasswordResetScreen from './src/screens/PasswordResetScreen';

        
      //this is the create stack navigator method: src from the navigation docs on the internet
      const Stack = createNativeStackNavigator();
      LogBox.ignoreLogs(["EventEmitter.removeListener"]);
      const TopHomeTabNavigator = createMaterialTopTabNavigator({
        TrendingScreen: {
          screen: TrendingPollScreen, 
          navigationOptions: {
          // tabBarLabel: "Home",
            tabBarOptions: {
              activeTintColor: '#1145FD',
              title: 'Trending'
            },
            
          },
        },
        PublicPollScreen: {
          screen: PublicPollSquadScreen,
          navigationOptions: {
            tabBarLabel: "Public Polls",
            tabBarOptions: {
              activeTintColor: '#1145FD',
            },
          },
        },
        SquadPollScreen: {
          screen: MySquadPollScreen,
          navigationOptions: {
            tabBarLabel: "Squad Polls",
            tabBarOptions: {
              activeTintColor: '#1145FD',
            },
            
          },
        },          
      })



      const TopProflileTabNavigator = createMaterialTopTabNavigator({
        MySquadScreen: {
          screen: MySquadScreen, 
          navigationOptions: {
            tabBarLabel: "Squad",
            tabBarOptions: {
              activeTintColor: '#1145FD',
            },
            
          },
        },
        Polls: {
          screen: PersonalPollScreen,
          navigationOptions: {
            tabBarLabel: "Polls",
            tabBarOptions: {
              activeTintColor: '#1145FD',
            },
            
          },
        },
        Squad: {
          screen: SquadScreen,
          navigationOptions: {
            tabBarLabel: "Squads",
            tabBarOptions: {
              activeTintColor: '#1145FD',
            },
            
          },
        },
      
      })




      const TabNavigator = createBottomTabNavigator({
        Home: {
            screen: HomeScreen, 
            navigationOptions: {
              tabBarLabel: "Home",
              tabBarOptions: {
                activeTintColor: '#1145FD',
              },
              tabBarIcon: (tabInfo) => {
                return (
                  <Ionicons
                    name="home"
                    size={24}
                    color={tabInfo.focused ?'#1145FD': "#8e8e93"}
                  />
                );
              },
            },
          },
      PollRequest: {
        screen: PollRequest,
        navigationOptions: {
          tabBarLabel: "Poll Request",
          tabBarOptions: {
            activeTintColor: '#1145FD',
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="globe"
                size={24}
                color={tabInfo.focused ? '#1145FD' : "#8e8e93"}
              />
            );
          },
        },
      },
      PollCreation: {
        screen: PollCreation,
        navigationOptions: {
          tabBarLabel: "",
          tabBarOptions: {
            activeTintColor: '#1145FD',
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="duplicate"
                size={24}
                color={tabInfo.focused ? '#1145FD' : "#8e8e93"}
              />
            );
          },
        },
      },
      Notification: {
        screen: NotificationScreen,
        navigationOptions: {
          tabBarLabel: "Notifications",
          tabBarOptions: {
            activeTintColor: '#1145FD',
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="notifications"
                size={24}
                color={tabInfo.focused ? '#1145FD' : "#8e8e93"}
              />
            );
          },
        },
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          tabBarLabel: "Profile",
          tabBarOptions: {
            activeTintColor: '#1145FD',
          },
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="person-circle"
                size={24}
                color={tabInfo.focused ? '#1145FD' : "#8e8e93"}
              />
            );
          },
        },
      },
    });
      
  const Navigator = createAppContainer(TabNavigator);
  function HomeScreenBottonNavigator (){
    return(
      <Navigator>
        <HomeScreen />
      </Navigator>


    )
  }
  const HomeTopTabNavigator = createAppContainer(TopHomeTabNavigator)
  const ProfileTopTabNavigator = createAppContainer(TopProflileTabNavigator)
  function HomeScreenTopTabNavigator(){
        <HomeTopTabNavigator>
            <HomeScreen/>
        </HomeTopTabNavigator>
  }
  function ProfileScreenTopTabNavigator(){
  <ProfileTopTabNavigator>
    <Profile/>
  </ProfileTopTabNavigator>
  }
      export default function App() {
        return (
          <NavigationContainer>
            <Stack.Navigator>
            {/*<Stack.Screen name="Home"component={HomeScreen}options={{ title: 'Welcome' }}/>*/}
              <Stack.Screen options={{headerShown : false}}   name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="HomeScreenBottomNavigator" options={{headerShown: false}} component={HomeScreenBottonNavigator} />
              <Stack.Screen name= "HomeScreenTopNavigator"    options={{headerShown:false}} component={HomeScreenTopTabNavigator}/>
              <Stack.Screen  name = "ProfileScreenTopTabNavigator" options={{headerShow:false}} component={ProfileScreenTopTabNavigator}/>
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
