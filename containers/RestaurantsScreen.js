import React, { useEffect, useState, useCallback } from "react";
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

export default function RestaurantsScreen({ userLocation, setLocation }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPlace, setIsLoadingPlace] = useState(true);
  const [errorMessageLocation, setErrorMessageLocation] = useState("");
  // rayon actif
  const [isActive, setIsActive] = useState(false);
  //
  const [typeEl, setTypeEl] = useState(null);
  const [search, setSearch] = useState("");

  // let type = "vegan";

  useEffect(() => {
    const getPermissionAndLocation = async () => {
      const tokenId = await AsyncStorage.getItem("userTokenAndId");
      const user = JSON.parse(tokenId);
      // console.log(user);
      // setErrors(false);
      // const result = await Location.getForegroundPermissionsAsync();
      // if (result.status === "granted") {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status === "granted") {
        // setErrors(true)
        const { coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        // const objCoordinate = {
        //   lat: coords.latitude,
        //   lng: coords.longitude,
        // };

        const tabCoordinate = [coords.latitude, coords.longitude];

        try {
          await axios.put(
            `http://10.0.2.2:3200/user/update/${user.id}`,
            // `https://happy-cow-back-project.herokuapp.com/user/update/${user.id}`,
            {
              location: tabCoordinate,
            },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          // console.log(response.data);
        } catch (e) {
          console.log(e.response);
          console.log("coordonnees ", e.message);
          alert("Location not work");
        }

        let setResponse = JSON.stringify({
          location: tabCoordinate,
        });
        setIsLoadingPlace(false);
        setLocation(setResponse);
        // console.log(tabCoordinate);
        // setCoordinate(tabCoordinate);
        // setIsLoading(false);
        // console.log(coordinate);
        // }
      } else {
        setErrorMessageLocation(
          "La permission pour accéder à la géolocalisation a échoué\nAller dans vos paramètres, activer la localisation"
        );
      }
    };
    getPermissionAndLocation();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://10.0.2.2:3200/restaurants",
          // "https://happy-cow-back-project.herokuapp.com/restaurants",
          {
            params: {
              type: typeEl,
              rayon: 3,
              limit: 20,
            },
          }
        );
        // console.log(response);
        setIsActive(false);
        setIsLoading(false);
        setData(response.data);
        // console.log(userLocation);
      } catch (error) {
        console.log(error.message);
      }
    };
    if (!isLoadingPlace) {
      fetchData();
    }
  }, [typeEl, isLoadingPlace]);

  const filterText = (searchText) => {
    if (data !== undefined) {
      setIsActive(false);
      return data.filter((data) => {
        //   console.log(data.name.toLowerCase());
        if (data.name.toLowerCase().includes(searchText.toLowerCase())) {
          setIsActive(true);
          return true;
        } else if (
          data.description !== null &&
          data.description.includes(searchText)
        ) {
          setIsActive(true);
          return true;
        }
        return false;
      });
    }
  };

  const renderItem = useCallback(
    ({ item }) => <RestaurantsCard data={item} userLocation={userLocation} />,
    []
  );

  return isLoadingPlace && isLoading ? (
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
