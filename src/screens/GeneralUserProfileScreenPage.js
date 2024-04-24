  import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,TouchableOpacity} from 'react-native'
  import PersonalPollScreen from './PersonalPollScreen'
  //import SwayingScreen from './SwayingScreen'
  import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
  import { useNavigation } from '@react-navigation/native'
  //import MySquadScreen from './MySquadScreen'
  import SquadCreatedScreen from './SquadCreatedScreen'
  import SquadJoinedScreen from './SquadJoinedScreen'
  import { useRoute } from '@react-navigation/native';
  //import { AntDesign } from '@expo/vector-icons';
  import React from 'react'
  import { useState, useEffect } from 'react'
  import { useSafeAreaInsets } from 'react-native-safe-area-context';
  import { API, graphqlOperation, Auth } from "aws-amplify";
  //import { graphqlOperation } from 'aws-amplify' 
  import { Entypo } from '@expo/vector-icons';
  import {getUser, pollsByUserID} from '../graphql/queries'
  import { useUserContext } from '../../UserContext'
  import { MaterialIcons } from '@expo/vector-icons';
  import { updateUser } from '../graphql/mutations'
  import GeneralProfileUserSquadCreatedTab from './GeneralProfileUserSquadCreatedTab'
  import GeneralUserProfilePollTab from './GeneralUserProfilePollTab'
  import GeneralUserProfileSquadJoinedTab from './GeneralUserProfileSquadJoinedTab'
  


