import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList, Image, Alert, TextInput } from 'react-native';
import Animated, { EasingNode, not } from 'react-native-reanimated';
import { getNotification , getUser, notificationsByUserID, pollCommentsByPollID } from '../../graphql/queries';
import { createPollResponse, updatePoll, updateNotification } from '../../graphql/mutations';
import { API, graphqlOperation } from "aws-amplify";
import { FontAwesome } from '@expo/vector-icons';
import PollCommentItem from '../PollCommentItem/index'
import { LinearGradient } from 'expo-linear-gradient';
import { useUserContext } from '../../../UserContext';
import { useNavigation } from '@react-navigation/native';

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
const { Value, timing } = Animated;
const PollListItem = ({ poll, }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [animationValues, setAnimationValues] = useState([]);
  const [pollItems, setPollItems] = useState([]);
  const [pollCreator, setPollCreator] = useState('@superDuperBostoner');
  const [numOfPollComments, setNumOfPollComment] = useState('500');
  const [numOfPollLikes, setNumOfPollLikes] = useState('0');
  const [isLikeIconClicked, setIsLikeIconClicked] = useState(true);
  const [comments, setComments] = useState([commentsData]);
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [totalNumOfVotes, setTotalNumOfVotes] = useState(0);
  const[pollCreatorID, setPollCreatorID ] = useState("")
  const [pollCreatorInfo, setPollCreatorInfo] = useState()
  const[optionClicked, setOptionClicked] = useState(false)
  const[pollID, setPollID] = useState()
  const[localUserName, setLocalUserName] = useState()
  const [pollCreatorNotificationID, setPollCreatorNotificationID] = useState("")
  const [prevSelectedOption, setPrevSelectedOption] = useState(null);
  const [newComment, setNewComment] = useState('');
  const animations = useRef([]);
  const navigation  = useNavigation()
  const {user} = useUserContext()

 
        
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
          const username = user.userName;
          setLocalUserName(username);
          setNumOfPollLikes(poll.numOfLikes);
          setNumOfPollComment(commentsData.length);
          setTotalNumOfVotes(poll.totalNumOfVotes || 0);
          setPollCreatorID(poll.userID);
          setPollID(poll.id);
          // setComments(commentsData)
          console.log("here is the poll", poll)
          console.log('Raw Poll Items:', poll.pollItems); // Log the raw pollItems
        
          try {
            // Check if pollItems are an array of strings, and then parse each string into an object
            const parsedPollItems = Array.isArray(poll.pollItems)
              ? poll.pollItems.map(item => JSON.parse(item)) // Parse each item string into an object
              : [];
        
            console.log('Parsed Poll Items:', parsedPollItems); // Log parsed items to verify
        
            // Print the votes for each option after parsing
            parsedPollItems.forEach((item, index) => {
              console.log(`Option ${index + 1}: ${item.title} - ${item.votes} votes`);
            });
        
            setPollItems(parsedPollItems);
            const initialAnimationValues = parsedPollItems.map(() => new Value(0));
            setAnimationValues(initialAnimationValues);
            setSelectedOption(null);
        
            const initialSelectedOption = parsedPollItems[0];
            animateVotePercentage(
              initialSelectedOption.votes / poll.totalNumOfVotes || 0, 0
            );
          } catch (error) {
            console.log('Error parsing poll items:', error);
          }
        
          const getPollCreator = async () => {
            const pollCreatoriD = poll.userID;
            try {
              const pollCreatorInfoQuery = await API.graphql(graphqlOperation(getUser, { id: pollCreatoriD }));
              setPollCreator(pollCreatorInfoQuery.data?.getUser.userName);
              setPollCreatorInfo(pollCreatorInfoQuery.data?.getUser);
            } catch (error) {
              console.log('Error fetching the poll creator:', error);
            }
          };
          getPollCreator();
        }, [poll, pollCreatorID]);
        
        


        useEffect(() => {
          const fetchComments = async () => {
            try {
              if (pollID) {
                console.log("Fetching comments for pollID:", pollID);
        
                // Fetch comments from the backend
                const response = await API.graphql(graphqlOperation(pollCommentsByPollID, {
                  pollID: pollID
                }));
        
                const fetchedComments = response.data?.pollCommentsByPollID?.items || [];
        
                console.log("Fetched comments:", fetchedComments);
                
                // Update the comments state with the fetched comments
                setComments(fetchedComments);
                
                // Update the number of comments
                setNumOfPollComment(fetchedComments.length);
              }
            } catch (error) {
              console.log('Error fetching comments:', error);
            }
          };
        
          fetchComments(); // Fetch comments when component is mounted or pollID changes
        }, [pollID]);
        
        useEffect(()=>{
          const fetchPollCreatorNotification = async()=>{
            const notificationResult = await API.graphql(graphqlOperation(notificationsByUserID, {
              userID: pollCreatorID,
            }))
            console.log("here is the notification of the poll creator", notificationResult.data?.notificationsByUserID)
            console.log("here is the notificatin iD", notificationResult[0].id)
            setPollCreatorNotificationID(notificationResult[0].id)
          }
          
          fetchPollCreatorNotification()
        }, [pollCreatorID])
      


        useEffect(() => {
          if (selectedOption !== null) { 
            setIsOptionSelected(true);
          } else {
            setIsOptionSelected(false);
          }
        }, [selectedOption]);  

        const formatLikes = (likes) => {
          if (likes < 1000) {
            return likes.toString(); // Return the number as is
          } else if (likes >= 1000 && likes < 1000000) {
            return (likes / 1000).toFixed(1).replace(/\.0$/, '') + 'K'; // Format in thousands
          } else if (likes >= 1000000) {
            return (likes / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; // Format in millions
          }
          return likes.toString(); // Default case, although it won't be hit due to the previous conditions
        };
        

        // const getOptionTextStyle = () => ({
        //   color: optionClicked ? 'black' : 'white',
        //   fontSize: 16,
        //   marginBottom: 20,
        //   fontWeight:'700',
        //   marginLeft:135,
        //   // color: "black",
        //   marginTop:-30
        // });
      
        // const getSelectedOptionTextStyle = () => ({
        //   color: optionClicked ? 'white' : 'black',
        //   fontSize: 16,
        //   marginBottom: 12,
        //   fontWeight:'700',
        //   marginLeft:125,
        //   // color: "white"
        // });
        const handleOptionPress = async(index) => {
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
            // Update total number of votes if an option is selected for the first time
            const newTotalVotes = selectedOption === null ? totalNumOfVotes + 1 : totalNumOfVotes;
            setTotalNumOfVotes(newTotalVotes);
            setSelectedOption(index);
            animateAllOptions(index);
            // Create poll response for the selected option
           const pollResponse = await API.graphql(graphqlOperation(createPollResponse, {
            input: {
            pollID: pollID,
            userID: user.id,
            caption: `${localUserName} voted in your poll!`,
           }    
      }));
        const pollResponseID = pollResponse.data.createPollResponse.id;

        // Update the poll in the backend with the new total votes and updated poll items
      await API.graphql(graphqlOperation(updatePoll, {
        input: {
          id: pollID,
          totalNumOfVotes: newTotalVotes,
          pollItems: JSON.stringify(updatedPollItems),
        }
      }));
       // Fetch the user's notification
       const notificationResult = await API.graphql(graphqlOperation(notificationsByUserID, {
        userID: pollCreatorID,
      }));

      const notification = notificationResult.data.getNotification;
        // Update the notification by adding the poll response ID to the pollResponsesArray
        console.log("here is the notificatin iD", notification[0].id)
        await API.graphql(graphqlOperation(updateNotification, {
          input: {
            id: notification[0].id,
            pollResponsesArray: [...(notification.pollResponsesArray || []), pollResponseID],
          }
        }));
  
        console.log("Poll response created and notification updated");
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
        
        const animateVotePercentage = (percentage, index) => {
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
        
        // Update `animateAllOptions` to call `animateVotePercentage` for all options:
        const animateAllOptions = (selectedOptionIndex) => {
          pollItems.forEach((pollItem, i) => {
            const percentage = calculatePercentage(pollItem.votes);
            animateVotePercentage(percentage, i);
          });
        };
        
        // Calculate the vote percentage relative to total votes:
        const calculatePercentage = (votes) => {
          console.log(`Votes: ${votes}, Total Votes: ${totalNumOfVotes}`);
          return totalNumOfVotes > 0 ? (votes / totalNumOfVotes) * 100 : 0;
        };
        
        const handleLikedIconClick = async() => {
          setIsLikeIconClicked(!isLikeIconClicked);
          const updatedLikes = isLikeIconClicked ? numOfPollLikes - 1 : numOfPollLikes + 1;
          setNumOfPollLikes(prevLikes => (isLikeIconClicked ? prevLikes +1 : prevLikes -1));
          try {
                // Update the poll with the new number of likes
              await API.graphql(graphqlOperation(updatePoll, {
                input: {
                  id: pollID,
                  numOfLikes: updatedLikes,
                }
              }));

            // Create a poll response for the like action
             const pollResponse =  await API.graphql(graphqlOperation(createPollResponse, {
                input: {
                  pollID: pollID,
                  userID: user.id,
                  caption: `${localUserName} liked your poll!`,
                }
              }));
              const pollResponseID = pollResponse.data.createPollResponse.id;
           // Fetch the user's notification
            const notificationResult = await API.graphql(graphqlOperation(notificationsByUserID, {
              userID: pollCreatorID,
            }));

      const notification = notificationResult.data.getNotification;
        // Update the notification by adding the poll response ID to the pollResponsesArray
        await API.graphql(graphqlOperation(updateNotification, {
          input: {
            id: notification[0].id,
            pollResponsesArray: [...(notification.pollResponsesArray || []), pollResponseID],
          }
        }));   
          } catch (error) {
            console.log("error updating poll likes", error)
          }

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
            username: localUserName,
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
                  {/* Always render the option title */}
                  <Text style={styles.optionText}>{item.title}</Text>

                  {/* Always render the percentage bar */}
                  <View style={styles.percentageContainer}>
                    <Animated.View
                      style={[
                        styles.percentageBar,
                        {
                          width: animationValues[index].interpolate({
                            inputRange: [0, 100],
                            outputRange: ['0%', '320%'], // Adjust to the actual vote percentage
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
                  <Text style={styles.voteCountText}>
                   {formatLikes(item.votes)} votes
                   </Text>

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
                onPress={handleLikedIconClick}
              >
                <FontAwesome
                  name={isLikeIconClicked ? 'heart-o' : 'heart'}
                  size={46}
                  color={isLikeIconClicked ? 'black' : 'red'}
                  style={styles.pollLikeIcon}
                />
                 <Text style={styles.numOfpollLikes}>{formatLikes(numOfPollLikes)}</Text> 
              </TouchableOpacity>

            {/* Comments Section */}
            <View style={{ height: isCommentsVisible ? 'auto' : 0, overflow: 'hidden' }}>
              <Text style={styles.numOfCommentsText}>{comments.length} Comments</Text>
              <FlatList
              data={comments}
              keyExtractor={(item) => `comment-${item.id}`}
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
        voteCountText: {
          fontSize: 14,
          color: '#888',
          marginLeft: 10,
          marginTop: 4,
        },
        container: {
          flex:1,
          padding: 16,
          backgroundColor: "#FFFF",
          marginTop:5,
          borderRadius: 29,
          marginBottom:5,
          marginStart:5,
          marginEnd:5
        },
        userImageContainer:{
          marginTop:-20,
          marginLeft: -10
        },
        userImage:{
            width:50,
            height:70
        },
        commentIconImageContainer:{
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
        percentageContainer: {
          flexDirection: 'row',    // Align items horizontally (bar and text)
          alignItems: 'center',    // Vertically align items in the center
          justifyContent: 'space-between', // Spread items across the width of the container
          marginTop: 10,           // Add margin to space it out from the option title
          width: '100%',           // Take full width of the parent container (option container)
          height: 30,              // Set height to contain the bar and text comfortably
          paddingHorizontal: 10,   // Add padding on the sides
        },
        
        pollLikeIcon:{
          marginLeft:-3,
          //size:44
        },
        percentageBar: {
          height: 50,
          backgroundColor: '#1764EF',
          borderRadius: 25,
          width: '100%', // Adjust the width as per your requirement
          // alignSelf: 'flex-start',
           marginBottom: 4,
          marginTop: -28,
          marginLeft: -15,
          overflow: 'hidden',
        },
        percentageText: {
          fontSize: 14,            // Size of the text showing percentage
          color: 'black',          // Text color for visibility
          marginLeft: 10,          // Ensure text does not overlap with the bar
          fontWeight: '600',       // Make the percentage text bold
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
        },
        pollLikesContainer:{
          marginLeft:280,
          marginTop:-85
        },
        numOfpollLikes:{
          marginLeft:-15,
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
