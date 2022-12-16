import clientAxios from "../../config/clientAxios";
import {
  addVehicle,
  viewAllVehicles,
  viewOneVehicle,
  updateVehicle,
  deleteVehicle,
  onModalForm,
  onError,
  onLoading,
} from "./vehicleSlice";

export const newVehicle = (vehicle) => {
  if (vehicle.typeVehicle === "Bike") {
    vehicle.patent = `Bike ${Date.now()}`;
    vehicle.rego = null;
  }

  return async (dispatch) => {
    try {
      const { data } = await clientAxios.post("/vehicles", vehicle);
      dispatch(addVehicle(data));
      dispatch(onModalForm());
    } catch (error) {
      dispatch(onError({ msg: error.response.data.msg, type: true }));
    }
  };
};

export const viewVehicles = () => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios("/vehicles");
      dispatch(viewAllVehicles(data));
    } catch (error) {
      dispatch(onError({ msg: error.response.data.msg, type: true }));
    }
  };
};

export const viewVehicle = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios(`/vehicles/${id}`);
      dispatch(viewOneVehicle(data));
    } catch (error) {
      console.log(error);
      dispatch(onError({ msg: error.response.data.msg, type: true }));
    }
  };
};

export const putVehicle = (vehicle, id) => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios.put(`/vehicles/${id}`, vehicle);
      dispatch(updateVehicle(data));
      dispatch(viewOneVehicle(data));
    } catch (error) {
      dispatch(onError({ msg: error.response.data.msg, type: true }));
    }
  };
};

export const delVehicle = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios.delete(`/vehicles/${id}`);
      dispatch(deleteVehicle(data));
    } catch (error) {
      console.log(error);
    }
  };
};
