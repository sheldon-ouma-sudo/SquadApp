    import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
    StatusBar,Dimensions,SafeAreaView,SectionList,FlatList} from 'react-native'
    import React, { useEffect, useState } from 'react'
    import StepIndicator from 'react-native-step-indicator';
     import { TouchableOpacity } from 'react-native';
     import { useNavigation } from '@react-navigation/native';
     
    //const labels = ["Cart","Delivery Address","Order Summary","Payment Method","Track"];
    const{width,height} = Dimensions.get("window")
    //const[currentPosition, setCurrentPositon]=useState(0)
    const customStyles = {
      stepIndicatorSize: 25,
      currentStepIndicatorSize:30,
      separatorStrokeWidth: 2, 
      currentStepStrokeWidth: 3,
      stepStrokeCurrentColor: '#ffff',
      stepStrokeWidth: 3,
      stepStrokeFinishedColor: '#1764EF',
      stepStrokeUnFinishedColor: '#aaaaaa',
      separatorFinishedColor: '#1764EF',
      separatorUnFinishedColor: '#aaaaaa',
      stepIndicatorFinishedColor:  '#1764EF',
      stepIndicatorUnFinishedColor: '#ffffff',
      stepIndicatorCurrentColor: '#1764EF',
      stepIndicatorLabelFontSize: 13,
      currentStepIndicatorLabelFontSize: 13,
      stepIndicatorLabelCurrentColor: '#ffffff',
      stepIndicatorLabelFinishedColor: '#ffffff',
      stepIndicatorLabelUnFinishedColor: '#aaaaaa',
      //labelColor: '#999999',
      labelSize: 13,
      currentStepLabelColor: '#fffff'
    }

    
    
     
