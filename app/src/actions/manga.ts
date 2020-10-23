import { Dispatch } from "redux";
import { ApiResponse, create } from "apisauce";
import {
  SearchResult,
  SEARCH_MANGA_START,
  SEARCH_MANGA_FINISHED,
  SEARCH_RESULT_EMPTY,
  SELECT_FROM_SEARCH,
  GET_MANGA_DETAILS,
  SELECT_CHAPTER,
  GET_CHAPTER_PAGES,
  SAVE_MANGA,
  MangaActionTypes,
  MangaDetails,
  ChapterPages
} from "./types";
import { MangaGenreState } from "../../app"
import { MangaGenre } from "../../enums/mangaGenre";
import { MangaType } from "../../enums/mangaType";
import { MangaStatus } from "../../enums/mangaStatus";
import { MangaOrder } from "../../enums/mangaOrder";
import Config from "react-native-config"

const baseUrl = __DEV__ ? Config.DEV_BASE_URL : Config.PROD_BASE_URL

const api = create({
  baseURL: baseUrl,
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
    const { data }: ApiResponse<Array<SearchResult>> = await api.get(
      "/api/manga/search?w=" + parsedSearchQuery
      + "&rd=" + typeString
      + "&status=" + statusString
      + "&order=" + orderString
      + "&genre=" + genreString
    )

    if (data?.length === 0) {

      dispatch({
        type: SEARCH_RESULT_EMPTY,
      });

    } else {

      dispatch({
        type: SEARCH_MANGA_FINISHED,
        payload: data,
      });

    }
  } catch (err) {
    // dispatch({
    //   type: SEARCH_FAIL
    //   payload: res.data
    // });
  }
};

export const selectFromSearch = (
  title: string,
  link: string,
) => async (dispatch: Dispatch<any>) => {
  try {

    dispatch({
      type: SELECT_FROM_SEARCH,
      payload: { title, link }
    })

    dispatch(getMangaDetails(link))

  } catch (err) {
    // dispatch({
    //   type: SEARCH_FAIL
    //   payload: res.data
    // });
  }
};

export const getMangaDetails = (
  link: string,
) => async (dispatch: Dispatch) => {
  try {

    const { data }: ApiResponse<MangaDetails> = await api.get(
      "/api/manga/details?requestUrl=" + link)

    dispatch({
      type: GET_MANGA_DETAILS,
      payload: data
    });

  } catch (err) {
    // dispatch({
    //   type: SEARCH_FAIL
    //   payload: res.data
    // });
  }
};

export const selectChapter = (
  chapterLandingUrl: string,
) => async (dispatch: Dispatch<any>) => {
  try {

    dispatch({
      type: SELECT_CHAPTER,
      payload: chapterLandingUrl
    })

    dispatch(getMangaChapterPages(chapterLandingUrl))

  } catch (err) {
    // dispatch({
    //   type: SEARCH_FAIL
    //   payload: res.data
    // });
  }
};

export const getMangaChapterPages = (
  chapterLandingUrl: string,
) => async (dispatch: Dispatch) => {
  try {

    const { data }: ApiResponse<ChapterPages> = await api.get(
      "/api/manga/pages?chapterLandingUrl=" + chapterLandingUrl)

    dispatch({
      type: GET_CHAPTER_PAGES,
      payload: data
    })

  } catch (err) {
    // dispatch({
    //   type: SEARCH_FAIL
    //   payload: res.data
    // });
  }
};