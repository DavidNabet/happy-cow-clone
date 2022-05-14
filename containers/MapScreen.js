import React, { useCallback, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Dimensions,
  Image,
  TouchableHighlight,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors, markerColorType } from "../assets/js/utils";
import FilterImage from "../components/FilterImage";
let screen = Dimensions.get("window");
export default function MapScreen({ route, data, isLoading }) {
  const navigation = useNavigation();
  const { gps } = route.params;
  const [selectedMarker, setSelectedMarker] = useState(null);
  const markerRef = useRef();

  console.log("gps ", gps);

  const navigate = () => {
    setSelectedMarker(null);
    navigation.navigate("Restaurant", { placeId: selectedMarker.placeId });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={colors.purpleContainer}
          style={{ marginTop: 50 }}
        />
      ) : !data ? (
        <View style={styles.error}>
          <Text>Une erreur est survenue</Text>
        </View>
      ) : (
        <>
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
            maxZoomLevel={18}
            scrollEnabled={true}
            zoomEnabled={true}
            zoomTapEnabled={true}
            zoomControlEnabled={true}
            toolbarEnabled={true}
          >
            {data &&
              data.map((marker) => {
                return (
                  <Marker
                    ref={markerRef}
                    key={marker.placeId}
                    coordinate={{
                      latitude: marker.location.lat,
                      longitude: marker.location.lng,
                    }}
                    // pinColor={markerColorType(marker.type)}
                    onPress={() => {
                      setSelectedMarker({
                        placeId: marker.placeId,
                        name: marker.name,
                        address: marker.address,
                        thumbnail: marker.thumbnail,
                        type: marker.type,
                      });
                    }}
                  >
                    {FilterImage(marker.type)}
                  </Marker>
                );
              })}
          </MapView>

          {selectedMarker && (
            <TouchableHighlight
              style={styles.card}
              underlayColor={markerColorType(selectedMarker?.type)}
              onPress={navigate}
            >
              <>
                <Image
                  source={{ uri: selectedMarker.thumbnail }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.cardTextsContainer}>
                  <Text style={styles.cardText}>{selectedMarker.name}</Text>
                  <Text>{selectedMarker.address}</Text>
                </View>
              </>
            </TouchableHighlight>
          )}
        </>
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
  card: {
    flexDirection: "row",
    alignItems: "center",
    height: "20%",
    width: "90%",
    position: "absolute",
    bottom: 20,
    borderRadius: 10,
    marginHorizontal: "5%",
    backgroundColor: colors.lightGray,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  cardTextsContainer: {
    alignItems: "center",
    flex: 1,
  },
  cardText: {
    color: colors.black,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardImage: {
    height: "100%",
    width: "50%",
    marginRight: 10,
  },
  error: {
    fontSize: 20,
    color: colors.vegOptions,
    fontWeight: "bold",
  },
  map: {
    height: screen.height,
    width: screen.width,
    ...StyleSheet.absoluteFillObject,
  },
});
