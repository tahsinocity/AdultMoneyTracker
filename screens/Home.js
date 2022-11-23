import { View, Text, Button } from 'react-native'
import React from 'react'
import { auth } from "../config";
import { signOut } from "firebase/auth";

const Home = ({ route, navigation }) => {
  const currentUserDisplayName = auth.currentUser?.displayName;
  const totalLeft = route.params?.totals
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome back {currentUserDisplayName}!</Text>
      <Text>You have:</Text>
      <Text>$ {totalLeft}</Text>
      <Text>Left for November</Text>
      <Button title="Enter New Transactions" onPress={() => navigation.navigate('Transactions')} />
      <Button title="Sign out" onPress={() => signOut(auth)} />
    </View>
  )
}

export default Home