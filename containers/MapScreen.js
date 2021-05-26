import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRoute } from "@react-navigation/core";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import { haversine } from "../utils/distance";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors, border } from "../assets/js/colors";
import * as Location from "expo-location";

export default function MapScreen({ data }) {
  //   const { data } = useRoute();
  //   console.log(data);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [coordinate, setCoordinate] = useState({});

  const getData = async (region) => {
    const position = {
      latitude: region.latitude,
      longitude: region.longitude,
    };

    // let result = data.location

    return haversine(position, data, 3);
  };

  useEffect(() => {
    const getPermissionAndLocation = async () => {
      try {
        setErrors(false);

        const { status } = await Location.requestForegroundPermissionsAsync();
        //   let response;

        if (status !== "granted") {
          setErrors(true);
          setErrorMessage(
            "La permission pour accéder à la géolocalisation a échoué\nAller dans vos paramètres, activer la localisation"
          );
        }

        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        const obj = {
          latitude: coords.latitude,
          longitude: coords.longitude,
        };

        // console.log(obj);

        setIsLoading(false);

        setCoordinate(obj);
      } catch (err) {
        alert("An error has occured");
        console.log("ERREUR MESSAGE ", err.message);
      }
    };

    getPermissionAndLocation();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.purpleContainer}
          style={{ marginTop: 50 }}
        />
      ) : !isLoading && errors ? (
        <View style={styles.wrapper}>
          <Text style={styles.error}>{errorMessage}</Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: coordinate.latitude ? coordinate.latitude : 48.856614,
            longitude: coordinate.longitude ? coordinate.longitude : 2.3522219,
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
