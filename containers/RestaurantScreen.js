import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View, StyleSheet } from "react-native";
import axios from "axios";
import { border, colors } from "../assets/js/colors";
import Rating from "../components/Rating";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
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
        const response = await axios.get(
          `http://10.0.2.2:3200/resto/${placeId}`
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
          <View style={[styles.margin, styles.middle_cols]}>
            <View style={styles.middle_cols_block}>
              <FontAwesome5 name="pen" size={20} color="grey" />
              <Text style={styles.middle_cols_text}>Ajouter un avis</Text>
            </View>
            <View style={styles.middle_cols_block}>
              <MaterialCommunityIcons
                name="camera-plus"
                size={20}
                color="grey"
              />
              <Text style={styles.middle_cols_text}>Ajouter une photo</Text>
            </View>
            <View style={styles.middle_cols_block}>
              <FontAwesome5 name="phone-alt" size={20} color="grey" />
              <Text style={styles.middle_cols_text}>Appeler</Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: colors.grey,
            }}
          />
          <View style={styles.margin}>
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
  },
  cover: {},
  cover_img: {
    width: "100%",
    height: 200,
  },
  barOptions: {
    position: "relative",
    zIndex: 1,
    backgroundColor: colors.purpleContainer,
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
  margin: {
    marginHorizontal: 5,
    marginVertical: 12,
  },
  middle_section: {
    marginHorizontal: 10,
  },
  middle_cols: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  middle_cols_block: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  middle_cols_text: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "grey",
    textTransform: "uppercase",
  },
  description: {
    lineHeight: 24,
  },
});
