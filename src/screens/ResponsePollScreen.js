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
import { getUser } from '../graphql/queries';
import { createPollComment, createPollResponse, updateNotification, updatePoll } from '../graphql/mutations';
import { useUserContext } from '../../UserContext';



const ResponsePollScreen = () => {
     const [poll, setPoll] = useState([])
     const [pollItems, setPollItems] = useState([]);
     const [numOfPollLikes, setNumOfPollLikes] = useState(0)
     const [comment, setComment] = useState("")
     const [isLikeIconClicked, setIsLikeIconClicked] = useState(true);
     const [pollCreator, setPollCreator] = useState("")
     const [pollCreatorUserID,setPollCreatorUserID] = useState("")
     const [pollID, setPollID] = useState()
     const [originalPollCommentArray, setOriginalPollCommentArray] = useState([])
     const [localUserName, setLocalUserName] = useState()
     const [pollCreatorNotification, setPollCreatorNotication] = useState()
     const [pollLikeResponseID,   setPollLikeResponseLikeID] = useState("")
     const [localUserID, setLocalUserID] = useState()
     const [updatedPollLikeResponseArray, setUpdatedPollLikeResponseArray] = useState([])
     const [selectedOption, setSelectedOption] = useState(null);
     const [pollItemUpdateStatus, setPollItemUpdateStatus] = useState(false)
     const [pollCommentArray, setPollCommentArray] = useState([])
     const [pollResponseCommentID, setPollResponseCommentID] = useState("")
     const [newPollCommentID, setNewPollCommentID] = useState("")
     const [pollLikeNotificationUpdateStatus, setPollLikeNotificationUpdateStatus] = useState(true)
     const [pollCommentsNotificationUpdateStatus, setPollCommentNotificationUpdateStatus] = useState(true)
     const [pollItemNotificationUpdateStatus, setPollItemNotificationUpdateStatus] = useState(true)
    //const[pollItemNotificationUpdateStatus, setPollItemUpddateStatus] = useState(true)
     const[pollCommentUpdateStatus, setPollCommentUpdateStatus] = useState(true)
     const [totalNumOfVotes, setTotalNumOfVotes] = useState(0)
     const [numOfPollComments, setNumOfPollComment] = useState(0)

     const navigation = useNavigation()
    const {user} = useUserContext()


      const route = useRoute()
       const pollReception = route?.params.poll
       console.log("here is the poll ID", pollReception)
    //     // console.log("here is the poll id", pollID)
    //fetch the poll 
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
          
          //fetch the poll data
        useEffect(()=>{
          const fetchPollInfo=async()=>{
            setNumOfPollLikes(poll.numOfLikes);
            setPollID(poll.id)
            setOriginalPollCommentArray(poll.pollCommentArray)
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
      
      //fetch the local user Data
      useEffect(()=>{
        if(user){
          console.log("here is the local user data", user)
          const localUserUserName = user.userName
          const localUserUserID = user.id
          console.log("here is the local user ID", localUserUserID)
          console.log("here is the local user name", localUserUserName)
          setLocalUserName(localUserUserName)
          setLocalUserID(localUserUserID)
         
        }

      }, [user])

      //fetch the poll creator and its data
      useEffect(()=>{
        const getPollCreater = async () => {
          const pollCreatorID = poll.userID
          if(pollCreatorID){
            console.log("here is the poll creator", pollCreatorID)
            setPollCreatorUserID(pollCreatorID)
            try {
              const pollCreatorInfo = await API.graphql(graphqlOperation(getUser, { id: pollCreatorID }));
              console.log("this is the poll creator info",pollCreatorInfo.data?.getUser.userName)
              setPollCreator(pollCreatorInfo.data?.getUser.userName)
            } catch (error) {
              console.log("error fetching the poll creator", error)
            }
          }
         }
        getPollCreater()
      }, [poll])

      //get poll creator notification 
      useEffect(()=>{
        const getPollCreatorNotification = async()=>{
         if(pollCreatorUserID){
          console.log("here is the poll creator user ID", pollCreatorUserID)
          try {
            const notifcationQuery = await API.graphql(graphqlOperation(notificationsByUserID, {
              userID: pollCreatorUserID
            }))
            console.log("here is the user notification query results", notifcationQuery.data?.notificationsByUserID)
            const notificationQueryResultUnstringified = notifcationQuery.data?.notificationsByUserID
            const notifcationQueryStringifiedUnparsed = JSON.stringify(notificationQueryResultUnstringified)
            const notificationQueryResult = JSON.parse(notifcationQueryStringifiedUnparsed)
            console.log("here is the notification query result", notificationQueryResult)
            setPollCreatorNotication(notificationQueryResult)
          } catch (error) {
            console.log("error creating and querying the user notification", error)
          }
         }else{
          console.log("pollCreatorUserID is not valid")
         }
        }
        getPollCreatorNotification()
      },[pollCreator])

      const handleLickedIconClick = () => {
          setIsLikeIconClicked(!isLikeIconClicked);
          setNumOfPollLikes(prevLikes => (isLikeIconClicked ? prevLikes +1 : prevLikes -1));
      
        };
        useEffect(()=>{
          //handle poll likes num  global update
          const handleGlobalPollLikes = async()=>{
            console.log("here are the updated number of poll likes", numOfPollLikes)
            console.log("here is the poll ID", pollID)
            try {
              const numOfPollLikeUpdateResults = await API.graphql(graphqlOperation(updatePoll,{
                id:pollID, 
                numOfLikes:numOfPollLikes
              }))
              console.log("here are the results for the poll like", numOfPollLikeUpdateResults)
            } catch (error) {
              console.log("error updating the number of the poll likes")
              
            }
          }
           //handle Poll like response update
           const handlePollLikeResponseUpdate=async()=>{
            //create poll response 
            if(pollID){
              console.log("here is the poll ID for the poll", pollID)
              const string = localUserName + "has liked your poll"
              console.log(console.log("here is the caption for the poll like response", string))
              try {
                const newPollResponseCreated = await API.graphql(graphqlOperation(createPollResponse, {
                  pollID: pollID, 
                  userID: pollCreatorUserID, 
                  caption: string
                }
                  ))
               console.log("Here is the newPollResponse created results", newPollResponseCreated)
               console.log("here is the poll new poll response ID", newPollResponseCreated.data?.createPollResponse.id)
               const pollLikeResponseCreatedID  = newPollResponseCreated.data?.createPollResponse.id
               setPollLikeResponseLikeID(pollLikeResponseCreatedID)
              } catch (error) {
                console.log("error creating the poll like response", error)
              }
            }
            //add the poll response ID to the notification array
            //globally update the info
           }
          handleGlobalPollLikes()
          handlePollLikeResponseUpdate()
        },[numOfPollLikes])

      //update the poll notification 
      useEffect(()=>{
        const handleLikeResponseNotificationUpdate=async()=>{
          console.log('here is the poll creator notification', pollCreatorNotification)
          if(pollCreatorNotification && pollLikeResponseID){
            //get poll like response array
            const pollLikeResponseArr = pollCreatorNotification[0].pollLikeResponseArray
            if(pollLikeResponseArr === null || pollLikeResponseArr === undefined){
              const newPollLikeResponseArray = []
              newPollLikeResponseArray.push(pollLikeResponseID)
              console.log("this is the new pollLike response array", newPollLikeResponseArray)
              setUpdatedPollLikeResponseArray(newPollLikeResponseArray)
            }else{
              console.log("here is the pollLikes response array", pollLikeResponseArr)
              pollLikeResponseArr.push(pollLikeResponseID)
              console.log("here is the updated poll like response array", pollLikeResponseArr)
              setUpdatedPollLikeResponseArray(pollLikeResponseArr)
            }
          }
          }
          handleLikeResponseNotificationUpdate() 
      }, [pollLikeResponseID])

        //handle the poll item update status 
        useEffect(()=>{
          console.log("here is the updated poll items", pollItems)
          const handleUpdatePollItems=async()=>{
          const updatedItems = JSON.stringify(pollItems)
          console.log("here is the updated and stringify poll items", updatedItems)
          try {
            const updateInput = {
              id: pollID,
              pollItems: updatedItems
            };
            const updateResponse = await API.graphql(graphqlOperation(updatePoll, { input: updateInput }));
            console.log('Poll updated successfully✅:', updateResponse);
            // Log the updated pollItems
            const updatedPollItems = updateResponse.data.updatePoll.pollItems;
            console.log('Updated Poll Items:', updatedPollItems);  
            if(updatedPollItems){
              setPollItemUpdateStatus(true)
            }else{
              setPollItemUpdateStatus(false)
            }
          } catch (error) {
            console.log('Error updating poll items:', error);
            setPollItemUpdateStatus(false)
          }
          }
          handleUpdatePollItems()
          }, [pollItems])
  
  
  
        const handleOptionPress = (index) => {
          // Check if the selected option is different from the previously selected one
          if (index !== selectedOption) {
            // Increment the votes for the selected option and decrement for the previously selected option
            const updatedPollItems = [...pollItems];
            updatedPollItems[index].votes += 1;
            if (selectedOption !== null) {
              updatedPollItems[selectedOption].votes -= 1;
            }
        
            setPollItems(updatedPollItems);
        
            // Update total number of votes only if an option is selected for the first time
            if (selectedOption === null) {
              setTotalNumOfVotes(totalNumOfVotes + 1);
            }
        
            setSelectedOption(index);
            //animateAllOptions(index);
          }
        }


      //handling everything poll comment

      //create poll response based on comment
      useEffect(async ()=>{
        //create poll response for the poll comment created
        console.log("here is the comment", comment)
        const notificationID = pollCreatorNotification[0].id
        console.log("here is the notificationID", notificationID)
        const string = localUserName + "has commented on your poll"  
      const handlePollCommentResponseCreation=async()=>{
        try {
          const pollCommentResponseCreationResult = await API.graphql(graphqlOperation(createPollResponse, {
            pollID:pollID, 
            userID: localUserID, 
            caption: string,
          }))
          console.log("here are the results for creating poll comment response", pollCommentResponseCreationResult)
          const pollCommentResponseCreatedID  = pollCommentResponseCreationResult.data?.createPollResponse.id
          console.log("here is the poll comment response ID", pollCommentResponseCreatedID)
          setPollResponseCommentID(pollCommentResponseCreatedID)
        } catch (error) {
          console.log("error creating the poll response", error)
        }
      }
      handlePollCommentResponseCreation
      }, [comment])
//local poll comment update
      useEffect(()=>{
        const localPollCommentArrayUpdate=async()=>{
          if(comment){
            const newPollCommentArray = pollCommentArray.push(comment)
            setPollCommentArray(newPollCommentArray)
            //now create the poll Comment
          
            //setComment("")
          }else{
            console.log("something went wrong with updating poll comment locally")
          }
          }
          localPollCommentArrayUpdate()
      }, [comment])


     //createPollComment in the backend
     useEffect(()=>{
      //handle poll comment creation
      console.log("here is the poll response comment ID before we start",pollResponseCommentID)
      const notificationID = pollCreatorNotification[0].id
      console.log("here is the notification Id")
      const handlePollCommentCreation=async()=>{
        try {
          const newPollCommentInput = {
            userID:localUserID, 
            numOfLikes:0,
            notificationID:notificationID,
            pollresponseID:pollResponseCommentID, 
            Poll:{
              id:pollID
            }, 
           User:{
            id:localUserID
           }

          }
          const pollCommentCreationResults = await API.graphql(graphqlOperation(createPollComment,{
            input: newPollCommentInput
          } 
            ))
          console.log("here is the poll creationResults", pollCommentCreationResults)
          const pollCommentCreatedID = pollCommentCreationResults.data?.createPollComment.id
          console.log("here is the poll comment created Id", pollCommentCreatedID)
          setNewPollCommentID(pollCommentCreatedID)
        } catch (error) {
          console.log("error creating the poll comment", error)
        }
      }
      handlePollCommentCreation()
     }, [pollResponseCommentID])

    //update the poll with the comment in the backend
      useEffect(()=>{
        console.log("here is the update poll comment array", pollCommentArray)
        const handlePollCommentGlobalPollUpdate=async()=>{
          let newPollCommentsArray = []
          if(!originalPollCommentArray){
            newPollCommentsArray.push(comment)
            console.log("here is the updated poll comment array", newPollCommentsArray)
          }else{
            newPollCommentsArray = backendPollCommentsArray.push(comment)
          }
          const pollCommentArrayUpdateResults = await API.graphql(graphqlOperation(updatePoll, {
            id:pollID, 
            pollCommentArray:pollCommentArray

          }))
        }

      })
     
      //the big update heavywork
      useEffect(()=>{
       //we start with updating the poll Like response Array
       const notificationID = pollCreatorNotification[0].id
       const notificationPollLikeResponseUpdate=async()=>{
        console.log("here is the update poll like response array", updatedPollLikeResponseArray)
        console.log("here is the poll creator notification", pollCreatorNotification)
        // const notificationID = pollCreatorNotification[0].id
        console.log("here is the notification ID", notificationID)
        if(notificationID){
          try {
            const results = await API.graphql(graphqlOperation(updateNotification, 
              {id:notificationID,
              pollLikeResponseArray:updatedPollLikeResponseArray, 
              }
              ))
              console.log("poll like response array update success", results)
             setPollLikeNotificationUpdateStatus(true)
          } catch (error) {
            console.log("error in updating the poll like response array", error)
            setPollLikeNotificationUpdateStatus(false)
          }
        }else{
          console.log("error in acquiring the notification ID for the user")
          setPollLikeNotificationUpdateStatus(false)
         }
       }
       const notificationPollItemUpdate=async()=>{
        if(pollItemUpdateStatus === true){
          setPollItemNotificationUpdateStatus(true)
        }else{
          setPollLikeNotificationUpdateStatus(false)
        }
       }
       notificationPollLikeResponseUpdate()
       notificationPollItemUpdate()
        
      }, [updatedPollLikeResponseArray, pollItemUpdateStatus])



        const handlePollResponse=async()=>{
           //1. create the poll response
              //2. Attach the poll response to the user
              //3. Attach the poll response to the poll 
              //4. update the poll response with the info from 2 and 3
              //5. Update the poll notification with this info
                    //1. get the user notification and acquire its poll response array
                    //2. add the new poll comment response to the poll response array
                    //3. update this data to the backend 
              //6. return true if everything is successful
        }

      const handlePollCommentOnSubmit= async() =>{
        //handle the comment
        //1. create the poll comment
        //2. Attach the poll comment to the user
        //3. Attach the poll commment to the poll 
        //4. update the poll comment with this info
        //5. Update the notification poll commment array with the new comment ID 
              //1. get the user notification and acquire its poll comment array
              //2. add the new comment ID to the notification poll comment array
              //3. update this data to the backend 
        //6.handle the  poll response for the poll comment
         //7. return true if everything is successful
      }
      const handleLocalPollUpdate= async()=>{
        //locally 
              //includes incrementing the number of votes of the choice selected
              //includes incerementing the number of total votes by one
              //returns the update json poll item object when everything is successful otherwise return false

      }

      const handlePollOnUpdateResponse = async()=>{}
      const handleNotificationOnPollItemUpdate = async()=>{}
       
      const handleGlobalPollUpdate= async()=>{
        //globally
          //1. makes sure that the update poll items are valid
          //2. update the poll on the backend 
          //3. create the poll response for the updated poll items. 
              //1. create the poll response
              //2. Attach the poll response to the poll 
              //3. Attach the poll response to the user 
              //4. update the notification with the poll response
                  //1. get the poll response array from the notification
                  //2. add the poll response to the poll response array in the notification
                  //3. update this info on the backend 
                  //return true if everything is okay
          //5. return true if everything is successful, false otherwise

      }


       const handleSubmitPollResponse = async()=>{
       //handle the poll item update
          //1. locally 
              //includes incrementing the number of votes of the choice selected
              //includes incerementing the number of total votes by one
          //2. globally, i.e backend 
          //3. go back()
      //update the poll likes
        //1. locally
        //2. globally
     

       }
    return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            <LinearGradient
          colors={['#EE8B94', '#0038FF']} // Adjust the gradient colors as per your preference
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
           >
          <View style={styles.innerContainer}>
          <TouchableOpacity
            style={styles.pollLikesContainer} 
            onPress={handleLickedIconClick}
          > 
          <Text style={styles.userNameText}>@{pollCreator}</Text>
            <FontAwesome
              name={isLikeIconClicked ? 'heart-o' : 'heart'}
              size={36}
              color={isLikeIconClicked ? '#1764EF' : 'red'}
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
          <TouchableOpacity>
           <TextInput
          placeholder ="Add a comment here..."
          value={comment}
          onChangeText={text =>setComment(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
          style={styles.input}
          textAlignVertical={"top"}
         />
          <MaterialCommunityIcons name="send-circle" size={40} color='#545454'
           style={{marginLeft:308, marginTop:-38}}
          />
          </TouchableOpacity>
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
            marginBottom: 25,
            marginTop: 10,
            marginLeft: 35,
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
            width: 350, // Adjust the width as per your requirement
          },
          optionText: {
            fontSize: 16,
            fontWeight: '700',
            marginLeft: 135,
            color: "black",
            marginTop: 10
          },
          input: {
            backgroundColor: '#EAEAEA',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 12,
            width: 290,
            height: 40,
            marginTop:5,
            fontSize: 13,
            marginRight: 15,
            marginLeft: 15,
            color: 'black',
            fontWeight: '400'
          },
          pollLikesContainer: {
            flexDirection: 'row', // Align children horizontally
            alignItems: 'center', // Align items vertically
          },
          pollLikeIcon: {
            marginLeft: 160, // Adjust the marginLeft to create spacing
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