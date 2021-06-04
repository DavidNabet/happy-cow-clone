import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { colors } from "../assets/js/utils";
import {
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Linking,
  View,
} from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import RestaurantsCard from "../components/RestaurantsCard";
import FiltersBar from "../components/FiltersBar";
import SearchInput from "../components/SearchInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export default function RestaurantsScreen({
  userLocation,
  setLocation,
  data,
  isLoading,
  typeEl,
  setTypeEl,
  setTypeTab,
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
            // `http://10.0.2.2:3200/user/update/${user.id}`,
            `https://happy-cow-back-project.herokuapp.com/user/update/${user.id}`,
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
          "La permission pour accéder à la géolocalisation a échoué. Allez dans vos paramètres, activer la localisation"
        );
      }
    };
    getPermissionAndLocation();
  }, []);

  const filterText = (searchText) => {
    setIsActive(false);
    return data.filter((data) => {
      if (data.name.toLowerCase().includes(searchText.toLowerCase())) {
        setIsActive(true);
        return true;
      }
      return false;
    });
  };

  const handlePressLocation = async () => {
    await Linking.openSettings();
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
    <View style={styles.containerError}>
      <Text style={styles.error}>{errorMessageLocation}</Text>
      <TouchableOpacity
        style={styles.buttonError}
        onPress={handlePressLocation}
      >
        <Text
          style={{
            color: "white",
            textTransform: "uppercase",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Allez aux paramètres
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.purpleStatusBar} />
      <SearchInput
        dataSearch={data}
        search={search}
        setSearch={setSearch}
        filterText={filterText}
      />
      <FiltersBar
        data={data}
        setTypeEl={setTypeEl}
        typeEl={typeEl}
        setTypeTab={setTypeTab}
      />
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
  containerError: {
    height: "100%",
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
  error: {
    fontSize: 20,
    color: colors.MarketVendor,
    textAlign: "center",
    marginBottom: 10,
  },
  buttonError: {
    width: "100%",
    padding: 8,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: colors.purpleStatusBar,
  },
});
