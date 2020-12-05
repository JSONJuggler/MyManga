export const SEARCH_MANGA_START = 'SEARCH_MANG_START ';
export const SEARCH_MANGA_FINISHED = 'SEARCH_MANGA_FINISHED';
export const SEARCH_RESULT_EMPTY = 'SEARCH_RESULT_EMPTY';
export const SELECT_FROM_SEARCH = 'SELECT_FROM_SEARCH';
export const GET_MANGA_DETAILS = 'GET_MANGA_DETAILS';
export const SELECT_CHAPTER = 'SELECT_CHAPTER';
export const GET_CHAPTER_PAGES = 'GET_CHAPTER_PAGES';
export const ADD_PAGE_TO_FETCHED_PAGES = 'ADD_PAGE_TO_FETCHED_PAGES';
export const SAVE_MANGA = 'SAVE_MANGA';
export const LOAD_FAVORITES = 'LOAD_FAVORITES';

export type SearchResult = {
  coverUrl: string;
  titleString: string;
  linkString: string;
  chapterCountString: string;
  mangaTypeString: string;
  mangaGenreString: string;
};

export type SelectedFromSearch = {
  title: string;
  link: string;
};

export type MangaChapter = {
  titleString: string;
  linkString: string;
  chapterNumberString: string;
  dateString: string;
};

export type MangaDetails = {
  title: string;
  coverUrl: string;
  requestUrl: string;
  authorString: string;
  artistString: string;
  summaryString: string;
  chapters: Array<MangaChapter>;
};

export type ChapterPage = {
  chapterImageUrl: string;
  imageWidth: string;
  imageHeight: string;
};

export type ChapterPages = {
  chapterPageUrls: Array<string>;
  chapterImageUrls: Array<ChapterPage | undefined>;
};

interface SelectFromSearchAction {
  type: typeof SELECT_FROM_SEARCH;
  payload: SelectedFromSearch;
}

interface GetMangaDetailsAction {
  type: typeof GET_MANGA_DETAILS;
  payload: MangaDetails;
}

interface SearchMangaStartAction {
  type: typeof SEARCH_MANGA_START;
}

interface SearchMangaFinishedAction {
  type: typeof SEARCH_MANGA_FINISHED;
  payload: Array<SearchResult>;
}

interface SearchResultEmptyAction {
  type: typeof SEARCH_RESULT_EMPTY;
}

interface SelectChapterAction {
  type: typeof SELECT_CHAPTER;
  payload: string;
}

interface GetChapterPagesAction {
  type: typeof GET_CHAPTER_PAGES;
  payload: ChapterPages;
}

interface AddPageToFetchedPagesAction {
  type: typeof ADD_PAGE_TO_FETCHED_PAGES;
  payload: ChapterPages;
}

interface SaveMangaAction {
  type: typeof SAVE_MANGA;
  payload: any;
}

interface LoadFavoritesAction {
  type: typeof LOAD_FAVORITES;
  payload: MangaDetails[];
}

export type MangaState = {
  searchResults: Array<SearchResult>;
  selectedFromSearch: SelectedFromSearch;
  mangaDetails: MangaDetails;
  selectedChapterLandingUrl: string;
  chapterPages: ChapterPages;
  savedManga: MangaDetails[];
  searchEmpty: boolean;
  loadingDetails: boolean;
  loadingSearch: boolean;
  loadingMangaPages: boolean;
};

export type MangaActionTypes =
  | SearchMangaStartAction
  | SearchMangaFinishedAction
  | SearchResultEmptyAction
  | SelectFromSearchAction
  | SelectChapterAction
  | GetChapterPagesAction
  | GetMangaDetailsAction
  | AddPageToFetchedPagesAction
  | SaveMangaAction
  | LoadFavoritesAction;
