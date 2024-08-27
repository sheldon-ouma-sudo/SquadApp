import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Auth, Storage, API, graphqlOperation } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import { BottomSheet } from 'react-native-elements';
import { useUserContext } from '../../UserContext';
import { updateUser } from '../graphql/mutations';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { Alert } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';

const { width } = Dimensions.get("window");

const EditProfileScreen = () => {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState(null);
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const { user, updateUserProperty } = useUserContext();
    const navigation = useNavigation();

    useEffect(() => {
        if (user) {
          console.log("here is the user", user)
            setUsername(user.userName);
            setName(user.name || "");
            setBio(user.bio || "");
            setImage(user.imageUrl);
            setEmail(user.email || "");
        }
    }, [user]);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            handleImageUpload(assets[0].uri);
        }
        setIsBottomSheetVisible(false);
    };

    const takePhotoFromCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
            handleImageUpload(result.uri);
        }
        setIsBottomSheetVisible(false);
    };

    const fetchResourceFromURI = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        return blob;
    };

    const handleImageUpload = async (uri) => {
      try {
          const user = await Auth.currentAuthenticatedUser();
          const userId = user.attributes.sub;
          const filename = `${userId}.jpg`;
          const blob = await fetchResourceFromURI(uri);

          const response = await Storage.put(filename, blob, {
              level: 'public',
              contentType: 'image/jpeg',
          });

          const userImgUrl = await Storage.get(response.key, { expires: 86400 * 7 });

          await Auth.updateUserAttributes(user, {
              'picture': userImgUrl,
          });
          setImage(userImgUrl)
          updateUserProperty('imageUrl', userImgUrl);
      } catch (error) {
          console.log("❌ Failed to upload the picture or update user attributes:", error);
      }
  };

  const handleSubmit = async () => {
      try {
          const user = await Auth.currentAuthenticatedUser();
          const userId = user.attributes.sub;

          // Update GraphQL User object
          const updatedUser = {
              id: userId,
              name: name.trim(),
              userName: username.trim(),
              Bio: bio.trim(),
              email: email.trim(),
              imageUrl: image || user.imageUrl,
          };

          await API.graphql(graphqlOperation(updateUser,
             { input: updatedUser }));

          // Update local context
          updateUserProperty('name', name.trim());
          updateUserProperty('userName', username.trim());
          updateUserProperty('Bio', bio.trim());
          updateUserProperty('email', email.trim());
          if (image) {
              updateUserProperty('imageUrl', image);
          }

          Alert.alert("Success", "Your profile has been updated successfully!");
          navigation.goBack();
      } catch (error) {
          console.log("❌ Error updating user:", error);
          Alert.alert("Error", "Failed to update profile. Please try again.");
      }
  };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={[{ backgroundColor: "#F4F8FB" }, { flexDirection: "row", marginTop: 30 }]}
                onPress={() => navigation.goBack()}
            >
                <AntDesign name="arrowleft" size={24} color="#1764EF" style={{ flex: 1, marginLeft: 30 }} />
                <Text style={{ fontWeight: '600', fontSize: 15, flex: 1, marginRight: 150 }}>Edit the basics</Text>
            </TouchableOpacity>

            <View style={[{ backgroundColor: "#F4F8FB" }, { flexDirection: "row" }]}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                    <Image
                        source={{ uri: image || '/Users/sheldonotieno/Squad/assets/person-circle-sharp-pngrepo-com.png' }}
                        resizeMode={'cover'}
                        style={styles.profileImage}
                    />
                    <View style={styles.changePhotoContainer}>
                        <TouchableOpacity onPress={() => setIsBottomSheetVisible(true)}>
                            <Text style={styles.changePhotoText}>Change Photo</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <BottomSheet
                isVisible={isBottomSheetVisible}
                containerStyle={styles.bottomSheetContainer}
            >
                <View style={styles.bottomSheetContent}>
                    <TouchableOpacity onPress={pickImage} style={styles.bottomSheetButton}>
                        <FontAwesome name="photo" size={24} color="#1764EF" />
                        <Text style={styles.bottomSheetText}>Upload Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={takePhotoFromCamera} style={styles.bottomSheetButton}>
                        <Entypo name="camera" size={24} color="#1764EF" />
                        <Text style={styles.bottomSheetText}>Take Photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsBottomSheetVisible(false)} style={styles.cancelButton}>
                        <Text style={styles.cancelText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>

            <View style={{ marginTop: 20, alignSelf: 'flex-start', paddingLeft: 20 }}>
                <Text>Bio</Text>
            </View>
            <TextInput
                placeholder="Bio"
                value={bio}
                autoCapitalize='none'
                onChangeText={text => setBio(text)}
                style={styles.input}
            />

            <View style={{ marginTop: 20, alignSelf: 'flex-start', paddingLeft: 20 }}>
                <Text>Name</Text>
            </View>
            <TextInput
                placeholder="Name"
                value={name}
                autoCapitalize='none'
                onChangeText={text => setName(text)}
                style={styles.input}
            />

            <View style={{ marginTop: 20, alignSelf: 'flex-start', paddingLeft: 20 }}>
                <Text>User Name</Text>
            </View>
            <TextInput
                placeholder="Username"
                autoCapitalize='none'
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.input}
            />

            <View style={{ marginTop: 20, alignSelf: 'flex-start', paddingLeft: 20 }}>
                <Text>Email Address</Text>
            </View>
            <TextInput
                placeholder="Email Address"
                value={email}
                autoCapitalize='none'
                keyboardType="email-address"
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />

<TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>
                    Submit
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#F4F8FB",
        width: width,
    },
    profileImage: {
        height: 82,
        width: 82,
        borderRadius: 41,
        borderWidth: 3,
        borderColor: '#FFFF',
    },
    changePhotoContainer: {
        marginTop: 10,
        backgroundColor: '#FFFF',
        width: 130,
        height: 40,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    changePhotoText: {
        fontSize: 14,
        color: '#1764EF',
    },
    bottomSheetContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'flex-end',
    },
    bottomSheetContent: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottomSheetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },
    bottomSheetText: {
        fontSize: 18,
        marginLeft: 15,
        color: '#1764EF',
    },
    cancelButton: {
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    cancelText: {
        fontSize: 18,
        color: '#FF0000',
    },
    input: {
        backgroundColor: '#FFFF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
        width: '90%',
        marginTop: 10,
        fontSize: 13,
        fontWeight: '600',
    },
    button: {
        backgroundColor: '#1145FD',
        width: '90%',
        height: 42,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
});

export default EditProfileScreen;
