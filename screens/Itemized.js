import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { db, auth } from '../config';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import Colors from "../constants/Colors";

export default function Itemized({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const currentUserUID = auth.currentUser.uid;
  const docRef = doc(db, "users", currentUserUID);
  const colRef = collection(docRef, 'transactions');

  useEffect(() => {
    const unsub = onSnapshot(colRef, (doc) => {
      doc.forEach(doc => {
        setTransactions(prevArr => [...prevArr, {data: doc.data(), id: doc.id}])
      })
    })

    return () => unsub();
  }, [])

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={{alignSelf: "center", color: Colors.gray, fontSize: 36, marginBottom: 24, marginTop: 50, borderBottom: `1px solid ${Colors.gray}`}}>
          Recent Transactions
        </Text>
        {transactions?.length && transactions.map(transaction => {
          const {amount, category, description, split, timestamp, totalSpent} = transaction.data
          const formattedTime = new Date(timestamp.seconds*1000)
          const date = formattedTime.getDate()
          const month = formattedTime.toLocaleString('default', { month: 'long' })

          return(
            <View key={transaction.id} style={{border: `1px solid ${Colors.gray}`, borderRadius: 10, margin: 10, padding: 10}}>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.gray, alignSelf: "start"}}>{date} {month}</Text>
              <View style={{margin: 5, flexDirection: "row"}}>
                <View style={{flex: 1, borderRight: `1px solid ${Colors.gray}`, margin: 10}}>
                  <Text style={styles.label}>{description}</Text>
                  <Text style={styles.label}>{category}</Text>
                </View>
                <View style={{flex: 1, margin: 10}}>
                  <Text style={styles.label}>Amount: $ {amount}</Text>
                  <Text style={styles.label}>Split: $ {split}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: Colors.gray, alignSelf: "end"}}>Total Spent: $ {totalSpent}</Text>
            </View>
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navyBlue,
    overflowY: 'scroll',
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  label : { fontSize: 16, fontWeight: "bold", color: Colors.gray },
  header : { fontSize: 42, color: Colors.gray, alignSelf: "center" }
})