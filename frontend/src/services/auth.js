import { insertUser } from "../store/Actions/auth";

export const updateUser = (user) => (dispatch, getState) => {
  dispatch(insertUser(user));
};

export const getUser = (state) => {
  const {
    auth: { user },
  } = state;
  return user;
};

export const isAuthenticated = (state) => {
  const {
    auth: { isAuthenticated },
  } = state;
  return isAuthenticated;
};
