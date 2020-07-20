import axios from "axios";
import { insertTask } from "../store/Actions/appState";


const fetchTasks = (userId) => {
  axios
    .get(`http://localhost:8000/task/tasks/id?${props.user.id}`)
    .then(function (response) {
      // handle success
      setMyTasks(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};

const insertTask = (task) = {
    
} 

export { fetchTasks };
