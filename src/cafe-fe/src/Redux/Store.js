// import { configureStore } from "@reduxjs/toolkit";
// import createSagaMiddleware from "redux-saga";
// import logger from "redux-logger";
// import { combineReducer } from "./CombineReducer";
// import rootSaga from "../Saga";

// // create the saga middleware
// const sagaMiddleware = createSagaMiddleware();
// const middleware = [sagaMiddleware];

// middleware.push(logger);

// const rootReducer = (state, action) => {
//     return combineReducer(state, action);
// }
// // mount it on the Store
// const Store = configureStore({
//     reducer: rootReducer,
//     middleware: middleware,
// })

// // then run the saga
// sagaMiddleware.run(rootSaga)

// export default Store;

// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import combineReducer from "./CombineReducer";
import rootSaga from "../Saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: combineReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
//   middleware: [sagaMiddleware]
});

sagaMiddleware.run(rootSaga);

export default store;