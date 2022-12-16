import clientAxios from "../../config/clientAxios";
import { onLogoutPlatform } from "../platform/platformSlice";
import { onLogoutTravel } from "../travel/travelSlice";
import { onLogoutVehicle } from "../vehicle/vehicleSlice";
import { onChecking, onLogin, onLogout } from "./authSlice";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(onChecking());
  };
};

export const startLogin = (email, password) => {
  return async (dispatch) => {
    dispatch(onChecking());

    try {
      const { data } = await clientAxios.post("/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      dispatch(onLogin(data));
    } catch (error) {
      dispatch(onLogout({ msg: error.response.data.msg, error: true }));
    }
  };
};

export const checkAuthToken = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await clientAxios("users/perfil");
      localStorage.setItem("token", data.token);
      dispatch(onLogin(data));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(onLogoutTravel());
    dispatch(onLogoutPlatform());
    dispatch(onLogoutVehicle());
  };
};
