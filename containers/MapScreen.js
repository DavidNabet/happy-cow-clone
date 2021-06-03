import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors, border } from "../assets/js/colors";
// import FilterImage from "../components/FilterImage";
export default function MapScreen({ route, data, isLoading }) {
  const { gps } = route.params;
  console.log("gps ", gps);

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
          minZoomLevel={4}
          maxZoomLevel={15}
          scrollEnabled={true}
          zoomEnabled={true}
          zoomTapEnabled={true}
          zoomControlEnabled={true}
          toolbarEnabled={true}
        >
          {data.map((marker) => {
            let type = marker.type;
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
    width: "100%",
    height: "100%",
  },
});
