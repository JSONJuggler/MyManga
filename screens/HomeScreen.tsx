import React from 'react';
import { Button } from 'react-native';
import { HomeScreenProps } from "../app";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <Button
      title="Go to the settings screen"
      onPress={() =>
        navigation.navigate('Settings')
      }
    />
  );
};

export default HomeScreen