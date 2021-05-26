import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, border } from "../assets/js/colors";
import SvgUri from "react-native-svg-uri";
// import Vegan from "../assets/icon/vegan.svg";
// import Vegetarian from "../assets/icon/vegetarian.svg";
// import VegOptions from "../assets/icon/veg-options.svg";

export default function Filters({}) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.block}>
          <SvgUri
            source={require("../assets/icon/vegan.svg")}
            width={20}
            height={20}
          />
          <Text style={styles.text}>Vegan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.block}>
          <SvgUri
            source={require("../assets/icon/vegetarian.svg")}
            width={20}
            height={20}
          />
          <Text style={styles.text}>Végétarien</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.block}>
          <SvgUri
            source={require("../assets/icon/veg-options.svg")}
            width={20}
            height={20}
          />

          <Text style={styles.text} numberOfLines={1}>
            Options Végétariennes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.block}>
          <Ionicons name="ios-options" size={20} color={colors.grey} />
          <Text style={styles.text}>Filtres</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    height: 70,
  },
  wrapper: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  block: {
    ...border,
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    height: 60,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    paddingTop: 5,
    fontWeight: "bold",
    fontSize: 12,
  },
  image: {
    width: 20,
    height: 20,
  },
});
