import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SquadJoined from './SquadJoinedScreen'
import SquadCreated from './SquadCreatedScreen'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const SwayingScreen = () => {
  return (
    <><KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
    </KeyboardAvoidingView>
    <Tab.Navigator
      style={[{ marginTop: 220 }, { marginEnd: 15 }, { marginStart: 15 }, { backgroundColor: "#F4F8FB" }, { borderRadius: 9 }]}
      screenOptions={{
        tabBarLabelStyle: { color: '#ffff', fontWeight: '600' },
        //tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: '#1145FD' },
        //color={tabInfo.focused ? '#1145FD' : "#8e8e93"}
      }}
    >
        <Tab.Screen
          name="Created"
          component={SquadCreated} />
          <Tab.Screen
          name="Joined"
          component={SquadJoined} />
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

export default SwayingScreen