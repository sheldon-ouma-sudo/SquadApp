import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, FlatList } from 'react-native';
import Animated, { EasingNode } from 'react-native-reanimated';

const { Value, timing } = Animated;

const PollListItem = ({ poll, }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [animationValue, setAnimationValue] = useState(new Value(0));
  
  const handleOptionPress = (index) => {
    setSelectedOption(index);

    try {
      const pollItem = JSON.parse(poll.pollItems[index]);
      console.log("pollItem is as follows: ", pollItem)
      if (pollItem.votes !== undefined && poll.totalNumOfVotes !== undefined) {
        const percentage = poll.totalNumOfVotes > 0 ? pollItem.votes / poll.totalNumOfVotes : 0;
        animateVotePercentage(percentage);
        console.log("the perecentage is as follows: ", percentage)
      } else {
        console.log('Error: Votes data is undefined.');
      }
    } catch (error) {
      console.log('Error parsing poll item:', error);
    }
  };
  
  const animateVotePercentage = (percentage) => {
    timing(animationValue, {
      toValue: percentage,
      duration: 600,
      easing: EasingNode.inOut(EasingNode.ease),
    }).start();
  };

  const renderOption = ({ item, index }) => {
    const isSelected = selectedOption === index;
     //console.log(item);
     const pollItem = JSON.parse(item);
    const percentage = selectedOption === index ? 100 : animationValue;
    const votes = pollItem.votes;
    const optionText = pollItem.text;

    return (
      <><Text style={styles.optionText}>{optionText}</Text>
      <TouchableOpacity
        style={[styles.optionContainer, isSelected && styles.selectedOption]}
        onPress={() => handleOptionPress(index)}
      >
        <Animated.View
          style={[styles.percentageBar, {
            width: animationValue.interpolate({
              inputRange: [0, 0.3],
              outputRange: ['0%', '100%'],
            })
          }]} />
        <Text style={styles.percentageText}>
          {selectedOption === index ? 'Voted!' : `${((votes / poll.totalNumOfVotes) * 100).toFixed(2)}%`}
        </Text>
      </TouchableOpacity></>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{poll.pollCaption}</Text>
        <FlatList
        data={poll.pollItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderOption}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#D8E8F3",
    marginTop:20,
    borderWidth: 5,
    borderRadius: 29,
    marginVertical:135
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionContainer: {
    marginBottom: 16,
    padding: 10,
    //borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 28,
    backgroundColor:'#ffff'
  },
  selectedOption: {
   backgroundColor: '#add8e6', // Light blue for selected option
  },
  optionText: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight:'700',
    marginLeft:75,
  },
  percentageBar: {
    height: 60,
    backgroundColor: '#1764EF', // Medium aquamarine for the percentage bar
    borderRadius: 29,
    marginBottom: 4,
    marginLeft:-10,
    marginTop:-8

  },
  percentageText: {
    fontSize: 16,
    color: '#ffff',
    fontWeight:'600',
    marginTop: -35
  },
});

export default PollListItem;
