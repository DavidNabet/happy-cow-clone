import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors, border } from "../assets/js/colors";
import FilterImage from "./FilterImage";
import Checkbox from "expo-checkbox";

export default function CheckboxComp({ type }) {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={styles.checkbox}>
      <View style={styles.img_title}>
        <FilterImage type={type.type} large />
        <Text style={{ marginHorizontal: 5 }}>{type.name}</Text>
      </View>
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
  img_title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
