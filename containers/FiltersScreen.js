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
import Slider from "@react-native-community/slider";
import { useRoute, useNavigation } from "@react-navigation/core";
import types from "../seed/types.json";
import CheckboxComp from "../components/CheckboxComp";

export default function FiltersScreen({
  rayon,
  setRayon,
  setTypeEl,
  typeTab,
  setTypeTab,
}) {
  const { params } = useRoute();
  const navigation = useNavigation();

  const addTypeTab = (type) => {
    const checkType = [...typeTab];
    const exist = checkType.find((elem) => elem === type);
    if (!exist) {
      checkType.push(type);
      setTypeTab(checkType);
      console.log("checkAdded ", checkType);
    } else {
      const index = checkType.indexOf(exist);
      checkType.splice(index, 1);
      setTypeTab(checkType);
      console.log("checkRemoved ", checkType);
    }
  };
  // console.log(typeTab);
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
              return (
                <CheckboxComp key={i} id={i} type={type} onCheck={addTypeTab} />
              );
            })}
          </>
        </View>
        <View style={styles.sections}></View>
      </View>
      <Button
        title="Voir les résultats des restaurants"
        onPress={() => {
          navigation.goBack("Restaurants", {
            typeTab,
          });
        }}
      />
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
