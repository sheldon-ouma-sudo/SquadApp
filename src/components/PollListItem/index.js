
    import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
    StatusBar,Dimensions,SafeAreaView,SectionList,FlatList, Pressable, Button,TextInput} from 'react-native'
    import React, { useEffect, useState } from 'react'
    import { useNavigation } from '@react-navigation/native';
    import {Auth, API, graphqlOperation} from "aws-amplify";
    import {getPoll} from '../graphql/queries';



    const PollListItem =() => {
        const [numOfVotes, setNumOfVotes] = useState("32")
        const [userImage, setUserImage] = useState('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')
        const [pollCaption, setPollCaption] = useState("dining hall with best food today")
        const [pollCreator, setPollCreator] = useState("Drake")
        
        const navigation = useNavigation()
        //fetch for the user's info from the poll being queried
            //get poll id 
            useEffect(()=>{
            const fetchUser = async() =>{
                //fetch for the poll id -- not sure this is the right way of doing things
                const pollQueryRes = API.graphql(graphqlOperation(getPoll, {id: pollId}))
                 //console log the response
            //fetch user from the poll
            const user = pollQueryRes.userID;
            const userProfilePic = user.imageUrl;
            //update  the photos and the name of the user to be
            //console.log(user, userProfile Pic) 
            setUserImage(userProfilePic)
            const userName = user.name;
            setPollCreator(userName)

            }
           

             fetchUser();
            }, [])
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
           
           <View>
              <Text
              style = {styles.pollCaption}
              >{pollCaption}</Text>
              <Text
              style = {styles.pollCreator}
              >
                Created by {pollCreator}
              </Text>
            </View>
          
           <View
           style = {styles.votedTextContainer}
           > 
           <Text
            style = {styles.votedText}>
            {numOfVotes} Voted
           </Text>
           </View>
          
            </Pressable>
          )
          }
        
          
          const styles = StyleSheet.create({
          container:{
          flex:1,
          flexDirection: "row",
          marginHorizontal: 10,
          marginTop: 80,
          marginVertical: 85,
          borderColor: "#C2B960",
          height: 100,
          borderRadius: 15,
          backgroundColor: "white",
          borderWidth: 5
        
        
          },
          votedTextContainer:{
           //marginTop:0,
           flex:1,
           marginStart: 50,
           marginEnd: 10,
           height: 25,
           width: 50,
           backgroundColor: "#1145FD",
           alignItems: 'center',
           borderRadius: 40,
           borderColor: "#C2B960",
           //marginRight: 20,
           borderWidth: 2.5,
           marginTop:60,
           //marginLeft:-105
          },
          votedText:{
            color: "white",
            fontWeight: "bold",
            marginTop: 6,
            //marginLeft:1,
            fontSize: 7
            
        
          }, 
          userImageContainer:{
           marginStart:10,
           marginTop:45
          },
          userImage:{
              width:50,
              height:50,
              borderRadius: 25,

          },
         pollCaption:{
          marginTop:45,
          fontWeight:'500',
          fontSize:10,
          marginLeft:5
         },
         pollCreator:{
          marginTop: 15,
          marginLeft: 5,
          fontSize: 9,
          color: '#545454'
         }
          },
          )



    

    export default PollListItem;
