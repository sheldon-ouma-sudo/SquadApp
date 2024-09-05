  import { View, Text,Image, StyleSheet,TouchableOpacity} from 'react-native'
  import PersonalPollScreen from './PersonalPollScreen'
  import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
  import { useNavigation } from '@react-navigation/native'
  import SquadCreatedScreen from './SquadCreatedScreen'
  import SquadJoinedScreen from './SquadJoinedScreen'
  import React from 'react'
  import { useState, useEffect } from 'react'
  import { useSafeAreaInsets } from 'react-native-safe-area-context';
  import { API, graphqlOperation, Auth } from "aws-amplify";
  import {getUser, pollsByUserID} from '../graphql/queries'
  import { useUserContext } from '../../UserContext'
  import { MaterialIcons } from '@expo/vector-icons';
  import { updateUser } from '../graphql/mutations'
  

  const Profile =()=> {
    const[profileImage, setProflieImage]= useState('https://squadtechlogobucket.s3.us-west-2.amazonaws.com/TechLogos/profilePH.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAMaCXVzLXdlc3QtMiJHMEUCIAw7LoJW508N6U7MDuh8BOEVYxGrRnT3s0E4JQHy0Rq7AiEApSh7LXEZPEO5ERpaJVdALhepv47Gj%2B5qANz5ps9nrvYq5AIIHBABGgw3NTMxOTUzMTg2NTciDGIKu7SWVqotZCZA%2FirBAoGEYRldaYS1ZaDWs0zTkmh8vGdMzKjIwmnFRKF3%2BRCCRXgZnSZ5uXElV%2B8EmFFiNB09SNj3h583cPVHwGkLQ8plfqat52EDQ11uYz56KvcI5bocfSSWLrW%2FO%2FDPj2uwiHPpGRtbUYuSXmbzTNACZAWGy4VDxzsuxEdY01RuSHX4OKpAwdDr42BsOBOVTB2%2BO15LkssaMKdfvNDMbMlwromsj94MoCPI5SFvxCIUj3qAljyHacENKPBsbsZC1U3DtS7nISaNcooAFr%2BkHNdCv15uf8%2F8m%2Fkwu0Ea9IAUgVoV%2F3ZBYg2PLMzpUPIGMs%2FCkIB86xk6Zb4kmWGdYaRlZBl6aGnA4U3vIf6B1UAuwdQHHJ8T1egB%2B2TYCxv%2BGKINRKebp%2F81BGFDtvmaszEE4xoXDfJZrpp5mhbJbRE4sLjgdTCvx7i2BjqzArTD%2B1S%2Bpy%2FH3GDPTIyEPU2veH9AF0umojrMvjxguhugtI8FQu9e44fUG8CwoPdaeb0J45erGmdhhNAoRpGlI4OukpDBJYVM7gZD282JrretqdNh8W340he5daYBkR4ziAdwQUq0JrHAWqmnuZb9bwAmmArOGxoxk6KFR2BOy2SvDLNmZOjTTl4irtB3qksvoKvA8JK9WmieN%2FxBG1LLVVTAyRZ5QfpzLVX3Z6Yp6X2%2FxbvNDg07L44404bbtjM1D6S2QfWjFmPL8rbdsDBfIsl9deb3Lz%2FaTU6z9ytsbYgkMFy%2FlLyLvSa2sq%2BjcvhcJC7u59GdaKaq4k1euqsbp3uVjGvxLZvuZJfgLgWSFfGqRV0OS1kEjxI3rI0k3rVOs4a1weUfstVF5%2Fz5MvqJojnyZjk%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240827T191517Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA26XPQPWASVIVLJVT%2F20240827%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=0b6504a98401ef53326d5e9adc97e16d5c0e4c3929931d05b1b90b51b93aa040')
    const[userName, setUserName] =useState('User Name')
    const[numOfUserPolls, setNumOfUserPolls] = useState("0")
    const[numOfSquadJoined, setNumOfSquadJoinedn] = useState("0")
    const[numOfSquadCreated, setNumOfSquadCreated] = useState("0")
    const[userBio, setUserBio] = useState("")
    const[name, setName] = useState(" Bio: you can edit it by clicking edit profile below")
    const{user, updateUserProperty} = useUserContext();
    const[userPolls, setUserPolls] = useState([])
    const Tab = createMaterialTopTabNavigator();
    const navigation = useNavigation()
    const insets = useSafeAreaInsets();  
    //query the user from the backend
    //set the values to what is in the backend 
     useEffect(()=>{
      console.log("here is the user", user.id)
      const queryUser = async () => {
        try {
          const authUser = await Auth.currentAuthenticatedUser();
          const userID = user.id; // Use sub instead of profile for the user ID
          console.log("user id in the profile top navigation: ", userID)
          const name = authUser.attributes.name;
  
          // Query the user from the backend using Amplify API
          const userData = await API.graphql(graphqlOperation(getUser, { id: userID }));
  
          // Extract the user information from the query result
          const userFromBackend = userData.data?.getUser;
          console.log("here is the user from backend ", userFromBackend)
          
          if(user){
            console.log("here is the user",user)
          
          }
          const userProfileImage = user.userProfilePicture;
          // Update state with the user information
          setName(userFromBackend.name)
          setUserName(userFromBackend.userName);
          setNumOfUserPolls(userFromBackend.numOfPolls);
          setNumOfSquadJoinedn(userFromBackend.numOfSquadJoined);
          setNumOfSquadCreated(userFromBackend.numSquadCreated);
          setProflieImage(userProfileImage)
          setUserBio(userFromBackend.Bio)
       
  
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
  
  const handleOnSettingPress=async()=>{
   navigation.navigate("AccountSettingScreen")
  } 

   
    return (
      <>
      <TouchableOpacity
      style={{backgroundColor:"#F4F8FB"}}
      onPress={handleOnSettingPress}
      >
       <MaterialIcons name="settings" size={25} color="black" style={{marginLeft:380}} />
      </TouchableOpacity>
      <View
      style={{backgroundColor:"#F4F8FB"}}
      >
      <View>
      <Text
          style={{fontWeight:'bold', fontSize:22, marginLeft:130}}
          >@{userName}</Text>
      </View>
      <Image
             source={{ uri: profileImage }}
             resizeMode="cover"
             style={{
               height: 90,
               width: 90,
               backgroundColor: '#e0e0e0', // Added background color to help with visibility issues
               marginBottom: 25,
               marginLeft: 20,
               marginTop: -50,
               borderRadius: 50,
             }}
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
         >{numOfSquadCreated}</Text>
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
         >{numOfSquadJoined}</Text>
         <Text
         style={{fontSize:15, fontWeight:'400'}}
         >Squad Joined</Text>
        </View>
      
     
      <View
      style={{backgroundColor:"#F4F8FB", marginTop:1}}
      >
      <Text
       style={{marginLeft:20, marginTop:40}}
       >{name}</Text>
      </View>


    <View 
    style={{marginTop:20, backgroundColor:"#F4F8FB"}}
    >
      <Text
      style={{marginLeft:150, fontSize: 15}}
      >
         {userBio}
      </Text>
    </View>
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
            component={PersonalPollScreen} />
          <Tab.Screen
            name="Squad Created"
            component={SquadCreatedScreen} />
          <Tab.Screen
            name="Squad Joined"
            component={SquadJoinedScreen} /> 
        </Tab.Navigator></>
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

  export default  Profile