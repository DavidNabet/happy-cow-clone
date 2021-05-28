import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { colors, border } from "../assets/js/colors";
// import * as Location from "expo-location";

export default function LoginScreen({ setTokenAndId, navigation }) {
  // token:
  // id:
  // const [coordinate, setCoordinate] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [errors, setErrors] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://10.0.2.2:3200/user/login", {
        email: email,
        password: password,
      });
      console.log("response", response);
      if (response.status === 200) {
        alert("Welcome to HappyCow App !");
        let setResponse = JSON.stringify({
          token: response.data.token,
          id: response.data._id,
        });
        setTokenAndId(setResponse);
        navigation.navigate("Tab", {
          screen: "Restaurants",
        });
      }
    } catch (e) {
      console.log(e.response);
      if (e.response.status === 401) {
        setErrorMessage("L'email ou le mot de passe sont incorrects");
      }

      if (e.response.status === 400) {
        setErrorMessage("Remplissez tous les champs !");
      }

      console.log("login ", e.message);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="adresse mail"
              onChangeText={(email) => setEmail(email)}
              value={email}
              autoCompleteType="email"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="mot de passe"
              onChangeText={(password) => setPassword(password)}
              value={password}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.sign}>
            {<Text>{errorMessage}</Text> && (
              <Text style={{ color: colors.errorMessage, fontSize: 12 }}>
                {errorMessage}
              </Text>
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.submit}
              onPress={handleSubmit}
            >
              <Text style={styles.txt_btn}>Connectez-vous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text>Pas de compte ? Inscrivez-vous</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {},
  input: {},
  sign: {},
  submit: {
    marginBottom: 20,
    textAlign: "center",
  },
  txt_btn: {},
  errorMessage: {},
});
