import { Dispatch } from "redux";
import { create } from "apisauce";
import { SearchResult, Manga, SEARCH_MANGA, SAVE_MANGA, MangaActionTypes } from "./types";

export const searchManga = (searchQuery: string) => async (dispatch: Dispatch) => {
  try {
    // const res = await axios.get("/recipemanager/api/recipes/me");
    const api = create({
      baseURL: "http://localhost:5000",
    })

    const { data } = await api.get("/api/manga/search?manga=" + searchQuery)

    dispatch({
      type: SEARCH_MANGA,
      payload: data,
    });
  } catch (err) {
    // dispatch({
    //   type: SEARCH_FAIL
    //   payload: res.data
    // });
  }
};