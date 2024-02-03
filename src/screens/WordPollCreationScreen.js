import { View, Text, KeyboardAvoidingView, StyleSheet,Image, 
  TextInput, TouchableOpacity, StatusBar, FlatList, Button, ScrollView} from 'react-native'
import { useState, useEffect } from 'react'
import {SelectList} from 'react-native-dropdown-select-list'
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import {API,graphqlOperation, Auth} from "aws-amplify"
import { createNotification, createPoll } from '../graphql/mutations';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useUserContext } from '../../UserContext';
import { getSquad } from '../graphql/queries';
import { updatePoll } from '../graphql/mutations';
import { registerForPushNotificationsAsync, sendPushNotifications } from '../../notificationUtils';
import { graphql } from 'graphql';


const WordPollCreationScreen = () => {
 const [selected, setSelected] = useState(null);
  const [caption, setCaption] = useState()
  const[pollOption, setPollOption] = useState('')
  const[pollOptionData, setPollOptionData] = useState([])
  const[selectedPollAudience, setSelectedPollAudience] = useState("")
  const[pollAudience, setPollAudience] = useState([])
  const[finalPollAudience, setfinalPollAudience] = useState([])
  const [idCounter, setIdCounter] = useState(1);
  const [squadsData, setSquadsData] = useState([]);
  const{user} = useUserContext();
  const navigation = useNavigation()
  
  const pollLabelData=[ 
    {key:'1', value:"Fashion"},
    {key:'2', value:"Decor"},
    {key:'3', value:"Food"},
    {key:'4', value:"Travel"},
    {key:'5', value:"Social"},
    {key:'6', value:"Health"},
    {key:'7', value:"Other"},
]
const DATA=[//rename this variable 
{ label: 'SquadInstagramInstagramInstagram', value: '1' },
{ label: 'InstagramInstagramInstagram', value: '2' },
{ label: 'TwitterInstagramInstagram', value: '3' },
{ label: 'Contancts', value: '4' },
{ label: 'Snapchat', value: '5' },
{ label: 'Tiktok', value: '6' },
]

const handleTextInputChange = (text) => {
  setPollOption(text);
};

const handleDeleteOption = (id) => {
    // Filter out the option with the specified id
    const updatedOptions = pollOptionData.filter(option => option.id !== id);
    setPollOptionData(updatedOptions);
  };

  const renderPOllOptionDataItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ marginTop: 10, }}
        onPress={() => handleDeleteOption(item.id)}
      >
        <View style={styles.item}>
          <Text style={{ fontSize: 18, color: "black" }}>{item.title}</Text>
          <AntDesign
            style={styles.icon}
            color="black"
            name="delete"
            size={20}
          />
        </View>
      </TouchableOpacity>
    );
  };

  const handleAddButtonPress = () => {
    const pollOptionObject = {
      id: idCounter,
      title: pollOption,
      votes: 30,
    };

    console.log("clean pollOptionObject", pollOptionObject);

    console.log("Before updating pollOptionData:", pollOptionData);

    setPollOptionData([...pollOptionData, pollOptionObject]);

    console.log("After updating pollOptionData:", pollOptionData);

    console.log("here is the new poll option", pollOptionData);

    // Increment the counter for the next ID
    setIdCounter(idCounter + 1);
 
    setPollOption("");
  };
  
  // useEffect(() => {
  //   const handleFinalPollAudience = async()=>{
//     const DATA=[//rename this variable 
// { label: 'Squad', value: '1' },
// { label: 'Instagram', value: '2' },
// { label: 'Twitter', value: '3' },
// { label: 'Contancts', value: '4' },
// { label: 'Snapchat', value: '5' },
// { label: 'Tiktok', value: '6' },
// ]
  //     let array = []
  //     console.log("here is the pollAudience",pollAudience)
  //     if(pollAudience){
  //       for(let i= 0; i<pollAudience.length; i++){
  //           let pollAudienceObj = pollAudience[i]
  //            console.log("object extracted",pollAudienceObj["label"])
  //            array.push(pollAudienceObj["label"]);
  //       }
  //     }
  //     // console.log("array with final poll audience",array)
  //     setfinalPollAudience(array)
  //   }
  // handleFinalPollAudience()
  // },[pollAudience])


   
  const handleSelect = (val) => {
    console.log('Selected value:', val);
    setSelected(val);
  };


const renderDataItem = (item) => {
  return (
      <View style={styles.item}>
          <Text style={styles.selectedTextStyle}>{item.label}</Text>
          <AntDesign style={styles.icon} color="black" name="delete" size={20} />
      </View>
  );
};

