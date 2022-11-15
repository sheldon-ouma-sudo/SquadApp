import { View, Text, KeyboardAvoidingView, StyleSheet,Image, TextInput, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import SelectList from 'react-native-dropdown-select-list'
import MultipleSelectList from 'react-native-dropdown-select-list'
import { Button } from 'react-native-elements'

const PollContentScreen = () => {
  const [selected, setSelected]  = useState("")
  const [caption, setCaption] = useState()
  const [categories, setCategories] = useState([])
  const data=[
        {key:'1', value:"Fashion"},
        {key:'2', value:"Decor"},
        {key:'3', value:"Food"},
        {key:'4', value:"Travel"},
        {key:'5', value:"Social"},
        {key:'6', value:"Health"},
        {key:'7', value:"Other"},
  ]
  const pollAudienceOptions=[
    {key:'1', value:"Instagram"},
    {key:'2', value:"Twitter"},
    {key:'3', value:"SnapChat"},
    {key:'4', value:"Squad"},
    {key:'5', value:"Contacts"},
    {key:'6', value:"Squad"},
    {key:'7', value:"Other"},
]
const handlePoll =()=>{
  alert("Attempts to create a poll")
}
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
    <View style={{paddingHorizontal:15,marginTop:15,width:350,marginRight:70,marginLeft:30}}>
    <SelectList 
    setSelected={(val) => setSelected(val)} 
    value={selected}
    data={data} 
    save="value"
    search={true} 
    />

    </View>
    <View style={styles.pollContentStyles}>
      <Text style={styles.pollContentCaption}>Poll Caption</Text>
    </View>
    <TextInput
      placeholder ="Example: A Tesla or a Messeratti?"
      value={caption}
      onChangeText={text =>setCaption(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
      style={styles.input}
      textAlignVertical={"top"}
    ></TextInput>
    <View style={styles.pollAudience}>
      <Text style={styles.pollContentCaption}>Poll Audience</Text>
      <View style={{paddingHorizontal:15,marginTop:15,width:350,marginRight:-250}}></View>
      <MultipleSelectList 
        setSelected={(val) => setSelected(val)} 
        data={pollAudienceOptions} 
        save="value"
        onSelect={() => alert(selected)} 
        label="Categories"
    />
    </View>
    <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={handlePoll}
        style = {styles.button}
            >
            <Text style={styles.buttonText}>
                Poll
            </Text>
        </TouchableOpacity>
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
    marginTop:70
  },
  pollContentStyles:{
    marginRight:250,
    marginTop:20

  },
  pollContentText:{
    fontWeight:'700',
    fontSize:18
  },
  pollContentLabel:{
    marginTop:90,
    fontWeight:'700',
    fontSize:18

  },
  input:{
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical:10,
    borderRadius:12,
    width:350,
    height:80,
    marginTop:10,
    fontSize: 13,
    marginRight:15,
    marginLeft:5,
// fontStyle:"Montserrat-Regular",
    color:'black',
    fontWeight:'400'    
},
pollContentCaption:{
  marginTop:-10,
  fontWeight:'700',
  fontSize:18
},
pollAudience:{
  marginTop:20,
  marginRight:250
},
button:{
  backgroundColor: '#1764EF',
  width: 296,
  height: 42,
  padding: 12,
  borderRadius: 5,
  marginTop: 40,
  alignItems: 'center',
  marginRight: 10,
  marginLeft:15,
},
buttonContainer:{
  width: 296,
  height:42,
  borderRadius:5,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 30,
  marginBottom: 60
  },
  buttonText:{
    color: 'white',
    fontWeight: '600',
    fontSize: 14
    
},
})
