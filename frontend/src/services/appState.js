import { displayToast, insertTask } from "../store/Actions/appState";

const setDisplayToast = (value) => (dispatch) => {
  dispatch(displayToast(value));
};

const getDisplayToast = (state) => {
  const {
    appState: { toastData },
  } = state;
  return toastData;
};

const displayInsertTask = (state) => {
  const {
    appState: { insertTask },
  } = state;
  return insertTask;
};

const setDisplayInsertTask = (value) => (dispatch) => {
  dispatch(insertTask(value));
};

export {
  getDisplayToast,
  setDisplayToast,
  displayInsertTask,
  setDisplayInsertTask,
};
