import React from 'react'
import {
  Modal,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Progress from "react-native-progress";
import { COLORS } from "../styles/styles"
import { ChapterPages } from '../src/actions/types';

type MangaViewModalProps = {
  mangaViewOpen: boolean
  handleCloseMangaViewModal: () => void
  selectedChapterLandingUrl: string
  chapterPages: ChapterPages
  loadingMangaPages: boolean
}

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const MangaViewModal = ({
  mangaViewOpen,
  handleCloseMangaViewModal,
  selectedChapterLandingUrl,
  chapterPages,
  loadingMangaPages
}: MangaViewModalProps) => {

  const [titleString, setTitleString] = React.useState(
    selectedChapterLandingUrl.slice(26).split("/"))

  React.useEffect(() => {
    setTitleString(() => selectedChapterLandingUrl.slice(26).split("/"))
  }, [selectedChapterLandingUrl])

  return (
    <Modal
      visible={mangaViewOpen}
      transparent={false}
      animationType="slide"
      onRequestClose={handleCloseMangaViewModal}>
      <SafeAreaView style={styles.safeArea}>
        {loadingMangaPages &&
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Progress.CircleSnail
              color={COLORS.white}
              indeterminate={true}
              size={80}
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.loadingText}>
              Loading...Please Wait
          </Text>
          </View>
        }
        {!loadingMangaPages &&
          <>
            <View
              style={{
                flexDirection: "row",
                margin: 5
              }}>
              <Text style={styles.titleText}>
                {titleString[0]}
              </Text>
              <Text style={styles.titleText}>
                -
              </Text>
              <Text style={styles.titleText}>
                {titleString[1]}
              </Text>
              <TouchableOpacity
                style={styles.icon}
                onPress={handleCloseMangaViewModal}
              >
                <MaterialCommunityIcons
                  name="alpha-x-circle-outline"
                  color={COLORS.white} size={26}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              style={styles.flatList}
              data={chapterPages?.chapterImageUrls}
              ItemSeparatorComponent={() => (
                <View style={styles.separator} />)}
              extraData={mangaViewOpen}
              renderItem={({ item, index }) => (
                <View>
                  <Image
                    style={styles.image}
                    source={{
                      uri: item.chapterImageUrl,
                      height: parseInt(item.imageHeight) > 1200 ? parseInt(item.imageHeight) / 1.95 : windowHeight / 1.5
                    }}
                    resizeMode="contain"
                  />
                </View>
              )}
              keyExtractor={item => item.chapterImageUrl}
            />
          </>
        }

      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: COLORS.black,
  },
  icon: {
    flex: 1,
    alignItems: "flex-end"
  },
  image: {
  },
  loadingText: {
    color: COLORS.white
  },
  safeArea: {
    backgroundColor: COLORS.black,
    flex: 1
  },
  separator: {
    backgroundColor: COLORS.black,
    height: 10
  },
  titleText: {
    color: COLORS.white
  }
})

export default MangaViewModal