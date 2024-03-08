import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList, Image } from 'react-native';
import Animated, { EasingNode } from 'react-native-reanimated';
import { getUser } from '../../graphql/queries';
import { API, graphqlOperation } from "aws-amplify";
import { FontAwesome } from '@expo/vector-icons';
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import PollCommentItem from '../PollCommentItem/index'
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { Value, timing } = Animated;

const PersonalPollListItem = ({ poll, }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [animationValues, setAnimationValues] = useState([]);
  const [pollItems, setPollItems] = useState([]);
  const [pollCreator, setPollCreator] = useState('@superDuperBostoner');
  const [numOfPollComments, setNumOfPollComment] = useState('500');
  const [numOfPollLikes, setNumOfPollLikes] = useState('0');
  const [isLikeCommentIconClicked, setIsLikeCommentIconClicked] = useState(true);
  const [comments, setComments] = useState([]);
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [totalNumOfVotes, setTotalNumOfVotes] = useState(0);
  const[pollCreatorID, setPollCreatorID ] = useState("")
  const [prevSelectedOption, setPrevSelectedOption] = useState(null);
  const[pollID, setPollID] = useState("")

  const insets = useSafeAreaInsets(); 
 

// Inside your component

  useEffect(() => {
    //console.log(poll)
    setNumOfPollLikes(poll.numOfLikes);
    //setNumOfPollComment(commentsData.length)
    setTotalNumOfVotes(poll.totalNumOfVotes || 0);
    setPollCreatorID(poll.userID)
    setPollID(poll.id)
    //console.log("the total num of votes from the backend is: ",poll.totalNumOfVotes)
    try {
      const parsedPollItems = JSON.parse(poll.pollItems || '[]'); // Parse the string
      setPollItems(parsedPollItems);

      const initialAnimationValues = parsedPollItems.map(() => new Value(0));
      setAnimationValues(initialAnimationValues);

      setSelectedOption(null);
      const initialSelectedOption = parsedPollItems[0];
      animateVotePercentage(
        initialSelectedOption.votes / poll.totalNumOfVotes || 0,
        0
      );
    } catch (error) {
      console.log('Error parsing poll items:', error);
    }
   const getPollCreater = async () => {
    try {
      const pollCreatorInfo = await API.graphql(graphqlOperation(getUser, { id: pollCreatorID }));
      console.log("this is the poll creator info",pollCreatorInfo.data?.getUser.userName)
      setPollCreator(pollCreatorInfo.data?.getUser.userName)
    } catch (error) {
      console.log("error fetching the poll creator", error)
    }

   }
  getPollCreater()
  }, [poll, pollCreatorID]);

  useEffect(() => {
    if (selectedOption !== null) { 
      setIsOptionSelected(true);
    } else {
      setIsOptionSelected(false);
    }
  }, [selectedOption]);  

  
  
  const handleLickedIconClick = () => {
    setIsLikeCommentIconClicked(!isLikeCommentIconClicked);
  };


  return (
    <LinearGradient
    colors={['#EE8B94', '#0038FF']} // Adjust the gradient colors as per your preference
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
    >
    <TouchableOpacity style={styles.container}>

      <TouchableOpacity style={styles.userName}>
        <Text style={styles.userNameText}>@{pollCreator}</Text>
      </TouchableOpacity>
      <TouchableOpacity>
      <Text style={styles.question}>{poll.pollCaption}</Text>
      </TouchableOpacity>


      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingTop: insets.top + 10, marginTop:-30,  }}>
                <TouchableOpacity 
                style = {styles.pollCaptionContainer}
                onPress={()=>navigation.navigate('PersonalPollDisplayScreen',{pollID:pollID})}
                >
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.pollLikesContainer}
                    onPress={handleLickedIconClick}
                 >
                    <FontAwesome
                    name={isLikeCommentIconClicked ? 'heart-o' : 'heart'}
                    size={26}
                    color='black'
                    //{isLikeCommentIconClicked ? '#1764EF' : 'red'}
                    style={styles.pollCommentIcon}
                    />
                    <Text style={styles.numOfpollLikes}>{numOfPollLikes}</Text>
                </TouchableOpacity>

       </TouchableOpacity>
      
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
    marginLeft:240,
    marginTop:-75
  },
  numOfpollLikes:{
    marginLeft:20,
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
