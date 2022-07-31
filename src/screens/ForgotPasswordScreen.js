import { View, Text,KeyboardAvoidingView,Image, StyleSheet} from 'react-native'
import React from 'react'

const ForgotPasswordScreen = () => {
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
      width:100,
      height:35,
      marginRight:230,
      


  },
})
export default ForgotPasswordScreen