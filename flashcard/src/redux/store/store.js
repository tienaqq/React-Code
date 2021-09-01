import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import adsReducer from "redux/reducer/ads";
import latestReducer from "redux/reducer/latest";
import userReducer from "redux/reducer/user";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user", "cart"],
};

const reducer = combineReducers({
  ads: adsReducer,
  user: userReducer,
  latest: latestReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export default store;