//get the pollAudience 
useEffect(() => {
  console.log("here is the user", user);
  console.log("poll audience, either updated or not updated for the first time", pollAudience)
  const fetchSquadInfo = async () => {
    const array = user.userSquadId;
    console.log("here is the array", array);

    try {
      const promises = array.map(async (squadId, index) => {
        try {
          const response = await API.graphql(graphqlOperation(getSquad, { id: squadId }));
          const { squadName, Users } = response.data.getSquad;

          // Modify this part to include the Users property in your data
          const dataItem = {
            label: squadName,
            value: squadId,
            Users: Users, // This assumes Users is an array of user objects
          };

          console.log("this is the data item's users", dataItem.Users);

          return dataItem;
        } catch (error) {
          console.log('Error fetching squad:', error);
          return null;
        }
      });

      const dataItemArr = await Promise.all(promises);
      console.log("here is the dataItemArr", dataItemArr)
      const filteredDataItemArr = dataItemArr.filter(item => item !== null);
      console.log("here is the filteredDataItemArr", filteredDataItemArr)
      // Update SquadsData state with the fetched data
      setSquadsData(filteredDataItemArr);
      // Update PollAudience state with squad names
      const squadNames = filteredDataItemArr.map(item => item.label);
      console.log("here is the squadNames", squadNames)
      const final_pollAudience = []
      for(let i=0; i<squadNames.length; i++){
        const dataItem = { label: squadNames[i], value: i};
        final_pollAudience.push(dataItem)
      }
      console.log("here is the final_poll audience",final_pollAudience)
      setPollAudience(final_pollAudience);
    } catch (error) {
      console.log('Error in fetchSquadInfo:', error);
    }
  };
  fetchSquadInfo();
}, [user.userSquadId]);

 
const updatePollItems = async (pollId, items) => {
    try {
      const updateInput = {
        id: pollId,
        pollItems: items
      };
      const updateResponse = await API.graphql(graphqlOperation(updatePoll, { input: updateInput }));
      console.log('Poll updated successfully:', updateResponse);
      // Log the updated pollItems
      const updatedPollItems = updateResponse.data.updatePoll.pollItems;
      console.log('Updated Poll Items:', updatedPollItems);  
    } catch (error) {
      console.log('Error updating poll items:', error);
    }
  };
  
 
//Function to create poll requests for users in selected squads
const handlePollRequestCreation = async (pollId, users) => {
  const pollRequestIDArray = [];
  for (const squadMember of users) {
    const pollRequestInput = {
      Poll: { id: pollId },
      userID: squadMember.id,
    };
    try {
      const response = await API.graphql(graphqlOperation(createPollRequest, { input: pollRequestInput }));
      console.log('Poll Request created successfully:', response.data?.createPollRequest.id);
      const pollRequestID = response.data?.createPollRequest.id;
      pollRequestIDArray.push(pollRequestID);
    } catch (error) {
      console.log('Error creating user poll requests', error);
    }
  }
  return pollRequestIDArray;
};



//creation of users considering the connection to users
// Function to create notifications for users in selected squads
const handleNotificationCreation = async (pollRequestArray, users) => {
  const notificationIDArray = [];
  for (const squadMember of users) {
    const notificationInput = {
      pollRequestsArray: pollRequestArray,
      pollResponsesArray: [],
      squadAddRequestsArray: [],
      SquadJoinRequestArray: [],
      user: squadMember.id
    };
    try {
      const response = await API.graphqlOperation(graphql(createNotification, { input: notificationInput }));
      console.log('Notification created successfully', response.data?.createNotification.id);
      const notificationID = response.data?.createNotification.id;
      notificationIDArray.push(notificationID);
    } catch (error) {
      console.log('Error creating the notification item', error);
    }
  }
  return notificationIDArray;
};

  // Inside sendPollCreationNotification function
