import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles, { COLORS } from "../styles/styles"

type props = {
  login: () => void;
}

const LoginScreen = ({ login }: props) => {
  return (
    <SafeAreaView style={[globalStyles.safeArea, styles.safeArea]}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={login}
          style={[globalStyles.button, styles.button]}
        >
          <Text style={styles.text}>
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.homeBar,
  },
  container: {
    alignSelf: "center",
    justifyContent: "center",
    flex: 1
  },
  text: {
    color: COLORS.black
  },
  safeArea: {
    backgroundColor: COLORS.homeBackground
  }
})

export default LoginScreen