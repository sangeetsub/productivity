import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import TaskComponent from "./TaskComponent";
import { Grid, Button, Typography } from "@material-ui/core";
import InsertTask from "./forms/InsertTask";
import { getUser, isAuthenticated } from "../services/auth";
import { taskDescriptionsByQuarter } from "../utils/task";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { makeStyles } from "@material-ui/core/styles";
import AppDialog from "./AppDialog";
import { fetchTasks, getAllTasks } from "../services/tasks";
import {
  displayInsertTask,
  setDisplayInsertTask,
  setDisplayToast,
} from "../services/appState";

const useStyles = makeStyles(() => ({
  root: {
    width: "98%",
    margin: "auto",
    paddingTop: "5px",
  },
  quarterDiv: {
    borderRadius: 10,
    boxShadow: "2px 2px 2px 2px #092923",
    padding: "2px",
  },
}));

function TimeMetrix(props) {
  const classes = useStyles();
  const { fetchTasks, myTasks, openInsert } = props;

  useEffect(() => {
    if (props.user && props.user.id) {
      fetchTasks(props.user.id);
    }
  }, [props.user.id]);

  const getQSpecificTasks = (quarter) => {
    const quarterTasks = myTasks[`quarter_${quarter}`]
      ? Object.values(myTasks[`quarter_${quarter}`])
      : [];
    let qtask = [];
    if (quarterTasks && quarterTasks.length > 0) {
      qtask = quarterTasks.map((task) => {
        return (
          <TaskComponent key={task._id} task={task} history={props.history} />
        );
      });
    } else {
      qtask = <Typography> No Tasks available </Typography>;
    }
    return (
      <div className={classes.quarterDiv}>
        {makeTaskHeader(quarter)}
        {qtask}
      </div>
    );
  };

  const makeTaskHeader = (quarter) => {
    return (
      <h4>{`Quarter ${quarter} : ${taskDescriptionsByQuarter[quarter]}`}</h4>
    );
  };
  const handleAddTaskButton = () => {
    const { setDisplayInsertTask } = props;
    setDisplayInsertTask(true);
  };
  const componentHeader = () => {
    return (
      <Grid container spacing={3} direction={"row-reverse"}>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddTaskButton}
          >
            <AddBoxIcon /> Task
          </Button>
        </Grid>
      </Grid>
    );
  };
  const { isAuth } = props;
  return (
    <div className={classes.root}>
      {isAuth && myTasks ? (
        <React.Fragment>
          {componentHeader()}
          <Grid container spacing={2}>
            <Grid item xs={3}>
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
          </Grid>
          <AppDialog
            title="Insert Task"
            open={openInsert}
            onClose={() => props.setDisplayInsertTask(false)}
            body={<InsertTask />}
          />
        </React.Fragment>
      ) : (
        <div>
          <h2> You're not authenticated.</h2>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    user: getUser(state),
    isAuth: isAuthenticated(state),
    myTasks: getAllTasks(state),
    openInsert: displayInsertTask(state),
  };
};

const mapDispatchToProps = {
  fetchTasks,
  setDisplayInsertTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeMetrix);
