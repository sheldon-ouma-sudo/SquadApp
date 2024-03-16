    import { View, Text, StyleSheet} from 'react-native'
    import React from 'react'
    import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
    import PollRequest from './PollRequestScreen'
    import PollResponse from './PollResponse'



const PollActivityScreen = () => {
    const Tab = createMaterialTopTabNavigator();
    // const insets = useSafeAreaInsets();
    return (
      <Tab.Navigator 
      style={[{ marginTop:20 }, { marginEnd: 5 }, { marginStart: 5 }, { backgroundColor: "black" }, {borderRadius:9}]}   
      screenOptions={{
      tabBarLabelStyle: { color: '#1145FD', fontWeight: '600' },
      tabBarStyle: { backgroundColor: "#F4F8FB" },
    }}
      >
          <Tab.Screen name="Poll Requests" 
          component={PollRequest} />
          <Tab.Screen name="Poll Response" 
          component={PollResponse} />
        </Tab.Navigator>
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