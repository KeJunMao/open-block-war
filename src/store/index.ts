import { combineReducers, configureStore } from "@reduxjs/toolkit";
import configReducer from "./configSlice";
import rootReducer from "./rootSlice";
import topReducer from "./topSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  config: configReducer,
  root: rootReducer,
  top: topReducer,
});

const persistConfig = {
  key: "block-war-pure-v1",
  storage,
  whitelist: ["top"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
