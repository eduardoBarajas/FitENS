import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
require('./logo.css');

const LogoSideMenu: React.FC = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Paper className="mPaperLayout">
                <Avatar className="mAvatarMenuSidebar">E</Avatar>
                <Typography className="user_name_sidebar" variant="h5" component="h3">
                    Eduardo Barajas
                </Typography>
                <Typography className="user_role_sidebar" component="p">
                    Usuario FitENS.
                </Typography>
            </Paper>
        </React.Fragment>
    )
}

export default LogoSideMenu;