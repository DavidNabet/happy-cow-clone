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

export default function LoginScreen({ setToken, navigation }) {
  // token: z5x0EKRQhL6rIVF1KmoEtpaDqUZJYALDYaHBa91WF7TiHK9kYigtPs0DbX6SzDt4\
  // id: 60ae4f5f836ee51fa083322c
  const [coordinate, setCoordinate] = useState();
  const [email, setEmail] = useState("dax@test.com");
  const [password, setPassword] = useState(""); //pass
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState(false);
  useEffect(() => {
    const getPermissionAndLocation = async () => {
      try {
        const result = await Location.hasServicesEnabledAsync();
        if (result.status === "denied") {
          setErrors(false);
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            setErrors(true);
            setErrorMessage(
              "La permission pour accéder à la géolocalisation a échoué\nAller dans vos paramètres, activer la localisation"
            );
          }
          const { coords } = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
          });
          const tabCoordinate = [coords.latitude, coords.longitude];
          // setIsLoading(false);
          setCoordinate(tabCoordinate);
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
      const response = await axios.post(
        "http://http://10.0.2.2:3200/user/login",
        {
          email: email,
          password: password,
          location: coordinate || null,
        }
      );
      console.log("response", response);
      if (response.status === 200) {
        alert("Welcome to HappyCow App !");
        setToken(response.data.token);
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

      console.log(e.message);
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
            {errors && (
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
  wrapper: {},
  form: {},
  input: {},
  sign: {},
  submit: {},
  txt_btn: {},
  errorMessage: {},
});