const GeneralUserProfileScreenPage = () => {
  const[profileImage, setProflieImage]= useState('https://squad-file-storage235821-staging.s3.us-west-2.amazonaws.com/Squad_inApp_images/userProfilePlaceholder.png')
  const[userName, setUserName] =useState('User Name')
  const[numOfUserPolls, setNumOfUserPolls] = useState("1060")
  const[numOfUserSquadron, setNumOfSquadron] = useState("1060")
  const[numOfUsersInSquad, setNumOfSquadUsers] = useState("1060")
  const[name, setName] = useState("")
  const{userInfo, updateUserProperty} = useUserContext();
  const[userPolls, setUserPolls] = useState([])
  const Tab  = createMaterialTopTabNavigator();
  const navigation = useNavigation()
  const insets = useSafeAreaInsets();  
  //query the user from the backend
  //set the values to what is in the backend 

 // Get the route object
  const route = useRoute();
  const user = route.params?.userInfo; // Retrieve the passed userID
 
   useEffect(()=>{
    console.log("here is the user received from the poll item", userInfo)
    const queryUser = async () => {
      try {
        // const authUser = await Auth.currentAuthenticatedUser();
        // const userID = user.id; // Use sub instead of profile for the user ID
        // console.log("user id in the profile top navigation: ", userID)
        // const name = authUser.attributes.name;

        // // Query the user from the backend using Amplify API
        // const userData = await API.graphql(graphqlOperation(getUser, { id: userID }));

        // // Extract the user information from the query result
         const userFromBackend = user;
        // console.log("here is the user from backend ", userFromBackend)
        // // Update state with the user information
        setName(userFromBackend.name)
        setUserName(userFromBackend.userName);
        setNumOfUserPolls(userFromBackend.numOfPolls);
        setNumOfSquadron(userFromBackend.squadJoined.length);
        setNumOfSquadUsers(userFromBackend.userSquadId.length);

      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    queryUser();
}, [user])

 useEffect(()=>{
  const getUserPoll=async()=>{
    if(user){
      try {
        const userID = user.id
        console.log("here is the user ID", userID)
        const results = await API.graphql(graphqlOperation(pollsByUserID,{userID:userID}))
        console.log("here is the user results items",results.data?.pollsByUserID.items)
        const userPollArray = results.data?.pollsByUserID.items
        setUserPolls(userPollArray)
        // const numOfUserPolls = userPollArray.length
        // console.log("here is the number of the poll for the user", numOfUserPolls)
        // setNumOfUserPolls(numOfUserPolls)
      } catch (error) {
        console.log("error getting the user polls", error)
      }
     
    }
    
  }

 getUserPoll()
 },[])
 useEffect(() => {
  const updateUserInfo = async () => {
    if (userPolls) {
      console.log("here is the user polls", userPolls);
      try {
        const userID = user.id;
        console.log("here is the user ID", userID);
        if (userPolls.length > numOfUserPolls) {
          const newNumOfUserPoll = userPolls.length;
          setNumOfUserPolls(newNumOfUserPoll);
          // Update the user info
          try {
            const results = await API.graphql(graphqlOperation(updateUser, {
              id: userID,
              numOfPolls: newNumOfUserPoll,
            }));
            console.log("here are the results for updating the num of user Polls", results);
          } catch (error) {
            console.log("Error updating user info:", error);
          }
        }
      } catch (error) {
        console.log("Error getting the user polls", error);
      }
    }
  };
  updateUserInfo();
}, [userPolls, numOfUserPolls]); // Include userPolls and numOfUserPolls in the dependency array


  return (
    <>
      <TouchableOpacity
        style={{marginTop:70, marginBottom:-10}}
        onPress={()=>navigation.goBack()}
        >
        <Entypo name="chevron-left" size={34} color="black" />
        </TouchableOpacity>
    <View
    style={{backgroundColor:"#F4F8FB", marginTop:30}}
    >
    <View>
    <Text
        style={{fontWeight:'bold', fontSize:22, marginLeft:130}}
        >@{userName}</Text>
    </View>
    <Image
          source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
          resizeMode={'contain'}
          style={[{ height: 100 }, { width: 100 }, 
          {overflow:'hidden'},{marginBottom:15}, {marginLeft:20},{marginTop:-50}, {borderRadius:50}]} 
      />
      {/* poll and poll number text */}
      <View
       style={{marginLeft:140, marginTop:-60}}
      >
       <Text
       style={{marginLeft:10, fontSize:15, fontWeight:'800'}}
       >{numOfUserPolls}</Text>
       <Text
       style={{fontSize:15, fontWeight:'400'}}
       >Polls</Text>
      </View>
      {/* squad createad and numbers text */}
      <View
       style={{marginLeft:200, marginTop:-36}}
      >
       <Text
       style={{marginLeft:30, fontSize:15, fontWeight:'800'}}
       >{numOfUsersInSquad}</Text>
       <Text
       style={{fontSize:15, fontWeight:'400'}}
       >Squad Created</Text>
      </View>
    
    {/* the squad joined text and numbers */}
      <View
       style={{marginLeft:320, marginTop:-36}}
      >
       <Text
       style={{marginLeft:30, fontSize:15, fontWeight:'800'}}
       >{numOfUserSquadron}</Text>
       <Text
       style={{fontSize:15, fontWeight:'400'}}
       >Squad Joined</Text>
      </View>
    
    </View>
    <View
    style={{backgroundColor:"#F4F8FB", marginTop:1}}
    >
    <Text
     style={{marginLeft:20, marginTop:40}}
     >{name}</Text>
    </View>


  <View 
  style={{marginTop:0, backgroundColor:"#F4F8FB"}}
  >
    <Text
    style={{marginLeft:150}}
    >
      My Bio: Stay cool forever
      link: www.squadByMe.com
    </Text>
  </View>

  {/* edit and squad creation button */}
<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: insets.top + 10, marginTop:0, backgroundColor:"#F4F8FB" }}>
              <TouchableOpacity 
              style = {styles.editProfileButton}
              onPress={() => navigation.navigate('EditProfileScreen')}
              >
                <Text
                style={{color:'#ffff', fontSize:12, marginTop:10, alignSelf:'center', fontWeight:'bold'}}
                >Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={() => navigation.navigate('RootNavigation', { screen: 'Poll Creation' })}
              //navigation.navigate('RootNavigation', { screen:'Home'})
              style={styles.createSquadButton}
              >
                  <Text
                      style={{color:'#ffff', fontSize:12, marginTop:10, alignSelf:'center', fontWeight:'bold'}}
                  >Create Squad</Text>
              </TouchableOpacity>
          </View>
     
    {/* <View style={[{backgroundColor:"#F4F8FB"},{flexDirection:"row"},{marginTop:0}]}>
      <View style={{flex:1, justifyContent:'flex-start', marginTop:-25}}>
        <Image
          source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
          resizeMode={'contain'}
          style={[{ height: 80 }, { width: 80 }, 
          {overflow:'hidden'},{marginBottom:12}, {marginLeft:20},{marginTop:30}, {borderRadius:50}]} />
      </View> 
      <View
      style={{flex:1, justifyContent:'flex-end', marginBottom:25, marginEnd:30,marginLeft:-125}}
      >
      {/* <TouchableOpacity
      style={{marginStart:230, }}
      onPress={() =>navigation.navigate('AccountSettingScreen')}
      >
      <AntDesign name="edit" size={24} color="black" />
      </TouchableOpacity> */}

      {/* <View
      style={{marginLeft:-10,marginBottom:12.5}}
      >
        <Text
        style={{fontWeight:'bold', fontSize:22}}
        >@{userName}</Text>
      </View>
     {/**this view here is for the numbers */}
       {/* <View>
         
        <View>
        <Text
         style={{marginBottom:-15,marginLeft:2,fontWeight:'bold', color:'black'}}
         >{numOfUserPolls}</Text> 
        </View>
          <View>
          <Text
            style={{marginLeft:80,fontWeight:'bold', color:'black'}}
            >{numOfUsersInSquad}</Text>  
          </View> */}

         {/* <View> 
         <Text
              style={{marginLeft:190,marginTop:-15,fontWeight:'bold', color:'black'}}
              >{numOfUserSquadron}</Text>
         </View>
        
       </View>
        {/**this view here is for the labelling */}
       {/* <View
       style={{marginLeft:-20}}
       >
         <Text
         style={{marginBottom:-15,marginLeft:7,color:'#000',fontWeight:'600', }}
         >Polls</Text> 
         <View>

         </View>
         <Text
         style={{marginLeft:60,marginBottom:-15,color:'#000',fontWeight:'600', }}
         >Squad Created</Text>  
         <View>

         </View>
        <Text
        style={{marginBottom:20,marginLeft:175,color:'#000',fontWeight:'600'}}
        >Squad Joined</Text>
       </View> */}
      {/* </View>
    </View>   */}
    {/* <View
    style={{marginLeft:30}}
    
    >
      <Text
         style={{marginLeft:10, marginTop:29}}
      >{name}</Text>
    </View> */}
    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: insets.top + 10, marginTop:-30, backgroundColor:"#F4F8FB" }}>
              <TouchableOpacity 
              style = {styles.editProfileButton}
              onPress={() => navigation.navigate('EditProfileScreen')}
              >
                <Text
                style={{color:'#ffff', fontSize:12, marginTop:10, alignSelf:'center', fontWeight:'bold'}}
                >Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={() => navigation.navigate('RootNavigation', { screen: 'Poll Creation' })}
              //navigation.navigate('RootNavigation', { screen:'Home'})
              style={styles.createSquadButton}
              >
                  <Text
                      style={{color:'#ffff', fontSize:12, marginTop:10, alignSelf:'center', fontWeight:'bold'}}
                  >Create Squad</Text>
              </TouchableOpacity>
          </View> */}
    <Tab.Navigator
  style={[{ marginBottom: -10 }, { marginEnd: 5 }, { marginStart: 5 }, { borderRadius: 9 }]}
  tabBarShowLabel={{
    showLabel: false, // Hide the tab labels
    style: { backgroundColor: "#F4F8FB", paddingTop: 5, paddingBottom: 5 }, // Add padding to the top and bottom of the tab bar
    tabStyle: { padding: 0, width: '20' }, // Remove any additional padding from individual tabs and set width to auto
    contentContainerStyle: { justifyContent: 'center', alignItems: 'center' }, // Center the tab bar content
  }}
  screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Polls') {
              iconName = 'poll';
          } else if (route.name === 'Squad Created' || route.name === 'Squad Joined') {
              iconName = 'groups';
          }

          // Define the icon color when focused and not focused
          const iconColor = focused ? '#1145FD' : '#707070';

          // Return the MaterialIcons icon with the specified icon name, size, and color
          return <MaterialIcons name={iconName} size={25} color={iconColor} />; // Increase the size of the icons
      },
  })}
