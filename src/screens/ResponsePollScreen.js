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



const ResponsePollScreen = () => {
     const [poll, setPoll] = useState([])
     const [pollItems, setPollItems] = useState([]);
     const [numOfPollLikes, setNumOfPollLikes] = useState(0)
     const [totalNumOfVotes, setTotalNumOfVotes] = useState(0)
     const [numOfPollComments, setNumOfPollComment] = useState(0)

     const navigation = useNavigation()

      const route = useRoute()
       const pollReception = route?.params.poll
       console.log("here is the poll ID", pollReception)
    //     // console.log("here is the poll id", pollID)
        useEffect(() => {
          const fetchPoll = async () => {
            if (pollReception) {
              console.log("here is the poll received", pollReception)
              setPoll(pollReception)
            } else {
              console.log("Poll ID is null or undefined", pollReception);
            }
          };
        
          fetchPoll();
        }, [pollReception]); // Make sure to include pollID in the dependencies array
          
          
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
          
          
            </View>

            </LinearGradient>

          </KeyboardAvoidingView>
          )
        }



        const styles = StyleSheet.create({
          gradientContainer: {
            //borderWidth: 2,
            borderRadius: 29,
            marginVertical:30,
            // marginHorizontal:10, 
            // marginEnd:10, 
        
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
          marginBottom: 25,
          marginTop: 75,
          marginLeft:45
          
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
      
        })


 export default ResponsePollScreen