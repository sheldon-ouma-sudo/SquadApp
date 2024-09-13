import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // If you want to use icons
import { useNavigation } from '@react-navigation/native';

const PollResponseListItem = ({ item, removeResponseFromList }) => {
  const navigation = useNavigation();

  const handleViewResponse = () => {
    // You can navigate to a detailed view of the poll response if needed
    console.log("Viewing poll response", item);
    // Example navigation to a poll response details screen
    // navigation.navigate('PollResponseDetails', { pollResponseID: item.id });
  };

  const handleRemoveResponse = () => {
    // Remove the poll response from the list
    removeResponseFromList(item.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.responseContent}>
        {/* Display poll response caption */}
        <Text style={styles.caption}>{item.caption}</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={handleViewResponse}>
          <FontAwesome name="eye" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRemoveResponse} style={styles.removeButton}>
          <FontAwesome name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  responseContent: {
    flex: 1,
  },
  caption: {
    fontSize: 16,
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    marginLeft: 15,
  },
});

export default PollResponseListItem;
