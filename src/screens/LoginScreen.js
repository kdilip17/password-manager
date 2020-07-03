import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { showToast } from "../utils/utils";

function LoginScreen({ navigation }) {
  const stateData = useSelector((state) => state);

  const [pwdvalue, setValue] = useState("");

  const onSubmit = (value) => {
    if(stateData.isFirstTime){
      navigation.navigate("Password");
    }else if (value === stateData.loginPwd) {
      navigation.navigate("List");
    } else {
      showToast("Invalid Password");
    }
  };

  return (
      <View style={styles.container}>
          <Image resizeMode='cover' source={require("../assets/bg.jpg")} style={styles.bgImage}></Image>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/logo.png")}
            ></Image>
          </View>
          <KeyboardAvoidingView behavior="padding">
            <TextInput
              placeholder="Password"
              secureTextEntry
              returnKeyType="next"
              keyboardType="number-pad"
              onChangeText={(value) => setValue(value)}
              value={pwdvalue}
              style={styles.input}
            ></TextInput>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => {
                onSubmit(pwdvalue);
              }}
            >
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6bb9f0",
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom:20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: "#fff",
    marginBottom: 20,
    color: "#000",
    paddingHorizontal: 20,
    borderRadius:5,
  },
  loginText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
  buttonContainer: {
    backgroundColor: "#455A64",
    paddingVertical: 10,
    borderRadius:30,
  },
  bgImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity:0.5
  },
});

export default LoginScreen;
