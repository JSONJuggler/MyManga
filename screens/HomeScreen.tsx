import React from "react";
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput, FlatList, View } from "react-native";
import { connect } from "react-redux";
import { RootState } from "../src/reducers";
import globalStyles, { COLORS } from "../styles/styles"

import { searchManga } from "../src/actions/manga"
import { SearchResult, MangaState } from "../src/actions/types";

type props = {
  searchManga: (searchQuery: string) => Promise<void>;
  manga: MangaState
}

type itemProps = {
  title: string
  artist: string
}

const Item = ({ title, artist }: itemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>{artist}</Text>
  </View>
);

const HomeScreen = ({ searchManga, manga: { searchResult } }: props) => {

  const [searchQuery, setSearchQuery] = React.useState("");

  const handlePress = () => {
    searchManga(searchQuery)
  }

  return (
    <SafeAreaView style={[globalStyles.safeArea, styles.safeArea]}>
      <View style={styles.container}>
        <Text style={styles.text}>
          This is the Home Screen
        </Text>
        <Text style={styles.text}>
          But go ahead and search for a manga to read!
        </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => setSearchQuery((prev) => text)}
          value={searchQuery}
        />
        <TouchableOpacity
          onPress={handlePress}
          style={[globalStyles.button, styles.button]}
        >
          <Text style={styles.text}>
            Search Manga
          </Text>
        </TouchableOpacity>
        <FlatList
          data={searchResult}
          renderItem={({ item }) => (<Item title={item.titleString} artist={item.artistString} />)}
          keyExtractor={item => item.titleString}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.homeBar,
  },
  container: {
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
    justifyContent: "flex-start",
    width: "70%",
    flex: 1
  },
  text: {
    color: COLORS.black,
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center"
  },
  safeArea: {
    backgroundColor: COLORS.homeBackground
  },
  item: {
    backgroundColor: COLORS.homeBar,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 12,
  },
})

const mapStateToProps = (state: RootState) => ({
  manga: state.manga
})

export default connect(mapStateToProps, { searchManga })(HomeScreen);