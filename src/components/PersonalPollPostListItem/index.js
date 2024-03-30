import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const PersonalPollListItem = ({ poll }) => {
  const [pollCreator, setPollCreator] = useState('@superDuperBostoner');
  const [numOfPollLikes, setNumOfPollLikes] = useState('0');
  const [isLikeCommentIconClicked, setIsLikeCommentIconClicked] = useState(true);
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    console.log(poll)
    setNumOfPollLikes(poll.numOfLikes);
    // Assuming you have some method to fetch poll creator
    // setPollCreator(poll.creator); 
  }, [poll]);

  const handleLickedIconClick = () => {
    setIsLikeCommentIconClicked(!isLikeCommentIconClicked);
  };

  const handlePollItemPress = () => {
    // Navigate to the screen with the poll
    navigation.navigate('PersonalPollDisplayScreen', { pollID: poll.id });
  };

  return (
    <LinearGradient
      colors={['#EE8B94', '#0038FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
      <TouchableOpacity style={styles.container} onPress={handlePollItemPress}>
        <View style={styles.userName}>
          <Text style={styles.userNameText}>@{pollCreator}</Text>
        </View>
        <View>
          <Text style={styles.question}>{poll.pollCaption}</Text>
        </View>
        <View style={styles.pollLikesContainer} onPress={handleLickedIconClick}>
          <FontAwesome
            name={isLikeCommentIconClicked ? 'heart-o' : 'heart'}
            size={26}
            color='black'
          />
          <Text style={styles.numOfpollLikes}>{numOfPollLikes}</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    //borderWidth: 2,
    borderRadius: 29,
    marginVertical:30,
    //marginEnd:10

  },
  container: {
    flex:1,
    padding: 16,
    backgroundColor: "#FFFF",
    marginTop:5,
    //borderWidth: 5,
    borderRadius: 29,
    marginBottom:4,
    marginStart:5,
    marginEnd:4,
    width:390
   // borderColor: '#0038FF'
    //marginVertical:135,
  },
  userImageContainer:{
    //marginStart:10,
    marginTop:-20,
    marginLeft: -10
   },
   userImage:{
       width:50,
       height:70
   },
   userName:{
   marginLeft: 0,
   marginTop:-45,
   marginBottom:50
   },
   userNameText:{
   fontSize:19,
   fontWeight:'200',
   marginLeft: 40
   },
  question: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: -25
    
  },
  pollCaptionContainer:{
   marginLeft:-10,
   marginRight:10
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
    marginLeft:320,
    //marginTop:15
  },
  numOfpollLikes:{
    marginLeft:10,
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
});

export default PersonalPollListItem;
