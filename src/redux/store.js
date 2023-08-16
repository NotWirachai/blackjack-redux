// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

// import rootReducer from './reducers/index';

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk))
// );

// export default store;

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const bindMiddleware = (middleware) => {
  const arrMiddleware = [middleware];

  return composeWithDevTools(applyMiddleware(...arrMiddleware));
};

const store = createStore(rootReducer, bindMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
