import React, { useState } from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { getUser } from "../../services/auth";
import { insertSingleTask } from "../../services/tasks";

// try to convert forms to use from react-hook-form

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
  },
  submit: {
    margin: theme.spacing(3, "80%", 2),
  },
}));

function InsertTask(props) {
  const classes = useStyles();
  const [taskName, setTaskName] = useState("");
  const [importancy, setImportancy] = useState("0");
  const [urgency, setUrgency] = useState("0");
  const [description, setDescription] = useState("");

  const { user, insertSingleTask } = props;

  const handleInsertTask = () => {
    const task = {
      name: taskName,
      description: description,
      importancy: importancy,
      urgency: urgency,
      userId: user.id,
    };
    insertSingleTask(task);
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

const mapStateToProps = function (state) {
  return {
    user: getUser(state),
   
  };
};

const mapDispatchToProps = {
  insertSingleTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(InsertTask);
