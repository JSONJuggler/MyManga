import React from "react";
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MangaChapter } from "../src/actions/types";
import { COLORS } from "../styles/styles"

type ItemProps = MangaChapter

const ChapterListItem = ({
  titleString,
  linkString,
  dateString
}: ItemProps) => {
  return <>
    <TouchableOpacity
      style={styles.item}
      onPress={() => console.log(linkString)}
    >
      <View style={styles.content}>
        <View style={styles.textContent}>
          <Text style={styles.title}>{titleString}</Text>
          <Text style={styles.date}>{dateString}</Text>
        </View>
      </View>
    </TouchableOpacity>
  </>
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row"
  },
  item: {
    paddingTop: 10,
    paddingBottom: 10,
    marginVertical: 8,
  },
  date: {
    fontSize: 12,
    flex: 1,
    flexWrap: "wrap",
    textAlign: "right"
  },
  textContent: {
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",
    textAlign: "left"
  },
})

export default ChapterListItem