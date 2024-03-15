        import { View, Text, KeyboardAvoidingView, StyleSheet, Image, FlatList } from 'react-native'
        import React, { useEffect, useState } from 'react'
        import PersonalClosedPollScreen from './PersonalClosedPollScreen'
        import PersonalOpenPOlls from './PersonalOpenPOlls'
        import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
        import { useSafeAreaInsets } from 'react-native-safe-area-context';
        import { pollsByUserID } from '../graphql/queries'
        import { useUserContext } from '../../UserContext'
        import Poll from '../components/PersonalPollPostListItem/index'
        import { API, graphqlOperation } from 'aws-amplify'
        import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'


          

        const PersonalPollScreen = () => {
        const{user} = useUserContext()
        const[userPolls, setUserPolls] = useState([])


        useEffect(()=>{
          const userID = user.id
          const fetchUserPolls = async (userID) => {
            try {
              const response = await API.graphql({
                query: pollsByUserID, // Use the pollsByUserID query
                variables: {
                  userID: userID // Pass the correct user ID here
                  //sortDirection: 'DESC', // You can specify the sort direction if needed
                  //limit: 10, // You can specify the limit of polls to fetch
                  // Add other variables as needed
                },
              });
              
              // Handle response.data as needed
              console.log('User polls:', response.data.pollsByUserID.items);
              setUserPolls(response.data?.pollsByUserID.items)
            } catch (error) {
              console.log('Error fetching user polls', error);
            }
          };
          
        console.log(userID)
        fetchUserPolls(userID)
        }, [])

          const Tab = createMaterialTopTabNavigator();
          const insets = useSafeAreaInsets();
          return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            <BottomSheetModalProvider>
            <FlatList
              data={userPolls}
              renderItem={({ item }) => (
                <Poll poll={item} />
              )}
              keyExtractor={(item) => item.id}
              style={styles.list}
              contentContainerStyle={{ flexGrow: 1 }}
            />
          </BottomSheetModalProvider>
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
        list: {
          padding: 10,
        },
        })
        export default PersonalPollScreen