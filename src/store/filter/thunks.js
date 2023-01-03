import { pageTravels } from "./filterSlice";

export const setPage = (page) => {
  return (dispatch) => {
    dispatch(pageTravels(page));
  };
};
