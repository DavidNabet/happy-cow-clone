import React, { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors, border } from "../assets/js/colors";
import { useRoute } from "@react-navigation/core";
import FilterImage from "./FilterImage";
import types from "../seed/types.json";
import CheckboxComp from "./CheckboxComp";

export default function FiltersScreen() {
  const { params } = useRoute();
  //   console.log(params.data.length);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.sections}>
          <Text style={styles.title}>Rayon</Text>
        </View>
        <View style={styles.sections}>
          <Text style={styles.title}>Filtrer par type</Text>
          <>
            {types.map((type, i) => {
              return <CheckboxComp key={i} type={type} />;
            })}
          </>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  wrapper: {
    marginHorizontal: 5,
  },
  sections: {},
  title: {
    fontSize: 18,
    textAlign: "left",
  },
});
