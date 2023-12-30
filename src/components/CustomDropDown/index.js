import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';


const CustomDropdown = ({ data, onSelect }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
  
    const handleToggleOptions = () => {
      setShowOptions(!showOptions);
    };
  
    const handleSelectItem = (item) => {
      setSelectedItem(item);
      onSelect(item);
      setShowOptions(false);
    };
  
  return (
    <View>
    <TouchableOpacity onPress={handleToggleOptions}>
      <Text>{selectedItem ? selectedItem.label : 'Select an option'}</Text>
    </TouchableOpacity>
    {showOptions && (
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectItem(item)}>
            <Text>{item.label}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.key}
      />
    )}
  </View>
  )
}

export default CustomDropdown