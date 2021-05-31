import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { colors } from "../assets/js/colors";
// import haversine from "haversine";
import { distance } from "../utils/distance";
const DistanceLocation = ({ data, userLocation }) => {
  //   const [haver, setHaver] = useState(null);
  const dist = () => {
    let distanciation;
    let userLoc = JSON.parse(userLocation);
    console.log(data);
    // if (userLocation !== "") {
    distanciation = distance(
      userLoc.location[0],
      userLoc.location[1],
      data.lat,
      data.lng
    );
    return `${distanciation} km`;
    // }
  };
  /* 
     haversine(loc.location, data, {
          unit: "meter",
        })
      */

  return (
    <View>
      <Text style={{ fontSize: 12, color: colors.grey }}>
        {userLocation && dist()}
      </Text>
    </View>
  );
};

export default DistanceLocation;
