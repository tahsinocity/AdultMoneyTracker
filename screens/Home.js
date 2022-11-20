import { View, Text, Button } from 'react-native'
import React from 'react'
import { getAuth, signOut } from "firebase/auth";

const Home = ({ navigation }) => {
  const auth = getAuth()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome backkk!</Text>
      <Text>You have:</Text>
      <Text>$ 600</Text>
      <Text>Left for November</Text>
      <Button title="Enter New Transactions" onPress={() => navigation.navigate('Transactions')} />
      <Button title="Sign out" onPress={() => signOut(auth)} />
    </View>
  )
}

export default Home