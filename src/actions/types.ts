export const SEARCH_MANGA_START = "SEARCH_MANG_START ";
export const SEARCH_MANGA_FINISHED = "SEARCH_MANGA_FINISHED";
export const SEARCH_RESULT_EMPTY = "SEARCH_RESULT_EMPTY";
export const SELECT_FROM_SEARCH = "SELECT_FROM_SEARCH";
export const GET_MANGA_DETAILS = "GET_MANGA_DETAILS";
export const SAVE_MANGA = "SAVE_MANGA";

export type SearchResult = {
  coverUrl: string;
  titleString: string;
  linkString: string;
  chapterCountString: string;
  mangaTypeString: string;
  mangaGenreString: string;
}

export type Manga = {
  pages: Array<string>
  data: SearchResult
}

export type SelectedFromSearch = {
  title: string
  link: string
}

export type MangaChapter = {
  titleString: string
  linkString: string
  chapterNumberString: string
  dateString: string
}

export type MangaDetails = {
  coverUrl: string
  requestUrl: string
  authorString: string
  artistString: string
  summaryString: string
  chapters: Array<MangaChapter>
}

interface SelectFromSearchAction {
  type: typeof SELECT_FROM_SEARCH
  payload: SelectedFromSearch
}

interface GetMangaDetailsAction {
  type: typeof GET_MANGA_DETAILS
  payload: MangaDetails
}

interface SearchMangaStartAction {
  type: typeof SEARCH_MANGA_START
}

interface SearchMangaFinishedAction {
  type: typeof SEARCH_MANGA_FINISHED
  payload: Array<SearchResult>
}

interface SearchResultEmptyAction {
  type: typeof SEARCH_RESULT_EMPTY
}

interface SaveMangaAction {
  type: typeof SAVE_MANGA
  payload: Manga
}

export type MangaState = {
  searchResults: Array<SearchResult>
  selectedFromSearch: SelectedFromSearch
  mangaDetails: MangaDetails
  savedManga: Array<Manga>
  searchEmpty: boolean
  loadingDetails: boolean
  loadingSearch: boolean
}

export type MangaActionTypes = SearchMangaStartAction
  | SearchMangaFinishedAction
  | SearchResultEmptyAction
  | SelectFromSearchAction
  | GetMangaDetailsAction
  | SaveMangaAction