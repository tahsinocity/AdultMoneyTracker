import { StyleSheet, View, Text, TextInput } from "react-native";
import Colors from "../constants/Colors";


export default function LabeledInput({ labelStyle, label, errorMessage, inputStyle, text, onChangeText, ...inputProps }) {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={labelStyle}>{label}</Text>
        <Text style={styles.error}>{errorMessage && `*${errorMessage}`}</Text>
      </View>
      <TextInput
        underlineColorAndroid="transparent"
        selectionColor="transparent"
        style={[styles.input, {outline:"none"}, inputStyle]}
        value={text}
        onChangeText={onChangeText}
        {...inputProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    marginBottom: 32,
    margin: 4,
    fontFamily: 'Poppins-Regular'
  },
  labelContainer: { flexDirection: "row", marginBottom: 4 },
  error: {
    color: "red",
    fontSize: 12,
    marginLeft: 4
  },
  input: {
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    paddingLeft: 4,
    height: 32,
    fontSize: 24,
    color: Colors.gray
  }
})