    import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
    StatusBar,Dimensions,TouchableOpacity} from 'react-native'
    import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
    import ActivityScreen from './ActivityScreen';
    import PollRequest from './PollRequestScreen';
    import React from 'react'

  
    const NotificationScreen = () => {
    //const Tab = createMaterialTopTabNavigator();
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
            ></Image>
          </View>
        </KeyboardAvoidingView>
        
    
  )
}

export default NotificationScreen
const styles = StyleSheet.create({
    container:{
    flex:1,
    justifyContent:"flex-start",
    alignItems:"center",
    backgroundColor: "#F4F8FB",
  
  
    },
    squadLogo:{
        width:100,
        height:35,
        marginRight:250,
        marginTop:70  
    }
})