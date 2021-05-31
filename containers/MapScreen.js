import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors, border } from "../assets/js/colors";

export default function MapScreen({ route }) {
  const { gps } = route.params;
  console.log("gps ", gps);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // "http://10.0.2.2:3200/restaurants",
          "https://happy-cow-back-project.herokuapp.com/restaurants",
          {
            params: {
              rayon: 1,
            },
          }
        );
        console.log("longueur ", response.data.length);
        setIsLoading(false);
        setData(response.data);
        // console.log(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  /* 

              latitude: userLocation.location.lat
              ? userLocation.location.lat
              : 48.856614,
            longitude: userLocation.location.lng
              ? userLocation.location.lng
              : 2.3522219,
              -----------------------------------
   
  */

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.purpleContainer}
          style={{ marginTop: 50 }}
        />
      ) : (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: gps.location ? gps.location[0] : 48.856614,
            longitude: gps.location ? gps.location[1] : 2.3522219,
            latitudeDelta: 0.15,
            longitudeDelta: 0.15,
          }}
          showsUserLocation={true}
        >
          {data.map((marker) => {
            return (
              <Marker
                key={marker.placeId}
                coordinate={{
                  latitude: marker.location.lat,
                  longitude: marker.location.lng,
                }}
                title={marker.name}
                description={marker.description}
              />
            );
          })}
        </MapView>
      )}
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
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 20,
    color: colors.vegOptions,
    fontWeight: "bold",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
