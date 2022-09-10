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
      you can always edit the Squad in your account page 
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
      <TouchableOpacity style= {{fex:1}}>
              <Ionicons
              //source={require('/Users/sheldonotieno/Squad/assets/facebooklogo.png')}
              style={[{justifyContent:'flex-end'},styles.facebookLogo]}
              >
           </Ionicons>
      </TouchableOpacity>       
  </View>
 {/**Instagram and Tiktok Squad creation*/}
  <View style= {[{flexDirection:"row"}, styles.logo]}>
          <TouchableOpacity style= {{flex:1}}>
              <Image
              //source={require('/Users/sheldonotieno/Squad/assets/google-logo.png')}
              style= {[{justifyContent:'flex-start'}, styles.googleLogo]}
              ></Image>
          </TouchableOpacity>
          <TouchableOpacity style= {{fex:1}}>
                  <Image
                  //source={require('/Users/sheldonotieno/Squad/assets/facebooklogo.png')}
                  style={[{justifyContent:'flex-end'},styles.facebookLogo]}
                  >
                  </Image>
          </TouchableOpacity>       
      </View>

       {/**Twitter and Snapchat Squad creation*/}
      <View style= {[{flexDirection:"row"}, styles.logo]}>
          <TouchableOpacity style= {{flex:1}}>
              <Image
              //source={require('/Users/sheldonotieno/Squad/assets/google-logo.png')}
              style= {[{justifyContent:'flex-start'}, styles.googleLogo]}
              ></Image>
             </TouchableOpacity>
              <TouchableOpacity style= {{fex:1}}>
                  <Image
                 // source={require('/Users/sheldonotieno/Squad/assets/facebooklogo.png')}
                  style={[{justifyContent:'flex-end'},styles.facebookLogo]}
                  >
                  </Image>
          </TouchableOpacity>       
      </View>
      <View style= {[{flexDirection:"row"}, styles.logo]}>
              <TouchableOpacity style= {{flex:1}}>
                  <Image
                  //source={require('/Users/sheldonotieno/Squad/assets/google-logo.png')}
                  style= {[{justifyContent:'flex-start'}, styles.googleLogo]}
                  ></Image>
              </TouchableOpacity>
              <TouchableOpacity style= {{fex:1}}>
                      <Image
                     // source={require('/Users/sheldonotieno/Squad/assets/facebooklogo.png')}
                      style={[{justifyContent:'flex-end'},styles.facebookLogo]}
                      >
                      </Image>
              </TouchableOpacity>       
          </View>
        <View style= {[{flexDirection:"row"}, styles.logo]}>
            <View style= {{flex:1}}>
                <Image
                //source={require('/Users/sheldonotieno/Squad/assets/google-logo.png')}
                style= {[{justifyContent:'flex-start'}, styles.googleLogo]}
                ></Image>
            </View>
                <View style= {{fex:1}}>
                    <Image
                   // source={require('/Users/sheldonotieno/Squad/assets/facebooklogo.png')}
                    style={[{justifyContent:'flex-end'},styles.facebookLogo]}
                    >
                    </Image>
            </View>       
        </View>
        <View style= {[{flexDirection:"row"}, styles.logo]}>
            <View style= {{flex:1}}>
                <Image
               // source={require('/Users/sheldonotieno/Squad/assets/google-logo.png')}
                style= {[{justifyContent:'flex-start'}, styles.googleLogo]}
                ></Image>
            </View>
                <View style= {{fex:1}}>
                    <Image
                  //  source={require('/Users/sheldonotieno/Squad/assets/facebooklogo.png')}
                    style={[{justifyContent:'flex-end'},styles.facebookLogo]}
                    >
                    </Image>
            </View>       
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
    height:120,
    marginTop:30,
    backgroundColor: '#FFFFFF',
    padding:10,
    marginRight:200,
    //alignItems:'center',
    marginLeft:30
  },
  contactsLogo:{
    marginLeft:30
   
  },
  contactsTexts:{
    fontWeight:'600'
  },
  squadAddLogo:{
    
  }

  },













  )