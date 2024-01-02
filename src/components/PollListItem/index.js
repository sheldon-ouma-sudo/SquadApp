import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList, Image } from 'react-native';
import Animated, { EasingNode } from 'react-native-reanimated';
import { getUser } from '../../graphql/queries';
import { API, graphqlOperation } from "aws-amplify";
import { FontAwesome } from '@expo/vector-icons';
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import CommentSheet from '../PollCommentItem/index.js';
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
  const [isLikeCommentIconClicked, setIsLikeCommentIconClicked] = useState(false);
  const [bottomSheetModalVisible, setBottomSheetModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);


  const commentsData = [
    {"id": 1, "comment": "This is a great comment."},
    {"id": 2, "comment": "I really enjoyed reading this."},
    {"id": 3, "comment": "Interesting perspective."},
    {"id": 500, "comment": "Awesome conversation!"},
    {'id': 15, 'comment': 'Velit dolore quisquam ut ut tempora porro sed.'}
  ];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  
  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };

  const handlePanGesture = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      // Close the modal when swiped down
      toggleModal();
    }
  };

  const handleLickedIconClick = () => {
    setIsLikeCommentIconClicked(!isLikeCommentIconClicked);
    // Additional logic or state updates can be added here
  };

 
  useEffect(() => {
    setNumOfPollLikes(poll.numOfLikes);
  
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
      <FlatList
        data={pollItems} // Use pollItems instead of poll.pollItems
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderOption}
     />
    <TouchableOpacity
        style={styles.pollCommentContainer}
        onPress={toggleBottomSheet}
      >
        <FontAwesome name="commenting-o" size={44} color="#black" style={styles.pollCommentIcon} />
        <Text style={styles.numOfpollComments}>{numOfPollComments}</Text>
      </TouchableOpacity>
      <CommentSheet isVisible={bottomSheetVisible} onClose={toggleBottomSheet} />
       {/* Bottom Sheet Modal */}
       {/* <BottomSheetModal
        index={0}
        snapPoints={['0%', '60%']}
        onChange={(index) => {
          // Handle modal visibility changes if needed
          console.log('Modal visibility changed:', index);
        }}
        backgroundComponent={() => (
          <TouchableOpacity
            style={styles.modalBackground}
            activeOpacity={1}
            onPress={toggleBottomSheetModal}
          />
        )}
      >
        <BottomSheetFlatList
          data={commentsData} // Pass your comments data here
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentItem}>
              <Text>{item.comment}</Text>
            </View>
          )}
        />
    </BottomSheetModal> */}

      {/* <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
        <PanGestureHandler onGestureEvent={handlePanGesture}>
          <Animated.View style={styles.bottomSheet}>
            {/* Render Comments */}
            {/* <PollCommentList commentsData={commentsData} />
          </Animated.View>
        </PanGestureHandler>
      </Modal> */} 
      <TouchableOpacity
      style={styles.pollLikesContainer}
      onPress={handleLickedIconClick}
      >
      {/* <FontAwesome name="heart-o" size={44} color="#1764EF" style={styles.pollCommentIcon} /> */}
      <FontAwesome
          name={isLikeCommentIconClicked? "heart-o"  : 'heart'}
          size={50}
          color={isLikeCommentIconClicked ? "#1764EF" : 'red'}
          style={styles.pollCommentIcon}
        />
      <Text
      style={styles.numOfpollLikes}
      >{poll.numOfLikes}</Text>
      </TouchableOpacity>
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
    fontSize: 19,
    marginLeft:18,
    marginTop:5,
    fontWeight:'700'
  },
  pollLikesContainer:{
    marginLeft:250,
    marginTop:-65
  },
  numOfpollLikes:{
    marginLeft:30,
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
  
});

export default PollListItem;
