import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
  StatusBar,Dimensions,SafeAreaView,SectionList,FlatList, ScrollView} from 'react-native'
  import React, { useEffect, useState } from 'react'
  import StepIndicator from 'react-native-step-indicator';
  import { TouchableOpacity } from 'react-native';
  import { useNavigation } from '@react-navigation/native';
  import Constants from 'expo-constants';
  import { useCallback } from 'react';
  import { API, graphqlOperation, Auth } from "aws-amplify";
  import { createUser } from '../graphql/mutations';
  import { useUserContext } from '../../UserContext';
  import { updateUser } from '../graphql/mutations';


  const{width,height} = Dimensions.get("window")
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

  
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Food',
      url: 'https://media3.giphy.com/media/26xBzfqV1XqKAlRCw/giphy.gif',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Fashion',
      url: 'https://media3.giphy.com/media/xjIh4zHDjhjji/giphy.gif',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Travel',
      url: 'https://media3.giphy.com/media/iBBfBIj1XopJF6WTVI/giphy.gif',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72v2',
      title: 'Decor',
       url: 'https://media3.giphy.com/media/JGdbbSyi3wM9uBKv8p/giphy.gif',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72v3',
      title: 'Wellness',
      url: 'https://media3.giphy.com/media/cAgGLp84BRh4lZumDt/giphy.gif',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72v4',
      title: 'Social',
      url: 'https://media3.giphy.com/media/Swg9cud2W8OKVhz9rt/giphy.gif',
  
    },
  
  ];
  function Item({ id, title, selected, onSelect,url}) {
    return (
      <TouchableOpacity 
        onPress={() => 
          onSelect(id)
        }
        style={[
          styles.item,
          { backgroundColor: selected ? '#1145FD' : '#fff'  },
        ]}
      >
        <Image
        source={{uri:url}}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
  
        <Text style={[styles.title,{color:selected?'#fff':'#1145FD'}]}>{title}</Text>
      </TouchableOpacity>
    );
  }
   
const PersonalInterests = () => {
 const [selected, setSelected] = useState(new Map());
  const [userInterest, setUserInterest] = useState([]);
  const[currentPosition, setCurrentPositon] = useState(2)
  const { user, updateLocalUser, updateUserProperty} = useUserContext();
  const[userCreated, setUserCreated] = useState(false)
  const[newUser, setNewUser] = useState("");
  const navigation = useNavigation();
  const onSelect = useCallback(
    (id) => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      setSelected(newSelected);
    },
    [selected]
  );
useEffect(() => {
  const getUserInterest = () => {
    console.log(selected.size);
    if (selected.size !== 0) {
      for (let [key, value] of selected) {
        let obj = DATA.find((obj) => obj.id == key);
        const personalInterest = obj.title;
        if (value === true) {
          if (userInterest.includes(personalInterest) === false) {
            setUserInterest((userInterest) => [...userInterest, personalInterest]);
            console.log("the following are the userInterests", userInterest);
          }
        } else {
          console.log("these are the keys and the value are false: ", key);
          if (userInterest.includes(personalInterest) === true) {
            console.log("the initial array of the userInterest with false values", userInterest);
          }
        }
      }
    }
  };
  getUserInterest();
}, [selected, userInterest]);

//create userSquad
useEffect(()=>{
  // const createSquadUser = async () => {
  //   try {
  //     await Auth.currentSession();
  //     const authUser = await Auth.currentAuthenticatedUser();
  //     const name = authUser.attributes.name;
  //     const username = authUser.attributes.preferred_username;
  //     const userProfilePicture = authUser.attributes.picture;
  //     const preUpdatedSub = authUser.attributes.sub;
  //     console.log("this is sub before the update", preUpdatedSub)
  //     const createUserInput = {
  //       name: name,
  //       userName: username,
  //       imageUrl: userProfilePicture,
  //       userSquadId: [],
  //       numOfPolls: 0,
  //       numOfSquadJoined: 0,
  //       userInterests: userInterest,
  //       squadJoined: [],
  //     };
  //     const response = await API.graphql(
  //       graphqlOperation(createUser, { input: createUserInput })
  //     );
  
  //     const user_id = response.data?.createUser.id;
  //     console.log("here is the user id", user_id);
  
  //     // Update Cognito User attribute 'sub' with the GraphQL user id
  //     await Auth.updateUserAttributes(authUser, {
  //       'sub': user_id,
  //     });
  
  //     // Check updated Cognito Sub
  //     const updatedCognitoSub = (await Auth.currentAuthenticatedUser()).attributes.sub;
  //     console.log("Updated Cognito Sub:", updatedCognitoSub);
  //     console.log("here is the user id", user_id);
  
  //     console.log("here is the userInterests", userInterest);
  
  //     // Update the user context after creating the user
  //     updateUser({
  //       id: user_id,
  //       imageUrl: userProfilePicture,
  //       userSquadId: [],
  //       numOfPolls: 0,
  //       numOfSquadJoined: 0,
  //       userInterests: userInterest,
  //       squadJoined: [],
  //       userSquadId: [],
  //     });
  
  //     console.log("here is the sub: ", updatedCognitoSub, "and user id: ", user_id);
  //   } catch (error) {
  //     console.log('Error creating user:', error);
  //   }
  // };
  const createSquadUser = async () => {
      try {
      await Auth.currentSession();
      const authUser = await Auth.currentAuthenticatedUser();
      const name = authUser.attributes.name;
      const email = authUser.attributes.email;
      const username = authUser.attributes.preferred_username;
      const userProfilePicture = authUser.attributes.picture;
      const preUpdatedSub = authUser.attributes.sub;
  
      console.log("this is sub before the update", preUpdatedSub);
      
     if(!userCreated){
      const createUserInput = {
        name: name,
        userName: username,
        imageUrl: userProfilePicture,
        userSquadId: [],
        numOfPolls: 0,
        numOfSquadJoined: 0,
        userInterests: userInterest,
        squadJoined: [],
      };
  
      const response = await API.graphql(
        graphqlOperation(createUser, { input: createUserInput })
      );
      const user_id = response.data?.createUser.id;
      console.log("here is the user id", user_id);
  
       // Update the user context after creating the user
      updateLocalUser({
        id: user_id,
        imageUrl: userProfilePicture,
        userName: username,

        userSquadId: [],
        numOfPolls: 0,
        numOfSquadJoined: 0,
        userInterests: userInterest,
        email: email,
        squadJoined: [],
        userSquadId: [],
      });
      // Log user info before updating attributes
      console.log("Before update - Auth user attributes:", authUser.attributes);
  
      // Update Cognito User attribute 'sub' with the GraphQL user id
      await Auth.updateUserAttributes(authUser, {
        'custom:graphQLUSerID': user_id,
      });
  
      // Log user info after updating attributes
      console.log("After update - Auth user attributes:", authUser.attributes);
      setUserCreated(true);
      setNewUser(user_id)
     }
    } catch (error) {
      console.log('Error creating user:', error);
    }
  }; 
    createSquadUser()
}, [userCreated])
 
