import { View, Text,KeyboardAvoidingView,Image, StyleSheet} from 'react-native'
import React from 'react'
const AgeGenderLocationScreen = () => {
  return (
    <KeyboardAvoidingView 
        style={styles.container}
        behavior="padding"
        >
        <View style={styles.squadLogoContainer}>
          <Image
            source={require('/Users/sheldonotieno/Squad/assets/squad-logo.png')}
            style={styles.squadLogo}
            resizeMode='contain'
          ></Image>
        </View>      

        

        </KeyboardAvoidingView>
  )
}

export default AgeGenderLocationScreen