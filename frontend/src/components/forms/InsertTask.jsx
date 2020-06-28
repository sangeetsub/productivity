import React, { useState } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import axios from "axios";

import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import NoteAddIcon from "@material-ui/icons/NoteAdd";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { getUser } from "../../services/auth";

// try to convert forms t tu use from react-hook-form

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function InsertTask(props) {
  const classes = useStyles();
  const [taskName, setTaskName] = useState("");
  const [importancy, setImportancy] = useState("0");
  const [urgency, setUrgency] = useState("0");
  const [description, setDescription] = useState("");

  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const { user } = props;

  const handleInsertTask = () => {
    console.log("handle insert clicked");
    axios
      .post("http://localhost:8000/task/insert", {
        name: taskName,
        description: description,
        importancy: importancy,
        urgency: urgency,
        userId: user.id,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleImportancy = (event) => {
    setImportancy(event.target.value);
  };

  const handleUrgency = (event) => {
    setUrgency(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <NoteAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Insert New Task
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Task Name"
                autoFocus
                onChange={(event) => setTaskName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend"> Urgency </FormLabel>
                <RadioGroup
                  row
                  aria-label="Urgency"
                  name="urgency"
                  value={urgency}
                  onChange={handleUrgency}
                >
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="Not Urgent"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label=" Urgent"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend"> Importancy </FormLabel>
                <RadioGroup
                  row
                  aria-label="Importancy"
                  name="importancy"
                  value={importancy}
                  onChange={handleImportancy}
                >
                  <FormControlLabel
                    labelPlacement="end"
                    value="0"
                    control={<Radio />}
                    label="Not Important"
                  />
                  <FormControlLabel
                    labelPlacement="end"
                    value="1"
                    control={<Radio />}
                    label="Important"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                fullWidth
                rows={4}
                defaultValue="Default Value"
                variant="outlined"
                onChange={(event) => setDescription(event.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleInsertTask}
          >
            Insert
          </Button>
          <Grid container justify="flex-end"></Grid>
        </form>
      </div>
    </Container>
  );
}

const mapDispatchToProps = {
  //displaySignin,
};

const mapStateToProps = function (state) {
  return {
    user: getUser(state),
  };
};

//export default InsertTask;
export default connect(mapStateToProps, mapDispatchToProps)(InsertTask);
