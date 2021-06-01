import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../assets/js/colors";
export default function Bookmark({ addFav, handleRemoveFav, like, dislike }) {
  return (
    <View>
      <TouchableOpacity>
        <FontAwesome name="star-o" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}
