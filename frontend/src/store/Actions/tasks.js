export const INSERT_A_TASK = "INSERT_A_TASK";
export const INSERT_ALL_TASKS = "INSERT_ALL_TASKS";
export const DELETE_A_TASK = "DELETE_A_TASK";
export const UPDATE_A_TASK = "UPDATE_A_TASK";

export const insertATask = (value) => {
  return {
    type: INSERT_A_TASK,
    value,
  };
};

export const insertAllTasks = (value) => {
  return {
    type: INSERT_ALL_TASKS,
    value,
  };
};

export const deleteATask = (value) => {
  return {
    type: DELETE_A_TASK,
    value,
  };
};

export const updateATask = (value) => {
  return {
    type: UPDATE_A_TASK,
    value,
  };
};
