    import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
    StatusBar,Dimensions,SafeAreaView,SectionList,FlatList} from 'react-native'
    import React, { useState } from 'react'
    import StepIndicator from 'react-native-step-indicator';
    import { TouchableOpacity } from 'react-native';
    import { useNavigation } from '@react-navigation/native';
    import { Icon } from 'react-native-elements';
    import { fontSize } from '@mui/system';
    import { Entypo } from '@expo/vector-icons'; //contacts
    import { Ionicons } from '@expo/vector-icons'; 
    import { FontAwesome5 } from '@expo/vector-icons';//instagram and tiktok 
    import { FontAwesome } from '@expo/vector-icons'; //snapchat
    import { AntDesign } from '@expo/vector-icons'; //twitter
    
    //const labels = ["Cart","Delivery Address","Order Summary","Payment Method","Track"];
    const{width,height} = Dimensions.get("window")
    //const[currentPosition, setCurrentPositon]=useState(0)
    const customStyles = {
      stepIndicatorSize: 25,
      currentStepIndicatorSize:30,
      separatorStrokeWidth: 2, 
      currentStepStrokeWidth: 3,
      stepStrokeCurrentColor: '#ffff',
      stepStrokeWidth: 3,
      stepStrokeFinishedColor: '#1764EF',
      stepStrokeUnFinishedColor: '#aaaaaa',
      separatorFinishedColor: '#1764EF',
      separatorUnFinishedColor: '#aaaaaa',
      stepIndicatorFinishedColor:  '#1764EF',
      stepIndicatorUnFinishedColor: '#ffffff',
      stepIndicatorCurrentColor: '#1764EF',
      stepIndicatorLabelFontSize: 13,
      currentStepIndicatorLabelFontSize: 13,
      stepIndicatorLabelCurrentColor: '#ffffff',
      stepIndicatorLabelFinishedColor: '#ffffff',
      stepIndicatorLabelUnFinishedColor: '#aaaaaa',
      //labelColor: '#999999',
      labelSize: 13,
      currentStepLabelColor: '#fffff'
    }
    
    
    
    
    
  const SquadCreationScreen = () => {
  const navigation = useNavigation()
  const[currentPosition, setCurrentPositon] = useState(3)


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
    <StatusBar backgroundColor={'black'} barStyle="light-content" />
    <View style={styles.header}>
      <Text style={styles.headerText}> Sign Up Progress</Text>
    </View>
    <View style={styles.indicatiorWindow}>
    <StepIndicator
    customStyles={customStyles}
    currentPosition={currentPosition}
    //labels={labels}
    />
    </View>  
    <View style={styles.squadTextContainer}>
      <Text style={styles.squadText}>
      Get feedback from those you know best:
      Your Squad will be the default group of contacts 
      that you will be able to share your polls with: 
      you can always edit the Squad in your account page.
      Grow your Squad through the following:
      </Text>
    </View>
    {/** Squad and contact Squad creation*/}
    <View style= {[{flexDirection:"row"}]}>
      <TouchableOpacity style= {[{flex:1}, styles.contacts]}>
          <Ionicons
          name = "people"
          size = {50}
          color= '#1977F3'
          style= {[{justifyContent:'flex-start'}, styles.contactsLogo]}
          ></Ionicons>
          <Text style={styles.contactsTexts}>
            Access Contacts
          </Text>
      </TouchableOpacity>
      <TouchableOpacity style= {[{fex:1}, styles.squadAddLogoContainer]}>
              <Ionicons
              name = 'person-add'
              size={50}
              color='#1977F3'
              //source={require('/Users/sheldonotieno/Squad/assets/facebooklogo.png')}
              style={[{justifyContent:'flex-end'},styles.squadAddLogo]}
              >
           </Ionicons>
           <Text style={styles.contactsTexts}>
             Squad Access
          </Text>
      </TouchableOpacity>       
  </View>
 {/**Instagram and Tiktok Squad creation*/}
  <View style= {[{flexDirection:"row"}, ]}>
          <TouchableOpacity style= {[{flex:1},styles.InstagramLogoContainer ]}>
          <FontAwesome5 
          name="instagram-square" 
          size={54} 
          color='#1977F3' 
          style= {[{justifyContent:'flex-start'}, styles.googleLogo]}
            />
            <Text style={styles.contactsTexts}>
           Access Instagram
          </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style= {[{fex:1}, styles.TiktokLogoContainer]}>
                  <FontAwesome5
                  name='tiktok'
                  size = {54}
                  color='#1977F3' 
                  //source={require('/Users/sheldonotieno/Squad/assets/facebooklogo.png')}
                  style={[{justifyContent:'flex-end'},styles.TiktokLogo]}
                  >
                  </FontAwesome5>
                  <Text style={styles.contactsTexts}>
                    Access Tiktok
                  </Text>
          </TouchableOpacity>       
      </View>

       {/**Twitter and Snapchat Squad creation*/}
      <View style= {[{flexDirection:"row"},]}>
          <TouchableOpacity style= {[{flex:1}, styles.SnapChateLogoContainer]}>
              <FontAwesome
              name='snapchat-ghost'
              size={54}
              color= '#1977F3' 
              //source={require('/Users/sheldonotieno/Squad/assets/google-logo.png')}
              style= {[{justifyContent:'flex-start'}, styles.SnapChatLogo]}
              ></FontAwesome>
              <Text style={styles.contactsTexts}>
                    Access SnapChat
                  </Text>
             </TouchableOpacity>
              <TouchableOpacity style= {[{fex:1},styles.TwitterLogoContainer]}>
                  <AntDesign
                  name='twitter'
                  size={54}
                  color= '#1977F3' 
                 // source={require('/Users/sheldonotieno/Squad/assets/facebooklogo.png')}
                  style={[{justifyContent:'flex-end'},styles.facebookLogo]}
                  >
                  </AntDesign>
                  <Text style={styles.contactsTexts}>
                    Twitter Access
                </Text>
          </TouchableOpacity>       
      </View>
      <View style={[{ flexDirection:"row" },{marginTop:-50}, {marginBottom:30},{marginLeft:30}]}>
        <TouchableOpacity  onPress={() =>navigation.replace('PersonalInterestScreen')}style={[{flex:1}, styles.backButton,{borderColor:'#1145FD'}]}>
            <Text  style={[{justifyContent: 'flex-end'},styles.backText]}> Back </Text>
           </TouchableOpacity>
            <TouchableOpacity  onPress={() =>
              navigation.navigate('RootNavigation', { screen: 'HomeScreen' })}
              style={[{flex:1}, styles.button]}>
            <Text  style={[{justifyContent: 'flex-end'},styles.buttonText]}> Next </Text>
           </TouchableOpacity>
   </View>
  
      
        
      
    </KeyboardAvoidingView>
  )
  }

  export default SquadCreationScreen
  const styles = StyleSheet.create({
  container:{
  flex:1,
  justifyContent:"flex-start",
  alignItems:"center",
  backgroundColor: "#F4F8FB",


  },
  squadLogo:{
      width:100,
      height:35,
      marginRight:250,
      marginTop:70
      

  
  },
  header:{
    height: 55, 
    //padding:10, 
    width:'50%',
    //backgroundColor:"#000",
    //elevation:10,
    justifyContent:"center",
    alignItems:'center',
    marginRight:200,
    marginTop: 10,
    marginLeft:35
  },
  headerText:{
    //color:'red',
    fontSize:22,
    fontWeight:'bold'
  },
  indicatiorWindow:{
    //height:height-170,
    width:width-30,
    padding:20,
    margin:15,
    //elevation:10,
    borderRadius:20,
    marginTop:-20

    //backgroundColor:'blue'
  },
  squadTextContainer:{
    marginTop:-10,
    marginLeft:25,
    marginRight:20

  },
  squadText:{
    fontWeight:'500',
    fontSize:14
  },
 
  contacts:{
    width:120,
    height:100,
    marginTop:30,
    backgroundColor: '#FFFFFF',
    borderRadius:12,
    padding:10,
    marginRight:80,
    //alignItems:'center',
    marginLeft:50
  },
  contactsLogo:{
    marginLeft:30,
    
   
  },
  contactsTexts:{
    fontWeight:'600'
  },
  squadAddLogoContainer:{
    marginTop:30,
    width:150,
    height:100,
    backgroundColor: '#FFFFFF',
    borderRadius:12,
    padding:10,
    marginRight:50,
    //alignItems:'center',
    marginLeft:-60
    
  },
  squadAddLogo:{
   marginLeft:10,
  },
  InstagramLogoContainer:{
    width:120,
    height:100,
    marginTop:30,
    backgroundColor: '#FFFFFF',
    borderRadius:12,
    padding:10,
    marginRight:80,
    //alignItems:'center',
    marginLeft:50
  },
  TiktokLogoContainer:{
    marginTop:30,
    width:150,
    height:100,
    backgroundColor: '#FFFFFF',
    borderRadius:12,
    padding:10,
    marginRight:50,
    //alignItems:'center',
    marginLeft:-60
  },
 SnapChateLogoContainer:{
  width:120,
  height:100,
  marginTop:30,
  backgroundColor: '#FFFFFF',
  borderRadius:12,
  padding:10,
  marginRight:80,
  //alignItems:'center',
  marginLeft:50
    
  },
  TwitterLogoContainer:{
    marginTop:30,
    width:150,
    height:100,
    backgroundColor: '#FFFFFF',
    borderRadius:12,
    padding:10,
    marginRight:50,
    //alignItems:'center',
    marginLeft:-60
  },
  button:{
    backgroundColor: '#1145FD',
    width: 120,
    height: 42,
    padding: 10,
    borderRadius: 5,
    marginTop: 130,
    alignItems: 'center',
    marginRight: 50,
    marginLeft:20,

},

backButton:{
  backgroundColor: '#EAEAEA',
  width: 120,
  height: 42,
  padding: 10,
  borderRadius: 5,
  marginTop: 130,
  alignItems: 'center',
  marginRight: 5,
  marginLeft:15,
  borderColor:'#1145FD'

},
buttonText:{
  color: 'white',
  fontWeight: '700',
  fontSize: 15,
  alignItems:"center"
  
  
},
backText:{
  color: '#1145FD',
  fontWeight: '700',
  fontSize: 15,
  alignItems:"center"
  
  
},
  },

  )