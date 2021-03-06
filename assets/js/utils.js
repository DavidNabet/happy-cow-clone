const colors = {
  vegetarien: "#8B2092",
  vegan: "#21860C",
  vegOptions: "#DC6362",
  HealthStore: "#D6B728",
  VegStore: "#4D9141",
  Bakery: "#9C722A",
  Delivery: "#77AB41",
  Catering: "#20AE9F",
  Organization: "#903489",
  FoodTruck: "#F1592A",
  MarketVendor: "#2D3997",
  IceCream: "#EF447F",
  JuiceBar: "#FBB040",
  Professional: "#006739",
  Other: "#3F74BA",
  purpleContainer: "#6e3fac",
  purpleStatusBar: "#523383",
  yellowRating: "#FBCC04",
  lightGray: "#F1F1F1",
  grey: "#aaa",
  black: "#222",
};

const border = {
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: colors.lightGray,
};

const getColor = (type) => {
  if (type === "Veg Store") {
    return "veg-store";
  } else if (type === "Health Store") {
    return "health-store";
  } else if (type === "Veg Store") {
    return "veg-store";
  } else if (type === "Ice Cream") {
    return "ice-cream";
  } else if (type === "Juice Bar") {
    return "juice-bar";
  } else if (type === "B&B") {
    return "b-and-b";
  } else if (type === "Market Vendor") {
    return "market-vendor";
  } else if (type === "Food Truck") {
    return "food-truck";
  } else {
    return type.toLowerCase();
  }
};

const markerColorType = (type) => {
  let color;
  if (type === "veg-options") {
    return (color = "tomato");
  } else if (type === "vegan") {
    return (color = "green");
  } else if (type === "vegetarian") {
    return (color = "purple");
  } else if (type === "Veg Store") {
    return (color = "navy");
  } else if (type === "Ice Cream") {
    return (color = "yellow");
  } else if (type === "Other") {
    return (color = "linen");
  } else if (type === "Health Store") {
    return (color = "gold");
  } else if (type === "Organization") {
    return (color = "tan");
  } else if (type === "Professional") {
    return (color = "turquoise");
  } else if (type === "Bakery") {
    return (color = "wheat");
  } else {
    return (color = "red");
  }
};

export { colors, border, getColor, markerColorType };
