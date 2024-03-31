import { View, Text, StyleSheet, KeyboardAvoidingView, TextInput, Image, FlatList, StatusBar, Dimensions, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
//import {listPolls} from '../graphql/queries'
import { API, graphqlOperation } from "aws-amplify";
//import Poll from "../components/PersonalPollDisplayItem"
import PollComponent from '../components/PersonalPollDisplayItem/index'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useRoute } from '@react-navigation/native';
import { getPoll } from '../graphql/queries';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getUser } from '../graphql/queries';



const ResponsePollScreen = () => {
     const [poll, setPoll] = useState([])
     const [pollItems, setPollItems] = useState([]);
     const [numOfPollLikes, setNumOfPollLikes] = useState(0)
     const [comment, setComment] = useState("")
     const [isLikeIconClicked, setIsLikeIconClicked] = useState(true);
     const[pollCreator, setPollCreator] = useState("")
     const [totalNumOfVotes, setTotalNumOfVotes] = useState(0)
     const [numOfPollComments, setNumOfPollComment] = useState(0)

     const navigation = useNavigation()

      const route = useRoute()
       const pollReception = route?.params.poll
       console.log("here is the poll ID", pollReception)
    //     // console.log("here is the poll id", pollID)
        useEffect(() => {
          const fetchPoll = async () => {
            if (pollReception) {
              console.log("here is the poll received", pollReception)
              setPoll(pollReception)
            } else {
              console.log("Poll ID is null or undefined", pollReception);
            }
          };
        
          fetchPoll();
        }, [pollReception]); // Make sure to include pollID in the dependencies array
          
          
        useEffect(()=>{
          const fetchPollInfo=async()=>{
            setNumOfPollLikes(poll.numOfLikes);
            try {
              const parsedPollItems = JSON.parse(poll.pollItems || '[]'); // Parse the string
              console.log("here is the parsed poll Items", parsedPollItems)
              setPollItems(parsedPollItems);
            } catch (error) {
              console.log("error fetching the poll info", error)
            }
          }
          fetchPollInfo()
        }, [poll])
      
      
      useEffect(()=>{
        const getPollCreater = async () => {
          const pollCreatorID = poll.userID
          if(pollCreatorID){
            console.log("here is the poll creator", pollCreatorID)
            try {
              const pollCreatorInfo = await API.graphql(graphqlOperation(getUser, { id: pollCreatorID }));
              console.log("this is the poll creator info",pollCreatorInfo.data?.getUser.userName)
              setPollCreator(pollCreatorInfo.data?.getUser.userName)
            } catch (error) {
              console.log("error fetching the poll creator", error)
            }
          }
         }
        getPollCreater()
      }, [poll])

        const handleLickedIconClick = () => {
          setIsLikeIconClicked(!isLikeIconClicked);
          setNumOfPollLikes(prevLikes => (isLikeIconClicked ? prevLikes +1 : prevLikes -1));
      
        };
       const handleSubmitPollResponse = async()=>{

       }
    return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            <LinearGradient
          colors={['#EE8B94', '#0038FF']} // Adjust the gradient colors as per your preference
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientContainer}
           >
          <View style={styles.innerContainer}>
          <TouchableOpacity
            style={styles.pollLikesContainer} 
            onPress={handleLickedIconClick}
          > 
          <Text style={styles.userNameText}>@{pollCreator}</Text>
            <FontAwesome
              name={isLikeIconClicked ? 'heart-o' : 'heart'}
              size={36}
              color={isLikeIconClicked ? '#1764EF' : 'red'}
              style={styles.pollLikeIcon}
            />
            <Text style={styles.numOfpollLikes}>{numOfPollLikes}</Text>       
        </TouchableOpacity>
        <View>
        <Image
          source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
          resizeMode="contain"
          style={styles.userImage}
        />
        </View>
          <TouchableOpacity>
          <Text style={styles.question}>{poll.pollCaption}</Text>
          {pollItems.map((item, index)=>(
            <TouchableOpacity
            key={index}
            style={[styles.optionContainer]}
            >
            <Text style={styles.optionText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
          </TouchableOpacity>
          <TouchableOpacity>
           <TextInput
          placeholder ="Add a comment here..."
          value={comment}
          onChangeText={text =>setComment(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
          style={styles.input}
          textAlignVertical={"top"}
         />
          <MaterialCommunityIcons name="send-circle" size={40} color='#545454'
           style={{marginLeft:308, marginTop:-38}}
          />
          </TouchableOpacity>
          <TouchableOpacity
          onPress={handleSubmitPollResponse}
          style = {styles.button}
          >
          <Text style={styles.buttonText}>
              Submit 
          </Text>
       </TouchableOpacity>
            
        </View>

            </LinearGradient>

          </KeyboardAvoidingView>
          )
        }


    const styles = StyleSheet.create({
          gradientContainer: {
            borderRadius: 29,
          },
          container: {
            flex: 1,
            padding: 16,
            backgroundColor: "#FFFF",
            marginTop: 5,
            borderRadius: 29,
            marginBottom: 5,
            marginStart: 5,
            marginEnd: 5,
            marginTop: 200,
            marginBottom: 200,
          },
          innerContainer: {
            height: 450,
            padding: 16,
            backgroundColor: "#FFFF",
            marginTop: 5,
            borderRadius: 29,
            marginBottom: 5,
            marginStart: 5,
            marginEnd: 5,
          },
          list: {
            padding: 10,
          },
          userImageContainer:{
            //marginStart:10,
            marginTop:-20,
            marginLeft: -10
           },
           userImage:{
               width:80,
               height:120, 
               marginTop:-100, 
               marginLeft:-10
           },
          userNameText: {
            fontSize: 19,
            fontWeight: '600',
            marginLeft: 75, // Adjust the marginLeft to create spacing
          },
          question: {
            fontSize: 19.5,
            fontWeight: 'bold',
            marginBottom: 25,
            marginTop: 10,
            marginLeft: 35,
          },
          optionContainer: {
            marginBottom: 15,
            padding: 5,
            borderColor: '#ccc',
            borderRadius: 28,
            backgroundColor: '#ffff',
            borderColor: 'black',
            borderWidth: 1.5,
            height: 50,
            width: 350, // Adjust the width as per your requirement
          },
          optionText: {
            fontSize: 16,
            fontWeight: '700',
            marginLeft: 135,
            color: "black",
            marginTop: 10
          },
          input: {
            backgroundColor: '#EAEAEA',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 12,
            width: 290,
            height: 40,
            marginTop:5,
            fontSize: 13,
            marginRight: 15,
            marginLeft: 15,
            color: 'black',
            fontWeight: '400'
          },
          pollLikesContainer: {
            flexDirection: 'row', // Align children horizontally
            alignItems: 'center', // Align items vertically
          },
          pollLikeIcon: {
            marginLeft: 160, // Adjust the marginLeft to create spacing
          },
          numOfpollLikes: {
            marginLeft: -25, // Adjust the marginLeft to create spacing
            fontSize: 25,
            fontWeight: '600',
            marginTop:60
          },
          button:{
            backgroundColor: '#1764EF',
            width: 330,
            height: 42,
            padding: 12,
            borderRadius: 15,
            marginTop: 10,
            alignItems: 'center',
            //marginRight: 10,
            marginLeft:8,
          },
          pollButtonContainer:{
            width: 256,
            height:42,
            borderRadius:5,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:10,
            marginBottom: 10
            },
            buttonText:{
              color: 'white',
              fontWeight: '600',
              fontSize: 14   
          },
        });
        


 export default ResponsePollScreen