import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import SummaryApi from "../utils/SummaryApi";

const saveUserToLocalStorage = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(SummaryApi.signin.url, {
      method: SummaryApi.signin.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const apiData = await response.json();
    if (apiData.success) {
      saveUserToLocalStorage(apiData.userDetails);
      return apiData;
    } else {
      return rejectWithValue(apiData.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(SummaryApi.logout.url, {
      method: SummaryApi.logout.method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      localStorage.removeItem("user");
      localStorage.removeItem("cartItems");
      return result;
    } else {
      return rejectWithValue(result.message);
    }
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    message: null,
    success: false,
  },
  reducers: {
    setUserLogout: (state, action) => {
      state.user = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.userDetails;
        state.message = action.payload.message;
        state.success = action.payload.success;
        toast.success(state.message);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.success = false;
        toast.error(state.message);
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.loading = true;
        state.message = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = action.payload.success;
        state.user = null;
        toast.success(state.message);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = false;
      });
  },
});

export const { setUserDetails, setUserLogout } = userSlice.actions;

export default userSlice.reducer;
