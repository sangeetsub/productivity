import axios from "axios";
import {
  insertAllTasks,
  insertATask,
  deleteATask,
} from "../store/Actions/tasks";
import { taskQuarterMapper } from "../utils/task";

const fetchTasks = (userId) => (dispatch) => {
  axios
    .get(`http://localhost:8000/task/tasks/id?${userId}`)
    .then(function (response) {
      // handle success
      const preparedData = prepareQuarters(response.data);
      dispatch(insertAllTasks(preparedData));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};

const prepareQuarters = (data) => {
  const tasks = {
    quarter_1: {},
    quarter_2: {},
    quarter_3: {},
    quarter_4: {},
  };
  if (data !== null && data.length > 0) {
    data.forEach((task) => {
      const index = taskQuarterMapper[task.urgency][task.importancy];
      const prepIndex = `quarter_${index}`;
      tasks[prepIndex] = { ...tasks[prepIndex], [task._id]: task };
    });
  }
  return tasks;
};

const insertSingleTask = (task) => (dispatch) => {
  const quarter = taskQuarterMapper[task.urgency][task.importancy];
  dispatch(insertATask(task, quarter));
};

const getAllTasks = (state) => {
  const { tasks } = state;
  return tasks;
};

const deleteSingleTask = (task) => (dispatch) => {
  const quarter = taskQuarterMapper[task.urgency][task.importancy];
  dispatch(deleteATask(task._id, quarter));
};

export { fetchTasks, insertSingleTask, getAllTasks, deleteSingleTask };
