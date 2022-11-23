import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

export default function Button({buttonStyle, textStyle, onPress, text}) {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    borderRadius: 25,
    backgroundColor: Colors.gray,
    height: 48,
    margin: 16,
    justifyContent: "center",
    alignItems: "center"
  },
  text: { color: Colors.darkBlue, fontSize: 24, fontWeight: "bold" }
})