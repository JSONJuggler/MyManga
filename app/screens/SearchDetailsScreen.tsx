import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import ChapterListItem from '../components/ChapterListItem';
import {connect} from 'react-redux';
import {RootState} from '../src/reducers';
import {SearchDetailsScreenNavigationProp} from '../app';
import globalStyles, {COLORS} from '../styles/styles';

import {ChapterPages, MangaDetails, MangaState} from '../src/actions/types';
import {selectChapter, loadFavorites} from '../src/actions/manga';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Config from 'react-native-config';
import {ApiResponse, create} from 'apisauce';
import MangaViewModal from '../modals/MangaViewModal';

type SearchScreenProps = {
  manga: MangaState;
  navigation: SearchDetailsScreenNavigationProp;
  selectedChapterLandingUrl: string;
  chapterPages: ChapterPages;
  loadingMangaPages: boolean;
  selectChapter: (chapterLandingUrl: string) => void;
  loadFavorites: (favorites: MangaDetails[]) => void;
};

const SearchDetailsScreen = ({
  manga: {
    mangaDetails,
    savedManga,
    selectedChapterLandingUrl,
    chapterPages,
    loadingDetails,
    loadingMangaPages,
  },
  navigation,
  selectChapter,
  loadFavorites,
}: SearchScreenProps) => {
  const [showDetails, setShowDetails] = React.useState(true);
  const [mangaViewOpen, setMangaViewOpen] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  React.useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();

      if (!loadingDetails) {
        navigation.dispatch(e.data.action);
      }
    });
  }, [navigation, loadingDetails]);

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

  React.useEffect(() => {
    savedManga.forEach((item) => {
      if (item.title === mangaDetails.title) {
        setIsFavorite(true);
      }
    });
    return () => setIsFavorite(false);
  }, [mangaDetails, savedManga]);

  const {
    coverUrl,
    authorString,
    artistString,
    summaryString,
    chapters,
  } = mangaDetails;

  const toggleDetails = () => {
    setShowDetails(() => !showDetails);
  };

  const addToFavorites = () => {
    let newFavorites: MangaDetails[] = [mangaDetails, ...savedManga];
    AsyncStorage.setItem('favorites', JSON.stringify(newFavorites)).catch(
      (err) => {
        console.log(err);
      },
    );
    loadFavorites(newFavorites);
  };

  const removeFromFavorites = () => {
    let newFavorites: MangaDetails[] = savedManga.filter(
      (item) => item.title !== mangaDetails.title,
    );
    AsyncStorage.setItem('favorites', JSON.stringify(newFavorites)).catch(
      (err) => {
        console.log(err);
      },
    );
    setIsFavorite(false);
    loadFavorites(newFavorites);
  };

  const handleChapterSelect = (chapterLandingUrl: string) => {
    setMangaViewOpen(() => true);
    if (selectedChapterLandingUrl !== chapterLandingUrl) {
      selectChapter(chapterLandingUrl);
    }
  };

  const handleCloseMangaViewModal = () => {
    setMangaViewOpen(() => false);
  };

  return (
    <SafeAreaView style={[globalStyles.safeArea, styles.safeArea]}>
      {loadingDetails && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Progress.CircleSnail
            color={COLORS.black}
            indeterminate={true}
            size={80}
            style={{marginBottom: 10}}
          />
          <Text style={styles.loadingText}>Loading...Please Wait</Text>
        </View>
      )}
      {!loadingDetails && (
        <>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textEmphasized}>Author:</Text>
                <Text style={styles.text}> {authorString}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textEmphasized}>Artist:</Text>
                <Text style={styles.text}> {artistString}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={toggleDetails}
              style={[globalStyles.button, styles.button]}>
              <Text style={{color: COLORS.black}}>Toggle Details</Text>
            </TouchableOpacity>
            {isFavorite && (
              <TouchableOpacity
                onPress={removeFromFavorites}
                style={[globalStyles.button, styles.button]}>
                <Text style={{color: COLORS.black}}>Unfavorite</Text>
              </TouchableOpacity>
            )}
            {!isFavorite && (
              <TouchableOpacity
                onPress={addToFavorites}
                style={[globalStyles.button, styles.button]}>
                <Text style={{color: COLORS.black}}>Favorite</Text>
              </TouchableOpacity>
            )}
          </View>

          {showDetails && (
            <View style={styles.content}>
              <Image style={styles.image} source={{uri: coverUrl}} />
              <View style={styles.summaryContent}>
                <ScrollView style={{flexDirection: 'column'}}>
                  <Text style={styles.summary}>{summaryString}</Text>
                </ScrollView>
              </View>
            </View>
          )}

          <View style={styles.separator} />

          <FlatList
            style={{flexGrow: 1}}
            data={chapters}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({item}) => (
              <ChapterListItem
                titleString={item.titleString}
                linkString={item.linkString}
                chapterNumberString={item.chapterNumberString}
                dateString={item.dateString}
                handleChapterSelect={handleChapterSelect}
              />
            )}
            keyExtractor={(item) => item.titleString}
          />

          <MangaViewModal
            mangaViewOpen={mangaViewOpen}
            handleCloseMangaViewModal={handleCloseMangaViewModal}
            chapterPages={chapterPages}
            loadingMangaPages={loadingMangaPages}
            selectedChapterLandingUrl={selectedChapterLandingUrl}
          />
          <View style={styles.separator} />
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.searchBar,
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    maxHeight: '45%',
  },
  image: {
    width: 240,
    height: 285,
    resizeMode: 'stretch',
  },
  loadingText: {
    color: COLORS.black,
    fontSize: 20,
    textAlign: 'center',
  },
  safeArea: {
    backgroundColor: COLORS.searchBackground,
  },
  separator: {
    backgroundColor: COLORS.black,
    height: 3,
  },
  summary: {
    fontSize: 10,
    fontStyle: 'italic',
    flex: 1,
    flexWrap: 'wrap',
  },
  summaryContent: {
    paddingLeft: 5,
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: 1,
  },
  text: {
    color: COLORS.black,
    fontSize: 10,
    textAlign: 'left',
    flex: 1,
    flexWrap: 'wrap',
  },
  textEmphasized: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 10,
    textAlign: 'left',
    textDecorationLine: 'underline',
  },
});

const mapStateToProps = (state: RootState) => ({
  manga: state.manga,
});

export default connect(mapStateToProps, {
  selectChapter,
  loadFavorites,
})(SearchDetailsScreen);
