export const SEARCH_MANGA = "SEARCH_MANGA";
export const SAVE_MANGA = "SAVE_MANGA";

export type SearchResult = {
  coverUrl?: string;
  titleString: string;
  artistString: string;
}

export type Manga = {
  pages: Array<string>
  data: SearchResult
}

interface SearchMangaAction {
  type: typeof SEARCH_MANGA
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

export type MangaActionTypes = SearchMangaAction | SaveMangaAction