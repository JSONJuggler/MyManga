import React from 'react';
import {SafeAreaView, StyleSheet, Text, ScrollView} from 'react-native';
import globalStyles, {COLORS} from '../styles/styles';
import {LibraryScreenProps} from '../app';

const LibraryScreen = ({navigation}: LibraryScreenProps) => {
  return (
    <SafeAreaView style={[globalStyles.safeArea, styles.safeArea]}>
      <ScrollView style={styles.container}>
        <Text style={styles.text}>This is the Profile Screen</Text>
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
    backgroundColor: COLORS.libraryBackground,
  },
});

export default LibraryScreen;
