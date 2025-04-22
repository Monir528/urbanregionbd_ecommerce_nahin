import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface CarouselImage {
  _id: string;
  filename: string;
  originalname: string;
  order: number;
  uploadedBy?: string;
  createdAt: string;
}

interface CarouselImagesState {
  images: CarouselImage[];
  loading: boolean;
  error: string | null;
}

const initialState: CarouselImagesState = {
  images: [],
  loading: false,
  error: null,
};

const BASE_URL = process.env.NEXT_PUBLIC_ROOT_API || "";

export const fetchCarouselImages = createAsyncThunk(
  "carouselImages/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/carousel-images`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Fetch failed");
    }
  }
);

export const uploadCarouselImage = createAsyncThunk(
  "carouselImages/upload",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/carousel-images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.image;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Upload failed");
    }
  }
);

export const deleteCarouselImage = createAsyncThunk(
  "carouselImages/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/api/carousel-images/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Delete failed");
    }
  }
);

export const reorderCarouselImages = createAsyncThunk(
  "carouselImages/reorder",
  async (ids: string[], { rejectWithValue }) => {
    try {
      await axios.patch(`${BASE_URL}/api/carousel-images/order`, { ids });
      return ids;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Reorder failed");
    }
  }
);

const carouselImagesSlice = createSlice({
  name: "carouselImages",
  initialState,
  reducers: {
    setImages(state, action) {
      state.images = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarouselImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCarouselImages.fulfilled, (state, action) => {
        state.images = action.payload;
        state.loading = false;
      })
      .addCase(fetchCarouselImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(uploadCarouselImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadCarouselImage.fulfilled, (state, action) => {
        state.images.push(action.payload);
        state.loading = false;
      })
      .addCase(uploadCarouselImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteCarouselImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCarouselImage.fulfilled, (state, action) => {
        state.images = state.images.filter((img) => img._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteCarouselImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(reorderCarouselImages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(reorderCarouselImages.fulfilled, (state, action) => {
        // Reorder images in state
        const idOrder = action.payload as string[];
        state.images.sort((a, b) => idOrder.indexOf(a._id) - idOrder.indexOf(b._id));
        state.loading = false;
      })
      .addCase(reorderCarouselImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setImages } = carouselImagesSlice.actions;
export default carouselImagesSlice.reducer;
