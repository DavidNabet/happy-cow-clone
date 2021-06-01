import React, { useState } from "react";
import { colors, border } from "../assets/js/colors";

import { View, Text, TextInput, StyleSheet } from "react-native";

export default function SearchInput({ search, setSearch, filterText }) {
  //   console.log(filterText(""));
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="A proximité"
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(text) => setSearch(filterText(text))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // maxHeight: 50,
    // flex: 1,
    backgroundColor: colors.purpleContainer,
  },
  input: {
    ...border,
    height: 40,
    marginBottom: 8,
    backgroundColor: "white",
    borderRadius: 5,
    marginHorizontal: 5,
    paddingLeft: 5,
  },
});
