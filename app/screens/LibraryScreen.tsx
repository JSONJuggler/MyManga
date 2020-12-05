import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {SafeAreaView, StyleSheet, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {RootState} from '../src/reducers';
import globalStyles, {COLORS} from '../styles/styles';
import {LibraryScreenBaseProps} from '../app';
import {MangaDetails} from '../src/actions/types';
import {loadFavorites} from '../src/actions/manga';

type LibraryScreenProps = LibraryScreenBaseProps & {
  loadFavorites: (favorites: MangaDetails[]) => void;
};

const LibraryScreen = ({loadFavorites}: LibraryScreenProps) => {
  React.useEffect(() => {
    (async () => {
      try {
        let favorites: MangaDetails[];
        const json = await AsyncStorage.getItem('favorites');
        if (json) {
          favorites = JSON.parse(json);
          loadFavorites(favorites);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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

const mapStateToProps = (state: RootState) => ({
  manga: state.manga,
});

export default connect(mapStateToProps, {
  loadFavorites,
})(LibraryScreen);
