import { View, Text, 
   StyleSheet,FlatList, 
   SafeAreaView, KeyboardAvoidingView, 
   ActivityIndicator,
   Image } from 'react-native'
import React, { useState, useEffect } from 'react';
import SearchBar from "../components/SearchBar"
import List from "../components/SearchList"
import { listPolls } from '../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import Poll from "../components/PollListItem";
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const ExplorePollScreen = () => {
  //const [search, setSearch] = useState('');
  const [searchPhrase, setSearchPhrase] = useState("");
  const [polls, setPolls] = useState([])
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  

  // get data from the fake api
  useEffect(() => {
    const getData = async () => {
      try {
        const results = await API.graphql(graphqlOperation(listPolls));
        if(!results.data?.listPolls){
          console.log("Error fetching users") 
        }
        console.log("this is the list of the Polls",results.data.listPolls.items)
          setPolls(results.data?.listPolls?.items)
      } catch (error) {
        console.log(error)
      }
    };
    getData();
  }, []);

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
      {!polls ? (
        <ActivityIndicator size="large" />
      ) : (
        <BottomSheetModalProvider>
        <FlatList
          data={polls}
          renderItem={({ item }) => (
            <Poll poll={item} />
          )}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      </BottomSheetModalProvider>
      )}
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
  //padding: 10,
},
})

export default ExplorePollScreen