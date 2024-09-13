import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from "aws-amplify";
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { updatePoll, createPollComment, createPollResponse, updateNotification } from '../graphql/mutations';
import { notificationsByUserID } from '../graphql/queries';
import { useUserContext } from '../../UserContext';

const ResponsePollScreen = ({ poll: pollReception, onClose }) => {
  const [poll, setPoll] = useState(pollReception || {});
  const [pollItems, setPollItems] = useState([]);
  const [numOfPollLikes, setNumOfPollLikes] = useState(pollReception?.numOfLikes || 0);
  const [totalNumOfVotes, setTotalNumOfVotes] = useState(pollReception?.totalNumOfVotes || 0);
  const [comment, setComment] = useState("");
  const [isLikeIconClicked, setIsLikeIconClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [localUserName, setLocalUserName] = useState("");
  const [localUserID, setLocalUserID] = useState("");
  const [notificationPollItemResponseArray, setNotificationPollItemResponseArray] = useState([]);
  const [notificationPollLikeResponseArray, setNotificationPollLikeResponseArray] = useState([]);
  const [notificationPollCommentResponseArray, setNotificationPollCommentResponseArray] = useState([]);
  const [notificationID, setNotificationID] = useState("")
  const { user } = useUserContext();
  const pollID = pollReception?.id || "";


 // Fetch the notification associated with the poll creator
 useEffect(() => {
  const fetchNotification = async () => {
    try {
      const notificationResult = await API.graphql(graphqlOperation(notificationsByUserID, { userID: poll.userID }));
      const notification = notificationResult.data?.notificationsByUserID?.items[0];
      setNotificationID(notification?.id); // Store the notification ID
      setNotificationPollLikeResponseArray(notification?.pollLikeResponseArray || []);
      setNotificationPollItemResponseArray(notification?.pollLikeResponseArray || []);
      setNotificationPollCommentResponseArray(notification?.pollCommentsArray|| [])
    } catch (error) {
      console.log("Error fetching notification", error);
    }
  };

  fetchNotification();
}, [poll.userID]);



  useEffect(() => {
    console.log("here is the polls", poll)
    setPollItems(JSON.parse(pollReception.pollItems || '[]'));
    setLocalUserName(user?.userName || "");
    setLocalUserID(user?.id || "");
  }, [pollReception, user]);

  const handleLikedIconClick = () => {
    setIsLikeIconClicked(prevState => !prevState);
  };

  useEffect(() => {
    if (isLikeIconClicked) {
      setNumOfPollLikes(prevLikes => prevLikes + 1);
    } else {
      setNumOfPollLikes(prevLikes => prevLikes - 1);
    }
  }, [isLikeIconClicked]);

  useEffect(() => {
    const updateLikesInDatabase = async () => {
      try {
        await API.graphql(graphqlOperation(updatePoll, {
          input: {
            id: pollID,
            numOfLikes: numOfPollLikes,
          },
        }));

        const likeResponse = await API.graphql(graphqlOperation(createPollResponse, {
          input: {
            pollID,
            userID: localUserID,
            caption: `${localUserName} has liked your poll!`,
          },
        }));

        setNotificationPollLikeResponseArray(prev => [...prev, likeResponse.data.createPollResponse.id]);
      } catch (error) {
        console.log('Error updating poll likes:', error);
      }
    };

    if (pollID && numOfPollLikes) {
      updateLikesInDatabase();
    }
  }, [numOfPollLikes]);

  const handleOptionPress = (index) => {
    if (index !== selectedOption) {
      const updatedPollItems = [...pollItems];
      updatedPollItems[index].votes += 1;
      if (selectedOption !== null) {
        updatedPollItems[selectedOption].votes -= 1;
      }
      setPollItems(updatedPollItems);
      setTotalNumOfVotes(totalNumOfVotes + 1);
      setSelectedOption(index);
    }
  };

  useEffect(() => {
    const updatePollItems = async () => {
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
    };

    if (selectedOption !== null) {
      updatePollItems();
    }
  }, [selectedOption]);

  const handleCommentSubmit = async () => {
    try {
      await API.graphql(graphqlOperation(createPollComment, {
        input: {
          pollID: pollID,
          userID: localUserID,
          comment: comment,
        },
      }));

      const commentResponse = await API.graphql(graphqlOperation(createPollResponse, {
        input: {
          pollID: pollID,
          userID: localUserID,
          caption: `${localUserName} has commented on your poll!`,
        },
      }));

      setNotificationPollCommentResponseArray(prev => [...prev, commentResponse.data.createPollResponse.id]);
      setComment("");
    } catch (error) {
      console.log('Error submitting comment:', error);
    }
  };

  const handleSubmitPollResponse = () => {
    if (!isLikeIconClicked || selectedOption === null || !comment) {
      Alert.alert("You must like, vote, and comment to submit your response.");
      return;
    }

    onClose();
  };

  useEffect(() => {
  const updateNotificationInDatabase = async () => {
    if (notificationID) {  // Ensure we have the notification ID before updating
      try {
        await API.graphql(graphqlOperation(updateNotification, {
          input: {
            id: notificationID,  // The ID of the notification to update
            pollResponsesArray: notificationPollItemResponseArray,
            pollLikeResponseArray: notificationPollLikeResponseArray,
            pollCommentsArray: notificationPollCommentResponseArray,
          },
        }));
        console.log('Notification updated successfully');
      } catch (error) {
        console.log('Error updating notification:', error);
      }
    }
  };

  // Trigger the notification update whenever any of the response arrays change
  if (
    notificationPollItemResponseArray.length > 0 || 
    notificationPollLikeResponseArray.length > 0 || 
    notificationPollCommentResponseArray.length > 0
  ) {
    updateNotificationInDatabase();
  }
}, [notificationPollItemResponseArray, notificationPollLikeResponseArray, notificationPollCommentResponseArray, notificationID]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity onPress={onClose}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <LinearGradient
        colors={['#EE8B94', '#0038FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientContainer}
      >
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.pollLikesContainer} onPress={handleLikedIconClick}>
            <Text style={styles.userNameText}>@{pollReception?.userName}</Text>
            <FontAwesome name={isLikeIconClicked ? 'heart' : 'heart-o'} size={36} color={isLikeIconClicked ? 'red' : '#1764EF'} style={styles.pollLikeIcon} />
            <Text style={styles.numOfPollLikes}>{numOfPollLikes}</Text>
          </TouchableOpacity>

          <View>
            <Text style={styles.question}>{pollReception?.pollCaption}</Text>
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
            <TouchableOpacity onPress={handleCommentSubmit}>
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
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFF",
    marginTop: 5,
    borderRadius: 29,
  },
  innerContainer: {
    height: 450,
    padding: 16,
    backgroundColor: "#FFFF",
    borderRadius: 29,
  },
  pollLikesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pollLikeIcon: {
    marginLeft: 100,
  },
  numOfPollLikes: {
    marginLeft: -25,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 12,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  commentInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 13,
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
