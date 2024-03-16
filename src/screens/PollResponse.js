import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react'


const PollResponse = () => {
  const[pollResponseData, setPollResponseData] = useState([])
  return (
    <View>
      <Text>PollResponse</Text>
    </View>
  )
}

export default PollResponse