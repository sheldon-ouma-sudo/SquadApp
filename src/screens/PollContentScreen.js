import { View, Text, KeyboardAvoidingView, StyleSheet,Image, 
  TextInput, TouchableOpacity, StatusBar} from 'react-native'
import { useState, useEffect } from 'react'
import {SelectList} from 'react-native-dropdown-select-list'
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const PollContentScreen = () => {
  const [selected, setSelected]  = useState("")
  const [caption, setCaption] = useState()
  const [selectedPollAudience, setSelectedPollAudience] = useState([]);
  const [mediArr, setMediArr] = useState([])
  const data=[
        {key:'1', value:"Fashion"},
        {key:'2', value:"Decor"},
        {key:'3', value:"Food"},
        {key:'4', value:"Travel"},
        {key:'5', value:"Social"},
        {key:'6', value:"Health"},
        {key:'7', value:"Other"},
  ]
  const DATA=[
    { label: 'Squad', value: '1' },
    { label: 'Instagram', value: '2' },
    { label: 'Twitter', value: '3' },
    { label: 'Contancts', value: '4' },
    { label: 'Snapchat', value: '5' },
    { label: 'Tiktok', value: '6' },
]
const navigation = useNavigation()
const route = useRoute();
const latestMedia = route?.params.image
function collectData(data){
    var media = {}
    media.id = i;
    media.uri = latestMedia;
    if(mediArr.size()<4){
      mediArr.push(media)
      setMediArr(mediArr)
    }else{
      alert("the maximum amount of media exceeded, please delete some options and try again")
    }
    data = mediArr
  return data
}


const renderDataItem = (item) => {
  return (
      <View style={styles.item}>
          <Text style={styles.selectedTextStyle}>{item.label}</Text>
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      </View>
  );
};
const handlePoll =()=>{
  alert("Attempts to create a  new poll")
  navigation.navigate('RootNavigation', { screen: 'HomeScreen' })

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
    </View>
    <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={DATA}
        labelField="label"
        valueField="value"
        placeholder="Choose Poll Audience"
        value={selectedPollAudience}
        search
        searchPlaceholder="Search..."
        onChange={item => {
            setSelectedPollAudience(item);
        }}
        renderLeftIcon={() => (
            <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
            />
        )}
      renderItem={renderDataItem}
      renderSelectedItem={(item, unSelect) => (
          <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View style={styles.selectedStyle}>
                  <Text style={styles.textSelectedStyle}>{item.label}</Text>
                  <AntDesign color="black" name="delete" size={17} />
              </View>
          </TouchableOpacity>
                )}
            />
            <StatusBar />
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
  width: 350,
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
dropdown: {
  height: 50,
  width:350,
  backgroundColor: '#1764EF',
  borderRadius: 12,
  padding: 12,
  shadowColor: '#000',
  shadowOffset: {
      width: 0,
      height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,

  elevation: 2,
},
placeholderStyle: {
  fontSize: 16,
  color:'white'
},
selectedTextStyle: {
  fontSize: 14,
},
iconStyle: {
  width: 20,
  height: 30,

},
inputSearchStyle: {
  height: 40,
  fontSize: 16,
},
icon: {
  marginRight: 5,
  color:'white'
},
item: {
  padding: 17,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

},
selectedStyle: {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 14,
  backgroundColor: 'white',
  shadowColor: '#000',
  marginTop: 8,
  marginRight: 12,
  paddingHorizontal: 12,
  paddingVertical: 8,
  shadowOffset: {
      width: 0,
      height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  marginLeft:37,

  elevation: 2,
},
textSelectedStyle: {
  marginRight: 10,
  fontSize: 16,
},
})
