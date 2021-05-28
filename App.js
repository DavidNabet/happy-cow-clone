import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialIcons,
  FontAwesome5,
  Entypo,
} from "@expo/vector-icons";
import { colors } from "./assets/js/colors";
import RestaurantsScreen from "./containers/RestaurantsScreen";
import MapScreen from "./containers/MapScreen";
import FavoritesScreen from "./containers/FavoritesScreen";
import LoginScreen from "./containers/LoginScreen";
import SignupScreen from "./containers/SignupScreen";
import * as Location from "expo-location";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userTokenAndId, setUserTokenAndId] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  // const [isLoadingPlace, setIsLoadingPlace] = useState(true);
  const [errorMessageLocation, setErrorMessageLocation] = useState("");
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
      setUserTokenAndId(userTokenAndId);
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    const getPermissionAndLocation = async () => {
      const tokenId = await AsyncStorage.getItem("userTokenAndId");
      const user = JSON.parse(tokenId);
      // console.log(user);
      try {
        // setErrors(false);
        // const result = await Location.getForegroundPermissionsAsync();
        // if (result.status === "granted") {

        const { status } = await Location.requestForegroundPermissionsAsync();
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
                },
              }
            );
            // console.log(response.data);
          } catch (e) {
            alert("Location not work");
            console.log("coordonnees ", e.message);
          }

          let setResponse = JSON.stringify({
            location: tabCoordinate,
          });

          setLocation(setResponse);
          // console.log(tabCoordinate);
          // setCoordinate(tabCoordinate);
          // setIsLoading(false);
          // console.log(coordinate);
          // }
        } else {
          setErrorMessageLocation(
            "La permission pour accéder à la géolocalisation a échoué\nAller dans vos paramètres, activer la localisation"
          );
        }
      } catch (err) {
        alert("An error has occured");
        console.log("ERREUR MESSAGE ", err.message);
      }
    };
    if (!isLoading || userTokenAndId || userLocation) {
      getPermissionAndLocation();
    }
  }, [isLoading]);

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
                              onPress={() => setTokenAndId(null)}
                            >
                              <Entypo name="log-out" size={20} color="white" />
                            </TouchableOpacity>
                          ),
                          headerRight: () => (
                            <TouchableOpacity
                              {...props}
                              activeOpacity={0.9}
                              onPress={() => {
                                props.navigation.navigate("AroundMe");
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
                            errorMessageLocation={errorMessageLocation}
                          />
                        )}
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
                        {(props) => (
                          <MapScreen {...props} userLocation={userLocation} />
                        )}
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
