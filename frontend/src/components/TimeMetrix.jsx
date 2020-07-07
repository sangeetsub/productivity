import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import InsertTask from "./forms/InsertTask";
import { getUser, isAuthenticated } from "../services/auth";
import { taskDescriptionMapper } from "../utils/task";
import { Link } from "react-router-dom";

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
      const category = (taskDescription = myTasks.map((task) => (
        <Paper key={task._id} style={{ background: "#C7F0DB" }}>
          <h2> {task.name}</h2>
          <Typography align="left">
            <b>Description: </b> {task.description}
            <b>
              Priority: {taskDescriptionMapper[task.urgency][task.importancy]}
            </b>
          </Typography>
          <Link to={`/task/${task._id}`}> More Details </Link>
        </Paper>
      )));
    }

    return taskDescription;
  };

  const { isAuth } = props;
  console.log(isAuth);
  return (
    <div>
      {isAuth ? (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h1> My Tasks </h1>
            {myTasks && taskMapper()}
          </Grid>
          <Grid item xs={6}>
            <InsertTask />
          </Grid>
        </Grid>
      ) : (
        <h3>You're not logged in. </h3>
      )}
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    user: getUser(state),
    isAuth: isAuthenticated(state),
  };
};
export default connect(mapStateToProps)(TimeMetrix);
