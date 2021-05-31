import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { colors, border } from "../assets/js/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
      const response = await axios.post(
        "http://10.0.2.2:3200/user/login",
        // "https://happy-cow-back-project.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
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
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={25}
    >
      <View style={styles.container}>
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
              <Text style={[styles.txt_btn, { color: "white" }]}>
                Connectez-vous
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: colors.grey,
                }}
              >
                Pas de compte ? Inscrivez-vous
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
    width: "80%",
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
