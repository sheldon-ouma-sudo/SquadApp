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
      const[localUserInfo, setLocalUserInfo] = useState()
      const [localUserSquadCreatedArray, setLocalUserSquadCreatedArray] = useState([])
      const[localUserSquadJoinedArray, setLocalUserSquadJoinedArray] = useState([])
      const[currentUserInfo, setCurrentUserInfo] = useState()
      const [currentUserSquadCreatedArray, setCurrentUserSquadCreatedArray] = useState([])
      const [currentUserSquadJoinedArray, setCurrentUserSquadJoinedArray] = useState([])

//fetch local user info data
              useEffect(() => {
                const fetchLocalUserData = async () =>{
                   if(userInfo){
                    //set local user info 
                   setLocalUserInfo(userInfo)
                   //get the local user info created squad array 
                   setLocalUserSquadCreatedArray(userInfo.userSquadId)
                   //get the local user squads joined array 
                  setLocalUserSquadJoinedArray(userInfo.squadJoined)
                 }else{
                  console.log("there is an error getting the user info")
                 }

                }    
                fetchLocalUserData()
              }, []);
              useEffect(() => {
                const fetchCurrentUserData = async () =>{
                   if(user){
                    //set local user info 
                   setCurrentUserInfo(user)
                   //get the local user info created squad array 
                   setCurrentUserSquadCreatedArray(user.userSquadId)
                   //get the local user squads joined array 
                   setCurrentUserSquadJoinedArray(user.squadJoined)
                 }else{
                  console.log("there is an error getting the user info")
                 }

                }    
                fetchCurrentUserData()
              }, []);


      const handleSquadCreation = async () => {
        console.log("here is the local user info", localUserInfo);
        console.log("here is the current user info", currentUserInfo);
        console.log("here is the array of the squads created by the local user", localUserSquadCreatedArray)
        console.log("here is the  array of squads created  by the current user", currentUserSquadCreatedArray)
        console.log("here is the  array of Squads joined by local  user", localUserSquadJoinedArray)
        console.log("here is the array of squads joined by the current user", currentUserSquadJoinedArray)
      
        if (selected === false) {
          setSelected(true);
        }
           try {
            const results = await API.graphql(graphqlOperation(createSquadUser, {
              input: { squadId: squadToJoin, userId: user.id }
            }));
            console.log("here is the squad user created",results)
          }catch(error){
            console.log("error creating a squadUser")
          }
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