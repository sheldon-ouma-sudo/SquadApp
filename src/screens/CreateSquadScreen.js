import { View, Text, KeyboardAvoidingView, StyleSheet,Image, 
    TextInput, TouchableOpacity, StatusBar, FlatList, Button, ScrollView} from 'react-native'
  import { useState, useEffect, useCallback, useMemo, useRef  } from 'react'
  import {SelectList} from 'react-native-dropdown-select-list'
  import { useNavigation } from '@react-navigation/native';
  import {API,graphqlOperation, Auth} from "aws-amplify"
  import { useUserContext } from '../../UserContext';
  import { listUsers } from '../graphql/queries';
  import { FontAwesome } from '@expo/vector-icons';
  import {BottomSheetModal,BottomSheetView,BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
  import SearchBar from '../components/SearchBar';
  import UserListItem from '../components/UserListItem';
  


const CreateSquadScreen = () => {
  const [selected, setSelected] = useState(null);
  const [squadImage, setSquadImage] = useState("")
  const [squadName, setSquadName] = useState("")
  const [squadBio, SetSquadBio]  = useState("")
  const [privacyOption, setPrivacyOption] = useState(null)
  const [searchPhrase, setSearchPhrase] = useState('');
  const [users, setUsers] = useState([]);
  const{user} = useUserContext();
  const navigation = useNavigation()
  const bottomSheetModalRef = useRef(null);
  
  const SquadPrivacyOptions=[ 
    {key:'1', value:"Public"},
    {key:'2', value:"Private"},
    
]

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const results = await API.graphql(graphqlOperation(listUsers));
        if (!results.data?.listUsers) {
          console.log('Error fetching users');
          return;
        }
        setUsers(results.data?.listUsers?.items);
      } catch (error) {
        console.log('Error getting users', error);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!searchPhrase) return users;
    return users.filter((item) => {
      return item.userName && item.userName.toLowerCase().includes(searchPhrase.toLowerCase());
    });
  }, [searchPhrase, users]);

  const handleSearchBarClick = () => {
    // Handle click event for the search bar here
    console.log('Search bar clicked');
  };


    // variables
    const snapPoints = useMemo(() => ['25%', '50%', '75%', '100'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);

    const handleSheetChanges = useCallback((index) => {
      console.log('handleSheetChanges', index);
    }, []);

  return (
    <BottomSheetModalProvider>
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    > 
     <View style={styles.userImageContainer}>
        <FontAwesome name="group" size={64} color="#1145FD" style={{marginTop:-25}}/>
      </View>
    <View style={styles.pollContentStyles}>
      <Text style={styles.pollContentCaption}>Squad Name</Text> 
    </View>
    <TextInput
        placeholder ="Enter Your Squad Name"
        value={squadName}
        //autoComplete='none'
        autoCapitalize='none'
        onChangeText={text => setSquadName(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the email to that text
        style={styles.squadNameInput}
        />
    <View style={styles.pollContentStyles}>
      <Text style={styles.pollContentCaption}>Squad Bio</Text>
    </View>
    <TextInput
      placeholder ="Type your Squad Bio here..."
      value={squadBio}
      onChangeText={text =>SetSquadBio(text)} // everytime a text changes (in our variable it spits out a text variable which we can then use in our function to change the text variable) we can set the password to that text
      style={styles.input}
      textAlignVertical={"top"}
    ></TextInput>

<TouchableOpacity
   style={styles.buildSquadBox}
   >
    <Text
    style={{marginTop:15, marginLeft:20,fontWeight:'600', color:'#ffff'}}
    >Build Your Squad</Text>

   {/* */}
   </TouchableOpacity>
   {/* when the user clicks this, I want the bottom sheet navigation with a list of users */}
  <TouchableOpacity
  onPress={handlePresentModalPress}
  >
  <FontAwesome name="plus-square"
   style={{marginLeft:250, marginTop:-50}}
   size={54} color='#1764EF' /> 
  </TouchableOpacity>
  
  <View style={styles.pollLabelContainer}>
      <Text style={styles.pollContentLabel}>Privacy</Text>
    </View>

    <TouchableOpacity
     style={{paddingHorizontal:15,marginTop:15,width:350,marginRight:70,marginLeft:30}}>
      <SelectList 
      value={selected}
      data={SquadPrivacyOptions} 
      save="value"
      search={true} 
      />
    </TouchableOpacity>
    <View style={styles.pollButtonContainer}>
        <TouchableOpacity
        style = {styles.button}
            >
            <Text style={styles.buttonText}>
                Create Squad
            </Text>
        </TouchableOpacity>
        </View>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          <BottomSheetView style={styles.contentContainer}>
          <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          setClicked={handleSearchBarClick} // Pass the function to handle search bar click
        />
          <FlatList
           data={filteredUsers} // Assuming users is an array containing user objects
          renderItem={({ item }) => <UserListItem user={item} />}
          keyExtractor={(item) => item.id.toString()} // Assuming each user has a unique ID
        />
          </BottomSheetView>
        </BottomSheetModal>
    </KeyboardAvoidingView>
    </BottomSheetModalProvider>
  )
}
const styles = StyleSheet.create({
    container:{
    flex:1,
    justifyContent:"flex-start",
    alignItems:"center",
    backgroundColor: "#F4F8FB"
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
    userImageContainer:{
      //marginStart:10,
      marginTop:50,
      marginLeft: -10
     },
    userImage:{
      width:100,
      height:120
  },
    squadLogo:{
      width:100,
      height:35,
      marginRight:250,
      marginTop:70
    },
    pollContentStyles:{
      marginRight:250,
      marginTop:10,
      marginBottom:11.5,
      
    },
    buildSquadBox:{
      marginTop:10,
      borderWidth:1,
      width:270,
      height:50,
      borderColor:'#1764EF',
      borderRadius:15,
      backgroundColor:'#1764EF',
      marginLeft:-70,
      marginTop:30,
      //alignItems:'center'
    },
    addSign:{

    },
     pollOptionTextContainer:{
     marginTop:10,
     borderWidth:1,
     borderColor:'black',
     backgroundColor:'#ffff'
     },
    pollLabelContainer:{
      marginRight:270,
      marginTop:0
  
    },
    pollContentText:{
      fontWeight:'700',
      fontSize:18
    },
    pollImagesContainer:{
      marginBottom:10
    },
    pollContentLabel:{
      marginTop:20,
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
      fontSize: 15,
      marginRight:15,
      marginLeft:5,
      color:'black',
      fontWeight:'400'    
  },
  squadNameInput:{
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical:5,
    borderRadius:5,
    width:296,
    height:40,
    marginTop:10,
    fontSize: 15,
    //marginRight:15,
    marginLeft:-50,
// fontStyle:"Montserrat-Regular",
    color:'#535353',
    fontWeight:'400'    
},
  ImageContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    width: "90%",
  },
  pollContentCaption:{
    marginTop:20,
    fontWeight:'700',
    fontSize:18, 
    marginLeft:20

  },
  pollAudience:{
    marginRight:230,
    marginTop:-29
    
  },
  button:{
    backgroundColor: '#1764EF',
    width: 350,
    height: 42,
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
    marginRight: 10,
    marginLeft:15,
  },
  pollButtonContainer:{
    width: 296,
    height:42,
    borderRadius:5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:30,
    marginBottom: 30
    },
    buttonText:{
      color: 'white',
      fontWeight: '600',
      fontSize: 14   
  },
  pollOptionDropdown: {
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
    marginLeft:-20
  },
  pollAudienceDropdown: {
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
    marginLeft:-10,
    marginBottom:20
  
  },
  
  placeholderStyle: {
    fontSize: 16,
    color:'white'
  },
  selectedTextStyle: {
    fontSize: 14,
    color:'black'
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
    //color:'white'
  },
  item: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  
  },
  selectedStyle: {
    flexDirection: 'row',
    backgroundColor: 'white',
   // shadowColor: 'red',
    marginBottom: 10,
    marginRight: 15,
    paddingHorizontal: 12,
     marginLeft:57,
  },
  textSelectedStyle: {
    marginRight: 10,
    fontSize: 16,
  },
  pollOptionInput:{
      backgroundColor: '#EAEAEA',
      paddingHorizontal: 15,
      paddingVertical:5,
      borderRadius:5,
      width:346,
      height:45,
      marginTop:10,
      fontSize: 13,
      marginRight:15,
      marginLeft:20,
  // fontStyle:"Montserrat-Regular",
      color:'#535353',
      fontWeight:'400'  ,
      backgroundColor: '#fff'
  }
  })
export default CreateSquadScreen