export const INSERT_USER = "INSERT_USER";
export const SET_AUTH_ERROR = "INSERT_AUTH_ERROR";

export const insertUser = (user) => {
  return {
    type: INSERT_USER,
    user,
  };
};

export const setError = (error) => {
  return {
    type: SET_AUTH_ERROR,
    error,
  };
};
