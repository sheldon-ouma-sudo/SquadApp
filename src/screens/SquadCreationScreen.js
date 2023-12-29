    import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
    StatusBar,Dimensions,SafeAreaView,SectionList,FlatList,Share,TouchableOpacity } from 'react-native'
    import React, { useState } from 'react'
    import StepIndicator from 'react-native-step-indicator';
    import { useNavigation, useRoute } from '@react-navigation/native';
    import { FontAwesome5 } from '@expo/vector-icons';
    import { FontAwesome } from '@expo/vector-icons'; 
    import { createSquad } from '../graphql/mutations';
    import { useEffect } from 'react';
    import { graphqlOperation, Auth, API } from 'aws-amplify';
    import { createSquadUser } from '../graphql/mutations';
    import { updateUser } from '../graphql/mutations';
    import { graphql } from 'graphql';
    import { useUserContext } from '../../UserContext';
    
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
    const[currentPosition, setCurrentPositon] = useState(3)
    const[userId, setUserId] = useState("")
    const[mainSquadId, setMainSquadId] = useState("")
    const { user, updateUserProperty } = useUserContext();

const navigation = useNavigation()
const route = useRoute()
 const authUserID = route.params?.authUserID
 console.log("here is the authUserID",authUserID)
//create Squad 
useEffect(()=>{
    const createMainUserSquad = async()=>{
      const authUser = await Auth.currentAuthenticatedUser()
      const squad_name = authUser.attributes.name 
      const squadName = squad_name + " Main Squad"
      //create a Squad
      try {
      const newSquad = await API.graphql(graphqlOperation(createSquad, {
        input:{ authUserID:authUserID, squadName:squadName, numOfPolls:0}}))
      if(!newSquad.data?.createSquad){
        console.log("Error creating a Squad")
      }
     const squadID = newSquad.data.createSquad.id
     setMainSquadId(squadID)
     updateUserProperty('userSquadId', squadID);
     
     return squadID
      } catch (error) {
        console.log(error)
      }
      
    }
    createMainUserSquad()
  }, [])


  const handleUserSquadCreation =async ()=>{
    if(authUserID!=='undefined'){
      const newSquadId = mainSquadId
      try {
         await API.graphql(graphqlOperation(updateUser,{
          input:{id:authUserID,userSquadId:newSquadId}   
        }

        ))
        console.log("successful user update")
        navigation.navigate('RootNavigation', { screen: 'Explore', 
        screen:{screen:'Find Users',
        sqauad_id:mainSquadId}})
      } catch (error) {
        console.log("error updating userSquad", error)
      }
 }
 console.log("this is the updated user information", user);
 navigation.navigate('RootNavigation', { screen: 'Explore', params: { screen: 'Find Users' } });




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
        <TouchableOpacity style= {[{flex:1}, styles.contacts]}>
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
        onPress={handleUserSquadCreation}
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
              <TouchableOpacity  onPress={() =>
               navigation.navigate('RootNavigation', { screen:'Home'})}
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