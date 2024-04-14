import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Image, FlatList, StatusBar, Dimensions, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
//import {listPolls} from '../graphql/queries'
import { API, graphqlOperation } from "aws-amplify";
//import Poll from "../components/PersonalPollDisplayItem"
import PollComponent from '../components/PersonalPollDisplayItem/index'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRoute } from '@react-navigation/native';
import { getNotification, getPoll, notificationsByUserID } from '../graphql/queries';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {Ionicons} from '@expo/vector-icons'
import { getUser } from '../graphql/queries';
import { createPollComment, createPollResponse, updateNotification, updatePoll } from '../graphql/mutations';
import { useUserContext } from '../../UserContext';
import { not } from 'react-native-reanimated';



const ResponsePollScreen = () => {
     const [poll, setPoll] = useState([])
     const [pollItems, setPollItems] = useState([]);
     const [numOfPollLikes, setNumOfPollLikes] = useState(0)
     const [totalNumOfVotes, setTotalNumOfVotes] = useState(0)
     const [comment, setComment] = useState("")
     const [isLikeIconClicked, setIsLikeIconClicked] = useState(false);
     const [pollCreator, setPollCreator] = useState("")
     const [initialNumOfLikes, setInitialNumOfLikes] = useState(0);
     const [pollCreatorUserID,setPollCreatorUserID] = useState("")
     const [pollID, setPollID] = useState()
     const [pollCreatorNotificationID, setPollCreatorNotificationID] =  useState("")
     const [originalPollCommentArray, setOriginalPollCommentArray] = useState([])
     const [localUserName, setLocalUserName] = useState()
     const [pollCreatorNotification, setPollCreatorNotication] = useState()
     const [pollLikeResponseID,   setPollLikeResponseLikeID] = useState("")
     const [localUserID, setLocalUserID] = useState()
     const [updatedPollLikeResponseArray, setUpdatedPollLikeResponseArray] = useState([])
     const [selectedOption, setSelectedOption] = useState(null);
     const [isOptionSelected, setIsOptionSelected] = useState(false);
     const [pollItemUpdateStatus, setPollItemUpdateStatus] = useState(false)
     const [pollCommentArray, setPollCommentArray] = useState([])
     const [pollResponseCommentID, setPollResponseCommentID] = useState("")
     const [updatedPollCommentResponseArray,setUpdatedPollCommentResponseArray] = useState([])
     const [newPollCommentID, setNewPollCommentID] = useState("")
     const [pollLikeNotificationUpdateStatus, setPollLikeNotificationUpdateStatus] = useState(true)
     const [pollCommentsNotificationUpdateStatus, setPollCommentNotificationUpdateStatus] = useState(true)
     const [pollItemNotificationUpdateStatus, setPollItemNotificationUpdateStatus] = useState(true)
     const [pollResponseStatus, setPollResponseStatus] = useState(false)
  
    
   

     const navigation = useNavigation()
    const {user} = useUserContext()


      const route = useRoute()
       const pollReception = route?.params.poll
      //  console.log("here is the poll ID", pollReception)
    //     // console.log("here is the poll id", pollID)
    //fetch the poll 
        useEffect(() => {
          const fetchPoll = async () => {
            if (pollReception) {
              // console.log("here is the poll received", pollReception)
              setPoll(pollReception)
              const initialNumberOfLikes = pollReception.numOfLikes
              // console.log("here is the initial number of likes", initialNumberOfLikes)
              setInitialNumOfLikes(initialNumberOfLikes)
              const numOfVotes = pollReception.totalNumOfVotes
              // console.log("here is the record the total number of votes for the first time", numOfVotes)
              setTotalNumOfVotes(numOfVotes)
            } else {
              console.log("Poll ID is null or undefined", pollReception);
            }
          };
        
          fetchPoll();
        }, [pollReception]); // Make sure to include pollID in the dependencies array
          
          //fetch the poll data
        useEffect(()=>{
          const fetchPollInfo=async()=>{
            setNumOfPollLikes(poll.numOfLikes);
            setPollID(poll.id)
            setOriginalPollCommentArray(poll.pollCommentArray)
            try {
              const parsedPollItems = JSON.parse(poll.pollItems || '[]'); // Parse the string
              // console.log("here is the parsed poll Items", parsedPollItems)
              setPollItems(parsedPollItems);
            } catch (error) {
              console.log("error fetching the poll info", error)
            }
          }
          fetchPollInfo()
        }, [poll])
      
      //fetch the local user Data
      useEffect(()=>{
        if(user){
          // console.log("here is the local user data", user)
          const localUserUserName = user.userName
          const localUserUserID = user.id
          // console.log("here is the local user ID", localUserUserID)
          // console.log("here is the local user name", localUserUserName)
          setLocalUserName(localUserUserName)
          setLocalUserID(localUserUserID)
         
        }

      }, [user])

      //fetch the poll creator and its data
      useEffect(()=>{
        const getPollCreater = async () => {
          const pollCreatorID = poll.userID
          if(pollCreatorID){
            // console.log("here is the poll creator", pollCreatorID)
            setPollCreatorUserID(pollCreatorID)
            try {
              const pollCreatorInfo = await API.graphql(graphqlOperation(getUser, { id: pollCreatorID }));
              // console.log("this is the poll creator info",pollCreatorInfo.data?.getUser.userName)
              setPollCreator(pollCreatorInfo.data?.getUser.userName)
            } catch (error) {
              console.log("error fetching the poll creator", error)
            }
          }
         }
        getPollCreater()
      }, [poll])



      const handleLikedIconClick = () => {
        setIsLikeIconClicked(prevState => !prevState); // Use callback form of setState
    };

    //fetch poll creator notification data
      useEffect(()=>{
      const getPollCreatorNotification = async () =>{
        if(pollCreatorUserID){
          console.log("we have poll creator user id, we are good to go", pollCreatorUserID)
          try {
            const notificationQueryResult = await API.graphql(graphqlOperation(notificationsByUserID, {
                      userID: pollCreatorUserID
                    }))
            console.log("notification query success✅")
            // console.log("here is the notification items", notificationQueryResult.data?.notificationsByUserID.items)
            // console.log("here is the notification id", notificationQueryResult.data?.notificationsByUserID.items[0].id)
            const userNotID = notificationQueryResult.data?.notificationsByUserID.items[0].id
            console.log("here is the userNotID", userNotID)
            setPollCreatorNotificationID(userNotID)
          } catch (error) {
            console.log("error querying for notification from the poll creator",error)
          }
        }else{
          console.log("poll creator user ID is still not available", pollCreatorUserID)
        }

      }
      getPollCreatorNotification()
      },[pollCreatorUserID])
      
    useEffect(() => {
        // Check if the like icon is clicked
        if (isLikeIconClicked) {
            // Increment the number of likes
            setNumOfPollLikes(prevLikes => prevLikes + 1);
        } else {
            // Decrement the number of likes
            setNumOfPollLikes(prevLikes => prevLikes - 1);
        }
    }, [isLikeIconClicked]);
    
    
    useEffect(() => {
      // Define a function to update the number of likes in the database
      const updateLikesInDatabase = async () => {
        if(numOfPollLikes){
          // console.log("Number of likes in useEffect in the updateLikesInDatabase", numOfPollLikes)
          try {
            // Call the updatePoll mutation to update the number of likes
            const response = await API.graphql(graphqlOperation(updatePoll, {
              input: {
                id: pollID,
                numOfLikes: numOfPollLikes,
              },
            }));
            // Log the response or handle it as needed
            // console.log('Poll likes updated successfully:✅✅✅', response);
            if(response){
              const str = localUserName + "has liked your poll!"
              try {
                const pollLikeResponseCreatedID = await API.graphql(graphqlOperation(createPollResponse, {input:{
                  pollID: pollID, 
                  userID: localUserID, 
                  caption: str
                }}))
                console.log("success creating the poll response for poll likeslikes✅✅✅✅")
              } catch (error) {
                console.log("error creating the poll response for the likes", error)
              }
            }
          } catch (error) {
            console.log('Error updating poll likes:', error);
          }
        }
       
      };
  
     updateLikesInDatabase()
    }, [numOfPollLikes]); // Run the effect when isLikeIconClicked changes
  

             
    const handleOptionPress = (index) => {
      // Check if the selected option is different from the previously selected one
      if (index !== selectedOption) {
        // Increment the votes for the selected option and decrement for the previously selected option
        const updatedPollItems = [...pollItems];
        updatedPollItems[index].votes += 1;
        // console.log("Here is the poll data after update in the handleOptionPRess", updatedPollItems)
        if (selectedOption !== null) {
          updatedPollItems[selectedOption].votes -= 1;
        }
    
        setPollItems(updatedPollItems);
    
        // Update total number of votes only if an option is selected for the first time
        if (selectedOption === null) {
          setTotalNumOfVotes(totalNumOfVotes + 1);
        }
    
        setSelectedOption(index);
      }
    };
     

    useEffect(() => {
          if (selectedOption !== null) { 
            setIsOptionSelected(true);
            // console.log("here is the poll items in the useEffect on true statement condition", pollItems)
            // console.log("here is the number of total number of votes in the use effects", totalNumOfVotes)
            // console.log("the update poll items in the use effects", pollItems)
          } else {
            setIsOptionSelected(false);
            console.log("here is the poll items in the useEffect on false statement condition", pollItems)
          }
      }, [selectedOption, isOptionSelected]);  
      

      useEffect(() => {
        const updatePollItemInTheBackend = async () => {
          if (isOptionSelected) { // Only update when an option is selected
            // console.log("here is the updated poll items ready to go", pollItems);
            // console.log("here is the number of total number of votes ready to go", totalNumOfVotes);
            const updatedPollItem = JSON.stringify(pollItems)
            // console.log("print of the stringified poll Items", updatedPollItem)
            try {
              // Call the updatePoll mutation to update the poll items and total number of votes
              const response = await API.graphql(graphqlOperation(updatePoll, {
                input: {
                  id: pollID,
                  totalNumOfVotes: totalNumOfVotes,
                  pollItems:updatedPollItem
                },
              }));
              // Log the response or handle it as needed
              // console.log('Poll items and total num of votes updated successfully: with stringification ✅✅✅', response);
              if(response){
                const str = localUserName + "has added a vote to your poll"
                try {
                  const pollResponseCreated = await API.graphql(graphqlOperation(createPollResponse, {input:{
                    pollID : pollID, 
                    userID: localUserID, 
                    caption : str
                  }}))
                  console.log("the poll item response creation created success full✅✅✅✅")
                } catch (error) {
                  console.log("error creation a poll response on poll Item update", error)
                }
              }
            } catch (error) {
              console.log('Error updating poll items:', error);
            }
          } else {
            console.log("No option selected yet.");
          }
        };
      
        updatePollItemInTheBackend();
      }, [pollItems, totalNumOfVotes, isOptionSelected]);
      

     //create a comment function
     const handleCreateCommentOnTheBackend = async () => {
      console.log('here is the poll ID', pollID);
      console.log("here is the local user ID", localUserID);
      console.log("here is the poll creator notification ID", pollCreatorNotificationID);
      
      if (pollCreatorNotificationID) {
        const createNotificationInput = {
          pollID: pollID,
          userID: localUserID, 
          notificationID: pollCreatorNotificationID
        };
    
        try {
          const pollCommentCreationResults = await API.graphql(graphqlOperation(createPollComment, { input: createNotificationInput }));
          console.log("poll comment creation successful✅✅✅", pollCommentCreationResults);
          return pollCommentCreationResults;
        } catch (error) {
          console.log("error creating poll comment", error);
          return false;
        }
      } else {
        return false;
      }
    };
    


      const handlePollCommentOnSubmit = async () => {
        console.log("the comment button pressed");
        console.log("here is the comment", comment);
        console.log("here is the poll comment array before update", pollCommentArray);
        
        // Create a new array by concatenating the existing comments with the new comment
        const updatedComments = [...pollCommentArray, comment];
        
        // Set the state with the updated array
        setPollCommentArray(updatedComments);
        const pollCommentCreationResults = await handleCreateCommentOnTheBackend()
        if(pollCommentCreationResults !== false){
          setComment("");
        }else{
          console.log("error in creating the comment")
        }
        
        // Clear the comment input field
        //setComment("");
        // Perform any other actions you need after adding the comment
        console.log("here is the poll comment array after update", pollCommentArray)
      };
      
        
     
     
       const handleSubmitPollResponse = async()=>{
        //const newNumOfLikes = await handleLickedIconClick()
        // console.log("here is the new number of likes", newNumOfLikes)
        // if(isLikeIconClicked){
        //   const results = await updateLikesInDatabase(numOfPollLikes);
        //   if(results){
        //     console.log("successfully updated the number of polls✅✅")
        //   }else{
        //     console.log("error updating the number of likes")
        //   }
        // }
        // if(newNumOfLikes){
        //   if(pollID){
        //     updatePollLikes(pollID,newNumOfLikes)
        //   }else{
        //     console.log("invalid poll ID", pollID)
        //   }
        
        // }else{
        //   console.log("invalid num of likes", newNumOfLikes)
        // }
    
       }




    return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
              <TouchableOpacity
              onPress={()=>navigation.goBack()}
              >
              <Ionicons name="arrow-back" size={24} color="black" />
              
              </TouchableOpacity>
            <LinearGradient
          colors={['#EE8B94', '#0038FF']} // Adjust the gradient colors as per your preference
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
           >
          <View style={styles.innerContainer}>
          <TouchableOpacity
            style={styles.pollLikesContainer} 
            onPress={handleLikedIconClick}
          > 
          <Text style={styles.userNameText}>@{pollCreator}</Text>
            <FontAwesome
              name={isLikeIconClicked ? 'heart' : 'heart-o'}
              size={36}
              color={isLikeIconClicked ? 'red' : '#1764EF'}
              style={styles.pollLikeIcon}
            />
            <Text style={styles.numOfpollLikes}>{numOfPollLikes}</Text>       
        </TouchableOpacity>
        <View>
        <Image
          source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
          resizeMode="contain"
          style={styles.userImage}
        />
        </View>
          <TouchableOpacity>
          <Text style={styles.question}>{poll.pollCaption}</Text>
          {pollItems.map((item, index)=>(
            <TouchableOpacity
            key={index}
            style={[
            styles.optionContainer,
            selectedOption === index && styles.selectedOption,
          ]}
          onPress={() => handleOptionPress(index)}
            >
            <Text style={styles.optionText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
          </TouchableOpacity>
         
        <View style={{flexDirection:"row"}}>

          <View
          style= {styles.outerInputContainer}
          >
          <View
          style={{justifyContent:'flex-start', marginLeft:10}}
          >
            <TextInput
          placeholder="Add a comment here..."
          value={comment}
          onChangeText={text => setComment(text)}
          style={styles.input}
          textAlignVertical="top"
        />
            </View>
          
          </View>
        
        <TouchableOpacity 
         style= {{fex:1}}
         >
          <TouchableOpacity
          onPress={handlePollCommentOnSubmit}
          style={{justifyContent:'flex-end'}}
          >
          <MaterialCommunityIcons name="send-circle" size={40} color="#545454" />
         </TouchableOpacity>
        
        </TouchableOpacity>
      </View>


          <TouchableOpacity
          onPress={handleSubmitPollResponse}
          style = {styles.button}
          >
          <Text style={styles.buttonText}>
              Submit 
          </Text>
       </TouchableOpacity>
            
        </View>

            </LinearGradient>

          </KeyboardAvoidingView>
          )
        }


    const styles = StyleSheet.create({
          gradientContainer: {
            borderRadius: 29,
          },
          container: {
            flex: 1,
            padding: 16,
            backgroundColor: "#FFFF",
            marginTop: 5,
            borderRadius: 29,
            marginBottom: 5,
            marginStart: 5,
            marginEnd: 5,
            marginTop: 200,
            marginBottom: 200,
            
          },
          innerContainer: {
            height: 450,
            padding: 16,
            backgroundColor: "#FFFF",
            marginTop: 5,
            borderRadius: 29,
            marginBottom: 5,
            marginStart: 5,
            marginEnd: 5,
          },
          list: {
            padding: 10,
          },
          userImageContainer:{
            //marginStart:10,
            marginTop:-20,
            marginLeft: -10
           },
           userImage:{
               width:80,
               height:120, 
               marginTop:-100, 
               marginLeft:-10
           },
          userNameText: {
            fontSize: 19,
            fontWeight: '600',
            marginLeft: 75, // Adjust the marginLeft to create spacing
          },
          question: {
            fontSize: 19.5,
            fontWeight: 'bold',
            marginBottom: 10,
            marginTop: 4,
            marginLeft: 15,
          },
          optionContainer: {
            marginBottom: 15,
            padding: 5,
            borderColor: '#ccc',
            borderRadius: 28,
            backgroundColor: '#ffff',
            borderColor: 'black',
            borderWidth: 1.5,
            height: 50,
            width: 330, // Adjust the width as per your requirement
          },
          optionText: {
            fontSize: 16,
            fontWeight: '700',
            marginLeft: 135,
            color: "black",
            marginTop: 10
          },
          outerInputContainer: {
            // flexDirection: 'row',
            // alignItems: 'center', // Center items vertically
            // justifyContent: 'space-between', // Add space between input and icon
            // paddingHorizontal: 15, // Add padding to create space on the sides
            backgroundColor: '#EAEAEA',
            borderRadius: 12,
            
            // marginTop: 5,
            // marginRight: 45,
            marginLeft:10,
            width:280,
            fex:1 
          },
          
          input: {
            //backgroundColor: '#EAEAEA',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 12,
            height: 40,
            marginTop:5,
            fontSize: 13,
            marginRight: 15,
            // marginLeft: 5,
            color: 'black',
            fontWeight: '400',
            // justifyContent:'flex-start'
          },
          pollLikesContainer: {
            flexDirection: 'row', // Align children horizontally
            alignItems: 'center', // Align items vertically
          },
          pollLikeIcon: {
            marginLeft: 100, // Adjust the marginLeft to create spacing
          },
          numOfpollLikes: {
            marginLeft: -25, // Adjust the marginLeft to create spacing
            fontSize: 25,
            fontWeight: '600',
            marginTop:60
          },
          button:{
            backgroundColor: '#1764EF',
            width: 330,
            height: 42,
            padding: 12,
            borderRadius: 15,
            marginTop: 10,
            alignItems: 'center',
            //marginRight: 10,
            marginLeft:8,
          },
          pollButtonContainer:{
            width: 256,
            height:42,
            borderRadius:5,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:10,
            marginBottom: 10
            },
            buttonText:{
              color: 'white',
              fontWeight: '600',
              fontSize: 14   
          },
          selectedOption: {
            backgroundColor: '#add8e6', // Light blue for selected option
            //backgroundColor: '#1764EF'
           }
        });
        


 export default ResponsePollScreen