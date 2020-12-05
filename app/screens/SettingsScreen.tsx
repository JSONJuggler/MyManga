import React from 'react';
import {StyleSheet, ScrollView, SafeAreaView, Text} from 'react-native';
import globalStyles, {COLORS} from '../styles/styles';

const SettingsScreen = () => {
  return (
    <SafeAreaView style={[globalStyles.safeArea, styles.safeArea]}>
      <ScrollView style={styles.container}>
        <Text style={styles.text}>This is the Settings Screen</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  text: {
    color: COLORS.black,
  },
  safeArea: {
    backgroundColor: COLORS.settingsBar,
  },
});

export default SettingsScreen;
