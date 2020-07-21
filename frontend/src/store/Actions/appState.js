export const INSERT_TASK = "INSERT_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const INSERT_SPECIFIC_TASK = 'INSERT_SPECIFIC_TASK'; 

export const DISPLAY_TOAST = 'DISPLAY_TOAST'; 

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

export const insertATask = (value) => {
  return {
    type: INSERT_SPECIFIC_TASK, 
    value
  }
}

export const displayToast = (value) => {
  return {
    type: DISPLAY_TOAST, 
    value
  }
}
