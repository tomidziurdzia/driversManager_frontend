import { configureStore } from "@reduxjs/toolkit";
import { platformSlice } from "./platform/platformSlice";
import { authSlice } from "./auth/authSlice";
import { vehicleSlice } from "./vehicle/vehicleSlice";
import { travelSlice } from "./travel/travelSlice";
import { filterSlice } from "./filter/filterSlice";

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    platform: platformSlice.reducer,
    vehicle: vehicleSlice.reducer,
    travel: travelSlice.reducer,
    filter: filterSlice.reducer,
  },
});
