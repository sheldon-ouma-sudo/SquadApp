import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList, Image, Alert, TextInput } from 'react-native';
import Animated, { EasingNode, not } from 'react-native-reanimated';
import { getNotification , getUser, notificationsByUserID, pollCommentsByPollID } from '../graphql/queries';
import { createPollResponse, updatePoll, updateNotification, createPollComment } from '../graphql/mutations';
import { API, graphqlOperation } from "aws-amplify";
import { FontAwesome } from '@expo/vector-icons';
import PollCommentItem from '../components/PollCommentItem'
import { LinearGradient } from 'expo-linear-gradient';
import { useUserContext } from '../../UserContext';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native'; 
import { AntDesign } from '@expo/vector-icons';
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
const PersonalPollDisplayScreen = () => {
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

  const route = useRoute();
  
  // Access the poll object passed through navigation
  const { poll } = route.params;
        
  const toggleComments = () => {
          setCommentsVisible(!isCommentsVisible);
   };
        
  const renderCommentItem = ({ item }) => (
    <View style={styles.commentItem}>
      <PollCommentItem comment={item} pollCreator={pollCreatorInfo} poll={poll}/>
    </View>
  );

  useEffect(() => {
    const parsePollItems = (items) => {
      try {
        const recursiveParse = (item) => {
          // If it's a string, parse it as JSON
          if (typeof item === 'string') {
            const parsedItem = JSON.parse(item);
            // Recursively call the function if it's still an array
            return recursiveParse(parsedItem);
          }
          // If it's an array, flatten it recursively
          if (Array.isArray(item)) {
            return item.flatMap(recursiveParse);
          }
          // If it's an object, return it as is
          return item;
        };
    
        // Start parsing the top-level items array
        if (Array.isArray(items)) {
          return items.flatMap(recursiveParse);
        }
        return [];
      } catch (error) {
        console.log('Error parsing poll items:', error);
        return [];
      }
    };
    
    
    console.log("here is the poll", poll)
    const username = user.userName;
    setLocalUserName(username);
    setNumOfPollLikes(poll.numOfLikes);
    setNumOfPollComment(commentsData.length);
    setTotalNumOfVotes(poll.totalNumOfVotes || 0);
    setPollCreatorID(poll.userID);
    console.log("here is the poll Id", poll.id)
    setPollID(poll.id);
      // Parse pollItems
      const parsedPollItems = parsePollItems(poll.pollItems);
      // Log and set parsed poll items
      // console.log( 'Here is the poll',poll,'Parsed Poll Items:', parsedPollItems);
      setPollItems(parsedPollItems);
      try {
        if (parsedPollItems.length > 0) {
          const initialAnimationValues = parsedPollItems.map(() => new Value(0));
          setAnimationValues(initialAnimationValues);
          setSelectedOption(null);
    
          const initialSelectedOption = parsedPollItems[0];
          animateVotePercentage(
            initialSelectedOption.votes / poll.totalNumOfVotes || 0, 0
          );
        } else {
          console.log("No valid poll items to initialize animations.");
        }
      } catch (error) {
        console.log('Error initializing animations:', error);
      }
        }, [poll]);
        
        useEffect(() => {
          const getPollCreator = async () => {
            if (!pollCreatorID) return; // Ensure pollCreatorID is available
        
            try {
              const pollCreatorInfoQuery = await API.graphql(graphqlOperation(getUser, { id: pollCreatorID }));
              if (pollCreatorInfoQuery.data?.getUser) {
                setPollCreator(pollCreatorInfoQuery.data.getUser.userName);
                setPollCreatorInfo(pollCreatorInfoQuery.data.getUser);
              } else {
                console.error("Error: Poll creator not found");
              }
            } catch (error) {
              console.error('Error fetching the poll creator:', error);
            }
          };
        
          getPollCreator(); // Call the async function within useEffect
        }, [pollCreatorID]);
        
        
        useEffect(() => {
          if (!pollID || !pollCreatorID) {
            // console.log("PollID or PollCreatorID is missing");
            return;
          }
        
          const fetchComments = async () => {
            try {
              const response = await API.graphql(graphqlOperation(pollCommentsByPollID, { pollID: pollID }));
              const fetchedComments = response.data?.pollCommentsByPollID?.items || [];
              setComments(fetchedComments);
              setNumOfPollComment(fetchedComments.length);
            } catch (error) {
              console.error('Error fetching comments:', error);
            }
          };
        
          fetchComments();
        }, [pollID, pollCreatorID]);
        
        
        
  useEffect(() => {
        // console.log("Poll ID: ", pollID);
        // console.log("Poll Creator ID: ", pollCreatorID);
        const fetchPollCreatorNotification = async () => {
          if (!pollCreatorID) return;  // Ensure pollCreatorID is set
          try {
            const notificationResult = await API.graphql(graphqlOperation(notificationsByUserID, {
              userID: pollCreatorID,
            }));
      
            if (notificationResult.data?.notificationsByUserID?.items[0]) {
              setPollCreatorNotificationID(notificationResult.data.notificationsByUserID.items[0].id);
            } else {
              console.error("Error: No notification found for poll creator");
            }
          } catch (error) {
            console.error('Error fetching poll creator notification:', error);
          }
        };
      
        fetchPollCreatorNotification();
        }, [pollCreatorID]);
        

    useEffect(() => {
          if (selectedOption !== null) { 
            setIsOptionSelected(true);
          } else {
            setIsOptionSelected(false);
          }
        }, [selectedOption]);  

        const formatLikes = (likes) => {
          // Check if likes is undefined or null, if so, default it to 0
          if (likes === undefined || likes === null) {
            likes = 0;
          }
        
          // Format likes value
          if (likes < 1000) {
            return likes.toString(); // Return the number as is
          } else if (likes >= 1000 && likes < 1000000) {
            return (likes / 1000).toFixed(1).replace(/\.0$/, '') + 'K'; // Format in thousands
          } else if (likes >= 1000000) {
            return (likes / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; // Format in millions
          }
        
          return likes.toString(); // Default case
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

      const notification = notificationResult.data?.notificationsByUserID.items;
      //   // Update the notification by adding the poll response ID to the pollResponsesArray
      //   console.log("here is the notificatin iD", notification.id)
        await API.graphql(graphqlOperation(updateNotification, {
          input: {  
            id: pollCreatorNotificationID,
            pollResponsesArray: [...(notification[0].pollResponsesArray || []), pollResponseID],
          }
        }));
  
        // console.log("Poll response created and notification updated");
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
          if (!pollID) {
            console.error("Poll ID is missing or undefined.");
            return;
          }
        
          setIsLikeIconClicked(!isLikeIconClicked);
          const updatedLikes = isLikeIconClicked ? numOfPollLikes - 1 : numOfPollLikes + 1;
          setNumOfPollLikes(prevLikes => (isLikeIconClicked ? prevLikes + 1 : prevLikes - 1));
        
          try {
            // Update the poll with the new number of likes
            await API.graphql(graphqlOperation(updatePoll, {
              input: {
                id: pollID, // Ensure pollID is correctly passed here
                numOfLikes: updatedLikes,
              }
            }));
              // console.log("here is the poll like update response", pollLikeUpdateResponse)
            // Create a poll response for the like action
             const pollResponse =  await API.graphql(graphqlOperation(createPollResponse, {
                input: {
                  pollID: pollID,
                  userID: user.id,
                  caption: `${localUserName} liked your poll!`,
                }
              }));
              // console.log("here is the poll response", pollResponse)
              const pollResponseID = pollResponse.data.createPollResponse.id;
           // Fetch the user's notification
            const notificationResult = await API.graphql(graphqlOperation(notificationsByUserID, {
              userID: pollCreatorID,
            }));

            const notification = notificationResult.data?.notificationsByUserID.items;
        // Update the notification by adding the poll response ID to the pollResponsesArray
          await API.graphql(graphqlOperation(updateNotification, {
          input: {
            id: pollCreatorNotificationID,
            pollResponsesArray: [...(notification[0].pollResponsesArray || []), pollResponseID],
          }
        }));   
          } catch (error) {
            console.log("error updating poll likes on the backend", error)
          }

        };
          // Function to handle navigation when the username is clicked
          const handleUsernamePress = () => {
            // Ensure pollCreatorInfo is defined before navigating
            if (pollCreatorInfo) {
              navigation.navigate("UserDisplayScreen", { user: pollCreatorInfo })
            }
          };

          const handleAddComment = async () => {
            if (!newComment.trim()) {
              console.error("Comment is empty");
              return;
            }
          
            if (!pollID || !pollCreatorNotificationID) {
              console.error("Poll ID or notification ID is missing");
              return;
            }
          
            try {
              const newPollComment = await API.graphql(graphqlOperation(createPollComment, {
                input: {
                  pollID: pollID,
                  userID: user.id,
                  comment: newComment,
                  numOfLikes: 0,
                  notificationID: pollCreatorNotificationID,
                }
              }));
              console.log("here is the new poll comment created", newPollComment)
              const newCommentObj = {
                id: newPollComment.data.createPollComment.id,
                username: localUserName,
                comment: newComment,
                likes: 0,
              };
          
              setComments([...comments, newCommentObj]);
              setNewComment('');
            } catch (error) {
              console.error("Error adding comment:", error);
            }
          };
          
        return (
          <LinearGradient
          colors={['#EE8B94', '#0038FF']} // Adjust the gradient colors as per your preference
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
          >
          <View style={styles.container}>
    
          <TouchableOpacity style = {[{flexDirection:"row", marginTop:10}]}
             onPress={()=>navigation.goBack()}
             >
           <AntDesign name="arrowleft" size={24} color="#1764EF" style={{flex:1, marginLeft:10, justifyContent:'flex-start'}}/>
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
                <Text style={styles.optionText}>{item.title}</Text>

                <View style={styles.percentageContainer}>
                  {animationValues[index] ? (
                    <Animated.View
                      style={[
                        styles.percentageBar,
                        {
                          width: animationValues[index]?.interpolate({
                            inputRange: [0, 100],
                            outputRange: ['0%', '320%'],
                          }),
                        },
                      ]}
                    />
                  ) : (
                    <View style={{ width: '0%' }} /> // Fallback view if animation value is not present
                  )}
                  {selectedOption !== null && (
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
          flex: 1, // Ensure it covers the entire screen
          paddingHorizontal: 16,
          paddingTop: 50, // Adjust the top padding as needed
          marginTop:150,
          marginBottom: 120, 
          marginStart: 20, 
          marginEnd: 20, 
          borderRadius: 29
        },
        container: {
          flex: 1,
          padding: 16,
          backgroundColor: "#FFFFFF",
          borderRadius: 20,
          marginBottom: 20,
          elevation: 2, // Add shadow on Android
          shadowColor: '#000', // Add shadow on iOS
          shadowOpacity: 0.2,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 2 },
          marginTop: -30
        },
        voteCountText: {
          fontSize: 14,
          color: '#888',
          marginLeft: 10,
          marginTop: 4,
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
          marginTop: 25 
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
          width: 330, // Adjust the width as per your requirement
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
          marginLeft:-23,
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
        // numOfpollComments:{
        //   fontSize: 29,
        //   marginLeft:12,
        //   marginTop:5,
        // },
        pollLikesContainer:{
          marginLeft:280,
          marginTop:-85
        },
        numOfpollLikes:{
          marginLeft:-40,
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
          fontSize: 29,
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
          fontWeight: '700',
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
export default PersonalPollDisplayScreen;
