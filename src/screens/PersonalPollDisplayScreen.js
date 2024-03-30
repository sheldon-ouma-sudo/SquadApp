import { View, Text, StyleSheet, KeyboardAvoidingView, FlatList, StatusBar, Dimensions, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
//import {listPolls} from '../graphql/queries'
import { API, graphqlOperation } from "aws-amplify";
//import Poll from "../components/PersonalPollDisplayItem"
import PollComponent from '../components/PersonalPollDisplayItem/index'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRoute } from '@react-navigation/native';
import { getPoll } from '../graphql/queries';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';



const PersonalPollDisplayScreen = () => {
     const [poll, setPoll] = useState([])
     const [pollItems, setPollItems] = useState([]);
     const [numOfPollLikes, setNumOfPollLikes] = useState(0)
     const [totalNumOfVotes, setTotalNumOfVotes] = useState(0)
     const [numOfPollComments, setNumOfPollComment] = useState(0)

     const navigation = useNavigation()

      const route = useRoute()
       const pollID = route?.params.pollID
       console.log("here is the poll ID", pollID)
    //     // console.log("here is the poll id", pollID)
        useEffect(() => {
          const fetchPoll = async () => {
            if (pollID) {
              try {
                const results = await API.graphql(graphqlOperation(getPoll, { id: pollID }));
                if (!results.data?.getPoll) {
                  console.log("Error fetching poll:", results);
                } else {
                  console.log("Fetched poll:", results.data.getPoll);
                  const queryResults = results.data.getPoll
                  console.log("here is the poll query results", queryResults)
                  setPoll(queryResults)
                }
              } catch (error) {
                console.error("Error fetching poll:", error);
              }
            } else {
              console.log("Poll ID is null or undefined");
            }
          };
        
          fetchPoll();
        }, [pollID]); // Make sure to include pollID in the dependencies array
          
          
        useEffect(()=>{
          const fetchPollInfo=async()=>{
            setNumOfPollLikes(poll.numOfLikes);
            try {
              const parsedPollItems = JSON.parse(poll.pollItems || '[]'); // Parse the string
              console.log("here is the parsed poll Items", parsedPollItems)
              setPollItems(parsedPollItems);
            } catch (error) {
              console.log("error fetching the poll info", error)
            }
          }
          fetchPollInfo()
        }, [poll])
      
      
      
    return (
      
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            <LinearGradient
          colors={['#EE8B94', '#0038FF']} // Adjust the gradient colors as per your preference
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
           >
          <View style={styles.innerContainer}>
          <TouchableOpacity>
          <Text style={styles.question}>{poll.pollCaption}</Text>
          {pollItems.map((item, index)=>(
            <TouchableOpacity
            key={index}
            style={[styles.optionContainer]}
            >
            <Text style={styles.optionText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.pollCommentContainer}
           >
        <FontAwesome
          name="commenting-o"
          size={35}
          color="#black"
          style={styles.pollCommentIcon}
        />
      </TouchableOpacity>
      <View
      style={{marginLeft:5}}
      >
      <Text style={styles.numOfpollComments}>{numOfPollComments}</Text>
      </View>
      <TouchableOpacity
      style={styles.pollLikesContainer}
      >
        <FontAwesome
          name='heart-o'
          size={36}
          color='#black'
          style={styles.pollCommentIcon}
        />
        <Text style={styles.numOfpollLikes}>{numOfPollLikes}</Text>
      </TouchableOpacity>
      </View>
   </LinearGradient>
  </KeyboardAvoidingView>
          )
        }



        const styles = StyleSheet.create({
          gradientContainer: {
            borderRadius: 29,
            marginVertical:30
          },
          container: {
            flex:1,
            padding: 16,
            backgroundColor: "#FFFF",
            marginTop:5,
            //borderWidth: 5,
            borderRadius: 29,
            marginBottom:5,
            marginStart:5,
            marginEnd:5,
             marginTop:200,
            marginBottom: 200,
           //borderColor: '#0038FF'
            //marginVertical:135,
          },
          innerContainer:{
            height: 450,
            padding: 16,
            backgroundColor: "#FFFF",
            marginTop:5,
            //borderWidth: 5,
            borderRadius: 29,
            marginBottom:5,
            marginStart:5,
            marginEnd:5,
          },
          squadLogo:{
              width:100,
              height:35,
              marginRight:250,
              marginTop:70  
        },
        list: {
          padding: 10,
        },
        question: {
          fontSize: 19.5,
          fontWeight: 'bold',
          marginBottom: 15,
          marginTop: 75,
          marginLeft:105
          
        },
        optionContainer: {
          marginBottom: 30,
          padding: 5,
          borderColor: '#ccc',
          borderRadius: 28,
          backgroundColor: '#ffff',
          borderColor: 'black',
          borderWidth: 1.5,
          height: 50,
          width: 350, // Adjust the width as per your requirement
        },
        optionText: {
          fontSize: 19,
          //marginBottom: -3,
          fontWeight:'700',
          marginLeft:135,
          color: "black",
          marginTop:10
        },
        pollCommentContainer:{
          marginTop:20,
         },
         pollCommentIcon:{
          marginLeft:20,
         },
         numOfpollComments:{
           fontSize: 15,
           marginLeft:12,
           marginTop:5,
          // fontWeight:'400'
         },
         pollLikesContainer:{
           marginLeft:280,
           marginTop:-65
         },
         numOfpollLikes:{
           marginLeft:35,
           marginTop:5,
           fontSize:20,
           fontWeight:'700'
         },
         pollCommentContainer: {
           marginTop: 20,
         },
         pollCommentIcon: {
           marginLeft: 20,
         },
         numOfpollComments: {
           fontSize: 19,
           marginLeft: 18,
           marginTop: 5,
           fontWeight: '700',
         },
         modalBackground: {
           flex: 1,
           backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the background color and opacity
         },
         commentItem: {
           padding: 16,
           borderBottomWidth: 1,
           borderBottomColor: '#ccc',
         },
         numOfCommentsText: {
           fontSize: 18,
           fontWeight: '400',
           marginBottom: 20,
           marginLeft: 100,
           marginTop: 20
           //color: '#1764EF', // Adjust the color based on your design
         },
        })


 export default PersonalPollDisplayScreen