import { View, Text, 
  StyleSheet,FlatList, 
  SafeAreaView, KeyboardAvoidingView, 
  ActivityIndicator,
  Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import SearchBar from "../components/SearchBar"
import List from "../components/SearchList"
import { API, graphqlOperation, Auth } from "aws-amplify";
import { listUsers } from "../graphql/queries";
import UserListItem from "../components/UserListItem"

const ExploreUserScreen = () => {
  //const [search, setSearch] = useState('');
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  const [users, setUsers] = useState([]);
  

  // // get data from the fake api
  // useEffect(() => {
  //   const getData = async () => {
  //     const apiResponse = await fetch(
  //       "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
  //     );
  //     const data = await apiResponse.json();
  //     setFakeData(data);
  //   };
  //   getData();
  // }, []);

  useEffect(()=>{
    const fetchUsers = async() =>{
      const results = await API.graphql(graphqlOperation(listUsers));
      if(!results.data?.listUsers){
        console.log("Error fetching users")
      }
      console.log("this is the list of the users",results.data.listUsers.items)
        //setUsers(result.data?.listUsers?.items)
        //console.log(result)
       // const newSquad = await API.graphql(graphqlOperation(createSquad, {input:{ adminUser:authUser}}))
        //   if(!newSquad.data?.createSquad){
        //     console.log("Error creating a Squad")
        //   }
        //   console.log("this is the new Squad",newSquad) 
        //  console.log("here is the id of the squad",newSquad.data.createSquad.id)
        //  //return newSquad.id //check to see if this is working 
        //  const squadID = newSquad.data.createSquad.id
      
    }
    
    fetchUsers()
  }, [])

  // const [filteredDataSource, setFilteredDataSource] = useState([]);
  // const [masterDataSource, setMasterDataSource] = useState([]);
  // useEffect(() => {
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       setFilteredDataSource(responseJson);
  //       setMasterDataSource(responseJson);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  // const searchFilterFunction = (text) => {
  //   // Check if searched text is not blank
  //   if (text) {
  //     // Inserted text is not blank
  //     // Filter the masterDataSource
  //     // Update FilteredDataSource
  //     const newData = masterDataSource.filter(function (item) {
  //       const itemData = item.title
  //         ? item.title.toUpperCase()
  //         : ''.toUpperCase();
  //       const textData = text.toUpperCase();
  //       return itemData.indexOf(textData) > -1;
  //     });
  //     setFilteredDataSource(newData);
  //     setSearch(text);
  //   } else {
  //     // Inserted text is blank
  //     // Update FilteredDataSource with masterDataSource
  //     setFilteredDataSource(masterDataSource);
  //     setSearch(text);
  //   }
  // };

  // const ItemView = ({ item }) => {
  //   return (
  //     // Flat List Item
  //     <Text style={styles.itemStyle} onPress={() => getItem(item)}>
  //       {item.id}
  //       {'.'}
  //       {item.title.toUpperCase()}
  //     </Text>
  //   );
  // };

  // const ItemSeparatorView = () => {
  //   return (
  //     // Flat List Item Separator
  //     <View
  //       style={{
  //         height: 0.5,
  //         width: '100%',
  //         backgroundColor: '#C8C8C8',
  //       }}
  //     />
  //   );
  // };

  // const getItem = (item) => {
  //   // Function for click on an item
  //   alert('Id : ' + item.id + ' Title : ' + item.title);
  // };

  return (
    <SafeAreaView
    style={styles.container}>
    <View style={styles.searchBarContainer}>
        <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {/* {!fakeData ? (
        <ActivityIndicator size="large" />
      ) : (
        
          <List
            searchPhrase={searchPhrase}
            data={fakeData}
            setClicked={setClicked}
          />
      )} */}
       <FlatList
       data = {users}
       renderItem={({item})=>(
        <UserListItem/>
       )} 
       
       />





    </View>
     
    </SafeAreaView>
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
searchBarContainer:{
marginTop:10,
marginLeft: 30,
width: 420
},
searchBar:{
  backgroundColor: 'white'
},
itemStyle: {
  padding: 10,
},
})
export default ExploreUserScreen