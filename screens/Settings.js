import React from 'react';
import { Button, View, StyleSheet, TextInput } from 'react-native';
import { Formik } from 'formik';

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{monthlyIncome: '', rent: '', loan: '', retirement: ''}}
        onSubmit={() => {
          navigation.navigate('Home')
        }}
      >
        {(props) => (
          <View>
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