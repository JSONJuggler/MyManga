import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  View,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Progress from 'react-native-progress';
import FilterModal from '../modals/FilterModal';
import SearchListItem from '../components/SearchListItem';
import {connect} from 'react-redux';
import {RootState} from '../src/reducers';
import {MangaGenreState} from '../app';
import {MangaGenre} from '../enums/mangaGenre';
import {MangaType} from '../enums/mangaType';
import {MangaStatus} from '../enums/mangaStatus';
import {MangaOrder} from '../enums/mangaOrder';
import {SearchScreenNavigationProp} from '../app';
import globalStyles, {COLORS} from '../styles/styles';

import {
  searchManga,
  selectFromSearch,
  selectFromFavorites,
} from '../src/actions/manga';
import {MangaDetails, MangaState} from '../src/actions/types';

type SearchScreenProps = {
  searchManga: (
    searchQuery: string,
    genre: MangaGenreState,
    type: MangaType,
    status: MangaStatus,
    order: MangaOrder,
  ) => Promise<void>;
  selectFromSearch: (title: string, link: string) => void;
  selectFromFavorites: (favoritedManga: MangaDetails) => void;
  manga: MangaState;
  navigation: SearchScreenNavigationProp;
  mangaDetails: MangaDetails;
};

const genreInit: MangaGenreState = {};

Object.values(MangaGenre).map(
  (key) => (genreInit[key] = {added: false, removed: false}),
);

const SearchScreen = ({
  searchManga,
  selectFromSearch,
  selectFromFavorites,
  manga: {searchResults, mangaDetails, savedManga, searchEmpty, loadingSearch},
  navigation,
}: SearchScreenProps) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [type, setType] = React.useState(MangaType.BOTH);
  const [status, setStatus] = React.useState(MangaStatus.BOTH);
  const [order, setOrder] = React.useState(MangaOrder.SIMILARITY);
  const [genre, setGenre] = React.useState<MangaGenreState>(genreInit);

  const handlePress = () => {
    searchManga(searchQuery, genre, type, status, order);
  };

  const toggleFilter = () => {
    setFilterOpen(() => !filterOpen);
  };

  const resetFilter = () => {
    setType(() => MangaType.BOTH);
    setStatus(() => MangaStatus.BOTH);
    setOrder(() => MangaOrder.SIMILARITY);
    setGenre(() => genreInit);
  };

  const handleNavigation = (title: string) => {
    navigation.navigate('SearchDetails', {title});
  };

  const handleSelect = (title: string, link: string) => {
    let favoritedManga: MangaDetails | null = null;
    savedManga.forEach((item) => {
      if (item.title === title) {
        favoritedManga = item;
      }
    });
    if (favoritedManga) {
      selectFromFavorites(favoritedManga);
    } else if (mangaDetails.requestUrl !== link) {
      selectFromSearch(title, link);
    }
    handleNavigation(title);
  };

  return (
    <SafeAreaView style={[globalStyles.safeArea, styles.safeArea]}>
      <View style={styles.container}>
        <Text style={styles.text}>Search for a manga to read</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginTop: 5,
          }}
          onChangeText={(text) => setSearchQuery((prev) => text)}
          value={searchQuery}
        />
        <View style={styles.buttonContainer}>
          {!loadingSearch && (
            <TouchableOpacity
              onPress={handlePress}
              style={[globalStyles.button, styles.button]}>
              <Text style={styles.text}>Search Manga</Text>
            </TouchableOpacity>
          )}
          {loadingSearch && (
            <TouchableOpacity
              style={[
                globalStyles.button,
                styles.button,
                {backgroundColor: COLORS.gray},
              ]}>
              <Text style={styles.text}>Searching...</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={toggleFilter}
            style={[globalStyles.button, styles.button]}>
            <Text style={styles.text}>Filter</Text>
            <MaterialCommunityIcons
              name="tune"
              color={COLORS.black}
              size={26}
            />
          </TouchableOpacity>
        </View>

        <FilterModal
          filterOpen={filterOpen}
          toggleFilter={toggleFilter}
          resetFilter={resetFilter}
          genre={genre}
          type={type}
          status={status}
          order={order}
          setGenre={setGenre}
          setType={setType}
          setStatus={setStatus}
          setOrder={setOrder}
        />
      </View>
      {loadingSearch && (
        <View
          style={{flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
          <Progress.CircleSnail
            color={COLORS.black}
            indeterminate={true}
            size={80}
            style={{marginBottom: 10}}
          />
          <Text style={styles.text}>Loading...Please Wait</Text>
        </View>
      )}
      {!loadingSearch && searchEmpty && (
        <View
          style={{flex: 0.7, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.text}>No manga found :,(</Text>
          <Text style={styles.text}>Please try a new search.</Text>
        </View>
      )}
      {!searchEmpty && (
        <FlatList
          data={searchResults}
          renderItem={({item}) => (
            <SearchListItem
              img={item.coverUrl}
              title={item.titleString}
              link={item.linkString}
              chapterCount={item.chapterCountString}
              mangaType={item.mangaTypeString}
              mangaGenre={item.mangaGenreString}
              handleSelect={handleSelect}
            />
          )}
          keyExtractor={(item) => item.titleString}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.searchBar,
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  container: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  safeArea: {
    backgroundColor: COLORS.searchBackground,
  },
  text: {
    color: COLORS.black,
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
  },
});

const mapStateToProps = (state: RootState) => ({
  manga: state.manga,
});

export default connect(mapStateToProps, {
  searchManga,
  selectFromSearch,
  selectFromFavorites,
})(SearchScreen);
