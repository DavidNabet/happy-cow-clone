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

export default function SignupScreen({ setTokenAndId, navigation }) {
  // const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://10.0.2.2:3200/user/signup", {
        email: email,
        username: username,
        password: password,
      });

      console.log("response", response);
      if (response.data) {
        if (response.status === 200) {
          // setErrorMessage("");
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
      }
    } catch (e) {
      console.log("e.response", e.response);
      // if (e.response.status === 400) {
      //   setErrorMessage("Remplissez tous les champs");
      // }
      if (password !== confirmPassword) {
        setErrorMessage("Le mot de passe doit être identique");
      }
      console.log("signup ", e.message);
    }
  };

  return (
    <>
      <View style={styles.constainer}>
        <View style={styles.wrapper}>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="adresse mail"
              keyboardType="email-address"
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
            <TextInput
              style={styles.input}
              placeholder="nom d'utilisateur"
              value={username}
              onChangeText={(username) => setUsername(username)}
            />
            <TextInput
              style={styles.input}
              placeholder="mot de passe"
              value={password}
              onChangeText={(password) => setPassword(password)}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              placeholder="confirmer votre mot de passe"
              value={confirmPassword}
              onChangeText={(confirmPassword) =>
                setConfirmPassword(confirmPassword)
              }
              secureTextEntry={true}
            />
          </View>
          <View style={styles.sign}>
            {<Text>{errorMessage}</Text> && (
              <Text style={{ color: colors.vegOptions, fontSize: 12 }}>
                {errorMessage}
              </Text>
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.submit}
              onPress={handleSubmit}
            >
              <Text style={styles.txt_btn}>S'inscrire</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={{ fontSize: 12, color: colors.grey }}>
                Vous avez un compte ? Connectez-vous
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: "white",
  },
  wrapper: {},
  form: {},
  input: {},
  sign: {},
  submit: {},
  txt_btn: {},
  errorMessage: {},
});
