    import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
    StatusBar,Dimensions,SafeAreaView,SectionList,FlatList,Share,TouchableOpacity } from 'react-native'
    import React, { useState, useRef } from 'react'
    import StepIndicator from 'react-native-step-indicator';
    import { useNavigation, useRoute } from '@react-navigation/native';
    import { FontAwesome5 } from '@expo/vector-icons';
    import { FontAwesome } from '@expo/vector-icons'; 
    import { useEffect } from 'react';
    import { graphqlOperation, Auth, API } from 'aws-amplify';
    import { createSquadUser, updateUser, createNotification } from '../graphql/mutations';
    import { useUserContext } from '../../UserContext';
    import { getUser } from '../graphql/queries';
    
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
    const [currentPosition, setCurrentPositon] = useState(4);
    const [squadUserCreated, setSquadUserCreated] = useState(false);
    const { user, updateUserProperty, updateLocalUser } = useUserContext(); // Get user context
    const squadCreationInProgress = useRef(false);
    const navigation = useNavigation();
    const route = useRoute();
    const { squadID } = route?.params;
  
    useEffect(() => {
      const createMainUserNotification = async () => {
        if (user && squadID && !squadUserCreated) {
          try {
            // Create notification only
            const notificationResponse = await API.graphql(
              graphqlOperation(createNotification, {
                input: {
                  pollRequestsArray: [],
                  pollResponsesArray: [],
                  pollCommentsArray: [],
                  pollLikeResponseArray: [],
                  squadAddRequestsArray: [],
                  SquadJoinRequestArray: [],
                  userID: user.id,
                  new: true,
                },
              })
            );
            
            const newNotification = notificationResponse.data.createNotification;
    
            // Update the local user context
            const updatedNotifications = [...(user.Notifications || []), newNotification];
            updateLocalUser({
              ...user,
              Notifications: updatedNotifications,
            });
    
            // Update user notifications in the database
            await API.graphql(
              graphqlOperation(updateUser, {
                input: {
                  id: user.id,
                  Notifications: updatedNotifications,
                },
              })
            );
            
            setSquadUserCreated(true);
          } catch (error) {
            console.log("Error creating notification:", error);
          }
        }
      };
      createMainUserNotification();
    }, [user, squadID]);
    
const handleUserNavigationToExploreUserScreen =async ()=>{
  if(user){
    try {
      const userID = user.id;
      const userData = await API.graphql(graphqlOperation(getUser, { id: userID }));
      // Extract the user information from the query result
      const userFromBackend = userData.data?.getUser;
      if(userFromBackend.userSquadId.length ===0){
        console.log("the userSquadId was not updated")
      }else{
        navigation.navigate('RootNavigation', { screen: 'Explore', params: { screen: 'Find Users' } });
      }
    } catch (error) {
      console.log("error navigating to the main screen", error)
    }
 
  }
}

const handlesUserToPollCreationNavigation = async()=>{
 //navigation.navigate("WordPollCreationScreen");
 if(user){
  try {
    const userID = user.id;
    const userData = await API.graphql(graphqlOperation(getUser, { id: userID }));
    // Extract the user information from the query result
    const userFromBackend = userData.data?.getUser;
    if(userFromBackend.userSquadId.length ===0){
      console.log("the userSquadId was not updated")
    }else{
      navigation.navigate("WordPollCreationScreen");
    }
  } catch (error) {
    console.log("error navigating to the main screen", error)
  } 

}
}

const handleNavigationToHomeScreen = async() =>{
  // if(user){
  //   try {
  //     const userID = user.id;
  //     const userData = await API.graphql(graphqlOperation(getUser, { id: userID }));
  //     // Extract the user information from the query result
  //     const userFromBackend = userData.data?.getUser;
  //     if(userFromBackend.userSquadId.length ===0){
  //       console.log("the userSquadId was not updated")
  //     }else{
  //       navigation.navigate('RootNavigation', { screen:'Home'})
  //     }
  //   } catch (error) {
  //     console.log("error navigating to the main screen", error)
  //   }
 
  // }
  navigation.navigate('RootNavigation', { screen:'Home'})
  
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
        Your Squad will be the default group of friends and family 
        that you will be able to share your polls with, 
        you can always edit the Squad in your account page.
        You can start by growing your squad or creating your first poll:
        </Text>
      </View>
      {/** Squad and contact Squad creation*/}
      <SafeAreaView></SafeAreaView>
      <View style= {[{flexDirection:"row"}]}>
        <TouchableOpacity style= {[{flex:1}, styles.contacts]}
        onPress={handlesUserToPollCreationNavigation}
        >
            <FontAwesome5
            name = "poll"
            size = {50}
            color= '#1977F3'
            style= {[{justifyContent:'flex-start'}, styles.contactsLogo]}
            />
            <Text style={styles.contactsTexts}>
              Create your first poll
            </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={handleUserNavigationToExploreUserScreen}
        style= {[{fex:1}, styles.squadAddLogoContainer]}>
                <FontAwesome
                name = 'group'
                size={50}
                color='#1977F3'
                style={[{justifyContent:'flex-end'},styles.squadAddLogo]}
               />
              
             <Text style={styles.contactsTexts}>
               Build your Squad
            </Text>
        </TouchableOpacity>       
    </View>
        <View style={[{ flexDirection:"row" },{marginTop:-80}, {marginBottom:30},{marginLeft:30}]}>
          <TouchableOpacity  onPress={() =>navigation.replace('PersonalInterestScreen')}style={[{flex:1}, styles.backButton,{borderColor:'#1145FD'}]}>
              <Text  style={[{justifyContent: 'flex-end'},styles.backText]}> Back </Text>
             </TouchableOpacity>
              <TouchableOpacity  onPress={handleNavigationToHomeScreen }
                style={[{flex:1}, styles.button]}>
              <Text  style={[{justifyContent: 'flex-end'},styles.buttonText]}> Next </Text>
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
      export default SquadCreationScreen