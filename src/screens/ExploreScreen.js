import { View, Text, StyleSheet,FlatList, KeyboardAvoidingView, Image } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExploreUserScreen from "./ExploreUserScreen";
import ExploreSquadronScreen from "./ExploreSquadronScreen";
import ExplorePollScreen from "./ExplorePollScreen";
import { SearchBar } from 'react-native-elements';
import React, { useState, useEffect } from 'react';

const ExploreScreen = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const Tab = createMaterialTopTabNavigator();

 
  return(

    <><Tab.Navigator
      style={[{ marginTop: -4 }, { marginEnd: 5 }, { marginStart: 5 }, { backgroundColor: "#F4F8FB" }, { borderRadius: 9 }]}
      screenOptions={{
        tabBarLabelStyle: { color: '#1145FD', fontWeight: '600' },
        //tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: "#F4F8FB" },
      }}
    >
        <Tab.Screen
          name="Polls"
          component={ExplorePollScreen} />
        <Tab.Screen
          name="Squads"
          component={ExploreSquadronScreen} />
        <Tab.Screen
          name="Find Users"
          component={ExploreUserScreen} />
      </Tab.Navigator></>
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
itemStyle: {
  padding: 10,
},
})
