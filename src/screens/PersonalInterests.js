    import { View, Text,KeyboardAvoidingView,Image, StyleSheet, 
    StatusBar,Dimensions,SafeAreaView,SectionList,FlatList, ScrollView} from 'react-native'
    import React, { useEffect, useState } from 'react'
    import StepIndicator from 'react-native-step-indicator';
    import { TouchableOpacity } from 'react-native';
    import { useNavigation } from '@react-navigation/native';
    import Constants from 'expo-constants';
    import { useCallback } from 'react';
    import { Auth } from 'aws-amplify';
  

   
    const{width,height} = Dimensions.get("window")

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

    
    const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Food',
        url: 'https://media3.giphy.com/media/26xBzfqV1XqKAlRCw/giphy.gif',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Fashion',
        url: 'https://media3.giphy.com/media/xjIh4zHDjhjji/giphy.gif',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Travel',
        url: 'https://media3.giphy.com/media/iBBfBIj1XopJF6WTVI/giphy.gif',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72v2',
        title: 'Decor',
         url: 'https://media3.giphy.com/media/JGdbbSyi3wM9uBKv8p/giphy.gif',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72v3',
        title: 'Wellness',
        url: 'https://media3.giphy.com/media/cAgGLp84BRh4lZumDt/giphy.gif',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72v4',
        title: 'Social',
        url: 'https://media3.giphy.com/media/Swg9cud2W8OKVhz9rt/giphy.gif',
    
      },
    
    ];
   
    function Item({ id, title, selected, onSelect,url}) {
      return (
        <TouchableOpacity 
          onPress={() => 
            onSelect(id)
          }

          style={[
            styles.item,
            { backgroundColor: selected ? '#1145FD' : '#fff'  },
          ]}
        >
          <Image
          source={{uri:url}}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
    
          <Text style={[styles.title,{color:selected?'#fff':'#1145FD'}]}>{title}</Text>
        </TouchableOpacity>
      );
    }
     
const PersonalInterests = () => {
  const [selected, setSelected] = useState(new Map());
  const [userInterest, setUserInterest] = useState([])
  const[currentPosition, setCurrentPositon] = useState(2)
  const navigation = useNavigation()
  const onSelect = useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      //const personalInterest = selected.get(title)
     // console.log(personalInterest)
      setSelected(newSelected);
    },
    [selected],
    console.log(selected)
    //console.log(DATA.id)
  );

 const saveUserInterest=()=>{
//check if the map is not empty
    if(selected.size!=0){
      for(let keys of selected.keys()){
        console.log("this are the keys of the map",keys)
        let obj = DATA.find(obj=>obj.id==keys)
        const  personalInterest = obj.title
        setUserInterest(personalInterest)
      }
    }
 }



  return (
    <SafeAreaView
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
     <View
     style={[{marginTop:10},{marginBottom:10}]}
     >
      <Text
      style={styles.textInterest}
      > 
      Select themes are you are interested:
      </Text>
     </View>
    </View>  
    <View style={{marginTop:-30}}></View>
       <ScrollView horizontal={true} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
       style={[{marginRight:20}]}
       >
      <FlatList
         data={DATA}
         scrollEnabled={false}
         numColumns={Math.ceil(DATA.length / 2)}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            url = {item.url}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
      </ScrollView>

      <TouchableOpacity  onPress={() =>navigation.replace('UploadProfPictureScreen')}style={[ styles.backButton,{borderColor:'#1145FD'}, {marginBottom:-140},{marginLeft:70},{marginTop:-330},{marginRight:250},{width:160} ]}>
      <Text  style={[{justifyContent: 'flex-end'},styles.backText,]}> Back </Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() =>navigation.replace('SquadCreationScreen')}style={[ styles.button,{borderColor:'#1145FD'}, {marginBottom:80},{marginLeft:230},{marginRight:50},{width:160} ]}>
      <Text  style={[{justifyContent: 'flex-end'},styles.buttonText]}> Next </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    justifyContent:"flex-start",
    marginTop: Constants.statusBarHeight,
  },
  squadLogo:{
    width:100,
    height:35,
    marginRight:250,
    marginTop:70
},

header:{
  height: 55, 
  width:'50%',
  justifyContent:"center",
  alignItems:'center',
  marginRight:200,
  marginTop: 10,
  marginLeft:35
},
headerText:{
  fontSize:22,
  fontWeight:'bold'
},
indicatiorWindow:{
  width:width-20,
  padding:20,
  margin:15,
  borderRadius:20,
  marginTop:-20,
  marginLeft:-8
},
textInterest:{
fontSize:15
},
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal:10,
    height:120,
    width:120,
    borderRadius:3,
    marginRight:-5
  },
  title: {
    fontSize: 12,
    marginTop:5,
    fontWeight:'600'
  },
  itemPhoto: {
    width: 75,
    height: 75,
    alignSelf:'center'
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
  width: 150,
  height: 42,
  padding: 10,
  borderRadius: 5,
  alignItems: 'center', 
  borderColor:'#1145FD'
},
buttonText:{
  color: 'white',
  fontWeight: '700',
  fontSize: 15,
  alignItems:"center",
  width:50 
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
});
 export default PersonalInterests