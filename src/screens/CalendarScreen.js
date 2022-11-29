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
    import moment from 'moment';

  
  
    
const CalendarScreen = () => {
  const[currentPosition, setCurrentPositon] = useState(0)
//   const[dateOfBirth, setDateOfBirth] = useState("MM-DD-YY")
//   const [selectedGender, setGenderSelected] =useState("");
//   const[location, setLocation]=useState("Enter your location")
const [markedDates, setMarkedDates] = useState({
    //'2021-01-20': {textColor: 'green'},
    //'2021-01-22': {startingDay: true, color: 'green'},
    //'2021-01-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
    //'2021-01-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
    '2022-11-28': {selected: true,  selectedColor: '#1145FD'},
        
      
  })
  const navigation = useNavigation()
  const route = useRoute();
  const inputRef = useRef()
  const uri = 'https://s3.amazonaws.com/exp-icon-assets/ExpoEmptyManifest_192.png';

  //const username = route?.params.username 
  //const text = 'Hello, my container is blurring contents underneath!';
  const handleDayPress = (day) => {
    setMarkedDates({
      [day.dateString]: {
        color: '#1145FD'
      },
    //   [moment(day.dateString).add(1, 'days').format('YYYY-MM-DD')]: {
    //     color: 'green'
    //   },
    //   [moment(day.dateString).add(2, 'days').format('YYYY-MM-DD')]: {
    //     color: 'green'
    //   },
    //   [moment(day.dateString).add(3, 'days').format('YYYY-MM-DD')]: {
    //     endingDay: true,color: 'green'
    //   }
    })
  }

  return (
    <View style={styles.container}>
      <Image style={[StyleSheet.absoluteFill, styles.image]} source={{ uri }} />
      
     
      <BlurView intensity={90} tint="dark" style={styles.blurContainer}>
      <Calendar
      markedDates={markedDates}
      markingType={'period'}
      onDayPress={handleDayPress}
      style={{
        borderWidth: 1,
        borderColor: 'gray',
        height: 350,
        borderRadius:10,
        arrowColor: 'black',
        
      }}
      // Specify theme properties to override specific styles for calendar parts. Default = {}
    //   theme={{
    //     backgroundColor: '#ffffff',
    //     calendarBackground: '#ffffff',
    //     textSectionTitleColor: '#b6c1cd',
    //     textSectionTitleDisabledColor: '#d9e1e8',
    //     selectedDayBackgroundColor: '#00adf5',
    //     selectedDayTextColor: '#ffffff',
    //     todayTextColor: '#00adf5',
    //     dayTextColor: '#2d4150',
    //     textDisabledColor: '#d9e1e8',
    //     dotColor: '#00adf5',
    //     selectedDotColor: '#ffffff',
    //     arrowColor: 'black',
    //     disabledArrowColor: '#d9e1e8',
    //     monthTextColor: 'blue',
    //     indicatorColor: 'blue',
    //     textDayFontFamily: 'monospace',
    //     textMonthFontFamily: 'monospace',
    //     textDayHeaderFontFamily: 'monospace',
    //     textDayFontWeight: '300',
    //     textMonthFontWeight: 'bold',
    //     textDayHeaderFontWeight: '300',
    //     textDayFontSize: 16,
    //     textMonthFontSize: 16,
    //     textDayHeaderFontSize: 16
    //   }}
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