const sendPollCreationNotification = async (expoPushToken, notificationIDArray) => {
  // Use Expo Notifications module to send push notification
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'New Poll Available!',
        body: 'A new poll is waiting for your response.',
      },
      to: expoPushToken,
      data: { notificationIDs: notificationIDArray }, // Include notification IDs in data
    });
  } catch (error) {
    console.log("error sending poll notifications",error)
  }
 
};



  
  const handlePollCreation = async () => {
        console.log("Here is the selected value", selected);
        console.log("here is the poll options", pollOptionData);
        console.log("here is the pollAudience", pollAudience);
        //console.log("and here is the final poll audience", finalPollAudience);
        console.log("here is the caption", caption);
        console.log("here is the user id", user.id);
        try {
          // Create the poll
          const pollInput = {
            totalNumOfVotes: 90,
            pollMedia: [],
            numOfLikes: 200,
            closed: false,
            open: true,
            pollAudience: pollAudience,
            pollCaption: caption,
            pollItems: [], // Start with an empty array
            pollLabel: selected,
            userID: user.id,
          };

          const response = await API.graphql(graphqlOperation(createPoll, { input: pollInput }));
          if (response.data && response.data.createPoll) {
            const pollId = response.data.createPoll.id;

            console.log('Poll created successfully:', response.data.createPoll);

            // Transform pollOptionData into the desired format
            const updatedItems = JSON.stringify(
              pollOptionData.map((item, index) => ({
                id: index + 1, // You can use any logic to generate unique IDs
                title: item.title,
                votes: 0,
              }))
            );

            // Update the poll with the correct pollItems
      const updatedNumOfPolls = (user.numOfPolls || 0) + 1;
      await incrementNumOfPollsForUser(user.id, updatedNumOfPolls);

          console.log()
            // Iterate over selected squads
            for (const squadName of pollAudience) {
              try {
                // Find the squad object in your state
                const selectedSquad = squadsData.find((squad) => squad.label === squadName);
                if (selectedSquad) {
                  // Iterate over users in the selected squad
                  for (const squadMember of selectedSquad.Users) {
                    // Fetch the Expo Push Token for the user
                    const expoPushToken = await registerForPushNotificationsAsync(squadMember.id);

                    if (expoPushToken) {
                      // Create poll requests and notifications for each user
                      const pollRequestIDArray = await handlePollRequestCreation(pollId, [squadMember]);
                      const notificationIDArray = await handleNotificationCreation(expoPushToken, pollRequestIDArray, [squadMember]);

                      // Send push notification with poll requests
                      await sendPollCreationNotification(expoPushToken, notificationIDArray);

                        console.log(`Poll requests and notifications sent successfully for squad: ${squadName}`);
                      } else {
                        console.log(`Expo Push Token not found for user: ${squadMember.id}`);
                      }
                    }
                    } else {
                      console.log(`Squad not found for squadName: ${squadName}`);
                    }
                    } catch (error) {
                      console.log('Error creating notifications:', error);
                    }
                    }
                    console.log("here is the number of polls is: ", updatedNumOfPolls)
                  navigation.navigate('RootNavigation', { screen: 'Profile' });
                } else {
                  console.log('Error creating poll - Unexpected response:', response);
                }
              } catch (error) {
                console.log('Error creating poll:', error);
              }
      };

      const incrementNumOfPollsForUser = async (userId, updatedNumOfPolls) => {
        try {
          // Update the user with the incremented numOfPolls
          await API.graphql(graphqlOperation(updateUser, {
            input: {
              id: userId,
              numOfPolls: updatedNumOfPolls,
            }
          }));
          console.log('User numOfPolls updated successfully:', updatedNumOfPolls);
        } catch (error) {
          console.log('Error updating numOfPolls for user:', error);
        }
      };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    > 
    <View style={[styles.squadLogoContainer, {flexDirection:'column'}]}>
        <Image
            source={require('/Users/sheldonotieno/Squad/assets/squad-logo.png')}
            style={styles.squadLogo}
            resizeMode='contain'
        >
        </Image>
    </View>
    <TouchableOpacity style = {[{backgroundColor:"#F4F8FB"},{flexDirection:"row", marginTop:10}]}
      onPress={()=>navigation.goBack()}
      >
      <AntDesign name="arrowleft" size={24} color="#1764EF" style={{flex:1, marginLeft:30, justifyContent:'flex-start'}}/>
      </TouchableOpacity>
   {/* Poll caption section */}
    <View style={styles.pollContentStyles}>
      <Text style={styles.pollContentCaption}>Poll Caption</Text>
    </View>
    <TextInput
      placeholder ="What team is going to win big this weekend"
      value={caption}
      onChangeText={text =>setCaption(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
      style={styles.input}
      textAlignVertical={"top"}
    ></TextInput>

  <View style={styles.pollLabelContainer}>
      <Text style={styles.pollContentLabel}>Poll Label</Text>
    </View>

    <TouchableOpacity
     style={{paddingHorizontal:15,marginTop:15,width:350,marginRight:70,marginLeft:30}}>
      <SelectList 
      setSelected={handleSelect} 
      value={selected}
      data={pollLabelData} 
      save="value"
      search={true} 
      />
    </TouchableOpacity>

   {/* adding poll options */}
     <View style={styles.pollContentStyles}>
      <Text style={styles.pollContentCaption}>Poll Options</Text>
    </View>
    {/* poll option input  */}
    
      <TextInput
        style={styles.pollOptionInput}
        placeholder="Enter Poll Option"
        value={pollOption}
        onChangeText={handleTextInputChange}
      />
      <TouchableOpacity
      onPress={()=>handleAddButtonPress()}
      style={styles.button}
      >
        <Text
        style={{color:'#fff'}}
        >Add Option</Text>
      </TouchableOpacity> 
      
      <FlatList
       data={pollOptionData} 
       horizontal={true}
      renderItem={renderPOllOptionDataItem} 
      keyExtractor={item=>item.id}
    />


    <View style={styles.pollAudience}>
      <Text style={styles.pollContentCaption}>Poll Audience</Text>
    </View>

    <MultiSelect
        style={styles.pollAudienceDropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={pollAudience}
        labelField="label"
        valueField="value"
        placeholder="Choose Poll Audience"
        value={selectedPollAudience}
        search
        searchPlaceholder="Search..."
        onChange={item => {
            setSelectedPollAudience(item);
        }}
        renderLeftIcon={() => (
            <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
            />
        )}
      renderItem={renderDataItem}
      renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View style={styles.selectedStyle}>
                  <Text style={styles.textSelectedStyle}>{item.label}</Text>
                  <AntDesign color="black" name="delete" size={17} />
              </View>
          </TouchableOpacity>
                )}  
            />

    <View style={styles.pollButtonContainer}>
        <TouchableOpacity
        onPress={handlePollCreation}
        style = {styles.button}
            >
            <Text style={styles.buttonText}>
                Poll
            </Text>
        </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container:{
  flex:1,
  justifyContent:"flex-start",
  alignItems:"center",
  backgroundColor: "#F4F8FB"
  },
  squadLogo:{
    width:100,
    height:35,
    marginRight:250,
    marginTop:70
  },
  pollContentStyles:{
    marginRight:250,
    marginTop:50,
    marginBottom:-11.5,
    
  },
   pollOptionTextContainer:{

   },
  pollLabelContainer:{
    marginRight:270,
    marginTop:0

  },
  pollContentText:{
    fontWeight:'700',
    fontSize:18
  },
  pollImagesContainer:{
    marginBottom:10
  },
  pollContentLabel:{
    marginTop:20,
    fontWeight:'700',
    fontSize:18
  },
  input:{
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical:10,
    borderRadius:12,
    width:350,
    height:80,
    marginTop:10,
    fontSize: 13,
    marginRight:15,
    marginLeft:5,
// fontStyle:"Montserrat-Regular",
    color:'black',
    fontWeight:'400'    
},
ImageContainer: {
  marginHorizontal: 16,
  marginTop: 20,
  width: "90%",
},
pollContentCaption:{
  marginTop:-40,
  fontWeight:'700',
  fontSize:18
},
pollAudience:{
  //marginTop:-0,
  marginRight:250,
  //marginBottom:25
},
button:{
  backgroundColor: '#1764EF',
  width: 350,
  height: 42,
  padding: 12,
  borderRadius: 5,
  marginTop: 10,
  alignItems: 'center',
  marginRight: 10,
  marginLeft:15,
},
pollButtonContainer:{
  width: 296,
  height:42,
  borderRadius:5,
  justifyContent: 'center',
  alignItems: 'center',
  //marginTop:,
  marginBottom: 150
  },
  buttonText:{
    color: 'white',
    fontWeight: '600',
    fontSize: 14   
},
pollOptionDropdown: {
  height: 50,
  width:350,
  backgroundColor: '#1764EF',
  borderRadius: 12,
  padding: 12,
  shadowColor: '#000',
  shadowOffset: {
      width: 0,
      height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
  marginLeft:-20
},
pollAudienceDropdown: {
  height: 50,
  width:350,
  backgroundColor: '#1764EF',
  borderRadius: 12,
  padding: 12,
  shadowColor: '#000',
  shadowOffset: {
      width: 0,
      height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
  marginLeft:-10,
  marginBottom:20

},

placeholderStyle: {
  fontSize: 16,
  color:'white'
},
selectedTextStyle: {
  fontSize: 14,
  color:'black'
},
iconStyle: {
  width: 20,
  height: 30,
},

inputSearchStyle: {
  height: 40,
  fontSize: 16,
},
icon: {
  marginRight: 5,
  //color:'white'
},
item: {
  padding: 5,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  

},
selectedStyle: {
  flexDirection: 'row',
  //justifyContent: 'center',
  //alignItems: 'center',
  //borderRadius: 14,
  backgroundColor: 'white',
 // shadowColor: 'red',
  marginBottom: 10,
  marginRight: 15,
  paddingHorizontal: 12,
  paddingVertical: 2,
  // shadowOffset: {
  //     width: 0,
  //     height: 1,
  // },
  // shadowOpacity: 0.2,
  // shadowRadius: 1.41,
   marginLeft:57,

  //elevation: 2,
},
textSelectedStyle: {
  marginRight: 10,
  fontSize: 16,
},
pollOptionInput:{
    backgroundColor: '#EAEAEA',
    paddingHorizontal: 15,
    paddingVertical:5,
    borderRadius:5,
    width:346,
    height:45,
    marginTop:10,
    fontSize: 13,
    marginRight:15,
    marginLeft:20,
// fontStyle:"Montserrat-Regular",
    color:'#535353',
    fontWeight:'400'  ,
    backgroundColor: '#fff'
}
})

export default WordPollCreationScreen

