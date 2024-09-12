import { View, Text, StyleSheet, KeyboardAvoidingView, FlatList, StatusBar, Dimensions, SafeAreaView } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import Animated, { EasingNode } from 'react-native-reanimated';
import { useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const { Value, timing } = Animated;

const PersonalPollDisplayScreen = () => {
  const [pollItems, setPollItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [numOfPollLikes, setNumOfPollLikes] = useState(0);
  const [animationValues, setAnimationValues] = useState([]);
  const [totalNumOfVotes, setTotalNumOfVotes] = useState(0);
  const [numOfPollComments, setNumOfPollComments] = useState(0);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [comments, setComments] = useState([]);
  const [isCommentsVisible, setCommentsVisible] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const animations = useRef([]);
  const poll = route?.params.poll;
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
  
        useEffect(() => {
          if (poll) {
            setNumOfPollLikes(poll.numOfLikes || 0);
            setTotalNumOfVotes(poll.totalNumOfVotes || 0);
            setNumOfPollComments(poll.numOfComments || 0);

            // Check if pollItems are an array of strings, and parse if necessary
            try {
              const parsedPollItems = Array.isArray(poll.pollItems)
                ? poll.pollItems.map(item => JSON.parse(item))
                : [];
              
              setPollItems(parsedPollItems);
        
              // Initialize animation values for each poll item, ensuring that the lengths match
              const initialAnimationValues = parsedPollItems.map(() => new Value(0));
              setAnimationValues(initialAnimationValues);
            } catch (error) {
              console.log('Error parsing poll items:', error);
            }
          }
        }, [poll]);
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
        ;

        const handleOptionPress = (index) => {
          if (index !== selectedOption) {
            const updatedPollItems = [...pollItems];
            updatedPollItems[index].votes += 1;
            if (selectedOption !== null) {
              updatedPollItems[selectedOption].votes -= 1;
            }
            setPollItems(updatedPollItems);
            setSelectedOption(index);

            // Animate the vote percentage for each option
            animateAllOptions();
          }
        };


        const formatLikes = (likes) => {
          if (likes < 1000) {
            return likes.toString();
          } else if (likes >= 1000 && likes < 1000000) {
            return (likes / 1000).toFixed(1) + 'K';
          } else if (likes >= 1000000) {
            return (likes / 1000000).toFixed(1) + 'M';
          }
          return likes.toString();
        };
        const toggleComments = () => {
          setCommentsVisible(!isCommentsVisible);
            // Set static comments data when the comments are made visible
            if (!isCommentsVisible) {
              setComments(commentsData);
            } else {
              setComments([]); 
            }
          };

    return (   
      <KeyboardAvoidingView style={styles.container} behavior="padding">
              <TouchableOpacity
              onPress={()=>navigation.goBack()}
              >
              <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            <LinearGradient
            colors={['#EE8B94', '#0038FF']} // Adjust the gradient colors as per your preference
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
           >
         
        <View style={styles.innerContainer}>
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
            <View
                style={styles.pollLikesContainer} 
              >
                <FontAwesome
                  name={'heart-o'}
                  size={40}
                  color={'black'}
                  style={styles.pollLikeIcon}
                />
                 <Text style={styles.numOfpollLikes}>{formatLikes(numOfPollLikes)}</Text> 
              </View>
              <TouchableOpacity
                style={styles.pollCommentsContainer} 
              >
                <FontAwesome
                  name={'commenting-o'}
                  size={40}
                  color={'black'}
                  style={styles.pollLikeIcon}
                />
                 <Text style={styles.numOfpollComments}>{formatLikes(numOfPollComments)}</Text> 
              </TouchableOpacity>
              

        </View>
   </LinearGradient>
  </KeyboardAvoidingView>
          )
        }


        const styles = StyleSheet.create({
          gradientContainer: {
            borderRadius: 29,
            marginVertical:30
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
            marginEnd:5,
             marginTop:200,
            marginBottom: 200,
           //borderColor: '#0038FF'
            //marginVertical:135,
          },
          innerContainer:{
            height: 450,
            padding: 16,
            backgroundColor: "#FFFF",
            marginTop:5,
            //borderWidth: 5,
            borderRadius: 29,
            marginBottom:5,
            marginStart:5,
            marginEnd:5,
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
            marginLeft: 300,          // Ensure text does not overlap with the bar
            fontWeight: '600', 
            marginTop: 20      // Make the percentage text bold
          },
          
          pollCommentContainer:{
          marginTop:20,
          },
          pollCommentIcon:{
          marginLeft:20,
          },
          
          pollLikesContainer:{
            marginLeft:280,
            marginTop:15
          },
          pollCommentsContainer:{
            marginLeft:20,
            marginTop:-70
          },
          numOfpollLikes:{
            marginLeft:-15,
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
            fontSize: 29,
            marginLeft: 10,
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
        })


 export default PersonalPollDisplayScreen
