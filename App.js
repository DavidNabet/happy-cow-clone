import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { colors } from "./assets/js/colors";
import RestaurantsScreen from "./containers/RestaurantsScreen";
import MapScreen from "./containers/MapScreen";
import FavoritesScreen from "./containers/FavoritesScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  let type = "vegan" || null;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://10.0.2.2:3200/restaurants", {
          params: {
            type: type,
            limit: 30,
          },
          headers: {
            Accept: "application/json",
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
  }, []);
  return (
    <NavigationContainer>
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
                        headerRightContainerStyle: {
                          marginRight: 15,
                        },
                      }}
                    >
                      {(props) => (
                        <RestaurantsScreen
                          {...props}
                          isLoading={isLoading}
                          data={data}
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
                      {(props) => <MapScreen {...props} data={data} />}
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
    </NavigationContainer>
  );
}
