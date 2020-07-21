import React from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import axios from "axios";
import { useState } from "react";
import ConfirmDialogModal from "./ConfirmDialogModal";
import { Alert, AlertTitle } from "@material-ui/lab";
import { deleteSingleTask} from '../services/tasks'
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 10,
    padding: "5px",
  },
  taskDiv: {
    backgroundColor: "#C7F0DB",
    borderRadius: 10,
  },
  mainSection: {
    alignItems: "left",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  link: {
    color: "#0645AD",
    cursor: "pointer",
  },
  buttonAction: {
    color: "#BF2727",
  },
}));

function TaskComponent(props) {
  const classes = useStyles();
  const { task } = props;
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [alert, setAlert] = useState(null);
  const { deleteSingleTask} = props; 

  const deleteTask = (task) => {
    deleteSingleTask(task)
  };

  const wrapLongText = (text, limit) => {
    if (text && text.length > limit) {
      return `${text.substr(0, limit - 3)}...`;
    }
    return text;
  };

  return (
    <div className={classes.root}>
      <ConfirmDialogModal
        open={openDeleteModal}
        title="Delete Task"
        onClose={() => setOpenDeleteModal(false)}
        confirmText={`Are you sure you want to delete ${task.name}`}
        onAgree={() => {
          deleteTask(task);
        }}
      />
      {alert && <Alert severity={alert.type}>{alert.message}</Alert>}
      <Grid container spacing={1} className={classes.taskDiv}>
        <Grid
          item
          container
          xs={10}
          direction={"column"}
          alignItems={"flex-start"}
        >
          <Grid item className={classes.mainSection}>
            <Typography
              className={classes.link}
              variant="h5"
              onClick={() => props.history.push(`/task/${task._id}`)}
            >
              {wrapLongText(task.name, 25)}
            </Typography>
          </Grid>
          <Grid item className={classes.mainSection}>
            <Typography variant="subtitle1"> {task.createdAt}</Typography>
          </Grid>
          <Grid item className={classes.mainSection}>
            <Typography align="left">
              {wrapLongText(task.description, 36)}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          direction="column"
          xs={1}
          alignItems="flex-end"
          justify="flex-start"
        >
          <Grid item>
            <IconButton
              aria-label="Edit Task"
              component="span"
              size="small"
              onClick={() => {
                console.log(task.name);
              }}
            >
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="Delete Task"
              component="span"
              size="small"
              onClick={() => setOpenDeleteModal(true)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const mapDispatchToProps = {
  deleteSingleTask
}

export default connect(null, mapDispatchToProps)(TaskComponent) ;
