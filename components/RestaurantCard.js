import React, { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { border, colors } from "../assets/js/colors";
import Rating from "../components/Rating";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DistanceLocation from "../components/DistanceLocation";
import FilterImage from "../components/FilterImage";
import * as Location from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// components
// import StarIcon from "../components/StarIcon";
// import types from "../seed/types.json";
export default function RestaurantCard({
  dataResto,
  id,
  userLocation,
  navigation,
  gestionFavoris,
}) {
  const [favoris, setFavoris] = useState("gray");
  useEffect(() => {
    const isFavorisExist = async () => {
      const fav = await AsyncStorage.getItem("fav");
      const userFav = JSON.parse(fav);
      if (fav !== null && fav !== undefined) {
        console.log("userFav ", userFav);
        if (userFav.some((item) => item.placeId === dataResto.placeId)) {
          if (dataResto.placeId === id) {
            setFavoris(!favoris);
          }
        }
      } else {
        AsyncStorage.removeItem("fav");
      }
    };
    isFavorisExist();
  }, [id]);

  // const bgBar = () => {
  //   types.map((item, i) => {
  //     let color = Object.keys(colors).includes(item.name);
  //     return color ? Object.values(colors)[i] : "#222";
  //   });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.top_section}>
          <View style={styles.cover}>
            {dataResto.pictures !== undefined && (
              <>
                {dataResto.pictures.length > 1 ? (
                  <>
                    <Image
                      style={styles.first_img}
                      source={{ uri: dataResto.pictures[0] }}
                      resizeMode="cover"
                    />
                    <View style={styles.otherPictures}>
                      <Image
                        style={styles.second_img}
                        resizeMode="cover"
                        source={{ uri: dataResto.pictures[1] }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Gallery", {
                            images: dataResto.pictures,
                            placeId: dataResto.placeId,
                          });
                        }}
                      >
                        <Image
                          style={styles.third_img}
                          resizeMode="cover"
                          source={{ uri: dataResto.pictures[2] }}
                        />
                        <View
                          style={{
                            width: 100,
                            height: 100,
                            backgroundColor: "gray",
                            position: "absolute",
                            opacity: 0.4,
                          }}
                        ></View>
                        <View
                          style={{
                            position: "absolute",
                            opacity: 0.9,
                            top: 35,
                            left: 25,
                          }}
                        >
                          {dataResto.pictures.length > 3 && (
                            <Text style={{ fontSize: 22, color: "white" }}>
                              <AntDesign name="plus" size={20} color="white" />
                              <Text>{dataResto.pictures.length - 3}</Text>
                            </Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <Image
                    style={styles.cover_img}
                    source={{ uri: dataResto.thumbnail }}
                    resizeMode="cover"
                  />
                )}
              </>
            )}
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
            <View style={styles.row}>
              <View style={styles.bookmark}>
                <TouchableOpacity
                  onPress={() => {
                    gestionFavoris({
                      placeId: dataResto.placeId,
                      thumbnail: dataResto.thumbnail,
                      name: dataResto.name,
                      type: dataResto.type,
                      description: dataResto.description.split(" Open ")[0],
                    });
                    setFavoris(!favoris);
                  }}
                >
                  <FontAwesome
                    name="heart"
                    size={20}
                    color={favoris ? "gray" : "tomato"}
                  />
                </TouchableOpacity>
                <Text style={styles.txt_bookmark}>Favoris</Text>
              </View>

              <DistanceLocation
                data={dataResto.location}
                userLocation={userLocation}
              />
            </View>
          </View>
        </View>
        <View style={styles.sections}>
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
            {dataResto.description !== null &&
            dataResto.description !== undefined ? (
              <Text style={styles.description}>
                {dataResto.description.split(" Open ")[0]}
              </Text>
            ) : (
              <Text style={styles.description}>Pas de description</Text>
            )}
          </View>
        </View>
        <View style={styles.sections}>
          <View
            style={{
              width: "100%",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: colors.grey,
            }}
          />
          <View style={styles.margin}>
            {dataResto.description !== null &&
            dataResto.description !== undefined ? (
              <Text style={styles.description}>
                {dataResto.description.split(" Open ")[1]}
              </Text>
            ) : (
              <Text style={styles.description}>Pas d'horaires</Text>
            )}
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
  cover: {
    width: "100%",
    flexDirection: "row",
  },
  cover_img: {
    width: "100%",
    height: 200,
  },

  first_img: {
    flex: 2,
    height: 200,
  },
  second_img: {
    height: "50%",
    width: "100%",
  },
  third_img: {
    height: "80%",
    width: 100,
    marginTop: 3,
  },
  bookmark: {
    flexDirection: "row",
    alignItems: "center",
  },
  txt_bookmark: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 14,
    marginLeft: 8,
  },
  // otherImg: {
  //   flex: 1,
  //   height: 200,
  //   marginLeft: 3,
  //   flexDirection: "column",
  //   position: "relative",
  // },
  // second_img: {
  //   width: "100%",
  //   height: "50%",
  //   position: "absolute",
  //   backgroundColor: "#222",
  //   opacity: 0.8,
  //   top: 0,
  //   right: 0,
  //   left: 0,
  // },
  // last_img: {
  //   width: "100%",
  //   height: "50%",
  //   position: "absolute",
  //   marginTop: 3,
  //   backgroundColor: "#222",
  //   opacity: 0.8,
  //   top: 100,
  //   bottom: 0,
  //   right: 0,
  //   left: 0,
  //   zIndex: 1,
  // },
  // block_last_img: {
  //   flex: 1,
  //   flexDirection: "column",
  //   position: "relative",
  // },
  // text: {
  //   position: "absolute",
  //   width: "100%",
  //   height: "100%",
  //   top: 100,
  //   bottom: 0,
  //   right: 0,
  //   left: 0,
  //   fontSize: 16,
  // },
  otherPictures: {
    height: 197,
  },
  barOptions: {
    position: "relative",
    zIndex: 1,
    backgroundColor: colors.black,
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
  sections: {
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
