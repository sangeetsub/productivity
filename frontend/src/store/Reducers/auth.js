import { INSERT_USER, SET_AUTH_ERROR } from "../Actions/auth";

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case INSERT_USER:
      return { ...state, isAuthenticated: true, user: action.user };
    default:
      return state;
  }
}
