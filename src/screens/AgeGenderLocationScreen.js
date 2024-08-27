import { View, Text, KeyboardAvoidingView, Image, StyleSheet, StatusBar, Dimensions, TouchableOpacity, TextInput, SafeAreaView, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import StepIndicator from 'react-native-step-indicator';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { Auth } from 'aws-amplify';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width, height } = Dimensions.get("window");

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#ffff',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#ffff',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#ffff',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fff',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#1764EF',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#ffffff',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fffff'
};

const dataGender = [
  { key: '1', value: "Male" },
  { key: '2', value: "Female" }, 
  {key: '3', value: "Other"}, 
  {key: '4', value: "Prefer Not to Say"}
];

const AgeGenderLocationScreen = () => {
  const [currentPosition, setCurrentPositon] = useState(1);
  const [selectedGender, setGenderSelected] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("Enter your location");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const today = new Date();
  const tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
  const HundredYearsAgo = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
  const [date, setDate] = useState(tenYearsAgo);
  const [age, setAge] = useState(tenYearsAgo.toISOString().split('T')[0]);

  const navigation = useNavigation();
  const route = useRoute();
  const ageAndLocation = route?.params || {};

  function objectLength(object) {
    return Object.keys(object).length;
  }

  useEffect(() => {
    if (objectLength(ageAndLocation) !== 0) {
      if (Object.keys(ageAndLocation).toString() === "dateOfBirth") {
        let newAge = Object.values(ageAndLocation).toString();
        setAge(newAge);
      }
      if (Object.keys(ageAndLocation).toString() === "address") {
        let newAddress = Object.values(ageAndLocation).toString();
        setLocation(newAddress);
      }
      if (selectedGender) {
        let valueGender = dataGender.find(o => o.key === selectedGender);
        setGender(valueGender.value);
      }
    }
  }, [ageAndLocation, selectedGender]);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setAge(currentDate.toISOString().split('T')[0]);
  };

  const handleLocationPress = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const address = await Location.reverseGeocodeAsync(location.coords);
    if (address.length > 0) {
      const { city, region, country } = address[0];
      setLocation(`${city}, ${region}, ${country}`);
    }
  };

  async function saveAgeGenderLocation() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {
        'address': location,
        'birthdate': age,
        'gender': selectedGender
      });
      console.log(location, age, selectedGender);
      console.log("✅successfully updated users attributes");
      navigation.navigate("ProfilePictureUploadScreen");
    } catch (e) {
      console.log("failed to update the additional attributes");
    }
  }

  

  return (
    <SafeAreaView
      style={styles.container}
      behavior="padding"
    >
      <View style={[styles.squadLogoContainer, { flexDirection: 'column' }]}>
        <Image
          source={require('/Users/sheldonotieno/Squad/assets/squad-logo.png')}
          style={styles.squadLogo}
          resizeMode='contain'
        />
      </View>
      <StatusBar backgroundColor={'black'} barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerText}> Sign Up Progress</Text>
      </View>
      <View style={styles.indicatiorWindow}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={currentPosition}
        />
      </View>

      <View style={[{ marginLeft: -0 }, { marginTop: 10 }, { marginRight: 210 }]}>
        <Text style={[{ color: '#535353' }, { fontWeight: "800" }]}>Date of Birth</Text>
      </View>
      <View style={[{ flexDirection: "row" }, { marginTop: 10 }, { marginLeft: 20 }]}>
        <TouchableOpacity style={[{ flex: 1 }, { borderColor: '#1145FD' }]}>
          <TouchableOpacity style={[{ justifyContent: 'flex-start' }, styles.ageInputContainer]}>
            <TextInput
              style={[{ justifyContent: 'flex-end' }, { textAlign: 'center' }, { fontWeight: '600' }]}
              textAlign='left'
              value={age}
              editable={false}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={[{ flex: 1 }]}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}
            style={[{ justifyContent: 'flex-end' }, styles.calendarIcon]}>
            <Ionicons
              name='calendar'
              size={30}
              color='#000'
              style={[{ alignSelf: 'center' }, { marginRight: 15 }, { marginLeft: 5 }]}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          maximumDate={tenYearsAgo}
          minimumDate={HundredYearsAgo}
          onChange={onChangeDate}
        />
      )}

      <View style={[{ marginLeft: -10 }, { marginTop: 10 }, { marginRight: 250 }]}>
        <Text style={[{ color: '#535353' }, { fontWeight: "800" }]}>Gender</Text>
      </View>
      <TouchableOpacity>
        <SelectList
          onSelect={() => (selectedGender)}
          placeholder="Sex"
          label="Gender"
          data={dataGender}
          setSelected={setGenderSelected}
          search={true}
          textAlign='left'
          boxStyles={[{ marginLeft: -5 }, { marginTop: 10 }, { width: 320 },
          { marginBottom: 15 }, { backgroundColor: '#EAEAEA' }, { color: '#535353' },
          { borderColor: '#000' }, { height: 52 }]}
        />
      </TouchableOpacity>

      <View style={[{ marginLeft: 10 }, { marginTop: 5 }, { marginRight: 250 }]}>
        <Text style={[{ color: '#535353' }, { fontWeight: "800" }]}>Location</Text>
      </View>
      <View style={[{ flexDirection: "row" }, { marginTop: 10 }, { marginLeft: 20 }]}>
        <TouchableOpacity style={[{ flex: 1 }, { borderColor: '#1145FD' }]}>
          <TouchableOpacity style={[{ justifyContent: 'flex-start' }, styles.ageInputContainer]}>
            <TextInput
              style={[{ justifyContent: 'flex-end' }, { textAlign: 'center' }, { fontWeight: '600' }, { padding: 5 }, { paddingTop: -9 }]}
              textAlign='left'
              value={location}
              editable={false}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity style={[{ flex: 1 }]}>
          <TouchableOpacity onPress={handleLocationPress}
            style={[{ justifyContent: 'flex-end' }, styles.calendarIcon]}>
            <Ionicons
              name='location'
              size={30}
              color='#000'
              style={[{ alignSelf: 'center' }, { marginRight: 15 }, { marginLeft: 5 }]}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <View style={[{ flexDirection: "row" }, { marginTop: -20 }, { marginLeft: 25 }]}>
        <TouchableOpacity onPress={() => navigation.replace('SignupScreen')} style={[{ flex: 1 }, styles.backButton, { borderColor: '#1145FD' }]}>
          <Text style={[{ justifyContent: 'flex-end' }, styles.backText]}> Back </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={saveAgeGenderLocation}
          style={[{ flex: 1 }, styles.button]}>
          <Text style={[{ justifyContent: 'flex-end' }, styles.buttonText]}> Next </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F4F8FB"
  },
  squadLogo: {
    width: 100,
    height: 35,
    marginRight: 250,
    marginTop: 70
  },
  header: {
    height: 55,
    width: '50%',
    justifyContent: "center",
    alignItems: 'center',
    marginRight: 200,
    marginTop: 10,
    marginLeft: 35
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  indicatiorWindow: {
    width: width - 30,
    padding: 20,
    margin: 15,
    borderRadius: 20,
    marginTop: -10
  },
  calendarIcon: {
    marginRight: 50,
    flexDirection: 'row',
    width: 60,
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    marginLeft: 98,
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#EAEAEA',
    paddingBottom: -3,
    paddingLeft: 10
  },
  ageInputContainer: {
    marginRight: 160,
    flexDirection: 'row',
    width: 260,
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    marginLeft: 22,
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#EAEAEA',
    marginRight: 50,
    paddingBottom: -3,
    paddingLeft: 10
  },
  genderInputContaner: {
    width: 320,
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 10,
    marginBottom: 10,
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#EAEAEA',
    paddingBottom: -3,
    paddingLeft: 10
  },
  button: {
    backgroundColor: '#1145FD',
    width: 180,
    height: 42,
    padding: 10,
    borderRadius: 5,
    marginTop: 130,
    alignItems: 'center',
    marginRight: 50,
    marginLeft: 15,
  },
  backButton: {
    backgroundColor: '#EAEAEA',
    width: 180,
    height: 42,
    padding: 10,
    borderRadius: 5,
    marginTop: 130,
    alignItems: 'center',
    marginRight: 5,
    marginLeft: 15,
    borderColor: '#1145FD'
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
    alignItems: "center"
  },
  backText: {
    color: '#1145FD',
    fontWeight: '700',
    fontSize: 15,
    alignItems: "center"
  },
});

export default AgeGenderLocationScreen;
