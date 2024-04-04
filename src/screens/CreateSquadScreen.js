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
  import { updateUser } from '../graphql/mutations';
  import { registerForPushNotificationsAsync, sendPushNotifications } from '../../notificationUtils';
  import { FontAwesome } from '@expo/vector-icons';
  


const CreateSquadScreen = () => {
  const [selected, setSelected] = useState(null);
  const [caption, setCaption] = useState()
  
  const[userImage, setUserImage] =useState('https://squadmaindb55805-staging.s3.us-west-2.amazonaws.com/SquadInAppImages/logos/userProfilePlaceholder.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE8aCXVzLXdlc3QtMSJIMEYCIQCAlMMtLCTHKdfQhT%2FwPQpRyQUzonKKtUaxFaSmcD%2BB%2BgIhAKcJUW120TLC7tb3T6ikcIC%2BRpiV9cnmcc4UNzVHFaSIKu0CCMj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMNzUzMTk1MzE4NjU3IgyxoVbUq1BmOwDrVg8qwQKIgAXZeGYOL8tNp9np0dCcA%2FrEROmqu4gttbtgpEB5s1ZMNs7w16NNguaeALWV66pmCpGHaYBTzi8rRSK1DyguhF%2FGjRWfUfi08HBq5Ch4f71y%2FtKHcaGJX7zIEJC2hG9DWexPSF3MHS7lHb5PczASaX%2FzPNhmWfo7PVCFPqgfVilmGMcPQKd4TRLDu66g%2BGSePaChAUJMVwWrcIzSxdtXBQ90WMry8%2BlyU3NIIu3HqU7xKU%2FB2uySFEme3LRb6ARk78Uilx0PSh%2BMV%2BdNqytGOzzHMOX14JNaIqEBul6hLANlYEG5uWZOaP8wrWhlh8%2FeHAuMHRsMJzbRXLfe7nsfHpTZbqp%2FuOo21%2B8GOdm6n%2BbMTc5%2ByEhFbwwI7t4X2LwN1loiMzY%2FjRiqSrSRhYPWgvTlFtk8Nm%2FGW0yXiBsOCXQwg5aDrAY6sgKJKv4ykpltW%2FJAMJVZG9Sq18wmqADBuWbuyNPzr47gi8GXAdKoXmDPr%2FmP9DHq3J8ydMn9mPPcSyLKSnn7JqdG7%2BBXp5cS%2FrJPqpZOyv1uyS%2B6gnsyOQ7zWhSfUs3RLI0xxKrEdNUR%2F4XzUG%2FScT22eRn9DnMWt3kDeKYkzMpeNOyMqMlQA%2FC%2BHRKtWy%2BToGTubT1RbGPWPlByKoFRNxCUdjWz0wvqaBhGoUYd3CQ%2F5haoe0yLTKi%2BwPDEYxBG9%2Fy1ukgQA3Ld%2B%2BXc9c2TEYUGgjgXndmHxFL3n9yRQppFthpPZcMRroo9bje4kG6fTL%2FwOMnOmIz7k2lQQvBk2wqCfFNMlO9QiB1sIwRoMWOC2ChQlju5yxXKDinldBFc48%2FEFQCVXiFeIUReokiCfVRijEo%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231218T232702Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA26XPQPWATK7JSXEC%2F20231218%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=76b2e2e063ea528d95c8195b12c7248aab466306fecf5a18805f30e4de9ac2e0')
  const [squadName, setSquadName] = useState("")
  const{user} = useUserContext();
  const navigation = useNavigation()
  
  const SquadPrivacyOptions=[ 
    {key:'1', value:"Public"},
    {key:'2', value:"Private"},
    
]

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    > 
     <View style={styles.userImageContainer}>
        <FontAwesome name="group" size={64} color="#1145FD" style={{marginTop:-25}}/>
      </View>
    <View style={styles.pollContentStyles}>
      <Text style={styles.pollContentCaption}>Squad Name</Text> 
    </View>
    <TextInput
        placeholder ="Enter Your Squad Name"
        value={squadName}
        //autoComplete='none'
        autoCapitalize='none'
        onChangeText={text => setSquadName(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
        style={styles.squadNameInput}
        />
    <View style={styles.pollContentStyles}>
      <Text style={styles.pollContentCaption}>Squad Bio</Text>
    </View>
    <TextInput
      placeholder ="Type your Squad Bio here..."
      value={caption}
      onChangeText={text =>setCaption(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
      style={styles.input}
      textAlignVertical={"top"}
    ></TextInput>

<TouchableOpacity
   style={styles.buildSquadBox}
   >
    <Text
    style={{marginTop:15, marginLeft:20,fontWeight:'600', color:'#ffff'}}
    >Build Your Squad</Text>

   {/* */}
   </TouchableOpacity>
  <TouchableOpacity>
  <FontAwesome name="plus-square"
   style={{marginLeft:250, marginTop:-50}}
   size={54} color='#1764EF' /> 
  </TouchableOpacity>
  
  <View style={styles.pollLabelContainer}>
      <Text style={styles.pollContentLabel}>Privacy</Text>
    </View>

    <TouchableOpacity
     style={{paddingHorizontal:15,marginTop:15,width:350,marginRight:70,marginLeft:30}}>
      <SelectList 
      value={selected}
      data={SquadPrivacyOptions} 
      save="value"
      search={true} 
      />
    </TouchableOpacity>
    <View style={styles.pollButtonContainer}>
        <TouchableOpacity
        style = {styles.button}
            >
            <Text style={styles.buttonText}>
                Create Squad
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
    userImageContainer:{
      //marginStart:10,
      marginTop:50,
      marginLeft: -10
     },
    userImage:{
      width:100,
      height:120
  },
    squadLogo:{
      width:100,
      height:35,
      marginRight:250,
      marginTop:70
    },
    pollContentStyles:{
      marginRight:250,
      marginTop:10,
      marginBottom:11.5,
      
    },
    buildSquadBox:{
      marginTop:10,
      borderWidth:1,
      width:270,
      height:50,
      borderColor:'#1764EF',
      borderRadius:15,
      backgroundColor:'#1764EF',
      marginLeft:-70,
      marginTop:30,
      //alignItems:'center'
    },
    addSign:{

    },
     pollOptionTextContainer:{
     marginTop:10,
     borderWidth:1,
     borderColor:'black',
     backgroundColor:'#ffff'
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
      fontSize: 15,
      marginRight:15,
      marginLeft:5,
      color:'black',
      fontWeight:'400'    
  },
  squadNameInput:{
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical:5,
    borderRadius:5,
    width:296,
    height:40,
    marginTop:10,
    fontSize: 15,
    //marginRight:15,
    marginLeft:-50,
// fontStyle:"Montserrat-Regular",
    color:'#535353',
    fontWeight:'400'    
},
  ImageContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    width: "90%",
  },
  pollContentCaption:{
    marginTop:20,
    fontWeight:'700',
    fontSize:18, 
    marginLeft:20

  },
  pollAudience:{
    marginRight:230,
    marginTop:-29
    
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
    marginTop:30,
    marginBottom: 30
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
    backgroundColor: 'white',
   // shadowColor: 'red',
    marginBottom: 10,
    marginRight: 15,
    paddingHorizontal: 12,
     marginLeft:57,
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
export default CreateSquadScreen