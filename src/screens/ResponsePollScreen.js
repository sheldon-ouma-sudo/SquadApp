import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList, Image } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const ResponsePollScreen = () => {









    return (
    <LinearGradient
    colors={['#EE8B94', '#0038FF']} // Adjust the gradient colors as per your preference
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientContainer}
 >
    <View style={styles.container}>
    <TouchableOpacity>
      <Text style={styles.question}>{poll.pollCaption}</Text>
      {pollItems.map((item, index) => (
         <TouchableOpacity
          key={index}
          style={[
            styles.optionContainer,
            selectedOption === index && styles.selectedOption,
          ]}
          onPress={() => handleOptionPress(index)}
        >
          <Text style={styles.optionText}>{item.title}</Text>
          <View style={styles.percentageContainer}>
            {isOptionSelected && (
              <Text style={styles.percentageText}>
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
      </TouchableOpacity>

      {/* component holding for the comment icon */}
      <TouchableOpacity
        style={styles.pollCommentContainer}
        onPress={toggleComments}
      >
        <FontAwesome
          name="commenting-o"
          size={35}
          color="#black"
          style={styles.pollCommentIcon}
        />
      </TouchableOpacity>
    </View>







 </LinearGradient>
  
  )
}
const styles = StyleSheet.create({
    gradientContainer: {
      //borderWidth: 2,
      borderRadius: 29,
      marginVertical:30,
      // marginHorizontal:10, 
      // marginEnd:10, 
  
    },
    container: {
      flex:1,
      padding: 16,
      backgroundColor: "#FFFF",
      marginTop:5,
      //borderWidth: 5,
      borderRadius: 29,
      marginBottom:5,
      marginStart:5,
      marginEnd:5
     // borderColor: '#0038FF'
      //marginVertical:135,
    },
    userImageContainer:{
      //marginStart:10,
      marginTop:-20,
      marginLeft: -10
     },
     userImage:{
         width:50,
         height:70
     },
     userName:{
     marginLeft: 0,
     marginTop:-45,
     marginBottom:50
     },
     userNameText:{
     fontSize:19,
     fontWeight:'200',
     marginLeft: 40
     },
    question: {
      fontSize: 19.5,
      fontWeight: 'bold',
      marginBottom: 15,
      marginTop: -25
      
    },
    optionContainer: {
      marginBottom: 30,
      padding: 5,
      borderColor: '#ccc',
      borderRadius: 28,
      backgroundColor: '#ffff',
      borderColor: 'black',
      borderWidth: 3,
      height: 50,
      width: 350, // Adjust the width as per your requirement
    },
  
    selectedOption: {
     backgroundColor: '#add8e6', // Light blue for selected option
     //backgroundColor: '#1764EF'
    },
    optionText: {
      fontSize: 16,
      //marginBottom: -3,
      fontWeight:'700',
      marginLeft:135,
      color: "black",
      marginTop:10
  
    },
    selectedOptionText: {
      fontSize: 16,
      marginBottom: 12,
      fontWeight:'700',
      marginLeft:125,
      color: "#D8E8F3"
    },
    // percentageContainer:{
    //   marginLeft:50
    // },
  
    percentageBar: {
      height: 50,
      backgroundColor: '#1764EF',
      borderRadius: 29,
      width: 30, // Adjust the width as per your requirement
      alignSelf: 'flex-start',
      marginBottom: 4,
      marginTop: -36,
      marginLeft: -7,
      overflow: 'hidden',
    },
    percentageText: {
      fontSize: 15,
      color: 'white',
      fontWeight:'600',
      marginTop: -36,
      marginLeft:20
    },
    pollCommentContainer:{
     marginTop:20,
    },
    pollCommentIcon:{
     marginLeft:20,
    },
    numOfpollComments:{
      fontSize: 15,
      marginLeft:12,
      marginTop:5,
     // fontWeight:'400'
    },
    pollLikesContainer:{
      marginLeft:280,
      marginTop:-65
    },
    numOfpollLikes:{
      marginLeft:20,
      marginTop:5,
      fontSize:20,
      fontWeight:'700'
    },
    pollCommentContainer: {
      marginTop: 20,
    },
    pollCommentIcon: {
      marginLeft: 20,
    },
    numOfpollComments: {
      fontSize: 19,
      marginLeft: 18,
      marginTop: 5,
      fontWeight: '700',
    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the background color and opacity
    },
    commentItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    numOfCommentsText: {
      fontSize: 18,
      fontWeight: '400',
      marginBottom: 20,
      marginLeft: 100,
      marginTop: 20
      //color: '#1764EF', // Adjust the color based on your design
    },
  });
  

export default ResponsePollScreen