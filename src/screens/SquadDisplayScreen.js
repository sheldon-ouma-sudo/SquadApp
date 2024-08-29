import React, {useState , useEffect } from 'react';
import { View, Text,Image, StyleSheet,TouchableOpacity} from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation, useRoute } from '@react-navigation/native'
import SquadPollScreen from './SquadPollScreen';
import SquadUserScreen from './SquadUserScreen';
import { MaterialIcons } from '@expo/vector-icons';
import dayjs from "dayjs";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);




const SquadDisplayScreen = () => {
const[squadName, setSquadName] = useState("Squad Name")
const [numOfSqudPolls, setNumOfSquadPolls] = useState(0)
const [numOfSquadMembers, setNumOfSquadMembers] = useState(0)
const [squadCreator, setSquadCreator] = useState("Squad Creator")
const [squadCreationTime, setSquadCreationTime] = useState("")

  const route = useRoute()
  const navigation = useNavigation()
  const Tab = createMaterialTopTabNavigator();
  const { squad } = route?.params;  // Destructure squad from route params

  useEffect(()=>{
    if(squad){
      console.log("here is the squad details", squad)
      const squad_name = squad.squadName; 
      const squad_creator = squad.authUserName
      const squad_creationTime = dayjs(squad.createdAt).format('MMMM D, YYYY')
      setSquadName(squad_name)
      setSquadCreator(squad_creator)
      setSquadCreationTime(squad_creationTime)
      
    
    }

  }, [squad])

  return (
    <>
    <TouchableOpacity
    style={{marginTop: 10, backgroundColor:"#F4F8FB"}}
    // onPress={handleOnSettingPress}
    >
     {/* <MaterialIcons name="settings" size={25} color="black" style={{marginLeft:380}} /> */}
     <TouchableOpacity
     style={ {marginLeft:10, marginStart:30, marginTop: 50}}
     onPress={()=>navigation.goBack()}
     >
      <AntDesign name="arrowleft" size={24} color="#1764EF"/>
     </TouchableOpacity>
     
<View
     style={styles.userImageContainer}
      >  
    <FontAwesome name="group" size={64} color="#1145FD" style={{marginTop:-25}}/>
</View>
 <View
    style={{backgroundColor:"#F4F8FB"}}
    >
    <View 
    style= {{marginTop: -70}}
    >
    <Text
        style={{fontWeight:'bold', fontSize:17, marginLeft:130, marginBottom: 20}}
        >{squadName}</Text>
    </View>
    {/* <Image
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
      /> */}
      {/* poll and poll number text */}
      <View
       style={{marginLeft:140}}
      >
       <Text
       style={{marginLeft:10, fontSize:15, fontWeight:'800', marginBottom: 10}}
       >{numOfSqudPolls}</Text>
       <Text
       style={{fontSize:15, fontWeight:'400'}}
       >Polls</Text>
      </View>
      {/* squad createad and numbers text */}
      <View
       style={{marginLeft:300, marginTop:-36}}
      >
       <Text
       style={{marginLeft:30, fontSize:15, fontWeight:'800'}}
       >{numOfSquadMembers}</Text>
       <Text
       style={{fontSize:15, fontWeight:'400'}}
       >Members</Text>
      </View>
      <View
       style={{marginLeft:100, marginTop:16}}
      >
       <Text
       style={{marginLeft:30, fontSize:15, fontWeight:'800'}}
       >Created by @{squadCreator}</Text>
       <Text
       style={{fontSize:15, fontWeight:'400', marginLeft: 30}}
       >{squadCreationTime}</Text>
      </View>
    
    {/* the squad joined text and numbers */}
      {/* <View
       style={{marginLeft:320, marginTop:-36}}
      >
       <Text
       style={{marginLeft:30, fontSize:15, fontWeight:'800'}}
       >{numOfSquadJoined}</Text>
       <Text
       style={{fontSize:15, fontWeight:'400'}}
       >Squad Joined</Text>
      </View> */}
    
   
    {/* <View
    style={{backgroundColor:"#F4F8FB", marginTop:1}}
    >
    <Text
     style={{marginLeft:20, marginTop:40}}
     >{name}</Text>
    </View> */}


  {/* <View 
  style={{marginTop:20, backgroundColor:"#F4F8FB"}}
  >
    <Text
    style={{marginLeft:150, fontSize: 15}}
    >
       {userBio}
    </Text>
  </View> */}
  </View>
  {/* edit and squad creation button */}
<View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, marginTop:20, backgroundColor:"#F4F8FB" }}>
              <TouchableOpacity 
              style = {styles.editProfileButton}
              onPress={() => navigation.navigate('EditProfileScreen')}
              >
                <Text
                style={{color:'#ffff', fontSize:12, marginTop:10, alignSelf:'center', fontWeight:'bold'}}
                >Join Squad</Text>
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

          </TouchableOpacity>
    <Tab.Navigator
  style={[{ marginBottom: 40 }, { marginEnd: 5 }, { marginStart: 5 }, { borderRadius: 9 }]}
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
          component={SquadPollScreen} />
        <Tab.Screen
          name="Members"
          component={SquadUserScreen} />
      </Tab.Navigator></>
  )
};
const styles = StyleSheet.create({
  container:{
  flex:1,
  justifyContent:"flex-start",
  alignItems:"center",
  backgroundColor: "#F4F8FB",
  },
  userImageContainer:{
    marginStart:40,
    marginTop:70
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

export default SquadDisplayScreen;
