import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
    StatusBar,Dimensions,TouchableOpacity, StyleSheet} from 'react-native'
    import PersonalPollScreen from './PersonalPollScreen'
    import SwayingScreen from './SwayingScreen'
    import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
    import { useNavigation, useRoute } from '@react-navigation/native'
    import MySquadScreen from './MySquadScreen'
    import SquadCreatedScreen from './SquadCreatedScreen'
    import SquadJoinedScreen from './SquadJoinedScreen'
    import { AntDesign } from '@expo/vector-icons';
    import React from 'react'
    import { useState, useEffect } from 'react'
    import { useSafeAreaInsets } from 'react-native-safe-area-context';
    import { API, graphqlOperation, Auth } from "aws-amplify";
    //import { graphqlOperation } from 'aws-amplify' 
    import {getUser} from '../graphql/queries'
    import { useUserContext } from '../../UserContext'
    import { MaterialIcons } from '@expo/vector-icons';
    import { Entypo } from '@expo/vector-icons';
    import PersonalSquadMemberScreens from './PersonalSquadMemberScreens'
    import PersonalSquadPollDisplayScreen from './PersonalSquadPollDisplayScreen.js'
    

const GeneralSquadPage = () => {
    const[profileImage, setProflieImage]= useState('https://squad-file-storage235821-staging.s3.us-west-2.amazonaws.com/Squad_inApp_images/userProfilePlaceholder.png')
    const[userName, setUserName] =useState('User Name')
    const[numOfUserPolls, setNumOfUserPolls] = useState("1060")
    const[numOfUserSquadron, setNumOfSquadron] = useState("1060")
    const[numOfUsersInSquad, setNumOfSquadUsers] = useState("1060")
    const[name, setName] = useState("")
    const{user, updateUserProperty} = useUserContext();
    const Tab = createMaterialTopTabNavigator();
    const navigation = useNavigation()
    const insets = useSafeAreaInsets();  
    //query the user from the backend
    //set the values to what is in the backend 
    const route = useRoute()

    const genSquad = route?.params
    if(genSquad){
        console.log("here is the squad requested info", genSquad)
    }else{
        console.log("gen squad undefined")
    }
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
          // Update state with the user information
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
  }, [])
    return (
      <>
      <KeyboardAvoidingView 
    //   style={[{backgroundColor:"#F4F8FB"},{flexDirection:"row"},{marginTop:90}]}
        style={styles.container}
        behavior='contain'
      >
        <TouchableOpacity
        style={{marginTop:-120}}
        onPress={()=>navigation.goBack()}
        >
        <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <View style={{flex:1, justifyContent:'flex-start', marginTop:-25}}>
          <Image
            source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
            resizeMode={'contain'}
            style={[{ height: 80 }, { width: 80 }, 
            {overflow:'hidden'},{marginBottom:12}, {marginLeft:20},{marginTop:30}, {borderRadius:50}, {borderWidth:5}, {borderColor:'#7399DE'}]} />
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

        <View
        style={{marginLeft:-10, marginTop:30}}
        >
          <Text
          style={{fontWeight:'bold', fontSize:22}}
          >@{userName}</Text>
        </View>
       {/**this view here is for the numbers */}
         <View>
           {/* number of polls */}
          <View>
          <Text style={{
            marginLeft:-2,
            marginBottom:-15,
            marginTop:20,
            fontWeight:'900',
             fontSize:'20'}}>1200</Text> 
          </View>
       {/* number of users */}
           <View>
           <Text style={{marginLeft:170,marginTop:-15,fontWeight:'900', fontSize:'28'}}>25</Text>
           </View>
          
         </View>
          {/**this view here is for the labelling */}
         <View style={{marginLeft:-20}}>
           <Text style={{marginBottom:-17,marginLeft:30,color:'#000',fontWeight:'600', }}>Polls</Text> 
          <Text style={{marginBottom:20,marginLeft:175,color:'#000',fontWeight:'600'}}>Members</Text>
         </View>
        </View>
      </KeyboardAvoidingView>
      {/* <View
      style={{marginLeft:30}}
      
      >
        <Text
           style={{marginLeft:10, marginTop:29}}
        >{name}</Text>
      </View> */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: insets.top + 10, marginTop:-30, backgroundColor:"#F4F8FB" }}>
                <TouchableOpacity 
                style = {styles.editProfileButton}
                onPress={() => navigation.navigate('EditProfileScreen')}
                >
                  <Text
                  style={{color:'#ffff', fontSize:12, marginTop:10, alignSelf:'center', fontWeight:'bold'}}
                  >Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => navigation.navigate('RootNavigation', { screen: 'Poll Creation' })}
                //navigation.navigate('RootNavigation', { screen:'Home'})
                style={styles.createSquadButton}
                >
                    <Text
                        style={{color:'#ffff', fontSize:12, marginTop:10, alignSelf:'center', fontWeight:'bold'}}
                    >Share</Text>
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
            name=" Poll"
            component={PersonalSquadPollDisplayScreen} />
          <Tab.Screen
            name="Members"
            component={PersonalSquadMemberScreens} /> 
        </Tab.Navigator></>
    )
  }
  const styles = StyleSheet.create({
    container:{
    //flex:1,
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    backgroundColor: "#F4F8FB",
    marginTop:70
    },

    squadLogo:{
        width:100,
        height:35,
        marginRight:250,
        marginTop:70  
    },
    button:{
      backgroundColor: '#0038FF',
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
      backgroundColor: '#0038FF',
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
      backgroundColor: '#0038FF',
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

export default GeneralSquadPage