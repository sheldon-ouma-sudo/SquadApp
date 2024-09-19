import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from "aws-amplify";
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { updatePoll, createPollComment, createPollResponse, updateNotification } from '../graphql/mutations';
import { getNotification, notificationsByUserID } from '../graphql/queries';
import { useUserContext } from '../../UserContext';
import { getUser } from '../graphql/queries';
import { useNavigation } from '@react-navigation/native';


const ResponsePollScreen = ({ poll, onClose, removeRequestFromList, requestID }) => {
  const[pollID, setPollID] = useState()
  const [pollItems, setPollItems] = useState([]);
  const [numOfPollLikes, setNumOfPollLikes] = useState(0);
  const [totalNumOfVotes, setTotalNumOfVotes] = useState(0);
  const[commentArray, setCommentArray] = useState([])
  const [comment, setComment] = useState("");
  const [isLikeIconClicked, setIsLikeIconClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [localUserName, setLocalUserName] = useState("");
  const [localUserID, setLocalUserID] = useState("");
  const [notificationPollItemResponseArray, setNotificationPollItemResponseArray] = useState([]);
  const [notificationPollLikeResponseArray, setNotificationPollLikeResponseArray] = useState([]);
  const [notificationPollCommentResponseArray, setNotificationPollCommentResponseArray] = useState([]);
  const [notificationID, setNotificationID] = useState("")
  const [pollCreatorID, setPollCreatorID] = useState("")
  const[pollCreator, setPollCreator] = useState()
  const[numOfPollComment, setNumOfPollComment] = useState(0)
  const[pollCreatorInfo,setPollCreatorInfo] = useState(null)
  const { user } = useUserContext();
  const navigation = useNavigation()


 // Fetch the notification associated with the poll creator
 useEffect(() => {
  const fetchNotification = async () => {
    if(poll){
      try {
        const pollCreator = poll.userID
        console.log("here is the poll creator ID", pollCreator)
        if(pollCreator){
        const notificationResult = await API.graphql(graphqlOperation(notificationsByUserID, { userID: pollCreator}));
        const notification = notificationResult.data?.notificationsByUserID?.items[0];
        setNotificationID(notification?.id); // Store the notification ID
        setNotificationPollLikeResponseArray(notification?.pollLikeResponseArray || []);
        setNotificationPollItemResponseArray(notification?.pollLikeResponseArray || []);
        setNotificationPollCommentResponseArray(notification?.pollCommentsArray|| [])
        }
    } catch (error) {
      console.log("Error fetching notification", error);
    }
    }
   
  };

  fetchNotification();
}, [poll]);


  useEffect(() => {
    const parsePollItems = (items) => {
      try {
        const recursiveParse = (item) => {
          // If it's a string, parse it as JSON
          if (typeof item === 'string') {
            const parsedItem = JSON.parse(item);
            // Recursively call the function if it's still an array
            return recursiveParse(parsedItem);
          }
          // If it's an array, flatten it recursively
          if (Array.isArray(item)) {
            return item.flatMap(recursiveParse);
          }
          // If it's an object, return it as is
          return item;
        };
    
        // Start parsing the top-level items array
        if (Array.isArray(items)) {
          return items.flatMap(recursiveParse);
        }
        return [];
      } catch (error) {
        console.log('Error parsing poll items:', error);
        return [];
      }
    };
    if(user){
    const username = user.userName;
    console.log("here is the username", username)
    setLocalUserName(username);
    const localUserID = user.id
    console.log("here is the localUserID", localUserID)
    setLocalUserID(localUserID)
    }
   
    setNumOfPollLikes(poll.numOfLikes);
    // setNumOfPollComment(commentsData.length);
    setTotalNumOfVotes(poll.totalNumOfVotes || 0);
    setPollCreatorID(poll.userID);
    setPollID(poll.id);
      // Parse pollItems
      const parsedPollItems = parsePollItems(poll.pollItems);
      // Log and set parsed poll items
       console.log( 'Here is the poll',poll,'Parsed Poll Items:', parsedPollItems);
      setPollItems(parsedPollItems);
     
    }, [poll, user]);


    useEffect(() => {
      const getPollCreator = async () => {
        if (!pollCreatorID) return; // Ensure pollCreatorID is available
    
        try {
          const pollCreatorInfoQuery = await API.graphql(graphqlOperation(getUser, { id: pollCreatorID }));
          if (pollCreatorInfoQuery.data?.getUser) {
            setPollCreator(pollCreatorInfoQuery.data.getUser.userName);
            setPollCreatorInfo(pollCreatorInfoQuery.data.getUser);
          } else {
            console.error("Error: Poll creator not found");
          }
        } catch (error) {
          console.error('Error fetching the poll creator:', error);
        }
      };
    
      getPollCreator(); // Call the async function within useEffect
    }, [pollCreatorID]);
    

  // const handleLikedIconClick = () => {
  //   setIsLikeIconClicked(prevState => !prevState);
  // };
  useEffect(() => {
    if (numOfPollLikes < 0) {
      setNumOfPollLikes(0);
    }
  }, [numOfPollLikes]);

  useEffect(() => {
    if (isLikeIconClicked) {
      setNumOfPollLikes(prevLikes => prevLikes + 1);
    } else {
      setNumOfPollLikes(prevLikes => prevLikes - 1);
    }
  }, [isLikeIconClicked]);

  useEffect(() => {
    const updateLikesInDatabase = async () => {
      if(localUserID){
        try {
        await API.graphql(graphqlOperation(updatePoll, {
          input: {
            id: pollID,
            numOfLikes: numOfPollLikes,
          },
        }));
          console.log("here is the poll ID",pollID)
          console.log("here is the localUserID when updating likes: ", localUserID)
        const likeResponse = await API.graphql(graphqlOperation(createPollResponse, {
          input: {
            pollID: pollID,
            userID: localUserID,
            caption: `${localUserName} has liked your poll!`,
          },
        }));
        console.log("here is the like response", likeResponse)
        setNotificationPollLikeResponseArray(prev => [...prev, likeResponse.data.createPollResponse.id]);
      } catch (error) {
        console.log('Error updating poll likes:', error);
      }
      }else{
        console.log("the local user iD is still null", localUserID)
      }
      
    };

    if (pollID && numOfPollLikes && localUserID) {
      updateLikesInDatabase();
    }
  }, [numOfPollLikes]);

  
  useEffect(() => {
    const updatePollItems = async () => {
      if(localUserID){
         try {
        const updatedPollItem = JSON.stringify(pollItems);
        await API.graphql(graphqlOperation(updatePoll, {
          input: {
            id: pollID,
            totalNumOfVotes: totalNumOfVotes,
            pollItems: updatedPollItem,
          },
        }));

        const voteResponse = await API.graphql(graphqlOperation(createPollResponse, {
          input: {
            pollID: pollID,
            userID: localUserID,
            caption: `${localUserName} has voted in your poll!`,
          },
        }));

        setNotificationPollItemResponseArray(prev => [...prev, voteResponse.data.createPollResponse.id]);
      } catch (error) {
        console.log('Error updating poll items:', error);
      }
      }else{
        console.log("the local user id is still null", localUserID)
      }
      }
    if (selectedOption !== null) {
      updatePollItems();
    }
  }, [selectedOption]);

  const handleOptionPress = async (index) => {
    console.log("option pressed!");
  
    if (index !== selectedOption) {
      // Update poll items and selected option in the state
      const updatedPollItems = [...pollItems];
      updatedPollItems[index].votes += 1;
      if (selectedOption !== null) {
        updatedPollItems[selectedOption].votes -= 1;
      }
  
      // Update state first to reflect the changes in the UI
      setPollItems(updatedPollItems);
      setTotalNumOfVotes(totalNumOfVotes + 1);
      setSelectedOption(index);
  
      // Perform the API call for updating poll data and responses
      try {
        console.log("here is the total number of votes", totalNumOfVotes + 1);
        console.log("here are the updated Poll Items", updatedPollItems);
  
        const updatePollResponse = await API.graphql(graphqlOperation(updatePoll, {
          input: {
            id: pollID,
            totalNumOfVotes: totalNumOfVotes + 1,
            pollItems: JSON.stringify(updatedPollItems),
          }
        }));
  
        const voteResponse = await API.graphql(graphqlOperation(createPollResponse, {
          input: {
            pollID: pollID,
            userID: localUserID,
            caption: `${localUserName} has voted in your poll!`,
          }
        }));
  
        console.log("here is the vote poll response", voteResponse.data?.createPollResponse);
        console.log("here is the updated poll response", updatePollResponse.data?.updatePoll);
  
        const pollVoteResponseID = voteResponse.data?.createPollResponse.id;
  
        const notificationQuery = await API.graphql(graphqlOperation(getNotification, { id: notificationID }));
        const commentArrayQuery = notificationQuery.data?.getNotification;
        const pollResponseArr = commentArrayQuery.pollResponsesArray || [];
  
        // Check and add the poll vote response ID if not present
        if (!pollResponseArr.includes(pollVoteResponseID)) {
          const newArr = [...pollResponseArr, pollVoteResponseID]; // Use spread operator to create a new array
  
          // Update the notification with the new poll response array
          const updateNotificationResults = await API.graphql(graphqlOperation(updateNotification, {
            input: {
              id: notificationID,
              pollResponsesArray: newArr,
            }
          }));
  
          console.log("here are the updateNotification results", updateNotificationResults);
        }
  
        setNotificationPollItemResponseArray([...notificationPollItemResponseArray, voteResponse.data.createPollResponse.id]);
  
      } catch (error) {
        console.log('Error updating poll items:', error);
      }
    }
  };
  
      const handleLikePoll = async () => {
      const newLikesCount = isLikeIconClicked ? numOfPollLikes - 1 : numOfPollLikes + 1;
      setIsLikeIconClicked(!isLikeIconClicked);
      setNumOfPollLikes(Math.max(newLikesCount, 0)); // Prevent negative likes
      console.log("here is the local user ID before updating the likes", localUserID)
      console.log("here is the pollID", pollID)
      try {
        await API.graphql(graphqlOperation(updatePoll, 
          {
          input: 
          { id: pollID, 
            numOfLikes: newLikesCount }
        }));

        const likeResponse = await API.graphql(graphqlOperation(createPollResponse, {
          input: {
            pollID: pollID,
            userID: localUserID,
            caption: `${localUserName} has liked your poll!`
          }
        }));
        console.log("here is the like poll response", likeResponse)
        setNotificationPollLikeResponseArray([...notificationPollLikeResponseArray, likeResponse.data.createPollResponse.id]);
      } catch (error) {
        console.log('error updating poll likes:', error);
      }
      };

  const handleCommentSubmit = async () => {
    try {
      console.log("here is the pollID before commenting", pollID)
      console.log("here is the localUserID before commenting",localUserID )
      const newCommArr = [...commentArray, comment]
      setCommentArray(newCommArr)
      const commentCreationResponse = await API.graphql(graphqlOperation(createPollComment, {
        input: {
          pollID: pollID,
          userID: localUserID,
          comment: comment,
          numOfLikes: 0, 
          notificationID: notificationID
        },
      }));
    console.log("here is the commentCreationResponse", commentCreationResponse.data?.createPollComment)
    const commentID = commentCreationResponse.data?.createPollComment.id
    console.log("here is the commentID", commentID)
      const commentResponse = await API.graphql(graphqlOperation(createPollResponse, {
        input: {
          pollID: pollID,
          userID: localUserID,
          caption: `${localUserName} has commented on your poll!`,
        },
      }));
    
      const notificationQuery  = await API.graphql(graphqlOperation(getNotification, {id: notificationID}))
      console.log("here is the notificatioQuery", notificationQuery.data?.getNotification)
      
      const commentArrayQuery = notificationQuery.data?.getNotification
      const pollCommentArr = commentArrayQuery.pollCommentsArray || []
      if(!pollCommentArr.includes(commentID)){
      const newArr = pollCommentArr.push(commentID)
      const updateNotificationResults = await API.graphql(graphqlOperation(updateNotification,{
        input:{
          id: notificationID, 
          pollCommentsArray: newArr
        }
      }))
      console.log("here is the updateNotification results", updateNotificationResults)
      }   
      
      setNotificationPollCommentResponseArray(prev => [...prev, commentResponse.data.createPollResponse.id]);
      setComment("");
    } catch (error) {
      console.log('Error submitting comment:', error);
    }
  };

  const handleSubmitPollResponse = () => {
    if (!isLikeIconClicked || selectedOption === null || commentArray.length === 0) {
      console.log("is poll liked, option selected, and comment added:", isLikeIconClicked, selectedOption, comment);
      Alert.alert("You must like, vote, and comment to submit your response.");
      return;
    }
  
    // Call the function to remove the poll request from the list
    if (removeRequestFromList && requestID) {
      removeRequestFromList(requestID);  // Remove request by ID
    }
  
    onClose();  // Close the modal after submitting the response
  };
  
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <LinearGradient
        colors={['#EE8B94', '#0038FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.pollLikesContainer} onPress={handleLikePoll }>
            <Text style={styles.userNameText}>@{pollCreator}</Text>
            <FontAwesome name={isLikeIconClicked ? 'heart' : 'heart-o'} size={36}  color={isLikeIconClicked ? 'red' : '#1764EF'} style={styles.pollLikeIcon} />
            
          </TouchableOpacity>

          <View>
            <Text style={styles.question}>{poll.pollCaption}</Text>
            {pollItems.map((item, index) => (
              <TouchableOpacity key={index} style={[styles.optionContainer, selectedOption === index && styles.selectedOption]} onPress={() => handleOptionPress(index)}>
                <Text style={styles.optionText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.commentSection}>
            <TextInput
              placeholder="Add a comment..."
              value={comment}
              onChangeText={setComment}
              style={styles.commentInput}
            />
            <TouchableOpacity onPress={handleCommentSubmit} style={styles.sendIconContainer}>
              <MaterialCommunityIcons name="send-circle" size={40} color="#545454" />
            </TouchableOpacity>
          </View>


          <TouchableOpacity onPress={handleSubmitPollResponse} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    borderRadius: 29,
    marginTop: 150
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFF",
    marginTop: 5,
    borderRadius: 29,
  },
  innerContainer: {
    marginTop: 15,
    height: 450,
    padding: 16,
    backgroundColor: "#FFFF",
    borderRadius: 29,
    marginEnd: 10, 
    marginStart: 10, 
    marginBottom: 10
  },
  pollLikesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  pollLikeIcon: {
    marginLeft: 140,
    marginTop: -10
  },
  numOfPollLikes: {
    marginLeft: -35,
    marginTop: 60,
    fontSize: 25,
    fontWeight: '600',
  },
  question: {
    fontSize: 19.5,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionContainer: {
    marginBottom: 15,
    padding: 5,
    borderRadius: 28,
    backgroundColor: '#ffff',
    borderColor: 'black',
    borderWidth: 1.5,
    height: 50,
    width: 330,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
  },
  commentSection: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 10, // Adjust for vertical padding
    width: 330, // Adjust this if needed for the full width
  },
  commentInput: {
    flex: 1, // Take up the available space
    fontSize: 14,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  sendIconContainer: {
    marginLeft: 10, // Adjust space between TextInput and the icon
  },
  submitButton: {
    backgroundColor: '#1764EF',
    width: 330,
    height: 42,
    padding: 12,
    borderRadius: 15,
    marginTop: 10,
    alignItems: 'center',
    
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  selectedOption: {
    backgroundColor: '#add8e6',
  },
});

export default ResponsePollScreen;
