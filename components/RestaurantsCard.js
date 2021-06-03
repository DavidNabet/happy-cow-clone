import React from "react";
import { border } from "../assets/js/utils";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import Rating from "./Rating";
import Price from "./Price";
import DistanceLocation from "./DistanceLocation";
import FilterImage from "./FilterImage";

export default function RestaurantsCard({ data, userLocation }) {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      {data.pictures.length > 0 && (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            navigation.navigate("Restaurant", {
              placeId: data.placeId,
            });
          }}
        >
          <View style={styles.cover}>
            <Image
              source={{ uri: data.thumbnail }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          </View>
          <View style={styles.block}>
            <View style={styles.sub_block}>
              <Text style={styles.title} numberOfLines={1}>
                {data.name.slice(0, 25) + "..."}
              </Text>
              <FilterImage type={data.type} />
            </View>
            <View style={styles.sub_block}>
              <Rating rating={Number(data.rating)} />
              <View>
                <DistanceLocation
                  data={data.location}
                  userLocation={userLocation}
                />
              </View>
            </View>
            <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
              <Price price={data.price} />
            </View>
            <View style={styles.block_last_row}>
              <Text style={styles.text} numberOfLines={2}>
                {data.description}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
  },
  item: {
    ...border,
    flexDirection: "row",
    height: 100,
    marginVertical: 5,
  },
  cover: {
    position: "relative",
  },
  thumbnail: {
    width: 100,
    flex: 1,
    alignItems: "baseline",
  },
  price_box: {
    position: "absolute",
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: "black",
    left: 0,
    bottom: 10,
  },
  block: {
    flex: 1,
    marginLeft: 5,
  },
  sub_block: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
  },
  text: {
    fontSize: 12,
    color: "black",
    width: "100%",
  },
  image: {
    width: 20,
    height: 20,
  },
});
