import {
  INSERT_A_TASK,
  INSERT_ALL_TASKS,
  DELETE_A_TASK,
  UPDATE_A_TASK,
} from "../Actions/tasks";

const initialState = {};

export function tasks(state = initialState, action) {
  const quarter = 1;
  switch (action.type) {
    case INSERT_ALL_TASKS:
      return { state: action.value };
    case INSERT_A_TASK:
      return { ...state, ...action.value };
    default:
      return state;
  }
}
