import React from 'react';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

const variantIcon: {[key: string]: any} = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: 'rgba(104,159,56 ,1)',
  },
  error: {
    backgroundColor: 'rgba(244,67,54 ,1)',
  },
  info: {
    backgroundColor: 'rgba(3,155,229 ,1)',
  },
  warning: {
    backgroundColor: 'rgba(255,143,0 ,1)',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));

type MySnackBarProps = {
    message: string,
    status: string,
    isOpen: boolean,
    dispatcher?: any,
    setState?: any
};

const MySnackBar: React.FC<MySnackBarProps> = (props) => {
  const classes = useStyles();
  const Icon = variantIcon[props.status];
  let classname;
  switch (props.status) {
      case 'success': classname = classes.success;break;
      case 'info': classname = classes.info;break;
      case 'error': classname = classes.error;break;
      case 'warning': classname = classes.warning;break;
  }
   
  let element: any;
  if (props.isOpen) {
    element = <Slide direction="right" in={props.isOpen} mountOnEnter unmountOnExit>
        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right',}} open={props.isOpen}
            autoHideDuration={6000} onClose={() => {
              // dependiendo si se ingreo un dispatcher del reducer o el set state
              if (props.dispatcher != null)
                props.dispatcher({type: 'snackbarShow', isOpen: false});
              if (props.setState != null)
                props.setState(false);
            }}>  
                <SnackbarContent
                    className={classname}
                    aria-describedby="client-snackbar"
                    message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={classes.iconVariant} />
                        {props.message}
                    </span>
                    }
                    action={[
                    <IconButton key="close" aria-label="close" color="inherit" onClick={() => {
                      if (props.dispatcher != null)
                        props.dispatcher({type: 'snackbarShow', isOpen: false});
                      if (props.setState != null)
                        props.setState(false);
                    }}>
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                    ]}
                />
            </Snackbar>
        </Slide>;
  } else {
      element = null;
  }
  return element;
}

export default MySnackBar;