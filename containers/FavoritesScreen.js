import React from "react";
import { Text, View, StyleSheet } from "react-native";

// liste des favoris
export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text>Désolé, pas de favoris pour le moment, promis j'y pense !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
