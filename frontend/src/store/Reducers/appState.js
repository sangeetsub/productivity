import {
  INSERT_TASK,
  DELETE_TASK,
  EDIT_TASK,
  DISPLAY_TOAST,
} from "../Actions/appState";

const defaultToastData = {
  open: false,
  message: null,
  variant: null,
  length: null,
  severity: null,
};

const initialState = {
  insertTask: false,
  deleteTask: false,
  editTask: false,
  toastData: defaultToastData,
};

export function appState(state = initialState, action) {
  switch (action.type) {
    case INSERT_TASK:
      return { ...state, insertTask: action.value };
    case DELETE_TASK:
      return { ...state, deleteTask: action.value };
    case EDIT_TASK:
      return { ...state, editTask: action.value };
    case DISPLAY_TOAST:
      if (action.value) {
        return {
          ...state,
          toastData: {
            open: action.value.open,
            message: action.value.message,
            variant: action.value.variant ? action.value.variant : "filled",
            length: action.value.length ? action.value.length : 3000,
            severity: action.value.severity ? action.value.severity : "success",
          },
        };
      } else {
        return { ...state, toastData: defaultToastData };
      }

    default:
      return state;
  }
}
