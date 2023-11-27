import { View, Text, KeyboardAvoidingView, StyleSheet,Image, 
  TextInput, TouchableOpacity, StatusBar, FlatList, Button, ScrollView} from 'react-native'
import { useState, useEffect } from 'react'
import {SelectList} from 'react-native-dropdown-select-list'
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import {API,graphqlOperation, Auth} from "aws-amplify"
import { createPoll } from '../graphql/mutations';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';



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
  const [selected, setSelected]  = useState("")
  const [caption, setCaption] = useState()
  const[pollOption, setPollOption] = useState('')
  const[pollOptionData, setPollOptionData] = useState([])
  const[selectedPollAudience, setSelectedPollAudience] = useState("")
  
  
  const pollLabelData=[ 
        {key:'1', value:"Fashion"},
        {key:'2', value:"Decor"},
        {key:'3', value:"Food"},
        {key:'4', value:"Travel"},
        {key:'5', value:"Social"},
        {key:'6', value:"Health"},
        {key:'7', value:"Other"},
  ]

  const pollAudienceData=[//rename this variable 
    { label: 'Squad', value: '1' },
    { label: 'Instagram', value: '2' },
    { label: 'Twitter', value: '3' },
    { label: 'Contancts', value: '4' },
    { label: 'Snapchat', value: '5' },
    { label: 'Tiktok', value: '6' },
]
const navigation = useNavigation()
const route = useRoute();

const renderDataItem = (item) => {
  return (
      <View style={styles.item}>
          <Text style={styles.selectedTextStyle}>{item.label}</Text>
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      </View>
  );
};

const handleTextInputChange = (text) => {
  setPollOption(text);
};

const handleAddButtonPress = () => {
var pollOptionObject ={
id: new Date(),
title:pollOption
  }
  setPollOptionData([...pollOptionData,pollOptionObject]);
  console.log("here is the new poll option",pollOptionData)
 setPollOption("")
};

const renderPOllOptionDataItem = ({item}) => {
  console.log(item)
  return( 
  <TouchableOpacity>
<View style={styles.item}>
          <Text style={{fontSize:24, color:"black"}}>{item.id}</Text>
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      </View>
  </TouchableOpacity>
  )     
};



const handlePoll =async ()=>{
  navigation.navigate('RootNavigation', { screen: 'Profile' })}

  
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

    <View style={{paddingHorizontal:15,marginTop:15,width:350,marginRight:70,marginLeft:30}}>
      <SelectList 
      setSelected={(val) => setSelected(val)} 
      value={selected}
      data={pollLabelData} 
      save="value"
      search={true} 
      />
    </View>

   {/* adding poll options */}
     <View style={styles.pollContentStyles}>
      <Text style={styles.pollContentCaption}>Poll Options</Text>
    </View>
    {/* poll option input  */}
    
      <TextInput
        style={styles.pollOptionInput}
        placeholder="Enter Poll Option"
        value={pollOption}
        onChangeText={value =>{
          setPollOption(value)
      }}
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
        data={pollAudienceData}
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
        onPress={handlePoll}
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
  //marginTop:20,
  marginRight:250,
  marginBottom:10
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
  marginTop: 40,
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
  padding: 17,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginLeft:15

},
selectedStyle: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 14,
  backgroundColor: 'white',
  shadowColor: '#000',
  marginTop: 10,
  marginRight: 12,
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