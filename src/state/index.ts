import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import userReducer from "./user";
import marketplaceReducer from "./marketplace";

const store = configureStore({
  devTools: import.meta.env.NODE_ENV !== "production",
  reducer: {
    user: userReducer,
    marketplace: marketplaceReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   import.meta.env.NODE_ENV !== "production"
  //     ? getDefaultMiddleware().concat(logger)
  //     : getDefaultMiddleware(),
});

export default store;
