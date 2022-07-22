import { View, Text, KeyboardAvoidingView,StyleSheet, Image, TextInput,TouchableOpacity} from 'react-native'
import React from 'react'

const PhoneOTPScreen = () => {
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
          <View>
            <TextInput
                placeholder ="Enter Confirmtion Code"
               // value={email}
                autoCapitalize='none'
                textAlign = 'center'
                keyboardType="numeric"
                //onChangeText={text => setEmail(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
                style={styles.input}
                />
          </View>
          <View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
            ///onPress={handleSignUp}
            style = {styles.button}
                >
                <Text style={styles.buttonText}>
                  Confirm
                </Text>
              </TouchableOpacity>
          </View>
          </View>

    </KeyboardAvoidingView>
  )
}

export default PhoneOTPScreen


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
      marginBottom:20


  },

  input:{
    backgroundColor: '#EAEAEA',
    paddingHorizontal: 15,
    paddingVertical:10,
    borderRadius:5,
    width:296,
    height:42,
    marginTop:10,
    fontSize: 13,
    marginRight:15,
    marginLeft:10,
    fontStyle:"Montserrat",
    color:'#535353',
    fontWeight:'400'   
},
button:{
  backgroundColor: '#1145FD',
  width: 296,
  height: 42,
  padding: 15,
  borderRadius: 5,
  marginTop: 30,
  alignItems: 'center',
  marginRight: 10,
  marginLeft:15
},
buttonText:{
  color: 'white',
  fontWeight: '700',
  fontSize: 12.5
  
},

})