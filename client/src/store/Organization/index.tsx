import {
  AsyncThunkAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

interface createOrganizationForm {
  name: string;
  size: string;
  industry: string;
}

export interface OrganizationState {
  _id: string;
  owner: string;
  name: string;
  size: string;
  industry: string;
  loading: boolean;
}

const initialState: OrganizationState = {
  _id: "",
  owner: "",
  name: "",
  size: "",
  industry: "",
  loading: false,
};

interface CreateOrganizationForm {
  name: string;
  size: string;
  industry: string;
}

// Create Organization
export const createOrganization = createAsyncThunk(
  "organization/create",
  async (
    createOrganizationForm: CreateOrganizationForm,
    { rejectWithValue }
  ) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/organization`,
      createOrganizationForm
    );

    if (res.status === 200) {
      return res.data;
    } else {
      toast.error(res.data);
      return rejectWithValue(res.data);
    }
  }
);

export const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    setOrganization: (state, action: PayloadAction<OrganizationState>) => {
      state._id = action.payload._id;
      state.owner = action.payload.owner;
      state.name = action.payload.name;
      state.size = action.payload.size;
      state.industry = action.payload.industry;
    },

    clearOrganization: (state) => {
      state._id = "";
      state.owner = "";
      state.name = "";
      state.size = "";
      state.industry = "";
      localStorage.setItem("organization", JSON.stringify({}));
    },
  },
  extraReducers: (builder) => {
    // Create Organization
    builder.addCase(createOrganization.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createOrganization.fulfilled, (state, action) => {
      state.loading = false;
      state._id = action.payload._id;
      state.owner = action.payload.owner;
      state.name = action.payload.name;
      state.size = action.payload.size;
      state.industry = action.payload.industry;
      localStorage.setItem("organization", JSON.stringify(action.payload));
    });

    builder.addCase(createOrganization.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const { setOrganization } = organizationSlice.actions;

export default organizationSlice.reducer;