const PersonalInterests = () => {
  const navigation = useNavigation()
  const[currentPosition, setCurrentPositon] = useState(2)
  const[personalInterest, setPersonalInterest]=useState([])
  const [open, setOpen] = React.useState(false)
  const [data, setData] = React.useState([
    { label: 'temperature', selected:false },
    { label: 'humidity', },
    { label: 'light', },
    { label: 'move', },
    { label: 'sound', },
    { label: 'carbon dioxide', },
    { label: 'air pollution', }
  ])

  const SECTIONS = [
    {
      title: 'Select the themes you are intersted in:',
      data: [
        {
          key: '1',
          text: 'Food',
          uri: 'https://media3.giphy.com/media/26xBzfqV1XqKAlRCw/giphy.gif',
        },
        {
          key: '2',
          text: 'Fashion',
          uri: 'https://media3.giphy.com/media/xjIh4zHDjhjji/giphy.gif',
         
        },
  
        {
          key: '3',
          text: 'Travel',
          uri: 'https://media3.giphy.com/media/iBBfBIj1XopJF6WTVI/giphy.gif',
        },
        
      ],
    },
    {
      //title: 'Punk and hardcore',
      data: [
        {
          key: '4',
          text: 'Decor',
          uri: 'https://media3.giphy.com/media/JGdbbSyi3wM9uBKv8p/giphy.gif',
        },
        {
          key: '5',
          text: 'Wellness',
          uri: 'https://media3.giphy.com/media/cAgGLp84BRh4lZumDt/giphy.gif',
        },
        {
          key: '6',
          text: 'Social',
          uri: 'https://media3.giphy.com/media/Swg9cud2W8OKVhz9rt/giphy.gif',
        },
    
      ],
    
     
    },
  ];
  openList = () => setOpen(true)
  closeList = () => setOpen(false)
  onUpdateValue = (index, value) => { data[index].selected = value; return setData([...data]);}
  renderItem = ({ item, index }) => <ItemRenderer key={index} index={index} selected={item.selected} label={item.label} onUpdateValue={onUpdateValue} />
  const ListItem = ({ item }) => {
    return(
    <TouchableOpacity 
    onPress={()=>{setPersonalInterest([...personalInterest,item])
      console.log(personalInterest)
      console.log(item)
      console.log("personal intereste is as follows: ",personalInterest)
    }
  
  }
    >
    <View style={[styles.item,{marginLeft:15},{marginRight:-2}]}>
    <Image
      source={{
        uri: item.uri,
      }}
      style={styles.itemPhoto}
      resizeMode="cover"
    />
    </View>
    <Text style={styles.itemText}>{item.text}</Text>
  </TouchableOpacity>
  )};
  
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
    <StatusBar backgroundColor={'black'} barStyle="light-content" />
    <View style={styles.header}>
      <Text style={styles.headerText}> Sign Up Progress</Text>
    </View>
    <View style={styles.indicatiorWindow}>
    <StepIndicator
     customStyles={customStyles}
     currentPosition={currentPosition}
     //labels={labels}
     />
    </View>  
    <View style={{marginTop:-30}}>
      <SafeAreaView>
          <SectionList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            stickySectionHeadersEnabled={false}
            sections={SECTIONS}
            renderSectionHeader={({ section }) => (
                    <>
              <Text style={styles.sectionHeader}>{section.title}</Text>
              <FlatList
                horizontal
                data={section.data}
                renderItem={({ item }) => 
               <ListItem item={item} />  
                }
                contentContainerStyle={{ paddingBottom: -40 }}
                showsHorizontalScrollIndicator={false}
                />
                </>
                )}
                renderItem={({ item, section }) => {
                  return null;
                  //return <ListItem item={item} />;
                }}
                />
                  <TouchableOpacity  onPress={() =>navigation.replace('UploadProfPictureScreen')}style={[ styles.backButton,{borderColor:'#1145FD'}, {marginBottom:-140},{marginLeft:40},{marginTop:-330} ]}>
                  <Text  style={[{justifyContent: 'flex-end'},styles.backText]}> Back </Text></TouchableOpacity>
                  <TouchableOpacity  onPress={() =>navigation.replace('SquadCreationScreen')}style={[ styles.button,{borderColor:'#1145FD'}, {marginBottom:300},{marginLeft:230}, ]}>
                  <Text  style={[{justifyContent: 'flex-end'},styles.buttonText]}> Next </Text></TouchableOpacity>
                </SafeAreaView>
        </View>
        
    </KeyboardAvoidingView>
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
      

   
  },
  header:{
    height: 55, 
    //padding:10, 
    width:'50%',
    //backgroundColor:"#000",
    //elevation:10,
    justifyContent:"center",
    alignItems:'center',
    marginRight:200,
    marginTop: 10,
    marginLeft:35
  },
  headerText:{
    //color:'red',
    fontSize:22,
    fontWeight:'bold'
  },
  indicatiorWindow:{
    //height:height-170,
    width:width-20,
    padding:20,
    margin:15,
    //elevation:10,
    borderRadius:20,
    marginTop:-20,
    marginLeft:-8

    //backgroundColor:'blue'
  },
  button:{
    backgroundColor: '#1145FD',
    width: 180,
    height: 42,
    padding: 10,
    borderRadius: 5,
    marginTop: 100,
    alignItems: 'center',
    marginRight: 30,
    marginLeft:20,

},

backButton:{
  backgroundColor: '#EAEAEA',
  width: 180,
  height: 42,
  padding: 10,
  borderRadius: 5,
  //marginTop: 100,
  alignItems: 'center',
  //marginRight: 5,
  //marginLeft:10,
  borderColor:'#1145FD'


},
buttonText:{
  color: 'white',
  fontWeight: '700',
  fontSize: 15,
  alignItems:"center"
  
  
},
backText:{
  color: '#1145FD',
  fontWeight: '700',
  fontSize: 15,
  alignItems:"center"
  
  
},
nextText:{
  color: '#1145FD',
  fontWeight: '700',
  fontSize: 15,
  alignItems:"center"
  
  
},
  
profilePictureButton:{
  backgroundColor: '#1145FD',
  width: 256,
  height: 42,
  padding: 10,
  borderRadius: 5,
  marginTop: 30,
  alignItems: 'center',
  marginRight: 50,
  marginLeft:50,

},
sectionHeader: {
  fontWeight: '400',
  fontSize: 15,
  //color: '#f4f4f4',
  marginTop: 10,
  marginBottom: 5,
  marginLeft:25
  //padding:-15,

 
},
item: {
  margin: 10,
  backgroundColor: '#FFFFFF',
  padding:10,
  borderRadius:5
},
itemPhoto: {
  width: 100,
  height: 100,
},
itemText: {
  color: '#1145FD',
  marginTop: 8,
  fontWeight:'600',
  marginLeft:20
},  

  },)
  export default PersonalInterests