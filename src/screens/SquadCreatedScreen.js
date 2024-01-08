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
import {useUserContext} from '../../UserContext';


  

const SquadCreatedScreen = () => {
const [squads, setSquads] = useState([])
const[userInfo, setUserInfo] = useState("")
const {user} = useUserContext();

  return (
    <View>
      <Text>SquadCreatedScreen</Text>
    </View>
  )
}

export default SquadCreatedScreen