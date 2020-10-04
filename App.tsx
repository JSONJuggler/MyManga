import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { create } from "apisauce";
import { State as AppState, StackParamList } from "./app";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Stack = createStackNavigator<StackParamList>();

const App = () => {
  const [state, setState] = React.useState<AppState>({
    pages: "",
    api:
      create({
        baseURL: 'https://jsonj-jobbie.herokuapp.com',
      })
  })

  const { pages, api } = state

  React.useEffect(() => {
    api
      .get('/api/jobs?jobTitle=pool')
      .then(response => response ? console.log(response.data) : null)
      .catch((err) => console.log(err))
  }, [])

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Welcome' }}
          />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar barStyle="dark-content" />
    </>
  );
};

export default App;