import clientAxios from "../../config/clientAxios";
import {
  addPlatform,
  onError,
  onLoading,
  onModalForm,
  viewAllPlatforms,
  viewOnePlatform,
  updatePlatform,
  deletePlatform,
} from "./platformSlice";

export const newPlatform = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios.post("/platforms", { name });
      dispatch(addPlatform(data));
      dispatch(onModalForm());
    } catch (error) {
      dispatch(onError({ msg: error.response.data.msg, type: true }));
    }
  };
};

export const viewPlatforms = () => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios("/platforms");
      dispatch(viewAllPlatforms(data));
    } catch (error) {
      dispatch(onError({ msg: error.response.data.msg, type: true }));
    }
  };
};

export const viewPlatform = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios(`/platforms/${id}`);
      data.travels.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
      dispatch(viewOnePlatform(data));
    } catch (error) {
      console.log(error);
      dispatch(onError({ msg: error.response.data.msg, type: true }));
    }
  };
};

export const putPlatform = (name, id) => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios.put(`/platforms/${id}`, { name });
      dispatch(updatePlatform(data));
      dispatch(viewOnePlatform(data));
    } catch (error) {
      dispatch(onError({ msg: error.response.data.msg, type: true }));
    }
  };
};

export const delPlatform = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios.delete(`/platforms/${id}`);
      dispatch(deletePlatform(data));
      dispatch(viewPlatforms());
    } catch (error) {
      console.log(error);
    }
  };
};
