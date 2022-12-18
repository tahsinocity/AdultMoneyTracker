import { View, Text, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react';
import { db, auth } from '../config';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import Colors from "../constants/Colors";

const arr = [
  { id: "03F03BBE", name: "Jim", age: 22 },
  { id: "D37DEF7F1E7E", name: "Julie", age: 42 },
  { id: "8D61", name: "Don", age: 7 }
];

export default function History(){
  const [openId, setOpenId] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [formattedTransaction, setFormattedTransaction] = useState([])
  const currentUserUID = auth.currentUser.uid;
  const docRef = doc(db, "users", currentUserUID);
  const colRef = collection(docRef, 'transactions');

  useEffect(() => {
    const unsub = onSnapshot(colRef, (doc) => {
      doc.forEach(doc => {
        setTransactions(prevArr => [...prevArr, {data: doc.data(), id: doc.id, timestamp: doc.data().timestamp?.seconds}])
      })
    })

    return () => unsub();
  }, [])

  const toggleDetails = (thingId) => {
    setOpenId(thingId);
  };

  let obj = {}

  if (transactions.length !== 0) {
    transactions.map((key) => {
      const timestamp = key.timestamp
      const formattedTime = new Date(timestamp*1000)
      const monthYear = formattedTime.toLocaleString('default', { month: 'long', year: 'numeric' })
      const totalSpent = key.data.totalSpent
      const description = key.data.description

      if(!obj[monthYear]) {
        obj[monthYear] = [{description, totalSpent}]
      }

      obj[monthYear].push({description, totalSpent})

      return obj
    })
  }

  return (
    <View style={styles.container}>
      <ul>
        {Object.keys(obj).map((key, index) => {
          return (
            <details key={index} open={openId === doc.id} onClick={() => toggleDetails(doc.id)} style={styles.label}>
              <summary>{key}</summary>
              <ul>
                {obj[key].map(((key, index) => <li key={index}>{key.description}: {key.totalSpent}</li>))}
              </ul>
              <p>Total for month: ${obj[key].reduce((a, b) => parseFloat(a.toFixed(2)) + parseFloat(b.totalSpent.toFixed(2)), 0)}</p>
            </details>
        )})}
      </ul>
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
  label : { fontSize: 16, fontWeight: "bold", color: Colors.gray},
  header : { fontSize: 42, color: Colors.gray, alignSelf: "center" }
})

