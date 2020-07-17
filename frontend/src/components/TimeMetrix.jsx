import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useState } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  Grid,
  Paper,
  Typography,
  CardHeader,
  Card,
  IconButton,
  CardContent,
  Avatar,
  CardActions,
  Button,
  ListItemSecondaryAction,
  ListItemIcon,
  Menu,
  Fade,
  MenuItem,
} from "@material-ui/core";
import InsertTask from "./forms/InsertTask";
import { getUser, isAuthenticated } from "../services/auth";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
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

  const [anchorEl, setAnchorEl] = React.useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleActionMenuClicked = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleActionMenuClose = () => {
    setAnchorEl(null);
  };

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
          <React.Fragment  key={task._id}>
            <ListItem
              key={task._id}
              style={{ background: "#C7F0DB" }}
              divider
              button
              onClick={() => {
                props.history.push(`/task/${task._id}`);
              }}
              alignItems="flex-start"
            >
              <ListItemIcon>
                <Avatar></Avatar>
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">{task.name}</Typography>}
                secondary={<Typography>{task.description}</Typography>}
              ></ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  
                  onClick={handleActionMenuClicked}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={menuOpen}
                  onClose={handleActionMenuClose}
                >
                  <MenuItem onClick={handleActionMenuClose}>Delete</MenuItem>
                  <MenuItem onClick={handleActionMenuClose}>Edit</MenuItem>
                </Menu>
              </ListItemSecondaryAction>
            </ListItem>
          </React.Fragment>
        );
      });
      return (
        <div>
          {makeTaskHeader(quarter)} <List>{qtask}</List>
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
