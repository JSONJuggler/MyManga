import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { create } from "apisauce";
import { State as AppState, TabParamList } from "./app";
import globalStyles, { COLORS } from "./styles/styles";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";

// const Stack = createStackNavigator<StackParamList>();
const Tab = createMaterialBottomTabNavigator<TabParamList>();

const App = () => {
  // const [state, setState] = React.useState<AppState>({
  //   pages: "",
  //   api:
  //     create({
  //       baseURL: "https://jsonj-jobbie.herokuapp.com",
  //     })
  // })

  // const { pages, api } = state

  // React.useEffect(() => {
  //   api
  //     .get("/api/jobs?jobTitle=pool")
  //     .then(response => response ? console.log(response.data) : null)
  //     .catch((err) => console.log(err))
  // }, [])
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated((prev) => true)
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {!isAuthenticated && <LoginScreen login={handleLogin} />}
      {isAuthenticated && <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          activeColor={COLORS.black}
          inactiveColor={COLORS.white}
          labeled={true}
          shifting={true}
          barStyle={{ backgroundColor: "#694fad" }}
        >

          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: "Home",
              tabBarColor: COLORS.homeBar,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />

          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: "My Jobs",
              tabBarColor: COLORS.profileBar,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bell" color={color} size={26} />
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
      </NavigationContainer>}
    </>
  );
};

export default App;