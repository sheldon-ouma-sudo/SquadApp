import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet';

const PollCommentList = ({ isVisible, onClose }) => {
  const commentsData = [
    { id: 1, comment: 'This is a great comment.' },
    { id: 2, comment: 'I really enjoyed reading this.' },
    // Add more comments as needed
  ];

  return (
    <BottomSheetModal
      index={0}
      snapPoints={['0%', '60%']}
      onChange={(index) => console.log('Modal visibility changed:', index)}
      presentationStyle="overFullScreen"
      isVisible={isVisible}
      onRequestClose={onClose}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
    >
      <BottomSheetFlatList
        data={commentsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text>{item.comment}</Text>
          </View>
        )}
      />
    </BottomSheetModal>
  );
    };
export default  PollCommentList