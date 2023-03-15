import {
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface UserState {
  _id: string;
  avatar: string;
  name: string;
  email: string;
  organization: string;
  loading: boolean;
  isAuth: boolean;
}

const initialState: UserState = {
  _id: "",
  avatar: "",
  name: "",
  email: "",
  organization: "",
  loading: false,
  isAuth: false,
};

interface SignInForm {
  email: string;
  pw: string;
}

interface RegisterForm {
  fullName: string;
  email: string;
  pw: string;
}

// Standard Auth
// Login User
export const loginUser = createAsyncThunk(
  "user/login",
  async (signInForm: SignInForm) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      signInForm
    );

    console.log(res.data);
    return res.data;
  }
);

// Register User
export const registerUser = createAsyncThunk(
  "user/register",
  async (registerForm: RegisterForm) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      registerForm
    );

    console.log(res.data);
    return res.data;
  }
);

// Google Auth
// Google Sign In
export const googleSignIn = createAsyncThunk("user/googleSignIn", async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/google/signin`
  );

  if (res.status === 200) {
    return (window.location.href = res.data);
  } else {
    return res.data;
  }
});

// Google Sign Up
export const googleSignUp = createAsyncThunk("user/googleSignUp", async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/google/register`
  );

  if (res.status === 200) {
    return (window.location.href = res.data);
  } else {
    return res.data;
  }
});

// Google Sign In Callback
export const googleSignInCB = createAsyncThunk(
  "user/googleSignInCB",
  async (idToken: string | null) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/google/cb/signin`,
      { idToken }
    );

    if (res.status === 200) {
      return res.data;
    } else {
      console.log(res.status);
      return res.data;
    }
  }
);

// Google Sign Up Callback
export const googleSignUpCB = createAsyncThunk(
  "user/googleSignUpCB",
  async (idToken: string | null) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/google/cb/register`,
      { idToken }
    );

    if (res.status === 200) {
      return res.data;
    } else {
      console.log(res.status);
      return res.data;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },

    clearUser: (state) => {
      state._id = "";
      state.name = "";
      state.email = "";
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    // Standard Auth
    const localActions = [loginUser, registerUser];

    localActions.forEach((action) => {
      builder.addCase(action.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(action.fulfilled, (state, action) => {
        state.loading = false;
        state._id = action.payload._id;
        state.name = action.payload.name;
        state.email = action.payload.email;
      });

      builder.addCase(action.rejected, (state) => {
        state.loading = false;
      });
    });

    // Google Auth
    const googleActions = [googleSignIn, googleSignUp];

    googleActions.forEach((action) => {
      builder.addCase(action.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(action.rejected, (state) => {
        state.loading = false;
      });
    });

    // Google Auth Callbacks
    const googleCBActions = [googleSignInCB, googleSignUpCB];

    googleCBActions.forEach((action) => {
      builder.addCase(action.pending, (state) => {
        state.loading = true;
      });

      builder.addCase(action.fulfilled, (state, action) => {
        state.loading = false;
        state._id = action.payload._id;
        state.name = action.payload.name;
        state.email = action.payload.email;
      });

      builder.addCase(action.rejected, (state) => {
        state.loading = false;
      });
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
