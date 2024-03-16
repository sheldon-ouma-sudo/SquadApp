import { View, Text, KeyboardAvoidingView, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { notificationsByUserID } from '../graphql/queries'
import {listPolls} from "../graphql/queries"
import { API, graphqlOperation } from "aws-amplify";
import Poll from "../components/PollListItem";
import RequestToBeAddedInSquadComponent from '../components/RequestsToJoinUserSquadListItem'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import {useUserContext, user} from '../../UserContext'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import RequestToBeAddedToSquadScreen from './RequestToBeAddedScreen'
import RequestToJoinSquads from './RequestToJoinSquadScreen'
import { ScrollView } from 'react-native-gesture-handler'



const SquadActivityScreen = () => {
  const[requestToJoinUserSquadsData,setRequestToJoinUserSquadData] = useState([])
  const[requestToBeAddedToSquadsData, setRequestToBeAddedToSquadsData] = useState([])
  const {user} = useUserContext()

  const Tab = createMaterialTopTabNavigator();








  //console.log(user)
  // useEffect(() => {
  //   const fetchRequestToAddUserToSquads = async () => {
  //         //console.log(user)
  //         //console.log("here is the user id", user.id)
  //         const userID = user.id
  //     try {
  //       const notificationQueryResult = await API.graphql(
  //         graphqlOperation(notificationsByUserID, { userID: userID })
  //       );
  //       if(!notificationQueryResult.data?.notificationsByUserID){
  //         console.log("Error fetching users") 
  //       }
  //       console.log("this is the notification for the user",notificationQueryResult.data?.notificationsByUserID.items)
  //         const notificationData = notificationQueryResult.data?.notificationsByUserID.items
  //         const squadAddRequestsArray = notificationData[0].squadAddRequestsArray;
  //         console.log("here is the squadAddRequestArray",squadAddRequestsArray)
  //         setRequestToBeAddedToSquadsData(squadAddRequestsArray)
  //     } catch (error) {
  //       console.log("error fetching the notifications",error)
  //     }
  //    };
  //    fetchRequestToAddUserToSquads();
  // }, []);
 




  // useEffect(() => {
  //   const fetchToJoinUserSquads = async () => {
  //     const userID = user.id
  //     try {
  //       const notificationQueryResult = await API.graphql(
  //         graphqlOperation(notificationsByUserID, { userID: userID })
  //       );
  //       if(!notificationQueryResult.data?.notificationsByUserID){
  //         console.log("Error fetching users") 
  //       }
  //       console.log("this is the notification for the user",notificationQueryResult.data?.notificationsByUserID.items)
  //         const notificationData = notificationQueryResult.data?.notificationsByUserID.items
  //         const userRequestToJoinSquads = notificationData[0].SquadJoinRequestArray;
  //         console.log("here is the userRequestToJoinSquads",userRequestToJoinSquads)
  //         setRequestToJoinUserSquadData(userRequestToJoinSquads)
  //     } catch (error) {
  //       console.log("error fetching the notifications",error)
  //     }
  //    };
  //    fetchToJoinUserSquads  ();
  // }, []);
 

  return (
    <KeyboardAvoidingView 
    style={styles.container}
    behavior="padding"
    >
    {/* <View style={styles.pollRequestContainer}>
    <Text
     style={{fontWeight:'bold', fontSize:12, marginRight:200}}
    >Requests To To Be Added To New Squads</Text>
    
     <FlatList
        data={requestToJoinUserSquadsData}
        renderItem={({ item }) => (
          <RequestToBeAddedInSquadComponent requestToBeAddedInSquads={item} />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={{ flexGrow: 1 }}
      />
     
  </View>
  <View
  style={styles.pollResponseContainer}
  >
    <Text
     style={{fontWeight:'bold',
     fontSize:18,
     marginRight:200
     }}>
      Requests to Join Your Squad</Text>
      <FlatList
        data={requestToJoinUserSquadsData}
        renderItem={({ item }) => (
          <RequestToBeAddedInSquadComponent requestToBeAddedInSquads={item} />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={{ flexGrow: 1 }}
      />
  </View> */}

<Tab.Navigator
      style={[{ marginTop: -4 }, { marginEnd: 5 }, { marginStart: 5 }, { backgroundColor: "#F4F8FB" }, {borderRadius:9}]}   
      screenOptions={{
        tabBarLabelStyle: { color: '#1145FD', fontWeight:'600' },
        //tabBarItemStyle: { width: 100 },
        tabBarStyle: { backgroundColor: "#F4F8FB" },
      }}
    >
        <Tab.Screen 
        name="Request to Add you to Squads" 
        //component={TrendingPollScreen} 
        />
        <Tab.Screen 
        name="Request To Join Your Squads" 
        //component={MySquadPollScreen} 
        />
      </Tab.Navigator>





    </KeyboardAvoidingView>
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
  pollRequestContainer:{},
  pollResponseContainer:{
  }
})
export default SquadActivityScreen