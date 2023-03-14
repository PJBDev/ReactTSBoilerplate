import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  _id: string;
  name: string;
  email: string;
}

const initialState: UserState = {
  _id: "",
  name: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },

    logout: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
