import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import InsertTask from "./forms/InsertTask";
import { getUser, isAuthenticated } from "../services/auth";
import {
  taskDescriptionMapper,
  taskQuarterMapper,
  taskInQArray,
  taskDescriptionsByQuarter,
} from "../utils/task";
import { Link } from "react-router-dom";
import background from "../images/background.jpg";

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

  const tasksQArr = taskInQArray(myTasks);

  const getQSpecificTasks = (quarter) => {
    const quarterTasks = tasksQArr[quarter];
    if (quarterTasks && quarterTasks.length > 0) {
      const qtask = quarterTasks.map((task) => {
        return (
          <Paper key={task._id} style={{ background: "#C7F0DB" }}>
            <h2> {task.name}</h2>
            <Typography align="left">
              <b>Description: </b> {task.description}
            </Typography>
            <Link to={`/task/${task._id}`}> More Details </Link>
          </Paper>
        );
      });
      return (
        <div>
          {makeTaskHeader(quarter)} <div>{qtask}</div>
        </div>
      );
    }
    return null;
  };

  const makeTaskHeader = (quarter) => {
    return (
      <h4>{`Quarter ${quarter} : ${taskDescriptionsByQuarter[quarter]}`}</h4>
    );
  };
  const { isAuth } = props;
  return (
    <div>
      {isAuth && myTasks ? (
        <Grid container spacing={2}>
          <Grid item xs={3}>
            {console.log("rendered tass")}
            {getQSpecificTasks(1)}
          </Grid>
          <Grid item xs={3}>
            {getQSpecificTasks(2)}
          </Grid>
          <Grid item xs={3}>
            {getQSpecificTasks(3)}
          </Grid>
          <Grid item xs={3}>
            {getQSpecificTasks(4)}
          </Grid>
          {/* <Grid item xs={6}>
            <InsertTask />
          </Grid> */}
        </Grid>
      ) : (
        <div>
          <img src={background} width={"100%"} />;
        </div>
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
