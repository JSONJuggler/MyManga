import {
  MangaState,
  SearchResult,
  Manga,
  SEARCH_MANGA_START,
  SEARCH_MANGA_FINISHED,
  SAVE_MANGA,
  MangaActionTypes
} from "../actions/types";

const initialState: MangaState = {
  searchResult: [],
  savedManga: [],
  loading: false
};

export default function (state = initialState, action: MangaActionTypes): MangaState {
  switch (action.type) {
    case SEARCH_MANGA_START:
      return {
        ...state,
        searchResult: [],
        loading: true
      }
    case SEARCH_MANGA_FINISHED:
      return {
        ...state,
        searchResult: action.payload,
        loading: false
      };
    case SAVE_MANGA:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}