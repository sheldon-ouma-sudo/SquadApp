
    import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
    StatusBar,Dimensions,SafeAreaView,SectionList,FlatList, Pressable, Button,TextInput, Animated} from 'react-native'
    import React, { useEffect, useState } from 'react'
    import { useNavigation } from '@react-navigation/native';
    import {Auth, API, graphqlOperation} from "aws-amplify";
    import { FontAwesome } from '@expo/vector-icons'; 
    import RNAnimated from "react-native-animated-component";
    import RNPoll, { IChoice } from "react-native-poll";
    import Poll from 'react-native-poll';
    //import {getPoll} from '../graphql/queries';

    const ProgressBar = ({ progress }) => {
      const [loaderValue, setLoaderValue] = useState(0);
    
      useEffect(() => {
        Animated.timing(loaderValue, {
          toValue: progress,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, [progress]);
    
      return (
        <View style={styles.progressBar}>
          <Animated.View style={[styles.loader, { width: loaderValue }]} />
        </View>
      );
    };
    


    const PollListItem =({  poll,
      onPress = () => {},
      selectable = false,
      isSelected = false,})=>{
        const [numOfVotes, setNumOfVotes] = useState("32")
        const [userImage, setUserImage] = useState('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')//remember to use uri instead of the require when quering from the backend
        const [pollCaption, setPollCaption] = useState("dining hall with best food today")
        const [pollCreator, setPollCreator] = useState("Drake")
        const [data, setData] = useState([]);
        
        const navigation = useNavigation()
        //fetch for the user's info from the poll being queried
            //get poll id 
            useEffect(()=>{
            const fetchData = async() =>{
                // //fetch for the poll id -- not sure this is the right way of doing things
                // //const pollQueryRes = API.graphql(graphqlOperation(getPoll, {id: pollId}))
                //  //console log the response
                // //const numOfPollVotes = pollQueryRes.
                // //fetch user from the poll
                // const user = pollQueryRes.userID;
                // const userProfilePic = user.imageUrl;
                // //update  the photos and the name of the user to be
                // //console.log(user, userProfile Pic) 
                // setUserImage(userProfilePic)
                // const userName = user.name;
                // setPollCreator(userName)
                setData(poll.pollItem)
            }
             fetchData();
            }, [])
            //to do that first get the userID from the poll being queried
            //then from the user's id let's try and find the user's info 
            //
            const renderItem = ({ item }) => {
              return (
              <View key={item.id}>
              <Text>{item.choice}</Text>
      </View>
              );
            };

        return (
        <Pressable
          style={styles.container}
          behavior="padding"
          >
         <View
          style={styles.userImageContainer}
         >
         <Image
         //source={{uri: userImage}}
         source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
         resizeMode='contain'
         style={styles.userImage}
         />
         </View>
         
          <View
          style = {[styles.pollCaptionContainer]}>
              <Text
              style = {styles.pollCaption}>
                {poll.pollCaption}
                </Text>     
           </View>
    <View style={styles.pollContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        onScroll={(event) => {
        setProgress(event.nativeEvent.contentOffset.y / 100);
      }}
    />
    </View>
         
      </Pressable>
        )
        }
      
        
        const styles = StyleSheet.create({
        container:{
        flex:1,
        flexDirection: "row",
        marginHorizontal: 10,
        marginTop: 10,
        marginVertical: 105,
        borderColor: "#000000",
        height: 600,
        width:400,
        marginLeft:10,
        borderRadius: 29,
        backgroundColor: "#D8E8F3",
        borderWidth: 5
        // flex:1,
        //  flexDirection: "row",
        //  marginHorizontal: 10,
        //  marginTop: 20,
        //  //marginVertical: 65,
        //  borderColor: "#FFFF",
        //  //height: 100,
        //  borderRadius: 15,
        //  backgroundColor: "white",
        //  borderWidth: 5,
        //  marginRight:30
        },
       pollContainer:{
        flex: 1,
        marginTop: 20,
       },
        pollCaptionContainer:{
          height: 50,
          width: 320,
          marginTop: 120,
          flexDirection:'row'

        },
        numOfVotesContainer:{
         height:30,
         width: 95,
         backgroundColor: "#1145FD",
         borderRadius: 40,
         borderColor: "#C2B960",
         borderWidth: 2.5,
         marginLeft:5,
         
        },
        votedText:{
          color: "white",
          fontWeight: "bold",
          marginBottom:7,
          marginLeft:1,
          fontSize: 8.5,
          textAlignVertical:'center'
        }, 
        userImageContainer:{
         marginStart:10,
         marginTop:10
        },
        userImage:{
            width:50,
            height:70
        },
       pollCaption:{
        fontWeight:'800',
        marginRight:15,
        fontSize:20,
        marginLeft:-20,
       },
       pollCreator:{
        marginTop: 5,
        marginLeft: 5,
        color: '#545454',
        marginBottom: 450
       },
       progressBar: {
        height: 20,
        backgroundColor: '#ccc',
        borderRadius: 4,
      },
      loader: {
        height: 20,
        backgroundColor: '#000',
        borderRadius: 4,
      },
        
    },
        )
    export default PollListItem;
