import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  FontAwesome,
  Entypo,
  Feather,
} from "@expo/vector-icons";
import { colors } from "./assets/js/colors";
import RestaurantsScreen from "./containers/RestaurantsScreen";
import RestaurantScreen from "./containers/RestaurantScreen";
import MapScreen from "./containers/MapScreen";
import FavoritesScreen from "./containers/FavoritesScreen";
import LoginScreen from "./containers/LoginScreen";
import SignupScreen from "./containers/SignupScreen";
import FiltersScreen from "./components/FiltersScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userTokenAndId, setUserTokenAndId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  // const [isLoadingPlace, setIsLoadingPlace] = useState(true);
  // const [errors, setErrors] = useState(false);
  // const [coordinate, setCoordinate] = useState(null);

  const setTokenAndId = async (objTokenAndId) => {
    if (objTokenAndId) {
      AsyncStorage.setItem("userTokenAndId", objTokenAndId);
    } else {
      AsyncStorage.removeItem("userTokenAndId");
    }

    setUserTokenAndId(objTokenAndId);
  };

  const setLocation = async (location) => {
    if (location) {
      AsyncStorage.setItem("userLocation", location);
      setUserLocation(location);
    } else {
      AsyncStorage.removeItem("userLocation");
      setUserLocation(null);
    }
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      const userTokenAndId = await AsyncStorage.getItem("userTokenAndId");
      const userLocation = await AsyncStorage.getItem("userLocation");

      setIsLoading(false);
      setUserLocation(userLocation);
      console.log("location root ", userLocation);
      setUserTokenAndId(userTokenAndId);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userTokenAndId === null ? (
        <Stack.Navigator>
          <Stack.Screen name="SignUp">
            {(props) => (
              <SignupScreen {...props} setTokenAndId={setTokenAndId} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} setTokenAndId={setTokenAndId} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: colors.purpleContainer,
                  inactiveTintColor: "gray",
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Explorer",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"ios-search-sharp"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {(props) => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Restaurants"
                        options={{
                          title: "Happy Cow",
                          headerStyle: {
                            backgroundColor: colors.purpleContainer,
                          },
                          headerTitleStyle: { color: "white" },
                          headerTitleAlign: "center",
                          headerLeft: () => (
                            <TouchableOpacity
                              activeOpacity={0.9}
                              onPress={() => {
                                setTokenAndId(null);
                                setLocation(null);
                              }}
                            >
                              <Entypo name="log-out" size={20} color="white" />
                            </TouchableOpacity>
                          ),
                          headerRight: () => (
                            <TouchableOpacity
                              {...props}
                              activeOpacity={0.9}
                              onPress={() => {
                                props.navigation.navigate("AroundMe", {
                                  gps: userLocation,
                                });
                              }}
                            >
                              <FontAwesome5
                                name="map-marked-alt"
                                size={20}
                                color="white"
                              />
                            </TouchableOpacity>
                          ),
                          headerLeftContainerStyle: {
                            marginLeft: 15,
                          },
                          headerRightContainerStyle: {
                            marginRight: 15,
                          },
                        }}
                      >
                        {(props) => (
                          <RestaurantsScreen
                            {...props}
                            setLocation={setLocation}
                            userLocation={userLocation}
                          />
                        )}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Restaurant"
                        options={{
                          headerStyle: {
                            backgroundColor: colors.purpleContainer,
                          },
                          headerRight: () => (
                            <TouchableOpacity {...props} activeOpacity={0.9}>
                              <FontAwesome
                                name="star-half-empty"
                                size={20}
                                color="transparent"
                              />
                            </TouchableOpacity>
                          ),
                        }}
                      >
                        {(props) => <RestaurantScreen {...props} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="AroundMe"
                        options={{
                          title: "Happy Cow",

                          headerStyle: {
                            backgroundColor: colors.purpleContainer,
                          },
                          headerTitleStyle: { color: "white" },
                          headerTitleAlign: "center",
                        }}
                      >
                        {(props) => <MapScreen {...props} />}
                      </Stack.Screen>
                      <Stack.Screen
                        name="Filtres"
                        options={{
                          headerStyle: {
                            backgroundColor: colors.purpleContainer,
                          },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {(props) => <FiltersScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                <Tab.Screen
                  name="Favoris"
                  options={{
                    tabBarLabel: "Favoris",
                    tabBarIcon: ({ color, size }) => (
                      <MaterialIcons
                        name="favorite-outline"
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Favoris"
                        options={{
                          title: "Happy Cow",
                          headerStyle: {
                            backgroundColor: colors.purpleContainer,
                          },
                          headerTitleStyle: { color: "white" },
                          headerTitleAlign: "center",
                        }}
                      >
                        {(props) => <FavoritesScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
