import { View, Text,KeyboardAvoidingView,Image, StyleSheet, TextInput,
  StatusBar,Dimensions,TouchableOpacity, SafeAreaView} from 'react-native'
  import React, { useEffect, useState } from 'react'
  import { MaterialIcons } from '@expo/vector-icons';
  import { Ionicons } from '@expo/vector-icons'; 
  import StepIndicator from 'react-native-step-indicator';
  //import { Icon } from 'react-native-elements';
  //import Ionicons from '@expo/vector-icons/Ionicons';
  import { FontAwesome } from '@expo/vector-icons'; 
  import { Entypo } from '@expo/vector-icons'; 
  import { useNavigation } from '@react-navigation/native';
  import { AntDesign } from '@expo/vector-icons';
  import { useUserContext } from '../../UserContext';

  const{width,height} = Dimensions.get("window")


const EditProfileScreen = () => {
  // const[username, setUserName] = useState("User Name")
  const[name, setName] = useState()
  const[email, setEmail] = useState()
  const[username, setUsername] = useState()
  const[phoneNumber, setPhoneNumber] = useState()
  const[location, setLocation] = useState()
  const navigation = useNavigation()
  const {user} = useUserContext()
  

  useEffect(()=>{
    if(user){
      console.log("here is the user", user)
      setUsername(user.UserName)
    }
  })


  return (
    <SafeAreaView
    style={styles.container}
        behavior="padding">

      <TouchableOpacity style = {[{backgroundColor:"#F4F8FB"},{flexDirection:"row", marginTop:30}]}
      onPress={()=>navigation.goBack()}
      >
      <AntDesign name="arrowleft" size={24} color="#1764EF" style={{flex:1, marginLeft:30, justifyContent:'flex-start'}}/>
      <Text
      style = {{fontWeight: '600', fontSize:15, flex:1, marginRight:150, justifyContent:'flex-end'}}
      >Edit the basics</Text>
   

    </TouchableOpacity>
    <View style = {[{backgroundColor:"#F4F8FB"},{flexDirection:"row"}]}>
      <View style={{flex:1, justifyContent:'center', marginLeft:130, marginTop:-20}}>
          <Image
            source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
            resizeMode={'contain'}
            style={[{ height: 82 }, { width: 82 }, 
            {overflow:'hidden'},{marginBottom:12}, {marginLeft:20},{marginTop:50}, {borderRadius:40}, {borderWidth:3}, {borderColor:'#FFFF'}]} />
            <View
            style={{marginLeft:20, backgroundColor:'#FFFF', width:130, height:40, borderRadius:15}}
            >
            <Text
            style={{marginLeft:10, marginTop:10}}
            >Change Photo</Text>
          </View>
        </View> 
    </View>
    <View
    style={{marginTop:20, marginLeft:-310}}
    >
      <Text>
     Bio

      </Text>
    </View>
    <TextInput
        placeholder ="Bio"
        value={name}
        autoCapitalize='none'
        //textAlign = 'center'
        keyboardType="email-address"
        onChangeText={text => setName(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
        style={styles.input}
        />
    <View
    style={{marginTop:20, marginLeft:-310}}
    >
      <Text>
     Name

      </Text>
    </View>
    <TextInput
        placeholder ="Name"
        value={name}
        autoCapitalize='none'
        //textAlign = 'center'
        keyboardType="email-address"
        onChangeText={text => setName(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
        style={styles.input}
        />
        <View
        style={{marginTop:20, marginLeft:-290}}>
          <Text>
            User Name
          </Text>
        </View>
        <TextInput
        placeholder ="Username"
        autoCapitalize='none'
        value={username}
        //textAlign = 'center'
        onChangeText={text =>setUsername(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
        style={styles.input}
        //secureTextEntry
        />
        <View
        style={{marginTop:20, marginLeft:-270}}>
          <Text>
            Email Address
          </Text>
        </View>
        <TextInput
        placeholder ="Email Address"
        value={email}
        autoCapitalize='none'
        //textAlign = 'center'
        keyboardType="email-address"
        onChangeText={text => setEmail(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
        style={styles.input}
        />
       
       <View
       style={{marginTop:20, marginLeft:-270}}
       >
          <Text>
            Phone Number
          </Text>
        </View>
        <TextInput
        placeholder ="PhoneNumber"
        value={phoneNumber}
        autoCapitalize='none'
        //textAlign = 'center'
        keyboardType="email-address"
        onChangeText={text => setPhoneNumber(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
        style={styles.input}
        />
        <TouchableOpacity
       // onPress={signUpWithAws}
        style = {styles.button}
            >
            <Text style={styles.buttonText}>
                Submit
            </Text>
        </TouchableOpacity>
        
    
    </SafeAreaView>
  )}












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
      marginTop:20
  },
  squadLogo:{
    width:221,
    height:85


},
InputContainer:{
  
    right: 16,
    marginLeft:29,
    marginTop: 20,
    borderRadius:5

},

input:{
    backgroundColor: '#FFFF',
    paddingHorizontal: 15,
    paddingVertical:10,
    borderRadius:5,
    width:356,
    height:42,
    marginTop:10,
    fontSize: 13,
    fontWeight:'600',
    marginRight:15,
    marginLeft:10,
    //fontFamily:"Montserrat-Regular",
    color:'',
        
},
countryCodeInput:{
backgroundColor: '#EAEAEA',
marginTop:10,
height:42,
width:40,
marginLeft:10,
marginRight:12,
paddingHorizontal:10    

},
phoneNumberInput:{
    backgroundColor: '#EAEAEA',
    marginTop:10,
    height:42,
    marginLeft:-175,
    marginRight:-10,
    paddingVertical:13,
    paddingHorizontal:12,
    width:100,
    color:'#535353',
    fontSize: 13,
    fontWeight:'400',
    

},
errorText:{
    color:'#FFFFF',
    marginLeft:20,
    fontSize:12,
    fontWeight:'600'
    //textAlign:'center'


},
    buttonContainer:{
    width: 196,
    height:42,
    borderRadius:5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 23,
    marginBottom: 60
},

button:{
    backgroundColor: '#1145FD',
    width: 366,
    height: 42,
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    marginRight: 10,
    marginLeft:15,
    top: 0


},
buttonText:{
    color: 'white',
    fontWeight: '700',
    fontSize: 10
    
},
buttonOutline:{
backgroundColor: 'white',
marginTop: 5,
borderColor: '#1145FD',
borderWidth: 2,


},
buttonOutlineText:{
    color: '#1145FD',
    fontWeight: '700',
    fontSize: 16
},
textWrapper:{
    textAlign:'left',
    marginTop:5,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'flex-start'

},

text:{
fontSize: 12,
textAlign: 'left',
marginTop:10,
marginBottom: 10,
marginLeft:10,
// alignItems:'left',
//fontStyle: "Montserrat"


},
loginText:{
    fontSize: 14,
    marginTop: -40,
    marginBottom:10,
    marginLeft: 10,
    fontWeight:'bold',
    // fontStyle:"Montserrat"
},
horizontalLineContainer:{},
googleLogo:{
height: 30, 
width:30,
borderRadius:20,
overflow:'hidden',
borderWidth:1,
borderColor: "red",
marginLeft:220,
marginTop:-5,
marginRight:20

},
facebookLogo:{
    height: 30, 
    width:30,
    borderRadius:20,
    overflow:'hidden',
    borderWidth:1,
    borderColor: "red",
    marginRight:220,
    marginTop:-5
},
logo:{
marginTop:37}
  })

export default EditProfileScreen