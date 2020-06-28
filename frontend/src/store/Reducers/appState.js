import { INSERT_TASK, DELETE_TASK, EDIT_TASK } from "../Actions/appState";

const initialState = {
  insertTask: false,
  deleteTask: false,
  editTask: false,
};

export function appState(state = initialState, action) {
  switch (action.type) {
    case INSERT_TASK:
      return { ...state, insertTask: action.value };
    case DELETE_TASK:
      return { ...state, deleteTask: action.value };
    case EDIT_TASK:
      return { ...state, editTask: action.value };
    default:
      return state;
  }
}
