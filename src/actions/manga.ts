import { Dispatch } from "redux";
import { create } from "apisauce";
import {
  SearchResult,
  Manga,
  SEARCH_MANGA_START,
  SEARCH_MANGA_FINISHED,
  SAVE_MANGA,
  MangaActionTypes
} from "./types";
import { MangaGenreState } from "../../app"
import { MangaGenre } from "../../enums/mangaGenre";
import { MangaType } from "../../enums/mangaType";
import { MangaStatus } from "../../enums/mangaStatus";
import { MangaOrder } from "../../enums/mangaOrder";
import Config from "react-native-config"

const api = create({
  baseURL: Config.BASE_URL,
})

export const searchManga = (
  searchQuery: string,
  genre: MangaGenreState,
  type: MangaType,
  status: MangaStatus,
  order: MangaOrder
) => async (dispatch: Dispatch) => {
  try {

    dispatch({
      type: SEARCH_MANGA_START,
    });
    const parsedSearchQuery = searchQuery.trim().replace(" ", "+")
    const genreMapping = Object.values(genre).map(g => g.added ? 1 : g.removed ? 2 : 0)
    const genreString = genreMapping.join("")
    const typeMapping = Object.values(MangaType).indexOf(type)
    const typeString = typeMapping.toString()
    const statusMapping = Object.values(MangaStatus).indexOf(status)
    const statusString = statusMapping.toString()
    const orderMapping = Object.values(MangaOrder).indexOf(order)
    const orderString = orderMapping.toString()
    const { data } = await api.get(
      "/api/manga/search?w=" + parsedSearchQuery
      + "&rd=" + typeString
      + "&status=" + statusString
      + "&order=" + orderString
      + "&genre=" + genreString
    )

    dispatch({
      type: SEARCH_MANGA_FINISHED,
      payload: data,
    });
  } catch (err) {
    // dispatch({
    //   type: SEARCH_FAIL
    //   payload: res.data
    // });
  }
};