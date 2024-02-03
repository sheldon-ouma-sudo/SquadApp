import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { FontAwesome } from '@expo/vector-icons';

const PollCommentList = ({comment }) => {
  const commentsData = [
    {
      id: 1,
      username: 'User1',
      comment: 'This is a great comment.',
      likes: 10,
      replies: 5,
    },
    {
      id: 2,
      username: 'User2',
      comment: 'I really enjoyed reading this.',
      likes: 15,
      replies: 3,
    },
    {
      id: 3,
      username: 'User3',
      comment: 'Interesting perspective.',
      likes: 8,
      replies: 2,
    },
    {
      id: 4,
      username: 'User4',
      comment: 'Awesome conversation!',
      likes: 20,
      replies: 7,
    },
    {
      id: 5,
      username: 'User5',
      comment: 'No woman no cry, me say you don know',
      likes: 12,
      replies: 4,
    },
  ];

  return (
    <View style={styles.commentContainer}>
      {/* User image and username */}
      <View style={styles.userInfoContainer}>
        <Image
          source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
          resizeMode='contain'
          style={styles.userImage}
        />
        <Text style={styles.username}>{comment.username}</Text>
      </View>

      {/* Parent view for the comment and the like button */}
      <View style={styles.commentAndLikeContainer}>
        {/* Comment component and content */}
        <View style={styles.commentContainer}>
          <Text style={styles.commentText}>{comment.comment}</Text>
        </View>

        {/* Like component */}
        <TouchableOpacity style={styles.likeButtonContainer}>
          <FontAwesome name="heart-o" size={20} color="black" />
          <Text style={styles.likesCount}>{comment.likes}</Text>
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