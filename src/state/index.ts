import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./user";
import marketplaceReducer from "./marketplace";
import inscriptionSlice from "./inscription";

const store = configureStore({
  devTools: true,
  reducer: {
    user: userReducer,
    marketplace: marketplaceReducer,
    inscription: inscriptionSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   import.meta.env.NODE_ENV !== "production"
  //     ? getDefaultMiddleware().concat(logger)
  //     : getDefaultMiddleware(),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
