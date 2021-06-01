import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { colors, border } from "../assets/js/colors";
import { useRoute, useNavigation } from "@react-navigation/core";
import types from "../seed/types.json";
import CheckboxComp from "./CheckboxComp";
import Slider from "@react-native-community/slider";

export default function FiltersScreen({ rayon, setRayon }) {
  const { params } = useRoute();
  const navigation = useNavigation();
  //   console.log(params.data.length);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.sections}>
          <Text style={styles.title}>Rayon</Text>
          <View style={styles.slider}>
            <Slider
              minimumValue={1}
              maximumValue={80}
              step={1}
              value={rayon}
              onValueChange={(rayon) => setRayon(rayon)}
            />
            <Text style={{ textAlign: "center" }}> {Math.floor(rayon)} km</Text>
          </View>
        </View>
        <View style={styles.sections}>
          <Text style={styles.title}>Filtrer par type</Text>
          <>
            {types.map((type, i) => {
              return <CheckboxComp key={i} type={type} />;
            })}
          </>
        </View>
        <View style={styles.sections}></View>
      </View>
      <Button title="Filtrer les restaurants" />
    </ScrollView>
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
  sections: {
    marginVertical: 5,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 18,
    textAlign: "left",
  },
  slider: {},
});
