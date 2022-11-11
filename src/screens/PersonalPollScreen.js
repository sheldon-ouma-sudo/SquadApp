import { View, Text } from 'react-native'
import React from 'react'
import PersonalClosedPollScreen from './PersonalClosedPollScreen'
import PersonalOpenPOlls from './PersonalOpenPOlls'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

  

const PersonalPollScreen = () => {
  const Tab = createMaterialTopTabNavigator();
  const insets = useSafeAreaInsets();
  return (
     <Tab.Navigator
    style={[{ marginTop: 20 }, { marginEnd: 25 }, { marginStart: 25 }, { backgroundColor: "#F4F8FB" }, {borderRadius:9}]}   
      screenOptions={{
        tabBarLabelStyle: { color: '#ffff', fontWeight: '600' },
        //tabBarItemStyle: { width: 100 },
        tabBarStyle: {backgroundColor: '#1145FD' },
        //color={tabInfo.focused ? '#1145FD' : "#8e8e93"}
      }}
    >
        <Tab.Screen
          name="Closed Polls"
          component={PersonalClosedPollScreen} />
          <Tab.Screen
          name="Live Polls"
          component={PersonalOpenPOlls} />
      </Tab.Navigator>
  )
  
}

export default PersonalPollScreen