import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "./assets/js/colors";
import RestaurantsScreen from "./containers/RestaurantsScreen";
import FavoritesScreen from "./containers/FavoritesScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
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
                {() => (
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
                      }}
                    >
                      {(props) => <RestaurantsScreen {...props} />}
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
