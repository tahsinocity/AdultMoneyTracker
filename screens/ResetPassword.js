import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LabeledInput from '../components/LabeledInput';
import Button from '../components/Button';
import validator from "validator";
import Toast from 'react-native-root-toast';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const validateFields = (email) => {
  const isValid = {
    email: validator.isEmail(email)
  }

  return isValid
}

export default function ResetPassword ({ navigation }){
  const [resetPassword, setResetPassword] = useState(false);
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: ""

  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adult Money Tracker</Text>
      <Text style={{alignSelf: "center", color: "blue", fontSize: 16, margin: 4}}>
        Password Reset
      </Text>
      <View style={{flex: 1}}>
        <LabeledInput
          label="Email"
          text={emailField.text}
          onChangeText={(text) => {
            setEmailField({text})
          }}
          errorMessage={emailField.errorMessage}
          labelStyle={styles.label}
        />
        <TouchableOpacity
          onPress={() => {
            setResetPassword(!resetPassword)
            navigation.navigate("Login")
          }}
        >
          <Text style={{alignSelf: "center", color: "blue", fontSize: 16, margin: 4}}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        onPress={() => {
          const isValid = validateFields(emailField.text);

          if (!isValid.email) {
            emailField.errorMessage = "Please enter a valid email"
            setEmailField({...emailField})
          }else{
            const auth = getAuth();
            sendPasswordResetEmail(auth, emailField.text)
              .then(() => {
                navigation.navigate("Login")
                Toast.show('Email Sent successfully', {
                  duration: Toast.durations.LONG,
                  position: 0})
              })
              .catch(() => {
                emailField.errorMessage = "Email does not exist"
                setEmailField({...emailField})
              })
          }
        }}
        buttonStyle={{backgroundColor: "blue"}}
        text={"Send Email"}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  label : { fontSize: 16, fontWeight: "bold", color: "black" },
  header : { fontSize: 42, color: "blue", alignSelf: "center" }
})