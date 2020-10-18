import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../styles/styles"

type ItemProps = {
  img: string
  title: string
  link: string
  chapterCount: string
  mangaType: string
  mangaGenre: string
}
const SearchListItem = ({ img, title, link, chapterCount, mangaType, mangaGenre }: ItemProps) => {
  return <>
    <View style={styles.item}>
      <View style={styles.content}>
        <Image style={styles.image} source={{ uri: img }} />
        <View style={styles.textContent}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 8, marginBottom: "auto" }}>
            <Text style={styles.chapterCount}>{chapterCount}</Text>
          </View>
          <View style={{ flexDirection: "row", marginTop: 8, marginBottom: "auto" }}>
            <Text style={styles.mangaType}>{mangaType}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.mangaGenre}>{mangaGenre}</Text>
          </View>
        </View>
      </View>
    </View>
  </>
};

const styles = StyleSheet.create({
  chapterCount: {
    fontSize: 12,
    flex: 1,
    flexWrap: "wrap"
  },
  content: {
    flexDirection: "row"
  },
  item: {
    backgroundColor: COLORS.searchBar,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  mangaGenre: {
    fontSize: 9,
    fontStyle: "italic",
    flex: 1,
    flexWrap: "wrap"
  },
  mangaType: {
    fontSize: 12,
    flex: 1,
    flexWrap: "wrap"
  },
  image: {
    width: 140,
    height: 180,
    resizeMode: 'stretch',
  },
  textContainer: {
    flexDirection: "row",
    margin: 5,
  },
  textContent: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "column",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline",
    flex: 1,
    flexWrap: "wrap"
  },
})

export default SearchListItem