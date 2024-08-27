    import { View, Text, StyleSheet} from 'react-native'
    import React from 'react'
    import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
    import PollRequest from './PollRequestScreen'
    import PollResponse from './PollResponse'



const PollActivityScreen = () => {
    const Tab = createMaterialTopTabNavigator();
    // const insets = useSafeAreaInsets();
    return (
     <View>
      <Text>All poll notification related stuff goes here</Text>
     </View>
   )
}



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
export default PollActivityScreen