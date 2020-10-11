import React from "react";
import { Text, SafeAreaView, StyleSheet, View } from "react-native";
import { HomeScreenProps } from "../app";
import globalStyles, { COLORS } from "../styles/styles"

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <SafeAreaView style={[globalStyles.safeArea, styles.safeArea]}>
      <View style={styles.container}>
        <Text style={styles.text}>
          This is the Home Screen
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center"
  },
  text: {
    color: COLORS.black
  },
  safeArea: {
    backgroundColor: COLORS.homeBackground
  }
})

export default HomeScreen