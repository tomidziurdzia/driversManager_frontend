import { createSlice } from "@reduxjs/toolkit";

export const platformSlice = createSlice({
  name: "platform",
  initialState: {
    platforms: [],
    platform: {},
    modalForm: false,
    modalDelete: false,
    errorMessage: undefined,
    loading: false,
  },
  reducers: {
    addPlatform: (state, action) => {
      state.platforms = [...state.platforms, action.payload];
    },
    viewAllPlatforms: (state, action) => {
      state.platforms = action.payload;
    },
    viewOnePlatform: (state, action) => {
      // state.platforms = [];
      state.platform = action.payload;
    },
    updatePlatform: (state, action) => {
      state.platforms = state.platforms.map((platform) => {
        if (platform._id === action.payload._id) {
          return action.payload;
        }
        return platform;
      });
    },
    deletePlatform: (state, action) => {
      state.platforms = state.platforms.filter(
        (platform) => platform._id !== action.payload
      );
    },
    onModalForm: (state) => {
      state.modalForm = !state.modalForm;
    },
    onModalDelete: (state) => {
      state.modalDelete = !state.modalDelete;
    },
    onError: (state, action) => {
      state.errorMessage = action.payload;
    },
    onLoading: (state, action) => {
      state.loading = action.payload;
    },
    onLogoutPlatform: (state) => {
      state.platforms = [];
      state.platform = {};
      state.modalForm = false;
      state.modalDelete = false;
      state.errorMessage = undefined;
      state.loading = false;
    },
  },
});
export const {
  addPlatform,
  onModalForm,
  onModalDelete,
  onError,
  viewAllPlatforms,
  viewOnePlatform,
  onLoading,
  platformEdit,
  updatePlatform,
  deletePlatform,
  onLogoutPlatform,
} = platformSlice.actions;
