import React from 'react';
import { Button, View, StyleSheet, TextInput } from 'react-native';
import { Formik } from 'formik';

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{displayName: '',monthlyIncome: 0, rent: 0, loan: 0, retirement: 0}}
        onSubmit={({ displayName, monthlyIncome, rent, loan, retirement }) => {
          let x = [monthlyIncome, rent, loan, retirement].reduce((a, b) => parseInt(a) + parseInt(b), 0)
          navigation.navigate('Home', {
            totals: x
          })
        }}
      >
        {(props) => (
          <View>
            <TextInput
              placeholder='Display Name'
              onChangeText={props.handleChange('displayName')}
              value={props.displayName}
            />

            <TextInput
              placeholder='Monthly Income'
              onChangeText={props.handleChange('monthlyIncome')}
              value={props.monthlyIncome}
            />

            <TextInput
              placeholder='Rent'
              onChangeText={props.handleChange('rent')}
              value={props.rent}
            />

            <TextInput
              placeholder='Loan'
              onChangeText={props.handleChange('loan')}
              value={props.loan}
            />

            <TextInput
              placeholder='Retirement Contribution'
              onChangeText={props.handleChange('retirement')}
              value={props.retirement}
            />

            <Button title="Save" color="maroon" onPress={props.handleSubmit}/>
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