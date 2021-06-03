import React from "react";
import { Text, View } from "react-native";
import { colors } from "../assets/js/utils";
import { distance } from "../utils/distance";
export default function DistanceLocation({ data, userLocation }) {
  const dist = () => {
    let distanciation;
    let userLoc = JSON.parse(userLocation);
    if (userLoc && data !== undefined) {
      distanciation = distance(
        userLoc.location[0],
        userLoc.location[1],
        data.lat,
        data.lng
      );
      return `${distanciation} km`;
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 12, color: colors.grey }}>
        {userLocation && dist()}
      </Text>
    </View>
  );
}
