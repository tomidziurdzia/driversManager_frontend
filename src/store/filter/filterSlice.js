import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    page: 1,
    travelPerPage: 5,
  },
  reducers: {
    pageTravels: (state, action) => {
      state.page = action.payload;
    },
  },
});
export const { pageTravels } = filterSlice.actions;
