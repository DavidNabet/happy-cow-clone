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
import FilterImage from "../components/FilterImage";
export default function MapScreen({ route, data, isLoading }) {
  const { gps } = route.params;
  console.log("gps ", gps);
  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

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
          minZoomLevel={2}
          maxZoomLevel={15}
          zoomEnabled={true}
          showsIndoorLevelPicker={true}
          zoomTapEnabled={true}
          zoomControlEnabled={true}
          loadingEnabled={true}
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
              ></Marker>
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
