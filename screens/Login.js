import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Toast from 'react-native-root-toast';
import LabeledInput from '../components/LabeledInput';
import Button from '../components/Button';
import validator from "validator";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const validateFields = (email, password) => {
  const isValid = {
    email: validator.isEmail(email),
    password: validator.isStrongPassword(password, {
      minLength: 8,
      misLowercase: 1,
      minUppercase: 1,
      minNumber: 1,
      minSymbols: 1
    })
  }

  return isValid
}

const createAccount = (email, password) => {
  const auth = getAuth();
  const db = getFirestore();

  createUserWithEmailAndPassword(auth, email, password)
    .then(({user}) => {
      setDoc(doc(db, "users", user.uid ),{})
      Toast.show('New User Created!', {
      duration: Toast.durations.LONG,
      position: 0})
    })
    .catch(() => Toast.show('User Already Registered!', {
      duration: Toast.durations.LONG,
      position: 0}))
}

const login = (email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      console.log("Signing in...")
    })
    .catch((err) => {
      if (err.code === "auth/wrong-password") {
        Toast.show('Wrong Password!', {
          duration: Toast.durations.LONG,
          position: 0})
      }
      if (err.code === "auth/user-not-found") {
        Toast.show('User Not Found', {
          duration: Toast.durations.LONG,
          position: 0})
      }
    })
}

export default function Login ({ route, navigation }){
  const [isCreateMode, setCreateMode] = useState(false);
  const [emailField, setEmailField] = useState({
    text: "",
    errorMessage: ""

  });
  const [passwordField, setPasswordField] = useState({
    text: "",
    errorMessage: ""
  });
  const [passwordReentryField, setPasswordReentryField] = useState({
    text: "",
    errorMessage: ""
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Adult Money Tracker</Text>
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
        <LabeledInput
          label="Password"
          text={passwordField.text}
          onChangeText={(text) => {
            setPasswordField({text})
          }}
          errorMessage={passwordField.errorMessage}
          labelStyle={styles.label}
          secureTextEntry={true}
        />
        {isCreateMode && <LabeledInput
          label="Re-enter Password"
          text={passwordReentryField.text}
          onChangeText={(text) => {
            setPasswordReentryField({text})
          }}
          errorMessage={passwordReentryField.errorMessage}
          labelStyle={styles.label}
          secureTextEntry={true}
        />}
        <TouchableOpacity
          onPress={() => {
            setCreateMode(!isCreateMode)
          }}
        >
          <Text style={{alignSelf: "center", color: "blue", fontSize: 16, margin: 4}}>
            {isCreateMode ? "Already have an account?" : "Create Account"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ResetPassword")
          }}
        >
          <Text style={{alignSelf: "center", color: "blue", fontSize: 16, margin: 4}}>
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        onPress={() => {
          const isValid = validateFields(emailField.text, passwordField.text);
          let isAllValid = true;

          if (!isValid.email) {
            emailField.errorMessage = "Please enter a valid email"
            setEmailField({...emailField})
            isAllValid = false;
          }

          if(!isValid.password) {
            passwordField.errorMessage = "Password must be at least 8 long with numbers, uppercase, lowercase and symbols."
            setPasswordField({...passwordField})
            isAllValid = false
          }

          if(isCreateMode && passwordReentryField.text !== passwordField.text) {
            passwordReentryField.errorMessage = "Passwords do not match"
            setPasswordReentryField({...passwordReentryField})
            isAllValid = false
          }

          if(isAllValid) {
            isCreateMode ? createAccount(emailField.text, passwordField.text) : login(emailField.text, passwordField.text);
          }
        }}
        buttonStyle={{backgroundColor: "blue"}}
        text={isCreateMode ? "Create Account" : "Login"}
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