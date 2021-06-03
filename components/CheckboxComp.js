import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { View, Text, StyleSheet } from "react-native";
import FilterImage from "./FilterImage";

export default function CheckboxComp({ type, onCheck }) {
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.checkbox}>
      <View style={styles.img_title}>
        <FilterImage type={type.type} large />
        <Text style={{ marginHorizontal: 5 }}>{type.name}</Text>
      </View>
      <Checkbox
        value={isChecked}
        onValueChange={() => {
          setChecked(!isChecked);
          onCheck(type.type);
        }}
      />
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
