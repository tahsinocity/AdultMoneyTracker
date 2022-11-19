import { View, Text, Button } from 'react-native'
import React from 'react'

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome back!</Text>
      <Text>You have:</Text>
      <Text>$ 600</Text>
      <Text>Left for November</Text>
      <Button title="Enter New Transactions" onPress={() => navigation.navigate('Transactions')} />
    </View>
  )
}

export default Home