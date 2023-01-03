import clientAxios from "../../config/clientAxios";
import {
  addTravel,
  viewAllTravels,
  viewOneTravel,
  updateTravel,
  deleteTravel,
  onModalForm,
  onError,
} from "./travelSlice";

export const newTravel = (travel) => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios.post("/travels", travel);
      dispatch(addTravel(data));
      dispatch(onModalForm());
    } catch (error) {
      dispatch(onError({ msg: error.response.data.msg, type: true }));
    }
  };
};

export const viewTravels = () => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios("/travels");
      data.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
      dispatch(viewAllTravels(data));
    } catch (error) {
      dispatch(onError({ msg: error.response.data.msg, type: true }));
    }
  };
};

export const viewTravel = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios(`/travels/${id}`);
      dispatch(viewOneTravel(data));
    } catch (error) {
      dispatch(onError({ msg: error.response.data.msg, type: true }));
    }
  };
};

export const putTravel = (travel, id) => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios.put(`/travels/${id}`, travel);
      dispatch(updateTravel(data));
      dispatch(viewTravel(id));
    } catch (error) {
      dispatch(onError({ msg: error.response.data.msg, type: true }));
    }
  };
};

export const delTravel = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await clientAxios.delete(`/travels/${id}`);
      dispatch(deleteTravel(data));
      dispatch(viewTravels());
    } catch (error) {
      console.log(error);
    }
  };
};
