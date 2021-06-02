import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/core";

export default function GalleryScreen() {
  const { params } = useRoute();
  console.log(params.images);
  return (
    <View>
      <Text>Gallery</Text>
    </View>
  );
}
