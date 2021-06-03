import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { colors } from "../assets/js/utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignupScreen({ setTokenAndId, navigation }) {
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
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={25}
    >
      <View style={styles.constainer}>
        <View style={styles.wrapper}>
          <View style={styles.logo}>
            <Image
              source={require("../assets/png/logo-happy-cow.png")}
              style={{ width: 200, height: 200 }}
              resizeMode="cover"
            />
          </View>
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
              <Text style={[styles.txt_btn, { color: "white" }]}>
                S'inscrire
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: colors.grey,
                }}
                numberOfLines={1}
              >
                Vous avez un compte ? Connectez-vous
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  wrapper: {
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 1,
  },
  logo: {
    alignItems: "center",
  },
  form: {
    width: "100%",
    paddingHorizontal: 15,
  },
  input: {
    marginVertical: 15,
    borderBottomColor: colors.red,
    borderStyle: "solid",
    borderBottomWidth: 1,
    lineHeight: 22,
  },
  sign: {
    flexDirection: "column",
    alignItems: "center",
    width: "60%",
  },
  submit: {
    width: "90%",
    paddingVertical: 10,
    marginVertical: 15,
    backgroundColor: colors.purpleContainer,
    borderColor: colors.purpleContainer,
    borderWidth: 2,
    borderRadius: 30,
  },
  txt_btn: {
    fontSize: 16,
    textAlign: "center",
    color: colors.purpleContainer,
    fontWeight: "bold",
  },
  errorMessage: {
    color: colors.vegOptions,
    fontSize: 14,
  },
});
