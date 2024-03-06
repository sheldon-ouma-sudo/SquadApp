import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { createSquadUser, updateUser } from '../../graphql/mutations';
import {user} from '../../../UserContext'
import { API, graphqlOperation } from 'aws-amplify';
//import { createSquadUser } from '../../graphql/mutations';

    const UserListItem = ({
      user,
      userInfo,
      onPress = () => {},
      selectable = false,
      isSelected = false,
    }) => {
      const navigation = useNavigation();
      const [selected, setSelected] = useState(false);
      const[localUserInfo, currentUserInfo] = useState()
     const [localUserSquadCreatedArray, setLocalUserSquadCreatedArray] = useState([])
     const [cureentUserSquadCreatedArray, setCurrentUserSquadCreatedArray] = useState([])
//console.log("this is the squad we want to add users to", userInfo.userSquadId);
//find the currently logged in user's array of squad they have created
      // useEffect(() => {
      //   const fetchLocalUserSquadArray = async () => {
      //     if (userInfo) {
      //       //console.log("we have userInfo data",userInfo.userSquadId);
      //       setUserSquadsArray(userInfo.userSquadId)
      //       //setSquadToBeJoined(userInfo.userSquadId); // Access userSquadId directly
      //     }
      //     }
      //     fetchLocalUserSquadArray()
      // }, [userInfo]);

      // useEffect(() => {
      //   const fetchLocalUserSquadCreatedId = async () => {
      //     //check if item users i.e displayed on a flatlist is in one of the local user's Squads/squad created by the local user
      //     if(user.squadJoined.includes(userSquadsArray)){ 
      //       console.log("the user from the backend is in the primary user's squad")
      //     //if not
      //     }else{
      //       //for now we are going to assume the local user wants to add the users in their primary squad
      //       const squad_to_join = userSquadsArray[0]
      //       //now we add the squad id that the user in the list has been added to
      //       user.squadJoined.push(squad_to_join);
      //       setSquadToBeJoined(squad_to_join); 
      //     }
      //     }
      //     fetchLocalUserSquadCreatedId()
      // }, []);

//fetch local user info.


      const handleSquadCreation = async () => {
      //   console.log("here is the squad we want to add users", squadToJoin);
      //   console.log("here is the user in flatlist id", user.id);
      //   console.log("here is the local user", userInfo)
      //   console.log("here is the squads the user has joined", user.squadJoined)
      //   //console.log("here is the user's squad array", userSquadsArray)
      //   if (selected === false) {
      //     setSelected(true);
        
      //     try {
      //       const newSquadUser = await API.graphql(graphqlOperation(createSquadUser, {
      //         input: { squadId: squadToJoin, userId: user.id }
      //       }));
        
      //         user.squadJoined.push(squadToJoin)
      //         const response = await API.graphql(graphqlOperation(updateUser, {input:{userId: user.id}}))
      //         console.log("here is the response from the backend on creation", response)
      //       if (!newSquadUser.data?.createSquadUser) {
      //       //console.log("Error getting the user Squad data");
      //       } else {
      //         //console.log("User added to the squad:", newSquadUser.data.createSquadUser);
      //       }
      //       //update the local user and the backend
      //     } catch (error) {
      //       console.log("Error creating the squad user", error);
      //     }
      //   }
      // else{
      // setSelected(false);
      // //delete user from the squad
      }
        
        
      
      
      
      return (
        <Pressable
        style={styles.container}
        behavior="padding"
        onPress={onPress}
        >
        <View
          style={styles.userImageContainer}
          >
          <Image
          //source={{uri: user.image}}
          source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
          resizeMode='contain'
          style={styles.userImage}
          />
        </View>
        <View style={{flexDirection:"row", marginTop:20, marginLeft:5 }}>
          <View
          style = {[styles.pollCaptionContainer, {justifyContent:'flex-start'}]}
          >
              <Text
                style = {styles.userName}
              > 
              {user.name}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                !selected ? styles.addedUserIcon : styles.unAddedUserIcon,
                {
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                },
              ]}
              onPress={handleSquadCreation}
              >
              {!selected ? (
              <AntDesign name="addusergroup" size={23} color="white" style={{ marginBottom: 5 }} />
                
              ) : (
                <SimpleLineIcons name="user-following" size={20} color="#1145FD" style={{ marginBottom: 6 }} />
              )}
          </TouchableOpacity>
            </View>
        </Pressable>
      )
      }
    
      
      const styles = StyleSheet.create({
      container:{
        flex:1,
        flexDirection: "row",
        marginHorizontal: 10,
        marginTop: 20,
        //marginVertical: 65,
        borderColor: "#FFFF",
        //height: 100,
        borderRadius: 15,
        backgroundColor: "white",
        borderWidth: 5,
        marginRight:30
      
    },
      
      
      pollCaptionContainer:{
        height: 50,
        width: 180,
      },
      addedUserIcon: {
        height: 40,
        width: 95,
        backgroundColor: "#1145FD",
        borderRadius: 10,
        borderColor: "#FFFF",
        borderWidth: 2.5,
        marginLeft: 25,
      },
      
      unAddedUserIcon: {
        height: 40,
        width: 95,
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "#1145FD",
        borderWidth: 2.5,
        marginLeft: 25,
      },
      votedText:{
        color: "white",
        fontWeight: "bold",
        marginBottom:7,
        marginLeft:1,
        fontSize: 8.5,
        textAlignVertical:'center'
      }, 
      userImageContainer:{
        marginStart:10,
        //marginTop:20
      },
      userImage:{
          width:50,
          height:70
      },
      userName:{
      fontWeight:'500',
      marginLeft:5
      },
      userJoinPeriod:{
      marginTop: 5,
      marginLeft: 5,
      color: '#545454',
      }
      },
      )
    export default UserListItem