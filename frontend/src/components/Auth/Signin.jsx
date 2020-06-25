import React, { useState } from "react";
import { connect } from "react-redux";
import axios from 'axios'

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import axiosAuth from "../Service/axios/axiosAuth";
// import { displaySignup } from "../Service/appState";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function SignIn(props) {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    axios
      .post("http://localhost:8000/user/login", {
        email: email,
        password: password,
      })
      .then(function (response) {
        if (response.data && response.data.token) {
          localStorage.prodUserToken = response.data.token;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleEmailInput = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmailInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordInput}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSignin}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                size="small"
                variant="text"
                color="primary"
                onClick={() => {
                  // props.displaySignup(true);
                }}
              >
                Don't have an account? Sign Up!
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapDispatchToProps = {
  // displaySignup,
};
export default SignIn;
// export default connect(null, mapDispatchToProps)(SignIn);
