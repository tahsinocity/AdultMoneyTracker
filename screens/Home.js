import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db, auth } from '../config';
import { doc, onSnapshot } from 'firebase/firestore';
import { signOut } from "firebase/auth";
import Colors from "../constants/Colors";
import Button from "../components/Button";

export default function Home ({ route, navigation }) {
  const [totalLeft, setTotalLeft] = useState(0)
  const currentUserDisplayName = auth.currentUser?.displayName;
  const currentUserUID = auth.currentUser.uid;
  const docRef = doc(db, "users", currentUserUID);

  useEffect(() => {
    const unsub = onSnapshot(docRef, (docSnap) => {
      if(docSnap.exists()){
        let data = docSnap.data();
        setTotalLeft(data.totals)
      }
    })

    return () => unsub();
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome back {currentUserDisplayName}!</Text>
      <Text style={styles.text}>You have:</Text>
      <Text style={styles.text}>$ {totalLeft}</Text>
      <Text style={styles.text}>Left for November</Text>
      <Button text="Enter New Transactions" onPress={() => navigation.navigate('Transactions')} />
      <Button text="Sign out" onPress={() => signOut(auth)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navyBlue,
    justifyContent: "center",
    alignItems: "stretch"
  },
  label : { fontSize: 16, fontWeight: "bold", color: Colors.gray },
  header : { fontSize: 42, color: Colors.gray, alignSelf: "center" },
  text : {alignSelf: "center", color: Colors.gray, fontSize: 36}
})