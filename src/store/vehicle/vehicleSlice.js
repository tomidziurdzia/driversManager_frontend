import { createSlice } from "@reduxjs/toolkit";

export const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    vehicles: [],
    vehicle: {},
    modalForm: false,
    modalDelete: false,
    errorMessage: undefined,
    loading: false,
  },
  reducers: {
    addVehicle: (state, action) => {
      state.vehicles = [...state.vehicles, action.payload];
    },
    viewAllVehicles: (state, action) => {
      state.vehicles = action.payload;
      state.vehicle = {};
    },
    viewOneVehicle: (state, action) => {
      state.vehicle = action.payload;
    },
    updateVehicle: (state, action) => {
      state.vehicles = state.vehicles.map((vehicle) => {
        if (vehicle._id === action.payload._id) {
          return action.payload;
        }
        return vehicle;
      });
    },
    deleteVehicle: (state, action) => {
      state.vehicles = state.vehicles.filter(
        (vehicle) => vehicle._id !== action.payload
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
    onLogoutVehicle: (state) => {
      state.vehicles = [];
      state.vehicle = {};
      state.modalForm = false;
      state.modalDelete = false;
      state.errorMessage = undefined;
      state.loading = false;
    },
  },
});
export const {
  addVehicle,
  viewAllVehicles,
  viewOneVehicle,
  updateVehicle,
  deleteVehicle,
  onModalForm,
  onModalDelete,
  onError,
  onLoading,
  onLogoutVehicle,
} = vehicleSlice.actions;
