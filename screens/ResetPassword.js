import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import LabeledInput from '../components/LabeledInput';
import Button from '../components/Button';
import validator from "validator";
import Toast from 'react-native-root-toast';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Colors from "../constants/Colors";

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
      <Image
        style={{width: 250, height: 150, resizeMode: 'contain', alignSelf: "center", marginTop: 50 }}
        source={require('../assets/login-banner.png')}
      />
      <View style={{flex: 1}}>
        <Text style={{alignSelf: "center", color: Colors.gray, fontSize: 18, marginBottom: 24}}>
          Password Reset
        </Text>
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
          <Text style={{alignSelf: "center", color: Colors.gray, fontSize: 16, margin: 4}}>
            Go back to Login
          </Text>
        </TouchableOpacity>
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
          text={"Send Email"}
          buttonStyle={{marginTop: 50}}
        />
      </View>
    </View>
  )
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