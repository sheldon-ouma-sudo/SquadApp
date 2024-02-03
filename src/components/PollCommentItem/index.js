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
      {/* You can replace the placeholder image with the user's profile image */}
      {/* <Image source={require('/path/to/user-image.png')} style={styles.userImage} /> */}
      <Image
        source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
        resizeMode='contain'
        style={styles.userImage}
        />
      <Text style={styles.username}>{comment.username}</Text>
    </View>
  {/* view for the comment and the like button  */}
  <TouchableOpacity>
    {/* the comment component*/}
   <TouchableOpacity>

   </TouchableOpacity>
  </TouchableOpacity>
    {/* Comment content */}
    <Text style={styles.commentText}>{comment.comment}</Text>

    {/* Likes and Replies */}
    <View style={styles.likesRepliesContainer}>
      <TouchableOpacity style={styles.iconContainer}>
        <FontAwesome name="heart-o"  size={20} color="black" style={{marginLeft:257, marginTop:-20}} />
        <Text style={styles.likesCount}>{comment.likes}</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.iconContainer}>
        <FontAwesome name="reply" size={20} color="#1764EF" />
        <Text style={styles.repliesCount}>{comment.replies}</Text>
      </TouchableOpacity> */}
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
      commentText: {
        fontSize: 16,
        marginTop: 5,
      },
      likesRepliesContainer: {
        // flexDirection: 'row',
        // alignItems: 'center',
      },
      iconContainer: {
        //flexDirection: 'row',
        //alignItems: 'center',
        //marginRight: 30,
        marginLeft: 10
      },
      likesCount: {
        marginLeft: 259,
      },
      repliesCount: {
        marginLeft: 5,
      },
    });
export default  PollCommentList