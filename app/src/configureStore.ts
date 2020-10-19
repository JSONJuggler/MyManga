import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const middleware = [thunk];

const composeEnhancers = composeWithDevTools({
  trace: false,
  traceLimit: 25
});

export default function configureStore(initialState: {}) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  return store;
}