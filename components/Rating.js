import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../assets/js/colors";

const Rating = ({ rating }) => {
  const starYellow = (
    <FontAwesome name="star" size={15} color={colors.yellowRating} />
  );
  const starHalfYellow = (
    <FontAwesome name="star-half-empty" size={15} color={colors.yellowRating} />
  );
  const starGrey = <FontAwesome name="star" size={15} color={colors.grey} />;

  const integerMethod = () => {
    return [...Array(5)].map((item, index) => {
      return (
        <View style={{ paddingRight: 2 }} key={index}>
          {index < rating ? starYellow : starGrey}
        </View>
      );
    });
  };
  // étoiles pleines, vide ou à moitié rempli
  const roundMethod = () => {
    return [...Array(5)].map((item, index) => {
      return (
        <View style={{ paddingRight: 2 }} key={index}>
          {/* si l'étoile courrante est à moitié pleine */}
          {index < rating && index + 1 > rating
            ? starHalfYellow
            : // si l'étoile courante est pleine
            index < rating
            ? starYellow
            : // sinon, l'étoile courante est vide
              starGrey}
        </View>
      );
    });
  };

  return (
    <View style={styles.reviews}>
      {Number.isInteger(rating) ? integerMethod() : roundMethod()}
      <Text style={styles.reviews_text}>({rating})</Text>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  reviews: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviews_text: {
    color: colors.grey,
  },
});
