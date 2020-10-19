import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "../styles/styles"

import SearchScreen from "../screens/SearchScreen";
import SearchDetailsScreen from "../screens/SearchDetailsScreen";

const Stack = createStackNavigator<StackParamList>();

const SearchStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.searchBackground
        }
      }}>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchDetails"
        component={SearchDetailsScreen}
        options={({ route }) => ({ title: route?.params?.title })}
      />
    </Stack.Navigator>
  );
};

export default SearchStackScreen