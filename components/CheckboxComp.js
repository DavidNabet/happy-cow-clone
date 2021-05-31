import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors, border } from "../assets/js/colors";
import FilterImage from "./FilterImage";
import Checkbox from "expo-checkbox";

export default function CheckboxComp({ type }) {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={styles.checkbox}>
      <Text>{type.type}</Text>
      <Checkbox value={isChecked} onValueChange={setChecked} />
    </View>
  );
}

const styles = StyleSheet.create({
  checkbox: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 5,
    alignItems: "center",
  },
});
