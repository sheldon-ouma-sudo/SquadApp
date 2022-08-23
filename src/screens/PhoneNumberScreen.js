import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native'
import React from 'react'

const PhoneNumberScreen = () => {
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


const styles = StyleSheet.create({
    container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "#F4F8FB"
    },
    squadLogo:{
        width:221,
        height:85,
        marginBottom:30
    },
})
export default PhoneNumberScreen