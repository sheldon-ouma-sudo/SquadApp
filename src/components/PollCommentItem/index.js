import { View, Text, FlatList } from 'react-native'
import React from 'react'

const PollCommentList = () => {

    const data = [
        {"id": 1, "comment": "This is a great comment."},
        {"id": 2, "comment": "I really enjoyed reading this."},
        {"id": 3, "comment": "Interesting perspective."},
        {"id": 500, "comment": "Awesome conversation!"},
        {'id': 15, 'comment': 'Velit dolore quisquam ut ut tempora porro sed.'}
      ];
    
      const keyExtractor = (item) => item.id.toString();
    
      const renderItem = ({ item }) => (
        <View>
          <Text>{item.comment}</Text>
          {/* Additional comment details go here */}
        </View>
      );
    
      return (
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      );
    };

export default  PollCommentList