import React, { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import axios from "axios";
import { colors } from "../assets/js/utils";

import RestaurantCard from "../components/RestaurantCard";
export default function RestaurantScreen({
  route,
  userLocation,
  navigation,
  gestionFavoris,
}) {
  const { placeId } = route.params;
  const [dataResto, setDataResto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://10.0.2.2:3200/resto/${placeId}`
          // `https://happy-cow-back-project.herokuapp.com/resto/${placeId}`
        );
        if (response.status === 200) {
          // console.log(response.data);
          setIsLoading(false);
          setDataResto(response.data);
        }
      } catch (error) {
        console.log(error.response);
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  // export const bgBar = () => {
  //   types.map((item, i) => {
  //     let color = Object.keys(colors).includes(item.name);
  //     return color ? Object.values(colors)[i] : "#222";
  //   });
  // };

  return isLoading ? (
    <ActivityIndicator
      size="large"
      color={colors.purpleContainer}
      style={{ marginTop: 50 }}
    />
  ) : (
    <RestaurantCard
      dataResto={dataResto}
      id={dataResto.placeId}
      userLocation={userLocation}
      navigation={navigation}
      gestionFavoris={gestionFavoris}
    />
  );
}
