import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "react-native";
import Main from "./navigation/Main";
import configureStore from './src/configureStore';

const store = configureStore({});

const App = () => {
  return (
    <>
      <Provider store={store}>
        <StatusBar barStyle="dark-content" />
        <Main />
      </Provider>
    </>
  );
};

export default App;