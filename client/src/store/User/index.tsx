import {
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export interface UserState {
  _id: string;
  avatar: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  organization: string;
  loading: boolean;
  isAuth: boolean;
}

const initialState: UserState = {
  _id: "",
  avatar: "",
  name: "",
  email: "",
  isEmailVerified: false,
  organization: "",
  loading: false,
  isAuth: false,
};

interface SignInForm {
  email: string;
  password: string;
}

interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
}

// Standard Auth
// Register User
export const registerUser = createAsyncThunk(
  "user/register",
  async (registerForm: RegisterForm, { rejectWithValue }) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/register`,
      registerForm
    );

    if (res.status === 200) {
      return res.data;
    } else {
      toast.error(res.data);
      return rejectWithValue(res.data);
    }
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "user/login",
  async (signInForm: SignInForm, { rejectWithValue }) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      signInForm
    );

    if (res.status === 200) {
      if (res.data.user.isEmailVerified) {
        return res.data;
      } else {
        toast.error("Please verify your email address.");
        return rejectWithValue(res.data);
      }
    } else {
      toast.error(res.data);
      return rejectWithValue(res.data);
    }
  }
);

// Verify Email
export const verifyEmail = createAsyncThunk(
  "user/verifyEmail",
  async (token: string | null, { rejectWithValue }) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/verify-email`,
      { token }
    );

    if (res.status === 200) {
      return res.data;
    } else {
      toast.error(res.data);
      return rejectWithValue(res.data);
    }
  }
);

// Google Auth
// Google Sign In
export const googleSignIn = createAsyncThunk(
  "user/googleSignIn",
  async (any, { rejectWithValue }) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/google/signin`
    );

    if (res.status === 200) {
      return (window.location.href = res.data);
    } else {
      return rejectWithValue(res.data);
    }
  }
);

// Google Sign Up
export const googleSignUp = createAsyncThunk(
  "user/googleSignUp",
  async (any, { rejectWithValue }) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/google/register`
    );

    if (res.status === 200) {
      return (window.location.href = res.data);
    } else {
      return rejectWithValue(res.data);
    }
  }
);

// Google Sign In Callback
export const googleSignInCB = createAsyncThunk(
  "user/googleSignInCB",
  async (idToken: string | null, { rejectWithValue }) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/google/cb/signin`,
      { idToken }
    );

    if (res.status === 200) {
      localStorage.setItem("accessToken", res.data.accessToken);
      return res.data.user;
    } else {
      return rejectWithValue(res.data);
    }
  }
);

// Google Sign Up Callback
export const googleSignUpCB = createAsyncThunk(
  "user/googleSignUpCB",
  async (idToken: string | null, { rejectWithValue }) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/google/cb/register`,
      { idToken }
    );

    if (res.status === 200) {
      return res.data;
    } else {
      toast.error(res.data);
      return rejectWithValue(res.data);
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
    // Register User
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(registerUser.rejected, (state) => {
      state.loading = false;
      localStorage.setItem("user", "{}");
    });

    // Login User
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state._id = action.payload._id;
      state.avatar = action.payload.avatar;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isEmailVerified = action.payload.isEmailVerified;
      state.organization = action.payload.organization;
      state.isAuth = true;
      localStorage.setItem("user", JSON.stringify(state));
      localStorage.setItem("accessToken", action.payload.accessToken);
    });

    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
      localStorage.setItem("user", "{}");
    });

    // Verify Email
    builder.addCase(verifyEmail.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(verifyEmail.fulfilled, (state, action) => {
      state.loading = false;
      state._id = action.payload._id;
      state.avatar = action.payload.avatar;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isEmailVerified = action.payload.isEmailVerified;
      state.organization = action.payload.organization;
      state.isAuth = true;
      localStorage.setItem("user", JSON.stringify(state));
      localStorage.setItem("accessToken", action.payload.accessToken);
    });

    builder.addCase(verifyEmail.rejected, (state) => {
      state.loading = false;
      localStorage.setItem("user", "{}");
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
        state.avatar = action.payload.avatar;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.isEmailVerified = action.payload.isEmailVerified;
        state.organization = action.payload.organization;
        state.isAuth = true;

        localStorage.setItem("user", JSON.stringify(state));
      });

      builder.addCase(action.rejected, (state) => {
        state.loading = false;
        localStorage.setItem("user", "{}");
      });
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
