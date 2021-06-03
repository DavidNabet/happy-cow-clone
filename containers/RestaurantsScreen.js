import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { colors } from "../assets/js/colors";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import RestaurantsCard from "../components/RestaurantsCard";
import FiltersBar from "../components/FiltersBar";
import SearchInput from "../components/SearchInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import types from "../seed/types.json";

export default function RestaurantsScreen({
  userLocation,
  setLocation,
  data,
  isLoading,
  typeEl,
  setTypeEl,
}) {
  const [errorMessageLocation, setErrorMessageLocation] = useState("");
  // search
  const [isActive, setIsActive] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getPermissionAndLocation = async () => {
      const tokenId = await AsyncStorage.getItem("userTokenAndId");
      const user = JSON.parse(tokenId);
      // console.log(user);
      // const result = await Location.getForegroundPermissionsAsync();
      // if (result.status === "granted") {
      const { status, canAskAgain } =
        await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status === "granted") {
        // setErrors(true)
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });

        const tabCoordinate = [coords.latitude, coords.longitude];

        try {
          await axios.put(
            `http://10.0.2.2:3200/user/update/${user.id}`,
            {
              location: tabCoordinate,
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
                Accept: "application/json",
              },
            }
          );
          // console.log(response.data);
        } catch (e) {
          console.log("coordonnees ", e.message);
          alert("Location not work");
        }

        let setResponse = JSON.stringify({
          location: tabCoordinate,
        });
        setLocation(setResponse);
      } else {
        setErrorMessageLocation(
          "La permission pour accéder à la géolocalisation a échoué\nAller dans vos paramètres, activer la localisation"
        );
      }
    };
    getPermissionAndLocation();
  }, []);

  const filterText = (searchText) => {
    // if (data !== undefined) {
    setIsActive(false);
    return data.filter((data) => {
      if (data.name.toLowerCase().includes(searchText.toLowerCase())) {
        setIsActive(true);
        return true;
      }
      return false;
    });
    // }
  };

  const renderItem = useCallback(
    ({ item }) => <RestaurantsCard data={item} userLocation={userLocation} />,
    []
  );

  return isLoading ? (
    <ActivityIndicator
      size="large"
      color={colors.purpleContainer}
      style={{ marginTop: 50 }}
    />
  ) : errorMessageLocation ? (
    <Text style={styles.error}>{errorMessageLocation}</Text>
  ) : (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.purpleStatusBar} />
      <SearchInput
        dataSearch={data}
        search={search}
        setSearch={setSearch}
        filterText={filterText}
      />
      <FiltersBar data={data} setTypeEl={setTypeEl} typeEl={typeEl} />
      {isActive && search !== null ? (
        <FlatList
          data={search}
          keyExtractor={(item) => item.placeId.toString()}
          renderItem={renderItem}
        />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.placeId.toString()}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  error: {
    fontSize: 20,
    color: colors.vegOptions,
    fontWeight: "bold",
  },
});
