  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, View } from 'react-native';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import LoginScreen from './src/screens/LoginScreen';
  import HomeScreen from './src/screens/HomeScreen';
  import SignupScreen from './src/screens/SignupScreen';
  import SquadCreationScreen from './src/screens/SquadCreationScreen';
  import PhoneOTPScreen from './src/screens/PhoneOTPScreen';

  //this is the create stack navigator method: src from the navigation docs on the internet
  const Stack = createNativeStackNavigator();




  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
        {/*<Stack.Screen name="Home"component={HomeScreen}options={{ title: 'Welcome' }}/>*/}
          <Stack.Screen options={{headerShown : false}}   name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen options={{headerShown: false}} name="SignupScreen"  component={SignupScreen} />
          <Stack.Screen options={{headerShown: false}} name="SquadCreationScreen"  component={SquadCreationScreen} />
          <Stack.Screen options={{headerShown: false}} name="PhoneOTPScreen"  component={ PhoneOTPScreen} />
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