useEffect(()=>{
 const updateUserInterest = async() =>{
  if(newUser){
    await API.graphql(graphqlOperation(updateUser, {
      input: {
        id: newUser,
        userInterests:userInterest, // Add the new interests to the existing array
      },
    }));
    updateUserProperty('userInterests', userInterest);
  }else{
    console.log("error updating the user interest")
  }
  
 }
updateUserInterest()
console.log("this is the local user",user)
},[newUser, userInterest])


return (
  <SafeAreaView
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
   <View
   style={[{marginTop:10},{marginBottom:10}]}
   >
    <Text
    style={styles.textInterest}
    > 
    Select themes are you are interested:
    </Text>
   </View>
  </View>  
  <View style={{marginTop:-30}}></View>
    <ScrollView horizontal={true}
      showsVerticalScrollIndicator={false} 
     showsHorizontalScrollIndicator={false}
     style={[{marginRight:20}]}
     >
    <FlatList
       data={DATA}
       scrollEnabled={false}
       numColumns={Math.ceil(DATA.length / 2)}
      renderItem={({ item }) => (
        <Item
          id={item.id}
          title={item.title}
          url = {item.url}
          selected={!!selected.get(item.id)}
          onSelect={onSelect}
        />
      )}
      keyExtractor={item => item.id}
      extraData={selected}
    />
    </ScrollView>

    <TouchableOpacity  onPress={()=>navigation.replace('UploadProfPictureScreen')}
    style={[ styles.backButton,{borderColor:'#1145FD'}, {marginBottom:-140},{marginLeft:70},{marginTop:-330},{marginRight:250},{width:160} ]}>
    <Text  style={[{justifyContent: 'flex-end'},styles.backText,]}> Back </Text>
    </TouchableOpacity>
    <TouchableOpacity  onPress={() =>navigation.navigate('SquadCreationScreen')}
    style={[ styles.button,
    {borderColor:'#1145FD'}, 
    {marginBottom:80},
    {marginLeft:230},
    {marginRight:50},
    {width:160} ]}>
    <Text  style={[{justifyContent: 'flex-end'},styles.buttonText]}> Next </Text>
    </TouchableOpacity>

  </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems:"center",
  justifyContent:"flex-start",
  marginTop: Constants.statusBarHeight,
},
squadLogo:{
  width:100,
  height:35,
  marginRight:250,
  marginTop:70
},

header:{
height: 55, 
width:'50%',
justifyContent:"center",
alignItems:'center',
marginRight:200,
marginTop: 10,
marginLeft:35
},
headerText:{
fontSize:22,
fontWeight:'bold'
},
indicatiorWindow:{
width:width-20,
padding:20,
margin:15,
borderRadius:20,
marginTop:-20,
marginLeft:-8
},
textInterest:{
fontSize:15
},
item: {
  padding: 20,
  marginVertical: 8,
  marginHorizontal:10,
  height:120,
  width:120,
  borderRadius:3,
  marginRight:-5
},
title: {
  fontSize: 12,
  marginTop:5,
  fontWeight:'600'
},
itemPhoto: {
  width: 75,
  height: 75,
  alignSelf:'center'
},
button:{
  backgroundColor: '#1145FD',
  width: 180,
  height: 42,
  padding: 10,
  borderRadius: 5,
  marginTop: 100,
  alignItems: 'center',
  marginRight: 30,
  marginLeft:20,

},

backButton:{
backgroundColor: '#EAEAEA',
width: 150,
height: 42,
padding: 10,
borderRadius: 5,
alignItems: 'center', 
borderColor:'#1145FD'
},
buttonText:{
color: 'white',
fontWeight: '700',
fontSize: 15,
alignItems:"center",
width:50 
},
backText:{
color: '#1145FD',
fontWeight: '700',
fontSize: 15,
alignItems:"center"
},
nextText:{
color: '#1145FD',
fontWeight: '700',
fontSize: 15,
alignItems:"center"
},
});
export default PersonalInterests