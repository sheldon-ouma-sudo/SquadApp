import { View, Text, 
    StyleSheet,FlatList, 
    SafeAreaView, KeyboardAvoidingView, 
    ActivityIndicator,
    Image } from 'react-native'
  import React, { useState, useEffect } from 'react';
  import SearchBar from "../components/SearchBar"
  import List from "../components/SearchList"
  import SquadJoinedListItem from '../components/SquadJoinedListItem'
  import { API, graphqlOperation, Auth } from "aws-amplify";
  import { listSquads } from '../graphql/queries';
  import { useRoute } from '@react-navigation/native';

const GeneralUserProfileSquadJoinedTab = ({squadJoined}) => {
  
      return (
        <SafeAreaView
        style={styles.container}>
        <View style={styles.searchBarContainer}>
           <FlatList
           data = {squadJoined}
           renderItem={({item})=>(
            <SquadJoinedListItem
             squad={item}
            //  userInfo={userInfo}
            />
           )} />
        </View>
        </SafeAreaView>
      )
    }
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
    searchBarContainer:{
    marginTop:10,
    marginLeft: 30,
    width: 420
    },
    searchBar:{
      backgroundColor: 'white'
    },
    itemStyle: {
      padding: 10,
    },
    })

export default GeneralUserProfileSquadJoinedTab