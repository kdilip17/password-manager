import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/reducer";
import { TouchableHighlightComponent } from "react-native";

function ModalScreen({ navigation }) {
  const [value, setValue] = useState("");
  const [passwrd, setMessage] = useState("");

  const dispatch = useDispatch();

  const onSaveNote = (value, passwrd) => {
    let data = {
      item: value,
      password: passwrd,
    };

    dispatch(addItem(data));
    navigation.navigate("List");
  };

  return (
    <View style={styles.container}>
       <View style={styles.closeButtonContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="ios-close" color="#fff" size={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Account Name</Text>
          <TextInput
            style={styles.input}
            numberOfLines={1}
            onChangeText={(value) => setValue(value)}
            value={value}
            clearButtonMode="while-editing"
          />
          <Text style={{ color: "#444", fontSize: 20 }}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            numberOfLines={1}
            onChangeText={(value) => setMessage(value)}
            value={passwrd}
            clearButtonMode="while-editing"
          />
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => onSaveNote(value, passwrd)}
          >
            <Ionicons
              name="ios-arrow-dropright-circle"
              size={40}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "50%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ECEFF1",
    padding:20
  },
  closeButtonContainer: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    zIndex: 1
  },
  closeButton: {
    backgroundColor: "#455A64",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    height: 50,
    width: 300,
    padding: 10,
    borderColor: "#37474F",
    borderWidth: 1,
    margin: 15,
    height: 40,
    borderRadius: 5,
 },
 saveBtn:
 {
  marginTop: 10,
  backgroundColor: "#455A64",
  width: 50,
  height: 50,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 5,
 },
 title : { 
  color: "#263238",
  fontSize: 20,
  fontWeight: "400"
 }
});

export default ModalScreen;
