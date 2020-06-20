import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

function LoginScreen({ navigation }) {
  const [pwdvalue, setValue] = useState("");

  const onSubmit = (value) => {
    if (value === "11") {
      navigation.navigate("List");
    } else {
        console.warn('Invalid password')
    }
  };

  return (
    <>
      <View style={styles.container}>
      <ImageBackground resizeMode='cover' source={require("../assets/bg.jpg")} style={styles.image}>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
        ></Image>
        <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
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
            <Text style={styles.androidButtonText}>Login</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6bb9f0",
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 2,
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    justifyContent: "flex-start",
    top: 230,
    left: 120
  },
  input: {
    height: 40,
    width: 300,
    backgroundColor: "#fff",
    marginBottom: 20,
    color: "#000",
    paddingHorizontal: 20,
    marginTop: 240,
    marginLeft: 30
  },
  androidButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
  },
  buttonContainer: {
    backgroundColor: "#E91E63",
    width: "40%",
    paddingVertical: 10,
    marginLeft: 100
  },
  formContainer: {
    flex: 8,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
});

export default LoginScreen;
