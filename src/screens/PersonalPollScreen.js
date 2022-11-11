import { View, Text, KeyboardAvoidingView, StyleSheet, Image } from 'react-native'
import React from 'react'
import PersonalClosedPollScreen from './PersonalClosedPollScreen'
import PersonalOpenPOlls from './PersonalOpenPOlls'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

  

const PersonalPollScreen = () => {
  const Tab = createMaterialTopTabNavigator();
  const insets = useSafeAreaInsets();
  return (
    <><KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
    
    </KeyboardAvoidingView><Tab.Navigator
      style={[{ marginTop: 30 }, { marginEnd: 25 }, { marginStart: 25 }, { backgroundColor: "#F4F8FB" }, { borderRadius: 9 }]}
      screenOptions={{
        tabBarLabelStyle: { color: '#ffff', fontWeight: '600' },
        //tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: '#1145FD' },
        //color={tabInfo.focused ? '#1145FD' : "#8e8e93"}
      }}
    >
        <Tab.Screen
          name="Closed Polls"
          component={PersonalClosedPollScreen} />
        <Tab.Screen
          name="Live Polls"
          component={PersonalOpenPOlls} />
      </Tab.Navigator></>
  )
  
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
})


export default PersonalPollScreen