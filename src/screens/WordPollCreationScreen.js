import { View, Text, KeyboardAvoidingView, StyleSheet,Image, 
  TextInput, TouchableOpacity, StatusBar, FlatList, Button, ScrollView} from 'react-native'
import { useState, useEffect } from 'react'
import {SelectList} from 'react-native-dropdown-select-list'
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import {API,graphqlOperation, Auth} from "aws-amplify"
import { createPoll } from '../graphql/mutations';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useUserContext } from '../../UserContext';
import { getSquad } from '../graphql/queries';




//setting up for the notification for the sender 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

const WordPollCreationScreen = () => {
 const [selected, setSelected] = useState(null);
  const [caption, setCaption] = useState()
  const[pollOption, setPollOption] = useState('')
  const[pollOptionData, setPollOptionData] = useState([])
  const[selectedPollAudience, setSelectedPollAudience] = useState("")
  const[pollAudience, setPollAudience] = useState([])
  const[finalPollAudience, setfinalPollAudience] = useState([])
  const [idCounter, setIdCounter] = useState(1);
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
//get the pollAudience 
  useEffect(() => {
    console.log("here is the user",user)
    const fetchSquadInfo = async () => {
      const array = user.userSquadId;
      console.log("here is the user",user)
      console.log("here is the array",array)
      try {
        const promises = array.map(async (squadId, index) => {
          try {
            const response = await API.graphql(graphqlOperation(getSquad, { id: squadId }));
            const label = response.data.getSquad.squadName; // Assuming `getSquad` returns an object with `data` property
            return { label, value: index };
          } catch (error) {
            console.error('Error fetching squad:', error);
            return null; // Handle the error as needed
          }
        });
        const dataItemArr = await Promise.all(promises);
        const filteredDataItemArr = dataItemArr.filter(item => item !== null);
        console.log("here is the data item array", filteredDataItemArr);
        setPollAudience(filteredDataItemArr);
      } catch (error) {
        console.error('Error in fetchSquadInfo:', error);
      }
    };
    fetchSquadInfo();
  }, [user.userSquadId]);
  
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
        style={{ marginTop: 10 }}
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
      votes: 0,
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
  
  useEffect(() => {
    const handleFinalPollAudience = async()=>{
      let array = []
      if(pollAudience){
        for(let i= 0; i<pollAudience.length; i++){
            let pollAudienceObj = pollAudience[i]
             console.log("object extracted",pollAudienceObj["label"])
             array.push(pollAudienceObj["label"]);
        }
      }
      console.log("array with final poll audience",array)
      setfinalPollAudience(array)
    }
  handleFinalPollAudience()
  },[pollAudience])


const handlePollCreation =async ()=>{
  console.log("Here is the selected value",selected)
  console.log("here is the poll options",pollOptionData)
  console.log("here is the pollAudience", pollAudience)
  console.log("and here is the final poll audience", finalPollAudience)
  console.log("here is the caption", caption)
  console.log("here is the user id", user.id)
  // //i want create poll use createPoll from mutation.js
  try {
    const input = {
      totalNumOfVotes: 0,
      pollMedia: [],
      closed: false,
      open: true,
      pollAudience: ["testEighty's first_squad"],
      pollCaption: "What do you think our Squad founders are doing?",
      pollItems: pollOptionData,
      pollLabel: 'Social',
      userID: '171fac81-5a4a-4335-9c54-6fa5bf8e9245'
    };

    console.log('GraphQL Input:', input); // Log the input for further inspection

    const response = await API.graphql(graphqlOperation(createPoll, { input }));
    console.log('GraphQL Response:', response); // Log the entire GraphQL response

    if (response.data && response.data.createPoll) {
      console.log('Poll created successfully:', response.data.createPoll);
    } else {
      console.log('Error creating poll - Unexpected response:', response);
    }
  } catch (error) {
    console.log('Error creating poll:', error);
  }

}
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
      <View style={{paddingHorizontal:15,marginTop:15,width:350,marginRight:-250}}></View>
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
    marginTop:30
    
  },
  pollLabelContainer:{
    marginRight:250,
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
  marginTop:-10,
  fontWeight:'700',
  fontSize:18
},
pollAudience:{
  //marginTop:-20,
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
  marginBottom: 170
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
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 14,
  backgroundColor: 'white',
  shadowColor: '#000',
  marginBottom: 30,
  marginRight: 135,
  paddingHorizontal: 12,
  //paddingVertical: 8,
  shadowOffset: {
      width: 0,
      height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  marginLeft:57,

  elevation: 2,
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