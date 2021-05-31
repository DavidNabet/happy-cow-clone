import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View, StyleSheet } from "react-native";
import axios from "axios";
import { border, colors } from "../assets/js/colors";
import Rating from "../components/Rating";
import DistanceLocation from "../components/DistanceLocation";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import FilterImage from "../components/FilterImage";
import types from "../seed/types.json";
export default function RestaurantScreen({ route, userLocation }) {
  // console.log(route.params.userLocation);
  const { placeId } = route.params;
  const [dataResto, setDataResto] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // `http://10.0.2.2:3200/resto/${placeId}`
        const response = await axios.get(
          `https://happy-cow-back-project.herokuapp.com/resto/${placeId}`
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

  // const bgBar = () => {
  //   const color = Object.keys(colors).indexOf(types[0].type) !== -1;
  //   types.map((item) => {
  //     return item.type === Object.keys(colors) ?
  //   })

  // }

  // const bgBar = dataResto.type === types[0].type;
  // console.log(Object.keys(colors));
  return isLoading ? (
    <ActivityIndicator
      size="large"
      color={colors.purpleContainer}
      style={{ marginTop: 50 }}
    />
  ) : (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.top_section}>
          <View style={styles.cover}>
            <Image
              style={styles.cover_img}
              source={{ uri: dataResto.thumbnail }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.barOptions}>
            <View style={styles.row}>
              <Text style={styles.title}>{dataResto.name}</Text>
              <View style={styles.image}>
                <FilterImage type={dataResto.type} large />
              </View>
            </View>
            <View style={styles.row}>
              <View style={{ flexDirection: "row" }}>
                <Rating rating={Number(dataResto.rating)} />
                {dataResto.vegan === 1 && (
                  <Text style={styles.vegan}>Vegan</Text>
                )}
              </View>
              <Text style={styles.type}>{dataResto.type}</Text>
            </View>
            <View style={styles.last_row}>
              <DistanceLocation
                data={dataResto.location}
                userLocation={userLocation}
              />
            </View>
          </View>
        </View>
        <View style={styles.middle_section}>
          <View
            style={{
              width: "100%",
              borderTopWidth: 1,
              borderTopColor: colors.grey,
              borderStyle: "solid",
            }}
          ></View>
          <View style={[styles.block_desc, styles.margin]}>
            <Text style={styles.description}>
              {dataResto.description !== undefined &&
                dataResto.description.split(" Open ")[0]}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
  },
  top_section: {
    position: "relative",
    flex: 1,
  },
  cover: {
    flex: 1,
    maxHeight: 250,
  },
  cover_img: {
    flex: 1,
  },
  barOptions: {
    position: "relative",
    zIndex: 1,
    backgroundColor: "#222",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  image: {
    position: "absolute",
    bottom: 5,
    zIndex: 3,
    right: 0,
  },
  row: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  last_row: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 16,
    color: "white",
  },
  vegan: {
    backgroundColor: "white",
    color: colors.vegan,
    fontSize: 10,
    marginLeft: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.Professional,
    textTransform: "uppercase",
    paddingHorizontal: 5,
    paddingTop: 2,
  },
  type: {
    textTransform: "uppercase",
    color: "white",
    fontSize: 12,
  },
  middle_section: {
    marginHorizontal: 10,
  },
  margin: {
    marginHorizontal: 5,
    marginVertical: 12,
  },
  block_desc: {},
  description: {
    lineHeight: 24,
  },
});
