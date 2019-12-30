import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type AlertDialogProps = {
    open: boolean,
    title: string,
    body: string,
    options: {[key: string]: any},
    callback: any
};
const AlertDialog: React.FC<AlertDialogProps> = (props) => {
  let dialog;
  // se verifica que el modal este abierto antes de hacer render.
  if (props.open) {
    dialog = <div>
      <Dialog
        open={props.open}
        onClose={() => {
          props.callback('close');
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
              props.callback(props.options.one.value);
          }} color="primary">
            {props.options.one.label}
          </Button>
          <Button onClick={() => {
              props.callback(props.options.two.value);
          }} color="primary">
            {props.options.two.label}
          </Button>
        </DialogActions>
      </Dialog>
    </div>;
  } else {
    dialog = null;
  }
  return dialog;
}

export default AlertDialog;