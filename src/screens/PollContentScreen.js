import { View, Text, KeyboardAvoidingView, StyleSheet,Image, SelectList } from 'react-native'
import { useState, useEffect } from 'react'
import { fontSize } from '@mui/system'

const PollContentScreen = () => {
  const[PollLabel, setSelectedPollLabel] = useState()


  const data=[
        {key:'1', value:"Fashion"},
        {key:'2', value:"Decor"},
        {key:'3', value:"Food"},
        {key:'4', value:"Travel"},
        {key:'5', value:"Social"},
        {key:'6', value:"Health"},
        {key:'7', value:"Other"},
  ]
  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
>
<View style={[styles.squadLogoContainer, {flexDirection:'column'}]}>
    <Image
        source={require('/Users/sheldonotieno/Squad/assets/squad-logo.png')}
        style={styles.squadLogo}
        resizeMode='contain'
    ></Image>
    </View>
    <View style={styles.pollContentStyles}>
      <Text style={styles.pollContentText}>Poll Content</Text>
    </View>
    <Image>

    </Image>
  <View style={styles.pollContentStyles}>
      <Text style={styles.pollContentLabel}>Poll Label</Text>
    </View>

    

    </KeyboardAvoidingView>
  )
}

export default PollContentScreen
const styles = StyleSheet.create({
  container:{
  flex:1,
  justifyContent:"flex-start",
  alignItems:"center",
  backgroundColor: "#F4F8FB"
  },
  squadLogo:{
    width:100,
    height:35,
    marginRight:250,
    marginTop:120
  },
  pollContentStyles:{
    marginRight:250,
    marginTop:40

  },
  pollContentText:{
    fontWeight:'700',
    fontSize:18
  },
  pollContentLabel:{
    marginTop:120,
    fontWeight:'700',
    fontSize:18

  }
  
})
