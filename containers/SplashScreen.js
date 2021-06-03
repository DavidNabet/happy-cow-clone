import React from "react";
import { Image } from "react-native";

const SplashScreen = () => {
  return (
    <Image source={require("../assets/splash.png")} resizeMode="contain" />
  );
};

export default SplashScreen;
