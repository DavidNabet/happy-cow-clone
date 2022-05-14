import React from "react";
import { StyleSheet } from "react-native";
import types from "../seed/types.json";
import {
  Vegan,
  Vegetarian,
  VegOptions,
  HealthStore,
  VegStore,
  Bakery,
  Delivery,
  Catering,
  Organization,
  FoodTruck,
  MarketVendor,
  IceCream,
  JuiceBar,
  Professional,
  Other,
} from "../seed/svgIcon";

export default function FilterImage(type, large) {
  const typeEl = types.filter((el, i) => el.type === type);
  // let path;
  if (type !== undefined) {
    switch (typeEl[0].type) {
      case "vegan":
        return large ? (
          <Vegan width={styles.large.width} height={styles.large.height} />
        ) : (
          <Vegan width={styles.small.width} height={styles.small.height} />
        );
      case "vegetarian":
        return large ? (
          <Vegetarian width={styles.large.width} height={styles.large.height} />
        ) : (
          <Vegetarian width={styles.small.width} height={styles.small.height} />
        );

      case "veg-options":
        return large ? (
          <VegOptions width={styles.large.width} height={styles.large.height} />
        ) : (
          <VegOptions width={styles.small.width} height={styles.small.height} />
        );

      case "Health Store":
        return large ? (
          <HealthStore
            width={styles.large.width}
            height={styles.large.height}
          />
        ) : (
          <HealthStore
            width={styles.small.width}
            height={styles.small.height}
          />
        );

      case "Veg Store":
        return large ? (
          <VegStore width={styles.large.width} height={styles.large.height} />
        ) : (
          <VegStore width={styles.small.width} height={styles.small.height} />
        );

      case "Bakery":
        return large ? (
          <Bakery width={styles.large.width} height={styles.large.height} />
        ) : (
          <Bakery width={styles.small.width} height={styles.small.height} />
        );

      case "Delivery":
        return large ? (
          <Delivery width={styles.large.width} height={styles.large.height} />
        ) : (
          <Delivery width={styles.small.width} height={styles.small.height} />
        );

      case "Catering":
        return large ? (
          <Catering width={styles.large.width} height={styles.large.height} />
        ) : (
          <Catering width={styles.small.width} height={styles.small.height} />
        );

      case "Organization":
        return large ? (
          <Organization
            width={styles.large.width}
            height={styles.large.height}
          />
        ) : (
          <Organization
            width={styles.small.width}
            height={styles.small.height}
          />
        );

      case "Food Truck":
        return large ? (
          <FoodTruck width={styles.large.width} height={styles.large.height} />
        ) : (
          <FoodTruck width={styles.small.width} height={styles.small.height} />
        );

      case "Market Vendor":
        return large ? (
          <MarketVendor
            width={styles.large.width}
            height={styles.large.height}
          />
        ) : (
          <MarketVendor
            width={styles.small.width}
            height={styles.small.height}
          />
        );

      case "Ice Cream":
        return large ? (
          <IceCream width={styles.large.width} height={styles.large.height} />
        ) : (
          <IceCream width={styles.small.width} height={styles.small.height} />
        );

      case "Juice Bar":
        return large ? (
          <JuiceBar width={styles.large.width} height={styles.large.height} />
        ) : (
          <JuiceBar width={styles.small.width} height={styles.small.height} />
        );

      case "Professional":
        return large ? (
          <Professional
            width={styles.large.width}
            height={styles.large.height}
          />
        ) : (
          <Professional
            width={styles.small.width}
            height={styles.small.height}
          />
        );

      case "Other":
        return large ? (
          <Other width={styles.large.width} height={styles.large.height} />
        ) : (
          <Other width={styles.small.width} height={styles.small.height} />
        );

      default:
        return large ? (
          <Other width={styles.large.width} height={styles.large.height} />
        ) : (
          <Other width={styles.small.width} height={styles.small.height} />
        );
    }
  }
}

const styles = StyleSheet.create({
  small: {
    width: 25,
    height: 25,
  },
  large: {
    width: 35,
    height: 35,
  },
});
