import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList, Image } from 'react-native';
import Animated, { EasingNode } from 'react-native-reanimated';
import { getUser } from '../../graphql/queries';
import { API, graphqlOperation } from "aws-amplify";
import { FontAwesome } from '@expo/vector-icons';
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import PollCommentItem from '../PollCommentItem/index'
import Modal from 'react-native-modal';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { Value, timing } = Animated;

const PollListItem = ({ poll, }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [animationValue] = useState(new Value(0));
  const [pollItems, setPollItems] = useState([]);
  const [pollCreator, setPollCreator] = useState('@superDuperBostoner');
  const [numOfPollComments, setNumOfPollComment] = useState('500');
  const [isModalVisible, setModalVisible] = useState(false);
  const [numOfPollLikes, setNumOfPollLikes] = useState('');
  const [isLikeCommentIconClicked, setIsLikeCommentIconClicked] = useState(true);
  const [bottomSheetModalVisible, setBottomSheetModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState(null);
  const [isCommentsVisible, setCommentsVisible] = useState(false);



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
   
  const toggleComments = () => {
    setCommentsVisible(!isCommentsVisible);
    // Set static comments data when the comments are made visible
    if (!isCommentsVisible) {
      setComments(commentsData);
    } else {
      setComments([]); // Reset comments when hiding the comments
    }
  };

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentItem}>
      <PollCommentItem comment={item}/>
    </View>
  );

 
  useEffect(() => {
    setNumOfPollLikes(poll.numOfLikes);
    console.log("this is the number of poll likes",poll.numOfLikes)
    try {
      const parsedPollItems = JSON.parse(poll.pollItems || "[]"); // Parse the string
      console.log("here are the parsed poll items: ",parsedPollItems)
      setPollItems(parsedPollItems);
      setSelectedOption(0);
      const initialSelectedOption = parsedPollItems[0];
      animateVotePercentage(initialSelectedOption?.votes / poll.totalNumOfVotes || 0);
    } catch (error) {
      console.log('Error parsing poll items:', error);
    }
  }, [poll]);

  const handleOptionPress = (index) => {
    setSelectedOption(index);
    try {
      const pollItem = pollItems[index];
      console.log('pollItem is as follows: ', pollItem);
      if (pollItem.votes !== undefined && poll.totalNumOfVotes !== undefined) {
        const percentage = poll.totalNumOfVotes > 0 ? pollItem.votes / poll.totalNumOfVotes : 0;
        animateVotePercentage(percentage);
        console.log('the percentage is as follows: ', percentage);
      } else {
        console.log('Error: Votes data is undefined.');
      }
    } catch (error) {
      console.log('Error parsing poll item:', error);
    }
  };

  const animateVotePercentage = (percentage) => {
    if (!isNaN(percentage)) {
      timing(animationValue, {
        toValue: percentage,
        duration: 600,
        easing: EasingNode.inOut(EasingNode.ease),
      }).start();
    } else {
      console.log('Invalid percentage value:', percentage);
    }
  };
  

  const handleLickedIconClick = () => {
    setIsLikeCommentIconClicked(!isLikeCommentIconClicked);
    // Additional logic or state updates can be added here
  };
  const renderOption = ({ item, index }) => {
    const isSelected = selectedOption === index;
    const pollItem = item; // Each item is a poll option
    const votes = pollItem.votes;
    const optionText = pollItem.title;

  
    return (
      <View>
        <Text style={styles.optionText}>{optionText}</Text>
        <TouchableOpacity
          style={[styles.optionContainer, isSelected && styles.selectedOption]}
          onPress={() => handleOptionPress(index)}
        >
          <Animated.View
            style={[
              styles.percentageBar,
              {
                width: animationValue.interpolate({
                  inputRange: [0, 0.3],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
          <Text style={styles.percentageText}>
            {selectedOption === index
              ? 'Voted!'
              : `${((votes / poll.totalNumOfVotes) * 100).toFixed(2)}%`}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View
          style={styles.userImageContainer}
          >
              <Image
               source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
               resizeMode='contain'
                style={styles.userImage}
                />
        </View>
      <TouchableOpacity
      style={styles.userName}
      >
      <Text
      style={styles.userNameText}
      >{pollCreator}</Text>
      </TouchableOpacity>
      <Text style={styles.question}>{poll.pollCaption}</Text>
      <TouchableOpacity>
      <FlatList
        data={pollItems} // Use pollItems instead of poll.pollItems
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderOption}
     />
      </TouchableOpacity>
      
     {/* component holding for the comment icon */}
    <TouchableOpacity
        style={styles.pollCommentContainer}
        onPress={toggleComments}
      >
        <FontAwesome name="commenting-o" size={35} color="#black" style={styles.pollCommentIcon} />
        <Text style={styles.numOfpollComments}>{numOfPollComments}</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.pollLikesContainer}
      onPress={handleLickedIconClick}
      >
      {/* <FontAwesome name="heart-o" size={44} color="#1764EF" style={styles.pollCommentIcon} /> */}
      <FontAwesome
          name={isLikeCommentIconClicked? "heart-o"  : 'heart'}
          size={36}
          color={isLikeCommentIconClicked ? "#1764EF" : 'red'}
          style={styles.pollCommentIcon}
        />
      <Text
      style={styles.numOfpollLikes}
      >{poll.numOfLikes}</Text>
      </TouchableOpacity>
       {/* Comments Section */}
       <View style={{ height: isCommentsVisible ? 'auto' : 0, overflow: 'hidden' }}>
       <Text style={styles.numOfCommentsText}>{comments.length} Comments</Text>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCommentItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#D8E8F3",
    marginTop:20,
    borderWidth: 5,
    borderRadius: 29,
    marginVertical:135
  },
  userImageContainer:{
    marginStart:10,
    marginTop:10
   },
   userImage:{
       width:50,
       height:70
   },
   userName:{
   marginLeft: 60,
   marginTop:-45,
   marginBottom:50
   },
   userNameText:{
   fontSize:19,
   fontWeight:'200'
   },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionContainer: {
    marginBottom: 16,
    padding: 10,
    //borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 28,
    backgroundColor:'#ffff'
  },
  selectedOption: {
   //backgroundColor: '#add8e6', // Light blue for selected option
   backgroundColor: '#1764EF'
  },
  optionText: {
    fontSize: 19,
    marginBottom: 12,
    fontWeight:'700',
    marginLeft:125,
  },
  percentageBar: {
    height: 60,
    backgroundColor: '#1764EF', // Medium aquamarine for the percentage bar
    borderRadius: 29,
    marginBottom: 4,
    marginLeft:-10,
    marginTop:-8

  },
  percentageText: {
    fontSize: 12,
    color: '#ffff',
    fontWeight:'600',
    marginTop: -36,
    marginLeft:20
  },
  pollCommentContainer:{
   marginTop:20,
  },
  pollCommentIcon:{
   marginLeft:20,
  },
  numOfpollComments:{
    fontSize: 15,
    marginLeft:18,
    marginTop:5,
   // fontWeight:'400'
  },
  pollLikesContainer:{
    marginLeft:280,
    marginTop:-65
  },
  numOfpollLikes:{
    marginLeft:30,
    marginTop:5,
    fontSize:20,
    fontWeight:'400'
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
    marginLeft: 130,
    marginTop: 20
    //color: '#1764EF', // Adjust the color based on your design
  },
});

export default PollListItem;
