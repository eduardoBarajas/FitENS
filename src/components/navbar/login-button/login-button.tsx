import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {isMobile} from 'react-device-detect';

type ILoginButtonProps = {
    is_user_logged: boolean
};

const useStyles = makeStyles(theme => ({
    button_cerrar_sesion: {
        margin: theme.spacing(1),
        'background-color': 'tomato',
        color: 'white',
        '&:hover': {
            'background-color': 'indianred',
            color: 'white'
        }
    },
    button_iniciar_sesion: {
        margin: theme.spacing(1),
        'background-color': 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        '&:hover': {
            'background-color': 'rgba(0, 0, 0, 0.8)',
            color: 'white'
        }
    }
}));

const LoginButton: React.FC<ILoginButtonProps> = (props) => {
    const classes = useStyles();
    // si es movil entonces se agrega un atributo del width para ajusta el boton al tipo de menu.
    let responsive_width;
    if (isMobile) {
        responsive_width = {width: "auto"};
    } else {
        responsive_width = {width: '20vw'};
    }
    let label_session, btn_class, btn_icon;
    if (props.is_user_logged) {
        label_session = 'Cerrar Sesion';
        btn_class = classes.button_cerrar_sesion;
        btn_icon = <ExitToAppIcon/>;
    } else {
        label_session = 'Iniciar Sesion';
        btn_class = classes.button_iniciar_sesion;
        btn_icon = <PermIdentityIcon/>;
    }
    return (
        <Button
            variant="contained"
            size="large"
            style={responsive_width}
            className={btn_class}
            startIcon={btn_icon}
        >
            {label_session}
        </Button>
    )
}

export default LoginButton;