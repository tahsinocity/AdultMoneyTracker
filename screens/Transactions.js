import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { db, auth } from '../config';
import { doc, addDoc, collection, increment, updateDoc, serverTimestamp } from 'firebase/firestore';
import LabeledInput from '../components/LabeledInput';
import Colors from "../constants/Colors";
import Button from "../components/Button";

export default function Transactions({ navigation }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [split, setSplit] = useState(0);
  const [category, setCategory] = useState('');

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={{alignSelf: "center", color: Colors.gray, fontSize: 24, marginBottom: 24, marginTop: 50}}>
          How much did you spend today?
        </Text>
        <LabeledInput
          label="Description"
          text={description}
          onChangeText={text => setDescription(text)}
          labelStyle={styles.label}
        />
        <LabeledInput
          label="Amount"
          text={amount}
          onChangeText={text => setAmount(parseInt(text))}
          labelStyle={styles.label}
          keyboardType='numeric'
        />
        <LabeledInput
          label="Split?"
          text={split}
          onChangeText={text => setSplit(parseInt(text))}
          labelStyle={styles.label}
          keyboardType='numeric'
        />
        <LabeledInput
          label="Category"
          text={category}
          onChangeText={text => setCategory(text)}
          labelStyle={styles.label}
        />

        <Button
          onPress={async () => {
            let totalSpent = amount - split;
            const dbRef = doc(db, "users", auth.currentUser.uid);
            const colRef = collection(dbRef, 'transactions');
            await updateDoc(dbRef, {
              totals: increment(-totalSpent)
            })
            await addDoc(colRef, {
              description,
              amount,
              split,
              category,
              totalSpent,
              timestamp: serverTimestamp()
            })
            navigation.navigate('Home')
          }}
          text={"Save"}
          buttonStyle={{marginTop: 50}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navyBlue,
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  label : { fontSize: 16, fontWeight: "bold", color: Colors.gray },
  header : { fontSize: 42, color: Colors.gray, alignSelf: "center" }
})