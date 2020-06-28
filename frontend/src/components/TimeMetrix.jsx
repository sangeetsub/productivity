import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { Grid } from "@material-ui/core";
import InsertTask from "./forms/InsertTask";
import { getUser } from "../services/auth";

function TimeMetrix(props) {
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    if (props.user && props.user.id) {
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
    }
  }, [props.user.id]);

  const taskMapper = () => {
    let taskDescription = "No Tasks Yet";

    if (myTasks !== null && myTasks.length > 0) {
      taskDescription = myTasks.map((task) => (
        <div key={task._id}>
          <h2> {task.name}</h2>
          <h4>Description</h4> : {task.description}
          <h4>User Id : </h4> : {task.userId}
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

const mapStateToProps = function (state) {
  return {
    user: getUser(state),
  };
};
export default connect(mapStateToProps)(TimeMetrix);
