import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";

export default function GalleryScreen({ route }) {
  const { images } = route.params;
  return (
    <ScrollView>
      <View style={styles.wrapper}>
        {images.map((image, i) => {
          return (
            <View style={styles.item} key={i}>
              <Image
                source={{ uri: image }}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  item: {
    marginHorizontal: 8,
    marginVertical: 8,
  },
  image: {
    width: 200,
    height: 200,
  },
});
