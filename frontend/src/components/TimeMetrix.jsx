import React, { useEffect } from "react";

import axios from "axios";
import { useState } from "react";
import { Grid } from "@material-ui/core";
import InsertTask from "./forms/InsertTask";

function TimeMetrix() {
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/task/tasks")
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
  }, [false]);

  const taskMapper = () => {
    let taskDescription = "No Tasks Yet";

    if (myTasks !== null && myTasks.length > 0) {
      taskDescription = myTasks.map((task) => (
        <div key={task._id}>
          <h2> {task.name}</h2>
          Description : {task.description}
          userId : {task.userId}
        </div>
      ));
    }

    return taskDescription;
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h1> My Tasks </h1>
          {myTasks && taskMapper()}
        </Grid>
        <Grid item xs={6}>
          <InsertTask />
        </Grid>
      </Grid>
    </div>
  );
}

export default TimeMetrix;
