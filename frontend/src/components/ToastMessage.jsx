import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setDisplayToast, getDisplayToast } from "../services/appState";

function Alert(props) {
  return <MuiAlert elevation={6} variant={props.variant} {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

function ToastMessage(props) {
  const { toastData } = props;
  const { open, message, variant, length, severity } = toastData;
  const classes = useStyles();

  const handleClose = () => {
    const { setDisplayToast } = props;
    setDisplayToast(false);
  };

  const origin = { vertical: "bottom", horizontal: "center" };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={length ? length : 1000}
        anchorOrigin={origin}
        onClose={handleClose}
      >
        <Alert
          severity={severity ? severity : "success"}
          variant={variant ? variant : "filled"}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    toastData: getDisplayToast(state),
  };
};

const mapDispatchToProps = {
  setDisplayToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(ToastMessage);
