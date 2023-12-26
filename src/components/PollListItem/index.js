import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import {Progress} from 'react-native-progress'

const PollListItem = ({ poll, }) => {
  // const [selectedOption, setSelectedOption] = useState(null);

  // const handleOptionPress = (index) => {
  //   if (selectedOption === null) {
  //     setSelectedOption(index);
  //   }
  // };

  // const calculatePercentage = (votes, totalVotes) => {
  //   return totalVotes === 0 ? 0 : ((votes / totalVotes) * 100).toFixed(2);
  // };
  const renderItem = ({ item }) => {
    const percentage = (item.votes / poll.totalNumOfVotes) * 100;

    return (
      <View style={{ marginVertical: 10 }}>
        <Text>{item.option}</Text>
        <Progress.Bar progress={percentage / 100} width={200} />
        <Text>{`${percentage.toFixed(2)}%`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{poll.pollCaption}</Text>
      {/* {poll.pollItems.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selectedOption === index && styles.selectedOption,
          ]}
          onPress={() => handleOptionPress(index)}
        >
          <Text style={styles.optionText}>{poll.pollItems.pollOption}</Text>
          {selectedOption !== null && (
            <StatusBar
              style={styles.statusBar}
              translucent
              backgroundColor="rgba(0, 0, 0, 0.2)"
              animated
            >
              <Text style={styles.statusBarText}>
                {poll.pollItems.pollOption}: {calculatePercentage(poll.pollItems.votes, poll.totalNumOfVotes)}%
              </Text>
            </StatusBar>
          )}
        </TouchableOpacity>
      ))}
      <Text style={styles.selectedText}>
        {selectedOption !== null && `You selected: ${poll.pollItems[selectedOption].pollOption}`}
      </Text> */}
       <FlatList
        data={poll.pollItems}
        keyExtractor={(item) => item.option}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedOption: {
    backgroundColor: '#3498db', // Change to your selected color
  },
  optionText: {
    fontSize: 16,
  },
  selectedText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusBar: {
    height: 20,
  },
  statusBarText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default PollListItem;
