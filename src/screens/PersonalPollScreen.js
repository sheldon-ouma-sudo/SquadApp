        import { View, Text, KeyboardAvoidingView, StyleSheet, Image, FlatList } from 'react-native'
        import React, { useEffect, useState } from 'react'
        import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
        import { useSafeAreaInsets } from 'react-native-safe-area-context';
        import { pollsByUserID } from '../graphql/queries'
        import { useUserContext } from '../../UserContext'
        import Poll from '../components/PersonalPollPostListItem/index'
        import { API } from 'aws-amplify'
        import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'


          

        const PersonalPollScreen = () => {
        const{user} = useUserContext()
        const[userPolls, setUserPolls] = useState([])


        useEffect(()=>{
          const userID = user.id
          const fetchUserPolls = async (userID) => {
            try {
              const response = await API.graphql({
                query: pollsByUserID, 
                variables: {
                  userID: userID
                },
              });
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
          const formatLikes = (likes) => {
            if (likes < 1000) {
              return likes.toString(); // Return the number as is
            } else if (likes >= 1000 && likes < 1000000) {
              return (likes / 1000).toFixed(1).replace(/\.0$/, '') + 'K'; // Format in thousands
            } else if (likes >= 1000000) {
              return (likes / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'; // Format in millions
            }
            return likes.toString(); // Default case, although it won't be hit due to the previous conditions
          };
          
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