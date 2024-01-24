import { configureStore } from "@reduxjs/toolkit";
import Registration from "./reducers/Registration/index";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    registration: Registration,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoredActionPaths: ["payload.callback"] },
    }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;

export default store;
