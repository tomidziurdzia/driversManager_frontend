import { createSlice } from "@reduxjs/toolkit";

export const travelSlice = createSlice({
  name: "travel",
  initialState: {
    travels: [],
    travel: {},
    modalForm: false,
    modalDelete: false,
    errorMessage: undefined,
    loading: false,
  },
  reducers: {
    addTravel: (state, action) => {
      state.travels = [...state.travels, action.payload];
    },

    viewAllTravels: (state, action) => {
      state.travels = action.payload;
      state.travel = {};
    },
    viewOneTravel: (state, action) => {
      state.travel = action.payload;
    },
    updateTravel: (state, action) => {
      state.travels = state.travels.map((travel) => {
        if (travel._id === action.payload._id) {
          return action.payload;
        }
        return travel;
      });
    },
    deleteTravel: (state, action) => {
      state.travels = state.travels.filter(
        (travel) => travel._id !== action.payload
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
    onLogoutTravel: (state, action) => {
      state.travels = [];
      state.travel = {};
      state.modalForm = false;
      state.modalDelete = false;
      state.errorMessage = undefined;
      state.loading = false;
    },
  },
});

export const {
  addTravel,
  viewAllTravels,
  viewOneTravel,
  updateTravel,
  deleteTravel,
  onModalForm,
  onModalDelete,
  onError,
  onLoading,
  onLogoutTravel,
} = travelSlice.actions;
