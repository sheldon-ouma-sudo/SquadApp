import { View, Text, StyleSheet, KeyboardAvoidingView, Image } from 'react-native'
import React from 'react'
import ExploreUserScreen from "./ExploreUserScreen";
import ExploreSquadronScreen from "./ExploreSquadronScreen";
import ExplorePollScreen from "./ExplorePollScreen";

const ExploreScreen = () => {
  const Tab = createMaterialTopTabNavigator();
  return(
  <Tab.Navigator
  style={[{ marginTop: -4 }, { marginEnd: 5 }, { marginStart: 5 }, { backgroundColor: "#F4F8FB" }, {borderRadius:9}]}   
  screenOptions={{
    tabBarLabelStyle: { color: '#1145FD', fontWeight:'600' },
    //tabBarItemStyle: { width: 100 },
    tabBarStyle: { backgroundColor: "#F4F8FB" },
  }}
>
    <Tab.Screen 
    name="Explore Polls" 
    component={ExplorePollScreen} />
    <Tab.Screen 
    name="Explore Squads" 
    component={ExploreSquadronScreen} />
    <Tab.Screen 
    name="Explore Squads" 
    component={ExploreUserScreen} />
  </Tab.Navigator>
  )
}

export default ExploreScreen 

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
},
})
