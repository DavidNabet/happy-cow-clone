import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, border } from "../assets/js/colors";
import { useNavigation } from "@react-navigation/core";

export default function FiltersBar({ typeEl, setTypeEl, data }) {
  const [isPressedVegan, setIsPressedVegan] = useState(false);
  const [isPressedVegetarian, setIsPressedVegetarian] = useState(false);
  const [isPressedVegOptions, setIsPressedVegOptions] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={[
            styles.block,
            typeEl === "vegan" ? styles.green : styles.borderDefault,
          ]}
          onPress={() => {
            setIsPressedVegan(!isPressedVegan);
            if (isPressedVegan) {
              setTypeEl("vegan");
            } else {
              setTypeEl(undefined);
            }
          }}
        >
          <Image
            source={require("../assets/png/vegan.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.text}>Vegan</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.block,
            typeEl === "vegetarian" ? styles.purple : styles.borderDefault,
          ]}
          onPress={() => {
            setIsPressedVegetarian(!isPressedVegetarian);
            if (isPressedVegetarian) {
              setTypeEl("vegetarian");
            } else {
              setTypeEl(undefined);
            }
          }}
        >
          <Image
            source={require("../assets/png/vegetarian.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.text}>Végétarien</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.block,
            typeEl === "veg-options" ? styles.red : styles.borderDefault,
          ]}
          onPress={() => {
            setIsPressedVegOptions(!isPressedVegOptions);
            if (isPressedVegOptions) {
              setTypeEl("veg-options");
            } else {
              setTypeEl(undefined);
            }
          }}
        >
          <Image
            source={require("../assets/png/veg-options.png")}
            style={styles.image}
            resizeMode="cover"
          />
          <Text style={styles.text} numberOfLines={1}>
            Options Végétariennes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.block}
          onPress={() =>
            navigation.navigate("Filtres", {
              data: data,
            })
          }
        >
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
  default: {
    backgroundColor: "white",
  },
  green: {
    backgroundColor: colors.vegan,
    color: "white",
  },
  purple: {
    backgroundColor: colors.vegetarien,
    color: "white",
  },
  red: {
    backgroundColor: colors.vegOptions,
    color: "white",
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
