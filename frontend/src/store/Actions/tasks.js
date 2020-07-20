export const INSERT_A_TASK = "INSERT_A_TASK";
export const INSERT_ALL_TASKS = "INSERT_ALL_TASKS";
export const DELETE_A_TASK = "DELETE_A_TASK";
export const UPDATE_A_TASK = "UPDATE_A_TASK";

export const insertATask = (value, quarter) => {
  return {
    type: INSERT_A_TASK,
    value,
    q: quarter,
  };
};

export const insertAllTasks = (value) => {
  return {
    type: INSERT_ALL_TASKS,
    value,
  };
};

export const deleteATask = (taskId, quarter) => {
  return {
    type: DELETE_A_TASK,
    taskId,
    q: quarter
  };
};

export const updateATask = (value) => {
  return {
    type: UPDATE_A_TASK,
    value,
  };
};
