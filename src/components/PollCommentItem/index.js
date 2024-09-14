import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useUserContext } from '../../../UserContext';
import { getUser, notificationsByUserID,} from '../../graphql/queries';
import { API, graphqlOperation } from "aws-amplify";
import { updateNotification, updatePollComment, createPollCommentResponse} from '../../graphql/mutations';

import { FontAwesome } from '@expo/vector-icons';

const PollCommentList = ({comment, pollCreator, poll }) => {
  const [isLikeIconClicked, setIsLikeIconClicked] = useState(false); // Track whether the comment is liked
  const [numOfCommentLikes, setNumOfCommentLikes] = useState(comment.numOfLikes || 0);
  const [commentorID, setCommentorID] = useState("")
  const [userName, setUserName ] = useState("")
  const [pollCratorID, setPollCreatorID] = useState()
  const [userProfilePicture, setUserProfilePicture] = useState("")
  const [localUserName, setLocalUserName] = useState("")
  const {user} = useUserContext()

     
    useEffect(()=>{
        if(pollCreator){
          const pollCreatorID = pollCreator.id
          const pollCommentorID = comment.userID 
          setCommentorID(pollCommentorID)
          setPollCreatorID(pollCreatorID)
        }
        if(user){
          setLocalUserName(user.userName)
        }
     }, [pollCreator, user])

    useEffect(async()=>{
      if(comment){
        const commentorInfoResults = await API.graphql(graphqlOperation,(getUser, {id: commentorID}))
        if(commentorInfoResults.data?.getUser){
          const user = commentorInfoResults.data?.getUser
          const commentorUserName = user.userName;
          const commentorProfilePicture = user.userProfilePicture
          setUserName(commentorUserName);
          setUserProfilePicture(commentorProfilePicture)
        }
      }
    }, [comment])

  const handleLikeClick = async () => {
    const updatedLikes = isLikeIconClicked ? numOfCommentLikes - 1 : numOfCommentLikes + 1;
    setIsLikeIconClicked(!isLikeIconClicked);
    setNumOfCommentLikes(updatedLikes);

    try {
      // Update the comment's number of likes in the backend
      await API.graphql(graphqlOperation(updatePollComment, {
        input: {
          id: comment.id, // Comment ID
          numOfLikes: updatedLikes, // Updated number of likes
        }
      }));
     
      const pollCommentResponseCreationResults = await API.graphql(graphqlOperation(createPollCommentResponse,{
        input: {
          pollID: poll.id,
          userID: user.id, 
          pollCommentID: comment.id, 
          caption: `${localUserName} has liked your comment!`         
}}))
      const pollCommentResponseID = pollCommentResponseCreationResults.data?.createPollCommentResponse
      const notificationQueryResults = API.graphql(graphqlOperation(notificationsByUserID,{userID: commentorID}))
      const notification = await notificationQueryResults.data?.notificationsByUserID.items[0]
      await API.graphql(graphqlOperation(updateNotification,{input:{
        id: notification.id, 
        pollCommentLikeArray: [...(notification.pollCommentLikeArray || []), pollCommentResponseID ]
      }} ))
    } catch (error) {
      console.error("Error updating comment likes:", error);
    }
  };
  return (
    <View style={styles.commentContainer}>
      {/* User image and username */}
      <View style={styles.userInfoContainer}>
        <Image
          source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}// we want to fix the profile picture if it's available
          resizeMode='contain'
          style={styles.userImage}
        />
        <Text style={styles.username}>{userName}</Text>
      </View>

      {/* Parent view for the comment and the like button */}
      <View style={styles.commentAndLikeContainer}>
        {/* Comment component and content */}
        <View style={styles.commentContainer}>
          <Text style={styles.commentText}>{comment.comment}</Text>
        </View>

        {/* Like component */}
        <TouchableOpacity 
        onPress={handleLikeClick}
        style={styles.likeButtonContainer}>
        <FontAwesome name={isLikeIconClicked ? 'heart' : 'heart-o'} size={20} color={isLikeIconClicked ? 'red' : 'black'} />
          <Text style={styles.likesCount}>{numOfCommentLikes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

   const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
    borderBottomWidth: 0.1,
    //borderBottomColor: '#ccc',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  commentAndLikeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Align items to each end
    marginTop: 5,
  },
  commentContainer: {
    flex: 1, // Take as much space as possible
  },
  commentText: {
    fontSize: 16,
  },
  likeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  likesCount: {
    marginLeft: 5,
  },
});

export default  PollCommentList