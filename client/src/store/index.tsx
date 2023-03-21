import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./User";
import organizationReducer from "./Organization";

export const store = configureStore({
  reducer: {
    user: userReducer,
    organization: organizationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
