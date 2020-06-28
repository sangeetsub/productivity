export const INSERT_TASK = "INSERT_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";

export const insertTask = (value) => {
  return {
    type: INSERT_TASK,
    value,
  };
};

export const editTask = (value) => {
  return {
    type: EDIT_TASK,
    value,
  };
};

export const deleteTask = (value) => {
  return {
    type: DELETE_TASK,
    value,
  };
};
