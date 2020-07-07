import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  linkButton: {
    borderRadius: 6,
    boxShadow: "0 3px 5px 2px #4fb3bf",
    padding: "8px 20px",
    color: "white",
    fontSize: 15,
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();

  const handleLogout = () => {
    delete localStorage.prodUserToken;
    window.location.href = "/";
  };

  const { isAuth } = props;

  // till we use link.
  const rerouteTo = (location) => {
    window.location.href = location;
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <HomeIcon onClick={() => rerouteTo("/")} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ExtraProductive
          </Typography>
          {!isAuth && (
            <Button
              onClick={() => rerouteTo("/signup")}
              className={classes.linkButton}
            >
              Signup
            </Button>
          )}
          {!isAuth && (
            <Button
              onClick={() => rerouteTo("/signin")}
              className={classes.linkButton}
            >
              Signin
            </Button>
          )}

          {isAuth && (
            <Button onClick={handleLogout} className={classes.linkButton}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    isAuth: isAuthenticated(state),
  };
};

export default connect(mapStateToProps)(ButtonAppBar);
