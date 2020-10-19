import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import globalStyles, { COLORS } from "../styles/styles";
import LibraryScreen from "../screens/LibraryScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SearchStackScreen from "./SearchStackScreen";

const Tab = createMaterialBottomTabNavigator<TabParamList>();

const Main = () => {

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Library"
          activeColor={COLORS.black}
          inactiveColor={COLORS.white}
          labeled={true}
          shifting={true}
          barStyle={{ backgroundColor: "#694fad" }}
        >

          <Tab.Screen
            name="Search"
            component={SearchStackScreen}
            options={{
              tabBarLabel: "Search",
              tabBarColor: COLORS.searchBar,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="magnify" color={color} size={26} />
              ),
            }}
          />

          <Tab.Screen
            name="Library"
            component={LibraryScreen}
            options={{
              tabBarLabel: "Library",
              tabBarColor: COLORS.libraryBar,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="book-open-page-variant" color={color} size={26} />
              ),
            }}
          />

          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: "Settings",
              tabBarColor: COLORS.settingsBar,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cog" color={color} size={26} />
              ),
            }}
          />

        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Main;