import React from "react";
import { Image, StyleSheet } from "react-native";
import types from "../seed/types.json";

export default function FilterImage({ type, large }) {
  const typeEl = types.filter((el, i) => el.type === type);
  let path;
  if (type !== undefined) {
    switch (typeEl[0].type) {
      case "vegan":
        path = require("../assets/png/vegan.png");
        break;
      case "vegetarian":
        path = require("../assets/png/vegetarian.png");
        break;
      case "veg-options":
        path = require("../assets/png/veg-options.png");
        break;
      case "Health Store":
        path = require("../assets/png/health-store.png");
        break;
      case "Veg Store":
        path = require("../assets/png/veg-store.png");
        break;
      case "Bakery":
        path = require("../assets/png/bakery.png");
        break;
      case "Delivery":
        path = require("../assets/png/delivery.png");
        break;
      case "Catering":
        path = require("../assets/png/catering.png");
        break;
      case "Organization":
        path = require("../assets/png/organization.png");
        break;
      case "Food Truck":
        path = require("../assets/png/food-truck.png");
        break;
      case "Market Vendor":
        path = require("../assets/png/market-vendor.png");
        break;
      case "Ice Cream":
        path = require("../assets/png/ice-cream.png");
        break;
      case "Juice Bar":
        path = require("../assets/png/juice-bar.png");
        break;
      case "Professional":
        path = require("../assets/png/vegan-professional.png");
        break;
      case "Other":
        path = require("../assets/png/other.png");
        break;
      default:
        path = require("../assets/png/other.png");
        break;
    }
  }

  return (
    <Image
      source={path}
      style={large ? styles.large : styles.small}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  small: {
    width: 20,
    height: 20,
  },
  large: {
    width: 35,
    height: 35,
  },
});
