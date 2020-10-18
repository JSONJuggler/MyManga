import React from 'react'
import { Modal, SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CheckBox } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { MangaGenreState } from "../app";
import { MangaGenre } from "../enums/mangaGenre";
import { MangaType } from "../enums/mangaType";
import { MangaStatus } from "../enums/mangaStatus";
import { MangaOrder } from "../enums/mangaOrder";
import globalStyles, { COLORS } from "../styles/styles"

type FilterModalProps = {
  filterOpen: boolean
  genre: MangaGenreState
  type: MangaType
  status: MangaStatus
  order: MangaOrder
  setGenre: (prev: any) => void
  setType: (prev: any) => void
  setStatus: (prev: any) => void
  setOrder: (prev: any) => void
  toggleFilter: () => void
}

const FilterModal = ({
  filterOpen,
  genre,
  type,
  status,
  order,
  setGenre,
  setType,
  setStatus,
  setOrder,
  toggleFilter
}: FilterModalProps) => {

  const mangaGenreOptions = Object.values(MangaGenre).map(genre => ({
    label: genre,
    value: genre
  }))

  const mangaTypeOptions = Object.values(MangaType).map(type => ({
    label: type,
    value: type
  }))

  const mangaStatusOptions = Object.values(MangaStatus).map(type => ({
    label: type,
    value: type
  }))

  const mangaOrderOptions = Object.values(MangaOrder).map(type => ({
    label: type,
    value: type
  }))

  return (
    <Modal
      visible={filterOpen}
      transparent={false}
      animationType="slide"
      onRequestClose={toggleFilter}>
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>

          <View style={styles.pickerContainer}>
            <Text style={styles.text}>
              Type
            </Text>
            <RNPickerSelect
              style={pickerStyle}
              onValueChange={(value) => setType((prev: any) => value)}
              value={type}
              items={mangaTypeOptions}>
            </RNPickerSelect>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.text}>
              Status
            </Text>
            <RNPickerSelect
              style={pickerStyle}
              onValueChange={(value) => setStatus((prev: any) => value)}
              value={status}
              items={mangaStatusOptions}>
            </RNPickerSelect>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.text}>
              Order
            </Text>
            <RNPickerSelect
              style={pickerStyle}
              onValueChange={(value) => setOrder((prev: any) => value)}
              value={order}
              items={mangaOrderOptions}>
            </RNPickerSelect>
          </View>
        </View>

        <View style={[styles.pickerContainer, { width: "100%" }]}>
          <Text style={styles.text}>
            Genre
          </Text>
        </View>

        <FlatList
          style={styles.flatList}
          data={mangaGenreOptions}
          extraData={filterOpen}
          renderItem={({ item, index }) => (
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.text}>
                {item.label}
              </Text>
              <View style={styles.checkBoxContainer}>
                <CheckBox
                  iconType="material"
                  checkedIcon="radio-button-checked"
                  uncheckedIcon="radio-button-unchecked"
                  checkedColor={COLORS.black}
                  checked={genre[item.value]?.added}
                  onPress={() => genre[item.value]?.added ?
                    setGenre({ ...genre, [item.value]: { added: false, removed: false } }) :
                    setGenre({ ...genre, [item.value]: { added: true, removed: false } })}
                />
                <MaterialCommunityIcons name="check-circle-outline" color={COLORS.black} size={26} />
                <CheckBox
                  iconType="material"
                  checkedIcon="radio-button-checked"
                  uncheckedIcon="radio-button-unchecked"
                  checkedColor={COLORS.black}
                  checked={genre[item.value]?.removed}
                  onPress={() => genre[item.value]?.removed ?
                    setGenre({ ...genre, [item.value]: { added: false, removed: false } }) :
                    setGenre({ ...genre, [item.value]: { added: false, removed: true } })}
                />
                <MaterialCommunityIcons name="close-circle-outline" color={COLORS.black} size={26} />
              </View>
            </View>)}
          keyExtractor={item => item.label}
        />

        <TouchableOpacity
          onPress={toggleFilter}
          style={[globalStyles.button, styles.button]}
        >
          <Text style={styles.text}>
            Done
          </Text>
        </TouchableOpacity>

      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.searchBackground,
    flexDirection: "row"
  },
  checkBoxContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  flatList: {
    backgroundColor: COLORS.searchBackground,
    padding: 20
  },
  pickerContainer: {
    width: "30%",
    margin: 5
  },
  safeArea: {
    backgroundColor: COLORS.searchBackground,
    flex: 1
  },
  text: {
    color: COLORS.black,
    fontSize: 20,
    textAlign: "center",
    alignSelf: "center"
  },
})

const pickerStyle = {
  inputIOS: {
    color: COLORS.black,
    backgroundColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 4,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  inputAndroid: {
    color: COLORS.black,
    backgroundColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 4,
  },
};

export default FilterModal