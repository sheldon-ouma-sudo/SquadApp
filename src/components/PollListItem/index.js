import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList, Image, Alert, TextInput } from 'react-native';
import Animated, { EasingNode } from 'react-native-reanimated';
import { getUser, pollCommentsByPollID } from '../../graphql/queries';
import { API, graphqlOperation } from "aws-amplify";
import { FontAwesome } from '@expo/vector-icons';
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import PollCommentItem from '../PollCommentItem/index'
import { LinearGradient } from 'expo-linear-gradient';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { Value, timing } = Animated;

const PollListItem = ({ poll, }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [animationValues, setAnimationValues] = useState([]);
  const [pollItems, setPollItems] = useState([]);
  const [pollCreator, setPollCreator] = useState('@superDuperBostoner');
  const [numOfPollComments, setNumOfPollComment] = useState('500');
  const [numOfPollLikes, setNumOfPollLikes] = useState('0');
  const [isLikeIconClicked, setIsLikeIconClicked] = useState(true);
  const [comments, setComments] = useState([]);
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [totalNumOfVotes, setTotalNumOfVotes] = useState(0);
  const[pollCreatorID, setPollCreatorID ] = useState("")
  const [pollCreatorInfo, setPollCreatorInfo] = useState()
  const[optionClicked, setOptionClicked] = useState(false)
  const[pollID, setPollID] = useState()
  const [prevSelectedOption, setPrevSelectedOption] = useState(null);
  const [newComment, setNewComment] = useState('');
  const animations = useRef([]);
  const navigation  = useNavigation()


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
            setComments([]); 
          }
        };

       const renderCommentItem = ({ item }) => (
          <View style={styles.commentItem}>
            <PollCommentItem comment={item} />
          </View>
        );

        useEffect(() => {
          //console.log(poll)
          setNumOfPollLikes(poll.numOfLikes);
          setNumOfPollComment(commentsData.length)
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
            const pollCreatorInfoQuery = await API.graphql(graphqlOperation(getUser, { id: pollCreatorID }));
            setPollCreator(pollCreatorInfoQuery.data?.getUser.userName)
            setPollCreatorInfo(pollCreatorInfoQuery.data?.getUser)
          } catch (error) {
            console.log("error fetching the poll creator", error)
          }

        }
        getPollCreater()
        }, [poll, pollCreatorID]);

        useEffect(() => {
          // Fetch comments when component mounts or when pollID changes
          const fetchComments = async () => {
            try {
              if (pollID) {
                console.log("here is the pollID", pollID)
                // const response = await API.graphql(graphqlOperation(pollCommentsByPollID, {
                //   pollID: pollID
                // }));
                const results = await API.graphql(graphqlOperation(pollCommentsByPollID, {
                  pollID: pollID
                }))
                //setComments(response.data?.pollCommentsByPollID?.items || []);
                console.log(results)
              }
            } catch (error) {
              console.log('Error fetching comments:', error);
            }
          };
      
          fetchComments(); // Fetch comments initially
        }, [pollID]);
      


        useEffect(() => {
          if (selectedOption !== null) { 
            setIsOptionSelected(true);
          } else {
            setIsOptionSelected(false);
          }
        }, [selectedOption]);  

        const getOptionTextStyle = () => ({
          color: optionClicked ? 'black' : 'white',
          fontSize: 16,
          marginBottom: 20,
          fontWeight:'700',
          marginLeft:135,
          // color: "black",
          marginTop:-30
        });
      
        const getSelectedOptionTextStyle = () => ({
          color: optionClicked ? 'white' : 'black',
          fontSize: 16,
          marginBottom: 12,
          fontWeight:'700',
          marginLeft:125,
          // color: "white"
        });
        const handleOptionPress = (index) => {
          setOptionClicked(true)
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
            animateAllOptions(index);
          }
        };
        
        useEffect(() => {
          return () => {
            // Stop and reset all animations
            animationValues.forEach((value, index) => {
              if (animations[index]) {
                animations[index].stop();
              }
              value.setValue(0);
            });
          };
        }, [animationValues]);
        


        const animateVotePercentage = (percentage, index, isSelected) => {
          if (!isNaN(percentage)) {
            timing(animationValues[index], {
              toValue: percentage, // Use the calculated percentage directly
              duration: 600,
              easing: EasingNode.inOut(EasingNode.ease),
            }).start();
          } else {
            console.log('Invalid percentage value:', percentage);
          }
        };
        


        const animateAllOptions = (selectedOptionIndex) => {
          pollItems.forEach((pollItem, i) => {
            const percentage = calculatePercentage(pollItem.votes, totalNumOfVotes);
            animateVotePercentage(percentage, i, i === selectedOptionIndex);
          });
        };
        

        const calculatePercentage = (votes) => {
        console.log(`Votes: ${votes}, Total Votes: ${totalNumOfVotes}`);
        return totalNumOfVotes > 0 ? (votes / totalNumOfVotes) * 100 : 0;
      };

        const handleLickedIconClick = () => {
          setIsLikeIconClicked(!isLikeIconClicked);
          setNumOfPollLikes(prevLikes => (isLikeIconClicked ? prevLikes +1 : prevLikes -1));

        };
          // Function to handle navigation when the username is clicked
          const handleUsernamePress = () => {
            // Ensure pollCreatorInfo is defined before navigating
            if (pollCreatorInfo) {
              navigation.navigate('GeneralUserProfileScreenPage', { userInfo: pollCreatorInfo });
            }
          };

        const handleAddComment = () => {
          if (newComment.trim() === '') {
            return; // Don't add empty comments
          }

          const newCommentObj = {
            id: comments.length + 1,
            username: 'CurrentUser', // Change this to the current user's username
            comment: newComment,
            likes: 0,
          };

          setComments([...comments, newCommentObj]); // Add new comment
          setNewComment(''); // Clear the input
        };

        return (
          <LinearGradient
          colors={['#EE8B94', '#0038FF']} // Adjust the gradient colors as per your preference
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
          >
          <View style={styles.container}>
            
            <View style={styles.userImageContainer}>
              <Image
                source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
                resizeMode="contain"
                style={styles.userImage}
              />
            </View>
            <TouchableOpacity 
            onPress={handleUsernamePress}
            style={styles.userName}>
              <Text style={styles.userNameText}>@{pollCreator}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={styles.question}>{poll.pollCaption}</Text>
            {pollItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionContainer,
                  selectedOption === index && styles.selectedOption,
                ]}
                onPress={() => handleOptionPress(index)}
              >

                <Text style={getOptionTextStyle()}>{item.title}</Text>
                <Text style={getSelectedOptionTextStyle() }>{item.title}</Text>
                <View style={styles.percentageContainer}>
                  <Animated.View
                    style={[
                      styles.percentageBar,
                      {
                        width: animationValues[index].interpolate({
                          inputRange: [0, 10.0],
                          outputRange: ['0.0%', '35.0%'],
                        }),
                      },
                    ]}
                  />
                  {isOptionSelected && (
                    <Text style={styles.percentageText}>
                      {`${calculatePercentage(item.votes).toFixed(2)}%`}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
            </TouchableOpacity>

            {/* component holding for the comment icon */}
            <TouchableOpacity
                style={styles.pollCommentContainer}
                onPress={toggleComments}
              >
              <View style={styles.commentIconImageContainer}>
              <Image
                source={require('/Users/sheldonotieno/Squad/assets/comments.png')}
                resizeMode="contain"
                style={styles.commentIconImage}
              />
              </View>
              </TouchableOpacity>
            <View
            style={{marginLeft:5}}
            >
            <Text style={styles.numOfpollComments}>{numOfPollComments}</Text>
            </View>
            <TouchableOpacity
                style={styles.pollLikesContainer}
                onPress={handleLickedIconClick}
              >
                <FontAwesome
                  name={isLikeIconClicked ? 'heart-o' : 'heart'}
                  size={46}
                  color={isLikeIconClicked ? 'black' : 'red'}
                  style={styles.pollLikeIcon}
                />
                <Text style={styles.numOfpollLikes}>{numOfPollLikes}</Text>
              </TouchableOpacity>

            {/* Comments Section */}
            <View style={{ height: isCommentsVisible ? 'auto' : 0, overflow: 'hidden' }}>
              <Text style={styles.numOfCommentsText}>{comments.length} Comments</Text>
              <FlatList
                data={comments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderCommentItem}
                contentContainerStyle={{ paddingBottom: 10 }} 
              />
              <View style={styles.addCommentContainer}>
              <TextInput
                style={styles.commentInput}
                value={newComment}
                onChangeText={setNewComment}
                placeholder="Add a comment..."
              />
              <TouchableOpacity onPress={handleAddComment} style={styles.addCommentButton}>
                <FontAwesome name="send" size={20} color="black" />
              </TouchableOpacity>
            </View>
            </View>
          </View>
          </LinearGradient>
        );
      };


      const styles = StyleSheet.create({
        gradientContainer: {
          //borderWidth: 2,
          borderRadius: 29,
          marginVertical:30,
          // marginHorizontal:10, 
          // marginEnd:10, 

        },
        container: {
          flex:1,
          padding: 16,
          backgroundColor: "#FFFF",
          marginTop:5,
          //borderWidth: 5,
          borderRadius: 29,
          marginBottom:5,
          marginStart:5,
          marginEnd:5
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
        commentIconImageContainer:{
          //marginStart:10,
          marginBottom:-20,
          marginLeft: 10,
          marginTop:20
        },
        commentIconImage:{
            width:60,
            height:80
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
          fontSize: 19.5,
          fontWeight: 'bold',
          marginBottom: 35,
          marginTop: -25
          
        },
        optionContainer: {
          marginBottom: 30,
          padding: 5,
          borderColor: '#ccc',
          borderRadius: 28,
          backgroundColor: '#ffff',
          borderColor: 'black',
          borderWidth: 1,
          height: 50,
          width: 350, // Adjust the width as per your requirement
        },

        selectedOption: {
        backgroundColor: '#add8e6', // Light blue for selected option
        //backgroundColor: '#1764EF'
        },
         optionText: {
          fontSize: 16,
          marginBottom: 20,
          fontWeight:'700',
          marginLeft:135,
          color: "black",
          marginTop:-30

        },
        selectedOptionText: {
          fontSize: 16,
          marginBottom: 12,
          fontWeight:'700',
          marginLeft:125,
          color: "white"
        },
        // percentageContainer:{
        //   marginLeft:50
        // },
        pollLikeIcon:{
          marginLeft:-3,
          //size:44
        },
        percentageBar: {
          height: 50,
          backgroundColor: '#1764EF',
          borderRadius: 29,
          width: 30, // Adjust the width as per your requirement
          alignSelf: 'flex-start',
          marginBottom: 4,
          marginTop: -48,
          marginLeft: -7,
          overflow: 'hidden',
        },
        percentageText: {
          fontSize: 15,
          color: 'white',
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
          marginLeft:12,
          marginTop:5,
        // fontWeight:'400'
        },
        pollLikesContainer:{
          marginLeft:280,
          marginTop:-85
        },
        numOfpollLikes:{
          marginLeft:15,
          marginTop:5,
          fontSize:25,
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
        commentsSection: {
          height: 200, // Set a fixed height to ensure scrollability
          overflow: 'hidden',
        },
        addCommentContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft:-10,
          width:360,
          padding: 10,
        },

        commentInput: {
          flex: 1,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 10,
          padding: 10,
        },
        addCommentButton: {
          backgroundColor: '#f0f0f0',
          padding: 10,
          borderRadius: 10,
          marginLeft: 10,
        },
      });
export default PollListItem;
