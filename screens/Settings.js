import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { db, auth } from '../config';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { updateProfile } from "firebase/auth";
import LabeledInput from '../components/LabeledInput';
import Colors from "../constants/Colors";
import Button from "../components/Button";

export default function Settings({ navigation }) {
  const [displayName, setDisplayName] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [rent, setRent] = useState(0);
  const [loan, setLoan] = useState(0);
  const [retirement, setRetirement] = useState(0);

  const currentUserUID = auth.currentUser.uid;
  const docRef = doc(db, "users", currentUserUID);

  useEffect(() => {
    const unsub = onSnapshot(docRef, (docSnap) => {
      if(docSnap.exists()){
        let data = docSnap.data();
        setDisplayName(auth.currentUser.displayName);
        setMonthlyIncome(data.monthlyIncome);
        setRent(data.rent);
        setLoan(data.loan);
        setRetirement(data.retirement);
      }
    })

    return () => unsub();
  }, [])

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={{alignSelf: "center", color: Colors.gray, fontSize: 36, marginBottom: 24, marginTop: 50}}>
          Settings
        </Text>
        <LabeledInput
          label="Display Name"
          text={displayName}
          onChangeText={text => setDisplayName(text)}
          labelStyle={styles.label}
        />
        <LabeledInput
          label="Monthly Income"
          text={monthlyIncome}
          onChangeText={text => setMonthlyIncome(parseInt(text))}
          labelStyle={styles.label}
          keyboardType='numeric'
        />
        <LabeledInput
          label="Rent"
          text={rent}
          onChangeText={text => setRent(parseInt(text))}
          labelStyle={styles.label}
          keyboardType='numeric'
        />
        <LabeledInput
          label="Loans"
          text={loan}
          onChangeText={text => setLoan(parseInt(text))}
          labelStyle={styles.label}
          keyboardType='numeric'
        />
        <LabeledInput
          label="Retirement"
          text={retirement}
          onChangeText={text => setRetirement(parseInt(text))}
          labelStyle={styles.label}
          keyboardType='numeric'
        />
        <Button
          onPress={() => {
            let x = [monthlyIncome, rent, loan, retirement]
            let totals = [monthlyIncome, rent, loan, retirement].reduce((a, b) => parseInt(a) + parseInt(b), 0)
            setDoc(doc(db, "users", auth.currentUser.uid ),{
              monthlyIncome, rent, loan, retirement, totals
            })
            if (displayName) {
              updateProfile(auth.currentUser, { displayName: displayName }).catch(
                (err) => console.log(err)
              );
            }
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