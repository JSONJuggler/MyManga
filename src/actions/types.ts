export const SEARCH_MANGA_START = "SEARCH_MANG_START ";
export const SEARCH_MANGA_FINISHED = "SEARCH_MANGA_FINISHED";
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

interface SearchMangaStartAction {
  type: typeof SEARCH_MANGA_START
}

interface SearchMangaFinishedAction {
  type: typeof SEARCH_MANGA_FINISHED
  payload: Array<SearchResult>
}

interface SaveMangaAction {
  type: typeof SAVE_MANGA
  payload: Manga
}

export type MangaState = {
  searchResult: Array<SearchResult>
  savedManga: Array<Manga>
  loading: boolean
}

export type MangaActionTypes = SearchMangaStartAction | SearchMangaFinishedAction | SaveMangaAction