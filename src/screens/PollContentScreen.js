import { View, Text, KeyboardAvoidingView, StyleSheet,Image, 
  TextInput, TouchableOpacity, StatusBar, FlatList, ScrollView, SafeAreaView} from 'react-native'
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



const PollContentScreen = () => {
  const [selected, setSelected]  = useState("")
  const [caption, setCaption] = useState()
  const [selectedPollAudience, setSelectedPollAudience] = useState([]);
  const[latest_media, setLatest_media] = useState(null) //the latest_Media 
  const [loading, setLoading] = useState(false);
  const [mediArr, setMediArr] = useState([])

  const data=[ // rename the variable 
        {key:'1', value:"Fashion"},
        {key:'2', value:"Decor"},
        {key:'3', value:"Food"},
        {key:'4', value:"Travel"},
        {key:'5', value:"Social"},
        {key:'6', value:"Health"},
        {key:'7', value:"Other"},
  ]
  const DATA=[//rename this variable 
    { label: 'Squad', value: '1' },
    { label: 'Instagram', value: '2' },
    { label: 'Twitter', value: '3' },
    { label: 'Contancts', value: '4' },
    { label: 'Snapchat', value: '5' },
    { label: 'Tiktok', value: '6' },
]
const navigation = useNavigation()
const route = useRoute();
const latestImage = route?.params.image
//there is a difference between the latest_media and latestMedia 
//try passing 

useEffect(()=>{
  console.log("the first console log in useEffect",latestImage)
  setLatest_media(latestImage) ///sets the latest media to be the item received 
  console.log("this is the latest media",latest_media)
  if(mediArr.length <4 && latest_media != null){
    mediArr.push(latest_media)
  }

    console.log("this is the mediaArr",mediArr)
 },[latest_media, mediArr, latestImage])

// const mediaData = collectData(data)

const renderDataItem = (item) => {
  return (
      <View style={styles.item}>
          <Text style={styles.selectedTextStyle}>{item.label}</Text>
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      </View>
  );
};
const handlePoll =async ()=>{
  alert("Attempts to create a  new poll")
  navigation.navigate('RootNavigation', { screen: 'Profile' })
//define the data for the new poll 
const authUser = await Auth.currentAuthenticatedUser();
const newPoll = {
    closedPoll: false, 
    livePoll: true, 
    pollCaption: caption, 
    userID: authUser.attributes.sub,
};

  //create the poll, the user id is the creator's id ig
  const newPollData = await API.graphql(graphqlOperation(
    createPoll, {input: newPoll}
  ))
  console.log(newPollData)
  // the squad id is the user's squad
  //navigation.navigate('RootNavigation', { screen: 'Profile' })
  //creating a function that renders images from the user side by side
}

// const renderImage = ({ source }) => (
//     <Image source={source} />
//   );
// //this flatlist is supposed to render images from the previous screen
//   const renderImages = ({ images }) => (
//     <FlatList
//       data={images}
//       renderItem={renderImage}
//     />
//   );

  
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
    ></Image>
    </View>
    <View style={styles.pollContentStyles}>
      <Text style={styles.pollContentText}>Poll Content</Text>
    </View>
    <FlatList
    
    
    />
    {/* <ScrollView
    style={styles.ImageContainer}
    contentContainerStyle={{
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    }}
    horizontal={true}
    >
      {mediArr.map((image, i) => {
        console.log("loading the image inside the scroll view", image)
            return (
              <View
                style={{
                  padding: 5,
                }}
                key={i}
              >
                <Image
                  source={{ uri: image }}
                  style={[
                    styles.Image,
                    {
                      width: i % 2 === 1 ? 150 : 95,
                      height: i % 2 === 1 ? 150 : 95,
                    },
                  ]}
                  resizeMode="center"
                  onLoadStart={() => setLoading(true)}
                  onLoadEnd={() => setLoading(false)}
                />
              </View>
            );
          })}
    </ScrollView> */}
    <View style={styles.pollLabelContainer}>
      <Text style={styles.pollContentLabel}>Poll Label</Text>
    </View>
    <View style={{paddingHorizontal:15,marginTop:15,width:350,marginRight:70,marginLeft:30}}>
    <SelectList 
    setSelected={(val) => setSelected(val)} 
    value={selected}
    data={data} 
    save="value"
    search={true} 
    />
    </View>
   

    <View style={styles.pollContentStyles}>
      <Text style={styles.pollContentCaption}>Poll Caption</Text>
    </View>
    <TextInput
      placeholder ="Example: A Tesla or a Messeratti?"
      value={caption}
      onChangeText={text =>setCaption(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
      style={styles.input}
      textAlignVertical={"top"}
    ></TextInput>
    <View style={styles.pollAudience}>
      <Text style={styles.pollContentCaption}>Poll Audience</Text>
      <View style={{paddingHorizontal:15,marginTop:15,width:350,marginRight:-250}}></View>
    </View>
    <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={DATA}
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
            <StatusBar />
    <View style={styles.buttonContainer}>
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

export default PollContentScreen
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
  marginTop:20,
  marginRight:250
},
button:{
  backgroundColor: '#1764EF',
  width: 350,
  height: 42,
  padding: 12,
  borderRadius: 5,
  marginTop: 40,
  alignItems: 'center',
  marginRight: 10,
  marginLeft:15,
},
buttonContainer:{
  width: 296,
  height:42,
  borderRadius:5,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
  marginBottom: 60
  },
  buttonText:{
    color: 'white',
    fontWeight: '600',
    fontSize: 14   
},
dropdown: {
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
},

placeholderStyle: {
  fontSize: 16,
  color:'white'
},
selectedTextStyle: {
  fontSize: 14,
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
  color:'white'
},
item: {
  padding: 17,
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
  marginTop: 8,
  marginRight: 12,
  paddingHorizontal: 12,
  paddingVertical: 8,
  shadowOffset: {
      width: 0,
      height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  marginLeft:37,

  elevation: 2,
},
textSelectedStyle: {
  marginRight: 10,
  fontSize: 16,
},
})
