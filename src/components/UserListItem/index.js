import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Entypo, FontAwesome, AntDesign } from '@expo/vector-icons';

const UserListItem =({  user,
  onPress = () => {},
  selectable = false,
  isSelected = false,})=>{
   const navigation = useNavigation()
   return (
     <Pressable
     style={styles.container}
     behavior="padding"
     onPress={onPress}
     >
    <View
      style={styles.userImageContainer}
      >
      <Image
      //source={{uri: user.image}}
      source={require('/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png')}
      resizeMode='contain'
      style={styles.userImage}
      />
    </View>
    <View style={{flexDirection:"row", marginTop:20, marginLeft:5 }}>
      <View
      style = {[styles.pollCaptionContainer, {justifyContent:'flex-start'}]}
      >
          <Text
            style = {styles.userName}
          > 
          {user.name}
          </Text>
        </View>
        <TouchableOpacity // rename and arrange this properly
          style = {[styles.numOfVotesContainer, {justifyContent:'flex-end'},{alignItems:'center'},]}
          > 
              <AntDesign name="addusergroup" size={23} color="white" style={{marginBottom:5}}/>
        </TouchableOpacity>
     
      {selectable &&
        (isSelected ? (
          <AntDesign name="checkcircle" size={24} color="royalblue" />
        ) : (
          <FontAwesome name="circle-thin" size={24} color="lightgray" />
        ))}
        </View>
     </Pressable>
   )
   }
 
   
   const styles = StyleSheet.create({
   container:{
    flex:1,
    flexDirection: "row",
    marginHorizontal: 10,
    marginTop: 20,
    //marginVertical: 65,
    borderColor: "#FFFF",
    //height: 100,
    borderRadius: 15,
    backgroundColor: "white",
    borderWidth: 5,
    marginRight:30
   
},
  
  
   pollCaptionContainer:{
     height: 50,
     width: 180,
   },
   numOfVotesContainer:{
    height:40,
    width: 95,
    backgroundColor: "#1145FD",
    borderRadius: 10,
    borderColor: "#FFFF",
    borderWidth: 2.5,
    marginLeft:25,
    
   },
   votedText:{
     color: "white",
     fontWeight: "bold",
     marginBottom:7,
     marginLeft:1,
     fontSize: 8.5,
     textAlignVertical:'center'
   }, 
   userImageContainer:{
    marginStart:10,
    //marginTop:20
   },
   userImage:{
       width:50,
       height:70
   },
  userName:{
   fontWeight:'500',
   marginLeft:5
  },
  userJoinPeriod:{
   marginTop: 5,
   marginLeft: 5,
   color: '#545454',
  }
   },
   )
export default UserListItem