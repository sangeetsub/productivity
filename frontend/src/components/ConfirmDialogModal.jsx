import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function ConfirmDialogModal(props) {
  const {
    title,
    onClose,
    confirmText,
    open,
    onAgree,
    agreeText,
    disagreeText,
  } = props;

  const agreeDisplayText = agreeText ? agreeText : "Yes";
  const disagreeDisplayText = disagreeText ? disagreeText : "No";

  return (
    <div>
      <Dialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>{confirmText}</DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{disagreeDisplayText}</Button>
          <Button
            onClick={() => {
              onAgree();
              onClose();
            }}
            color="primary"
            autoFocus
          >
            {agreeDisplayText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ConfirmDialogModal;
