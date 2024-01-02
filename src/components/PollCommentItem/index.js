import { View, Text, FlatList } from 'react-native'
import React from 'react'

const PollCommentList = ({ commentsData }) => {
  const keyExtractor = (item) => item.id.toString();
   
      const renderItem = ({ item }) => (
        <View>
          <Text>{item.comment}</Text>
          {/* Additional comment details go here */}
        </View>
      );
    
      return (
        <FlatList
          data={commentsData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      );
    };
export default  PollCommentList