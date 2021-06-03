import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../assets/js/colors";
// liste des favoris
export default function FavoritesScreen({ navigation, route }) {
  // Pas d'autre choix que de stocker l'async storage dans un state
  const [store, setStore] = useState([]);

  useEffect(() => {
    const awaitStorage = async () => {
      let fav = await AsyncStorage.getItem("fav");
      let favTab = fav ? JSON.parse(fav) : [];
      setStore(favTab);
    };
    awaitStorage();
  }, [store]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wrapper}>
        {store.length > 0 ? (
          store.map((result) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Restaurant", {
                  placeId: result.placeId,
                });
              }}
              key={result.placeId}
              style={styles.items}
            >
              <View style={[styles.row, styles.stretch]}>
                <Image
                  source={{ uri: result.thumbnail }}
                  style={styles.image}
                />
                <View style={styles.details}>
                  <Text style={styles.name} numberOfLines={1}>
                    {result.name}
                  </Text>
                  <Text style={styles.type}>{result.type}</Text>
                  <Text style={styles.description} numberOfLines={3}>
                    {result.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : store === null || store.length === 0 ? (
          <Text>Pas de favoris</Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.lightGray,
  },
  wrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  items: {
    width: "96%",
    // height: 100,
    backgroundColor: "white",
    marginVertical: 8,
    marginHorizontal: 10,
  },
  stretch: {
    alignItems: "stretch",
  },
  row: {
    flexDirection: "row",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
  },
  details: {
    flex: 3,
    flexDirection: "column",
    alignItems: "flex-start",
    marginLeft: 5,
  },
  type: {
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});
