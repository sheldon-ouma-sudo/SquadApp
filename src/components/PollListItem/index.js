
    import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
    StatusBar,Dimensions,SafeAreaView,SectionList,FlatList, Pressable, Button,TextInput} from 'react-native'
    import React, { useEffect, useState } from 'react'
    import { useNavigation } from '@react-navigation/native';
    import {Auth, API, graphqlOperation} from "aws-amplify";
    //import {getPoll} from '../graphql/queries';



    const PollListItem =({  poll,
      onPress = () => {},
      selectable = false,
      isSelected = false,})=>{
        const [numOfVotes, setNumOfVotes] = useState("32")
        const [userImage, setUserImage] = useState('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')//remember to use uri instead of the require when quering from the backend
        const [pollCaption, setPollCaption] = useState("dining hall with best food today")
        const [pollCreator, setPollCreator] = useState("Drake")
        
        const navigation = useNavigation()
        //fetch for the user's info from the poll being queried
            //get poll id 
            // useEffect(()=>{
            // const fetchUser = async() =>{
            //     //fetch for the poll id -- not sure this is the right way of doing things
            //     const pollQueryRes = API.graphql(graphqlOperation(getPoll, {id: pollId}))
            //      //console log the response
            //     //const numOfPollVotes = pollQueryRes.
            //     //fetch user from the poll
            //     const user = pollQueryRes.userID;
            //     const userProfilePic = user.imageUrl;
            //     //update  the photos and the name of the user to be
            //     //console.log(user, userProfile Pic) 
            //     setUserImage(userProfilePic)
            //     const userName = user.name;
            //     setPollCreator(userName)
            // }
            //  fetchUser();
            // }, [])
            //to do that first get the userID from the poll being queried
            //then from the user's id let's try and find the user's info 
            //

        return (
          <Pressable
          style={styles.container}
          behavior="padding"
          >
         <View
          style={styles.userImageContainer}
         >
         <Image
         //source={{uri: userImage}}
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
               style = {styles.pollCaption}
              >
                {poll.pollCaption}
                {/* {pollCaption} */}
              </Text>
              <Text
              style = {styles.pollCreator}
              >
                Created by {pollCreator}
              </Text>
            </View>
            <View
              style = {[styles.numOfVotesContainer, {justifyContent:'flex-end'},{alignItems:'center'},]}
              > 
              <Text
                style = {styles.votedText}>
                {poll.totalNumOfVotes} Voted
              </Text>
              </View>
         </View>
          </Pressable>
        )
        }
      
        
        const styles = StyleSheet.create({
        container:{
        flex:1,
        flexDirection: "row",
        marginHorizontal: 10,
        marginTop: 10,
        marginVertical: 105,
        borderColor: "#C2B960",
        height: 600,
        //width:400,
        marginLeft:10,
        borderRadius: 29,
        backgroundColor: "#D8E8F3",
        borderWidth: 5
//         flex:1,
//  flexDirection: "row",
//  marginHorizontal: 10,
//  marginTop: 20,
//  //marginVertical: 65,
//  borderColor: "#FFFF",
//  //height: 100,
//  borderRadius: 15,
//  backgroundColor: "white",
//  borderWidth: 5,
//  marginRight:30


        },
        pollCaptionContainer:{
          height: 50,
          width: 180,
        },
        numOfVotesContainer:{
         height:30,
         width: 95,
         backgroundColor: "#1145FD",
         borderRadius: 40,
         borderColor: "#C2B960",
         borderWidth: 2.5,
         marginLeft:5,
         
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
         marginTop:10
        },
        userImage:{
            width:50,
            height:70
        },
       pollCaption:{
        fontWeight:'500',
        marginLeft:5
       },
       pollCreator:{
        marginTop: 5,
        marginLeft: 5,
        color: '#545454'
       }
        },
        )
    export default PollListItem;
