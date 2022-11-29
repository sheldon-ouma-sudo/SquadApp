import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
    StatusBar,Dimensions,TouchableOpacity, TextInput, Alert, SafeAreaView, Animated} from 'react-native'
    import React, { useState, useEffect, useRef} from 'react'
    import StepIndicator from 'react-native-step-indicator';
    import { Input } from 'react-native-elements'
    import { useNavigation,useRoute } from '@react-navigation/native';
    import SelectList from 'react-native-dropdown-select-list';
    //import { useEffect } from 'react';
    import * as Location from 'expo-location'; 
    import { Ionicons } from '@expo/vector-icons';
    import LinearGradient from 'react-native-linear-gradient';
    import {PanGestureHandler, State} from 'react-native-gesture-handler';
    //import {BlurView} from '@react-native-community/blur';
    import { BlurView } from 'expo-blur';
    import {Calendar } from 'react-native-calendars'

  
  
    
const CalendarScreen = () => {
  const[currentPosition, setCurrentPositon] = useState(0)
//   const[dateOfBirth, setDateOfBirth] = useState("MM-DD-YY")
//   const [selectedGender, setGenderSelected] =useState("");
//   const[location, setLocation]=useState("Enter your location")



  const navigation = useNavigation()
  const route = useRoute();
  const inputRef = useRef()
  
    
  const uri = 'https://s3.amazonaws.com/exp-icon-assets/ExpoEmptyManifest_192.png';

  //const username = route?.params.username 
  const text = 'Hello, my container is blurring contents underneath!';
  return (
    <View style={styles.container}>
      <Image style={[StyleSheet.absoluteFill, styles.image]} source={{ uri }} />
      
     
      <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
        <Text style={[styles.text, { color: '#fff' }]}>{text}</Text>
        <Calendar
           markingType = {'custom'}
           markedDates={{
            '2012-05-16': {selected: true, marked: true, selectedColor: '#1145FD'},
            
          }}
         />
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  blurContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default CalendarScreen