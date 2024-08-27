import { View, Text, KeyboardAvoidingView, Image, StyleSheet, StatusBar, Dimensions, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import StepIndicator from 'react-native-step-indicator';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get("window");

const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#ffff',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#1764EF',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#1764EF',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#1764EF',
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

const ProfilePictureUpload = () => {
  const navigation = useNavigation();
  const [currentPosition, setCurrentPositon] = useState(2);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Ask for permission to access the camera roll
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function navigate() {
    try {
      navigation.navigate("UploadProfPictureScreen");
    } catch (e) {
      console.log("failed to update the additional attributes",);
    }
  }

  return (
    <KeyboardAvoidingView 
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

      <View style={styles.profilePictureContainer}>
        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Ionicons
              name='camera'
              size={100}
              style={[{ marginLeft: 20 }, { justifyContent: "center" }, { marginTop: 20 }]}
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={navigate}
          style={styles.profilePictureButton}
        >
          <Text style={styles.buttonText}>
            Add Profile Picture
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default ProfilePictureUpload;

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
  },
  profilePictureContainer: {
    height: 150,
    width: 150,
    borderRadius: 90,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#1764EF',
    marginRight: 170,
    marginLeft: 170,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: 150,
    width: 150,
    borderRadius: 90,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  profilePictureButton: {
    backgroundColor: '#1145FD',
    width: 256,
    height: 42,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
    alignItems: "center"
  }
});
