import React, { useState } from 'react';
import { Button, View, StyleSheet, Text, TextInput } from 'react-native';
import { Formik } from 'formik';

export default function Transactions({ navigation }) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date();
  const [remainingAmount, setRemainingAmount] = useState(600)

  return (
    <View style={styles.container}>
      <Text>{months[date.getMonth()] + ' ' + date.getFullYear()}</Text>

      <Formik
        initialValues={{description: '', amount: '', split: '', category: ''}}
        onSubmit={(values) => {
          const transaction = values.amount - values.split;
          setRemainingAmount(remainingAmount - transaction)
          navigation.navigate('Home')
        }}
      >
        {(props) => (
          <View>
            <TextInput
              placeholder='Description'
              onChangeText={props.handleChange('description')}
              value={props.description}
            />

            <TextInput
              placeholder='Amount'
              onChangeText={props.handleChange('amount')}
              value={props.amount}
            />

            <TextInput
              placeholder='Split?'
              onChangeText={props.handleChange('split')}
              value={props.split}
            />

            <TextInput
              placeholder='Category'
              onChangeText={props.handleChange('category')}
              value={props.category}
            />

            <Button title="Submit" color="maroon" onPress={props.handleSubmit}/>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})