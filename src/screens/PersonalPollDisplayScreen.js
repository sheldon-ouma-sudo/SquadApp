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


const PersonalPollDisplayScreen = () => {
    // const [poll, setPoll] = useState([])

    // const navigation = useNavigation()

    //     const route = useRoute()
    //     const pollID = route?.params.pollID
    //     console.log("here is the poll ID", pollID)
    //     // console.log("here is the poll id", pollID)
    //     useEffect(() => {
    //       const fetchPoll = async () => {
    //         if (pollID) {
    //           try {
    //             const results = await API.graphql(graphqlOperation(getPoll, { id: pollID }));
    //             if (!results.data?.getPoll) {
    //               console.log("Error fetching poll:", results);
    //             } else {
    //               console.log("Fetched poll:", results.data.getPoll);
    //               setPoll(results.data.getPoll)
    //               // Handle the fetched poll data
    //             }
    //           } catch (error) {
    //             console.error("Error fetching poll:", error);
    //           }
    //         } else {
    //           console.log("Poll ID is null or undefined");
    //         }
    //       };
        
    //       fetchPoll();
    //     }, [pollID]); // Make sure to include pollID in the dependencies array
          
          
          return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            {/* <BottomSheetModalProvider>
              <TouchableOpacity
              style={{marginTop:250}}
              onPress={()=>navigation.goBack()}
              >
                <Text>Personal Poll Display screen</Text>
                <BottomSheetModalProvider>
              <FlatList
                data={poll}
                renderItem={({ item }) => (
                  <PollComponent poll={item} />
                )}
                keyExtractor={(item) => item.id}
                style={styles.list}
                contentContainerStyle={{ flexGrow: 1 }}
              />
              </BottomSheetModalProvider>
              </TouchableOpacity>    
            </BottomSheetModalProvider> */}
            <View>
              <Text>Personal poll display screen</Text>
            </View>



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
        list: {
          padding: 10,
        },
        })


 export default PersonalPollDisplayScreen