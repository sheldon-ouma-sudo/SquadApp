import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress }) => {
  const [loaderValue, setLoaderValue] = useState(0);

  useEffect(() => {
    Animated.timing(loaderValue, {
      toValue: progress,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  return (
    <View style={styles.progressBar}>
      <Animated.View style={[styles.loader, { width: loaderValue }]} />
    </View>
  );
};


const Poll = () => {
  const [data, setData] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
    { id: 5, text: 'Item 5' },
  ]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<ProgressBar progress={0.5} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    padding: 10,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 4,
    margin: 5,
  },
  progressBar: {
    height: 20,
    backgroundColor: '#ccc',
    borderRadius: 4,
  },
  loader: {
    height: 20,
    backgroundColor: '#000',
    borderRadius: 4,
  },
});

export default Poll;