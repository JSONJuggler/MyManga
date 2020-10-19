import { combineReducers } from "redux";
import manga from "./manga";

const rootReducer = combineReducers({
  manga
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