>
<Tab.Screen
          name="Polls"
          component={GeneralUserProfilePollTab}
          initialParams={{ userID: user.id }}
        />
        <Tab.Screen
          name="Squad Created"
          component={GeneralProfileUserSquadCreatedTab}
          initialParams={{ squadJoined: user.squadJoined }}
        />
        <Tab.Screen
          name="Squad Joined"
          component={GeneralUserProfileSquadJoinedTab}
          initialParams={{ squadCreated: user.userSquadId }}
        />
      </Tab.Navigator>
      </>
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
  button:{
    backgroundColor: '#1764EF',
    width: 200,
    height: 32,
    //padding: 12,
    borderRadius: 10,
    marginTop: -20,
    alignItems: 'center',
    marginRight: 10,
    marginLeft:15,
    marginBottom:10
  },
  createSquadButton:{
    backgroundColor: '#1764EF',
    width: 180,
    height: 32,
    //padding: 12,
    borderRadius: 10,
    marginTop: -20,
    alignItems: 'center',
    marginRight: 10,
    marginLeft:15,
    marginBottom:10
  },
  editProfileButton:{
    backgroundColor: '#1764EF',
    width: 180,
    height: 32,
    //padding: 12,
    borderRadius: 10,
    marginTop: -20,
    alignItems: 'center',
    marginRight: 10,
    marginLeft:5,
    marginBottom:10
  },
})


export default GeneralUserProfileScreenPage