import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./user";
import marketplaceReducer from "./marketplace";
import inscriptionSlice from "./inscription";
import inscBrc20Slice from "./inscBrc20";

const store = configureStore({
  devTools: true,
  reducer: {
    user: userReducer,
    marketplace: marketplaceReducer,
    inscription: inscriptionSlice,
    inscBrc20: inscBrc20Slice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   import.meta.env.NODE_ENV !== "production"
  //     ? getDefaultMiddleware().concat(logger)
  //     : getDefaultMiddleware(),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
