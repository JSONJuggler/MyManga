import React from "react";
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, FlatList, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Progress from "react-native-progress";
import FilterModal from "../modals/FilterModal";
import SearchListItem from "../components/SearchListItem"
import { connect } from "react-redux";
import { RootState } from "../src/reducers";
import { MangaGenreState } from "../app"
import { MangaGenre } from "../enums/mangaGenre";
import { MangaType } from "../enums/mangaType";
import { MangaStatus } from "../enums/mangaStatus";
import { MangaOrder } from "../enums/mangaOrder";
import globalStyles, { COLORS } from "../styles/styles"

import { searchManga } from "../src/actions/manga"
import { MangaState } from "../src/actions/types";

type HomeScreenProps = {
  searchManga: (
    searchQuery: string,
    genre: MangaGenreState,
    type: MangaType,
    status: MangaStatus,
    order: MangaOrder
  ) => Promise<void>;
  manga: MangaState
}

const HomeScreen = ({ searchManga, manga: { searchResult, loading } }: HomeScreenProps) => {

  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [type, setType] = React.useState(MangaType.BOTH);
  const [status, setStatus] = React.useState(MangaStatus.BOTH);
  const [order, setOrder] = React.useState(MangaOrder.SIMILARITY);
  const [genre, setGenre] = React.useState<MangaGenreState>({
    [MangaGenre.ACTION]: { added: false, removed: false },
    [MangaGenre.ADVENTURE]: { added: false, removed: false },
    [MangaGenre.COMEDY]: { added: false, removed: false },
    [MangaGenre.DEMONS]: { added: false, removed: false },
    [MangaGenre.DRAMA]: { added: false, removed: false },
    [MangaGenre.ECCHI]: { added: false, removed: false },
    [MangaGenre.FANTASY]: { added: false, removed: false },
    [MangaGenre.GENDER_BENDER]: { added: false, removed: false },
    [MangaGenre.HAREM]: { added: false, removed: false },
    [MangaGenre.HISTORICAL]: { added: false, removed: false },
    [MangaGenre.HORROR]: { added: false, removed: false },
    [MangaGenre.JOSEI]: { added: false, removed: false },
    [MangaGenre.MAGIC]: { added: false, removed: false },
    [MangaGenre.MARTIAL_ARTS]: { added: false, removed: false },
    [MangaGenre.MATURE]: { added: false, removed: false },
    [MangaGenre.MECHA]: { added: false, removed: false },
    [MangaGenre.MILITARY]: { added: false, removed: false },
    [MangaGenre.MYSTERY]: { added: false, removed: false },
    [MangaGenre.ONE_SHOT]: { added: false, removed: false },
    [MangaGenre.PSYCHOLOGICAL]: { added: false, removed: false },
    [MangaGenre.ROMANCE]: { added: false, removed: false },
    [MangaGenre.SCHOOL_LIFE]: { added: false, removed: false },
    [MangaGenre.SCI_FI]: { added: false, removed: false },
    [MangaGenre.SEINEN]: { added: false, removed: false },
    [MangaGenre.SHOUJO]: { added: false, removed: false },
    [MangaGenre.SHOUJOAI]: { added: false, removed: false },
    [MangaGenre.SHOUNEN]: { added: false, removed: false },
    [MangaGenre.SHOUNENAI]: { added: false, removed: false },
    [MangaGenre.SLICE_OF_LIFE]: { added: false, removed: false },
    [MangaGenre.SMUT]: { added: false, removed: false },
    [MangaGenre.SPORTS]: { added: false, removed: false },
    [MangaGenre.SUPER_POWER]: { added: false, removed: false },
    [MangaGenre.SUPERNATURAL]: { added: false, removed: false },
    [MangaGenre.TRAGEDY]: { added: false, removed: false },
    [MangaGenre.VAMPIRE]: { added: false, removed: false },
    [MangaGenre.YAOI]: { added: false, removed: false },
    [MangaGenre.YURI]: { added: false, removed: false },
  })

  const handlePress = () => {
    searchManga(searchQuery, genre, type, status, order)
  }

  const toggleFilter = () => {
    setFilterOpen(() => !filterOpen)
  }

  return (
    <SafeAreaView style={[globalStyles.safeArea, styles.safeArea]}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Search for a manga to read
        </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 5 }}
          onChangeText={text => setSearchQuery((prev) => text)}
          value={searchQuery}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handlePress}
            style={[globalStyles.button, styles.button]}
          >
            <Text style={styles.text}>
              Search Manga
          </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleFilter}
            style={[globalStyles.button, styles.button]}
          >
            <Text style={styles.text}>
              Filter
          </Text>
            <MaterialCommunityIcons name="tune" color={COLORS.black} size={26} />
          </TouchableOpacity>
        </View>

        <FilterModal
          filterOpen={filterOpen}
          toggleFilter={toggleFilter}
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
      {loading &&
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Progress.CircleSnail
            color={COLORS.black}
            indeterminate={true}
            size={80}
            style={{ marginBottom: 10 }}
          />
          <Text style={styles.text}>
            Loading...Please Wait
          </Text>
        </View>
      }
      {!loading &&
        <FlatList
          data={searchResult}
          renderItem={({ item }) => (
            <SearchListItem
              img={item.coverUrl}
              title={item.titleString}
              link={item.linkString}
              chapterCount={item.chapterCountString}
              mangaType={item.mangaTypeString}
              mangaGenre={item.mangaGenreString}
            />)}
          keyExtractor={item => item.titleString}
        />
      }
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.homeBar,
    flexDirection: "row"
  },
  buttonContainer: {
    flexDirection: "row",
    alignSelf: "center"
  },
  container: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
    justifyContent: "flex-start",
  },
  safeArea: {
    backgroundColor: COLORS.homeBackground
  },
  text: {
    color: COLORS.black,
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center"
  },
})

const mapStateToProps = (state: RootState) => ({
  manga: state.manga
})

export default connect(mapStateToProps, { searchManga })(HomeScreen);