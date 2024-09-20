import { View, Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';
import { useUserContext } from '../../UserContext';

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { user } = useUserContext();

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirmation do not match.');
      return;
    }

    setLoading(true);

    try {
      await Auth.changePassword(user, currentPassword, newPassword);
      Alert.alert('Success', 'Password has been changed successfully.');
      navigation.goBack();  // Go back after success
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred while changing the password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
   <View style={styles.logoContainer}>
        <Image
          source={require('/Users/sheldonotieno/Squad/assets/newSquadLog.png')}
          style={styles.squadLogo}
          resizeMode="contain"
        />
      </View>

      {/* Add Logo */}
      <TouchableOpacity
        style={[{ backgroundColor: "#F4F8FB" }, { flexDirection: "row", marginTop: -20, marginBottom:10 }]}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="#1764EF" style={{ flex: 1, marginLeft: 30, marginTop:-180 }} />
        <Text style={{ fontWeight: '600', fontSize: 15, flex: 1, marginLeft: -380}}>Change Password</Text>
      </TouchableOpacity>
      {/* Back button and Title */}
     <View>

      
     </View>

      {/* Password Input Fields */}
      <View style={styles.InputContainer}>
        
        <TextInput
          placeholder="Current Password"
          value={currentPassword}
          secureTextEntry
          onChangeText={setCurrentPassword}
          style={styles.input}
        />

        <TextInput
          placeholder="New Password"
          value={newPassword}
          secureTextEntry
          onChangeText={setNewPassword}
          style={styles.input}
        />

        <TextInput
          placeholder="Confirm New Password"
          value={confirmPassword}
          secureTextEntry
          onChangeText={setConfirmPassword}
          style={styles.input}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#1764EF" style={{ marginTop: 20 }} />
        ) : (
          <TouchableOpacity onPress={handleChangePassword} style={styles.button}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F4F8FB",
  },
  logoContainer: {
    marginTop: 20, // Adjust this for spacing
    marginBottom: 90,
    alignItems: 'center',
  },
  squadLogo: {
    width: 150,
    height: 85,
  },
  input: {
    backgroundColor: '#FFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    width: 356,
    height: 42,
    marginTop: 10,
    fontSize: 13,
    fontWeight: '600',
    marginRight: 15,
    marginLeft: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#1145FD',
    width: 366,
    height: 42,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 15,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
});

export default ChangePasswordScreen;
