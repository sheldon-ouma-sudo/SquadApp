import { View, Text, KeyboardAvoidingView, StyleSheet, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { pollsByUserID } from '../graphql/queries'
import { useUserContext } from '../../UserContext'
import Poll from '../components/PersonalPollPostListItem/index'
import { API } from 'aws-amplify'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useNavigation, useRoute } from '@react-navigation/native';


const GeneralUserProfilePollTab = ({ userPolls }) => {
  
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
export default GeneralUserProfilePollTab