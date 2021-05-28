import React, { useEffect, useState } from "react";
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
import Filters from "../components/Filters";
import types from "../seed/types.json";

export default function RestaurantsScreen({ errorMessageLocation }) {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  // rayon actif
  const [isActive, setIsActive] = useState(false);
  //
  const [typeEl, setTypeEl] = useState(null);
  // let type = "vegan";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:3200/restaurants", {
          params: {
            type: typeEl,
          },
        });
        // console.log(response);
        setIsLoading(false);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [typeEl]);

  return isLoading ? (
    <ActivityIndicator
      size="large"
      color={colors.purpleContainer}
      style={{ marginTop: 50 }}
    />
  ) : (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={colors.purpleStatusBar} />
      <Filters setTypeEl={setTypeEl} typeEl={typeEl} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.placeId.toString()}
        renderItem={({ item }) => <RestaurantsCard data={item} />}
      />
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
