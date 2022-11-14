import { View, Text, KeyboardAvoidingView, StyleSheet,Image, SelectList } from 'react-native'
import { useState, useEffect } from 'react'
import { fontSize } from '@mui/system'

const PollContentScreen = () => {
  const[selectedPollLabel, PollLabel] = useState()
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

    <SelectList 
    onSelect={() => (selectedGender)}
    placeholder="Select your gender"
    label="Gender"
    setSelected={setGenderSelected} 
    data={dataGender}  
    style={styles.input}
  //arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />} 
  // searchicon={<FontAwesome name="search" size={12} color={'black'} />} 
    search={true} 
    //maxHeight = '5'
    boxStyles={[{marginLeft:12}, {width:320},{marginBottom:15},{backgroundColor: '#EAEAEA'},{color:'#535353'}, {height:52}]} //override default styles
/>

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
