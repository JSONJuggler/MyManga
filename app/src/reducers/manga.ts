import { selectChapter } from "../actions/manga";
import {
  MangaState,
  SearchResult,
  SEARCH_MANGA_START,
  SEARCH_MANGA_FINISHED,
  SEARCH_RESULT_EMPTY,
  SELECT_FROM_SEARCH,
  SELECT_CHAPTER,
  GET_CHAPTER_PAGES,
  GET_MANGA_DETAILS,
  SAVE_MANGA,
  MangaActionTypes
} from "../actions/types";

const initialState: MangaState = {
  searchResults: [],
  selectedFromSearch: { title: "", link: "" },
  mangaDetails: {
    coverUrl: "",
    requestUrl: "",
    authorString: "",
    artistString: "",
    summaryString: "",
    chapters: []
  },
  selectedChapterLandingUrl: "",
  chapterPages: {
    imageMaxWidth: "",
    imageMaxHeight: "",
    chapterImageUrls: []
  },
  savedManga: [],
  searchEmpty: false,
  loadingDetails: false,
  loadingSearch: false,
  loadingMangaPages: false
};

export default function (state = initialState, action: MangaActionTypes): MangaState {
  switch (action.type) {
    case SEARCH_MANGA_START:
      return {
        ...state,
        searchResults: [],
        loadingSearch: true
      }
    case SEARCH_MANGA_FINISHED:
      return {
        ...state,
        searchResults: action.payload,
        searchEmpty: false,
        loadingSearch: false
      };
    case SEARCH_RESULT_EMPTY:
      return {
        ...state,
        searchEmpty: true,
        loadingSearch: false
      }
    case SELECT_FROM_SEARCH:
      return {
        ...state,
        selectedFromSearch: action.payload,
        mangaDetails: {
          coverUrl: "",
          requestUrl: "",
          authorString: "",
          artistString: "",
          summaryString: "",
          chapters: []
        },
        loadingDetails: true
      };
    case GET_MANGA_DETAILS:
      return {
        ...state,
        mangaDetails: action.payload,
        loadingDetails: false
      };
    case SELECT_CHAPTER:
      return {
        ...state,
        selectedChapterLandingUrl: action.payload,
        chapterPages: {
          imageMaxWidth: "",
          imageMaxHeight: "",
          chapterImageUrls: []
        },
        loadingMangaPages: true
      };
    case GET_CHAPTER_PAGES:
      return {
        ...state,
        chapterPages: action.payload,
        loadingMangaPages: false
      };
    case SAVE_MANGA:
      return {
        ...state,
      };
    default:
      return state;
  }
}