import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../assets/js/utils";
const Price = ({ price }) => {
  let priceText = ["Inexpensive", "Moderate", "Expensive"];
  const dollarYellow = (
    <FontAwesome name="dollar" size={12} color={colors.yellowRating} />
  );

  const dollardGrey = (
    <FontAwesome name="dollar" size={12} color={colors.grey} />
  );

  return (
    <View style={styles.price}>
      {[...Array(priceText.length)].map((el, i) => {
        return (
          <Text key={i}>
            {price === priceText[i] ? dollarYellow : dollardGrey}
          </Text>
        );
      })}
    </View>
  );
};

export default Price;

const styles = StyleSheet.create({
  price: {
    flexDirection: "row",
    alignItems: "center",
  },
});
