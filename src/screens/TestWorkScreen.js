import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  SectionList,
} from 'react-native';
import Constants from 'expo-constants';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    url: 'https://media3.giphy.com/media/26xBzfqV1XqKAlRCw/giphy.gif',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    uri: 'https://media3.giphy.com/media/xjIh4zHDjhjji/giphy.gif',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    uri: 'https://media3.giphy.com/media/iBBfBIj1XopJF6WTVI/giphy.gif',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72v2',
    title: 'Fourth Item',
     uri: 'https://media3.giphy.com/media/JGdbbSyi3wM9uBKv8p/giphy.gif',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72v3',
    title: 'Fifth Item',
    uri: 'https://media3.giphy.com/media/cAgGLp84BRh4lZumDt/giphy.gif',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72v4',
    title: 'Sixth Item',
    uri: 'https://media3.giphy.com/media/Swg9cud2W8OKVhz9rt/giphy.gif',

  },

];



function Item({ id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(id)}
      style={[
        styles.item,
        { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const TestWorkScreen =() => {
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
         data={DATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default TestWorkScreen