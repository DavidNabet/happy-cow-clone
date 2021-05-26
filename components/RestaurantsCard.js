import React from "react";
import { colors, border } from "../assets/js/colors";
import { Text, View, StyleSheet, Image } from "react-native";
import Rating from "./Rating";
import Price from "./Price";
import SvgUri from "react-native-svg-uri";
import types from "./types";

export default function RestaurantsCard({ data }) {
  // const openClosed = () => {};

  // const iconFiltered = () => {
  //   return types.filter((el) => {
  //     if (el.type === data.type) {
  //       return <SvgUri source={require(el.icon)} width={20} height={20} />;
  //     }
  //   });
  // };

  return (
    <View style={styles.wrapper}>
      {data.pictures.length > 0 && (
        <View style={styles.item}>
          <View style={styles.cover}>
            <Image
              source={{ uri: data.thumbnail }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          </View>
          <View style={styles.block}>
            <View style={styles.sub_block}>
              <Text style={styles.title}>{data.name}</Text>
              <Text>{data.type}</Text>
              {/* {types.filter((el) => {
                if (el.type === data.type) {
                  return (
                    <SvgUri source={require(el.icon)} width={20} height={20} />
                  );
                }
              })} */}
            </View>
            <View style={styles.sub_block}>
              <Rating rating={Number(data.rating)} />
              <Text style={styles.text}></Text>
            </View>
            <View style={styles.sub_block}>
              <Text>Time</Text>
              <Price price={data.price} />
            </View>
            <View style={styles.block_last_row}>
              <Text style={styles.text} numberOfLines={2}>
                {data.description}
              </Text>
            </View>
          </View>
        </View>
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
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
  },
  block_last_row: {},
  text: {
    fontSize: 12,
    color: "black",
  },
});
