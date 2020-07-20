import {
  INSERT_A_TASK,
  INSERT_ALL_TASKS,
  DELETE_A_TASK,
  UPDATE_A_TASK,
} from "../Actions/tasks";

const initialState = {
  quarter_1: {},
  quarter_2: {},
  quarter_3: {},
  quarter_4: {},
};

export function tasks(quarters = initialState, action) {
  switch (action.type) {
    case INSERT_ALL_TASKS:
      return {
        ...quarters,
        quarter_1: action.value.quarter_1,
        quarter_2: action.value.quarter_2,
        quarter_3: action.value.quarter_3,
        quarter_4: action.value.quarter_4,
      };
    case INSERT_A_TASK:
      switch (action.q) {
        case 1:
          return {
            ...quarters,
            quarter_1: {
              ...quarters.quarter_1,
              [action.taskId]: action.value,
            },
          };
        case 2:
          return {
            ...quarters,
            quarter_2: {
              ...quarters.quarter_2,
              [action.taskId]: action.value,
            },
          };
        case 3:
          return {
            ...quarters,
            quarter_3: {
              ...quarters.quarter_3,
              [action.taskId]: action.value,
            },
          };
        case 4:
          return {
            ...quarters,
            quarter_4: {
              ...quarters.quarter_4,
              [action.taskId]: action.value,
            },
          };
      }
    case DELETE_A_TASK:
      const temp = {};
      switch (action.q) {
        case 1:
          const {
            [action.value._id]: value1,
            ...restValue1
          } = quarters.quarter_1;
          return {
            ...quarters,
            quarter_1: { restValue1 },
          };
        case 2:
          const {
            [action.value._id]: value2,
            ...restValue2
          } = quarters.quarter_2;
          return {
            ...quarters,
            quarter_2: { restValue2 },
          };
        case 3:
          const {
            [action.value._id]: value3,
            ...restValue3
          } = quarters.quarter_3;
          return {
            ...quarters,
            quarter_3: { restValue3 },
          };
        case 4:
          const {
            [action.value._id]: value4,
            ...restValue4
          } = quarters.quarter_4;
          return {
            ...quarters,
            quarter_4: { restValue4 },
          };
      }
    default:
      return quarters;
  }
}
