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
import * as Location from "expo-location";

export default function SignupScreen({ setToken, navigation }) {
  // const [isLoading, setIsLoading] = useState(true);
  const [coordinate, setCoordinate] = useState();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorMessageLocation, setErrorMessageLocation] = useState("");
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    const getPermissionAndLocation = async () => {
      try {
        setErrors(false);
        const result = await Location.hasServicesEnabledAsync();
        if (result.status === "granted") {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setErrors(true);
            setErrorMessageLocation(
              "La permission pour accéder à la géolocalisation a échoué\nAller dans vos paramètres, activer la localisation"
            );
          }
          const { coords } = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
          });
          const tabCoordinate = [coords.latitude, coords.longitude];
          // setIsLoading(false);
          setCoordinate(tabCoordinate);
          // console.log(coordinate);
        }
      } catch (err) {
        alert("An error has occured");
        console.log("ERREUR MESSAGE ", err.message);
      }
    };

    getPermissionAndLocation();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://10.0.2.2:3200/user/signup", {
        email: email,
        username: username,
        password: password,
        location: coordinate,
      });

      console.log("response", response);
      if (response.data) {
        if (response.status === 200) {
          // setErrorMessage("");
          setToken(response.data.token);
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
      console.log("e.message", e.message);
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
            {errors ||
              (<Text>{errorMessage}</Text> && (
                <Text style={{ color: colors.vegOptions, fontSize: 12 }}>
                  {errorMessageLocation || errorMessage}
                </Text>
              ))}
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
