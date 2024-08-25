import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SummaryApi from "../utils/SummaryApi";
import { toast } from "react-toastify";

export const fetchProduct = createAsyncThunk(
  "fetchProduct",
  async (_, { rejectedWithValue }) => {
    try {
      const response = await fetch(SummaryApi.allProducts.url, {
        method: SummaryApi.allProducts.method,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectedWithValue(error);
    }
  }
);

export const uploadProduct = createAsyncThunk(
  "uploadProduct",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const apidata = await response.json();
      console.log(apidata);
      return apidata;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(SummaryApi.categoryList.url);
      const data = await response.json();
      return data.categoryList;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    success: false,
    error: null,
    categoryList: [],
    productDialog: false,
  },
  reducers: {
    setCategoryList: (state, action) => {
      state.categoryList = action.payload;
    },
    setProductDialog: (state, action) => {
      state.productDialog = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.success = true;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(uploadProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = [...state.products, action.payload.data];
        toast.success(action.payload.message);
      })
      .addCase(uploadProduct.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.success = false;
      })
      .addCase(fetchCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryList = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const { setCategoryList, setProductDialog } = productSlice.actions;
export default productSlice.reducer;
