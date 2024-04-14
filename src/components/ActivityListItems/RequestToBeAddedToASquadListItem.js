import { Text, Image, StyleSheet, Pressable, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect} from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { updateUser } from "../../graphql/mutations";
import { getSquad } from "../../graphql/queries";
import { graphqlOperation, Auth, API } from 'aws-amplify';
//import { useNavigation } from '@react-navigation/native';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";



dayjs.extend(relativeTime);

const RequestToBeAddedToASquadListItem=({ squad})=>{
  
const navigation = useNavigation()

 

          useEffect(() => {
          //const fetchSquad = async () => {
            // if (userInfo) {
            //   //console.log("we have userInfo data",userInfo.squadJoined);
            //   setUserSquadsJoinedArray(userInfo.squadJoined)
            //    //setSquadToBeJoined(userInfo.userSquadId); // Access userSquadId directly
            //  }
            // try {
            //     //const result = API.graphqlOperation(graphql(getSquad))
            //     const squadData = await API.graphql(graphqlOperation(getSquad, { id: squad }));
            //     console.log("here is the squadData", squadData)
            //     console.log("here is the squad name",squadData.data?.getSquad.squadName)
            //     setSquadJoinedName(squadData.data?.getSquad.squadName)
            // } catch (error) {
            //    console.log("error quering the squad",error) 
            // }
            
            //}
            //fetchSquad()
        }, []);
                  //add the squad selected to the user's joined squad array
                  // const handleSquadSelected=async() =>{
                  //   console.log("here is the squad name",squad)
                  //   console.log("here is the user squadJoined array",userSquadsJoinedArray)
                  //   console.log("here is the user info",userInfo)
                  //   if(squadSelected==false){
                  //     setSquadSelected(true)
                  //     //userSquadsJoinedArray.push(squad.id)
                  //     //update the user backend 
                  //     //try {
                  //      // await API.graphql(graphqlOperation(updateUser, {input:{id: userInfo.id, squadJoined: userSquadsJoinedArray}}));
                  //     //} catch (error) {
                  //      // console.log("error updating the user", error)
                  //     //}
                  //   }else{
                  //     setSquadSelected(false)
                  //   }
                  const handleIgnore = () => {
                    // Handle ignore button press
                    //update the response status locally for the poll request
                    //update the res
                    //Delete it locally from the squad request data by removing it from the pollRequest Data array
                    //update the user notification with the new array
        
                    //Delete the poll request
                };
        
                const handleRespond = () => {
                    // Handle respond button press
                    if(squad){
                      console.log("here is the associated squad")
                      //navigation.navigate("ResponsePollScreen", {poll:poll})
                    }else{
                      console.log("the poll is undefined", poll)
                      Alert.alert("The poll does no longer exists")
                    }
                   
                    
                };
        
        
        
         return (
                <Pressable
                style={styles.container}
                behavior="padding"
                >
                <View
                style={styles.userImageContainer}>
                </View>
                <View style={{flexDirection:"row", marginTop:60, marginLeft:5 }}>
                <View style = {[styles.pollCaptionContainer, {justifyContent:'flex-start'}]}>
                    <Text style = {styles.squadNameText}> 
                      Someone has requested to add you to their Squad!
                    </Text>
                    <Text style = {styles.squadCreator}>
                      Squad request from Squad Creator
                    </Text>
                  </View>
                  <TouchableOpacity 
                  style={{
                    marginTop:-35,
                    marginRight:-10, 
                    backgroundColor:'#1145FD',
                    height:25,
                    borderRadius:6,
                    width:70,
                    marginLeft:105}}
                  onPress={handleRespond}>   
                    <Text style={{color:'#FFFF', marginLeft:10, marginTop:5}}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                  style={{
                    marginRight:-25, 
                    backgroundColor:'#1145FD',
                    height:25,
                    borderRadius:6,
                    width: 70,
                    marginLeft:-55}}
                  onPress={handleIgnore}>
                    <Text
                    style={{color:'#FFFF', marginLeft:15, marginTop:4}}
                    >Ignore</Text>
                  </TouchableOpacity>
                 
                </View>
                </Pressable>
         )
         }
        
         
         const styles = StyleSheet.create({
          container: {
              flex: 1,
              flexDirection: "row",
              marginHorizontal: 10,
              marginTop: 20,
              borderColor: "#9789EE",
              borderRadius: 25,
              backgroundColor: "white",
              borderWidth: 1.5,
              marginRight: 30,
              width: 390
          },
          pollCaptionContainer: {
              height: 50,
              width: 180,
          },
          joinSquadTextContainer: {
              height: 40,
              width: 95,
              backgroundColor: "#1145FD",
              borderRadius: 10,
              borderColor: "#FFFF",
              borderWidth: 2.5,
              marginLeft: 25,
              marginTop: -25
        
          },
          joinedSquadTextContainer: {
              height: 40,
              width: 95,
              backgroundColor: "#FFFF",
              borderRadius: 10,
              borderColor: "#1145FD",
              borderWidth: 2.5,
              marginLeft: 25,
              marginTop: -25
          },
        
          pollCaptionContainer: {
              height: 50,
              width: 180,
          },
          numOfVotesContainer: {
              height: 40,
              width: 95,
              backgroundColor: "#1145FD",
              borderRadius: 10,
              borderColor: "#FFFF",
              borderWidth: 2.5,
              marginLeft: 5,
        
          },
          votedText: {
              color: "white",
              fontWeight: "bold",
              marginBottom: 7,
              marginLeft: 1,
              fontSize: 8.5,
              textAlignVertical: 'center'
          },
          userImageContainer: {
              marginStart: 10,
              marginTop: 50
          },
          userImage: {
              width: 50,
              height: 70
          },
          squadNameText: {
              fontWeight: '500',
              marginLeft: 5,
              marginTop: -40
          },
          squadCreator: {
              marginTop: 15,
              marginLeft: 5,
              color: '#545454',
              fontSize: 10
          }
        });        
export default RequestToBeAddedToASquadListItem