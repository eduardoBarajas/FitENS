import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MapIcon from '@material-ui/icons/Map';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import {StaticData} from '../../utils/StaticData';

const useStyles = makeStyles((theme) => ({
    footer: {
        width: '100%',
    },
    contact_info: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
    },
    legal_rights: {
        display: 'flex',
        color: 'white',
        height: '4vh',
        backgroundColor: '#4caf50',
        justifyContent: 'center'
    }, 
    social_networks: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        margin: '1.5em'
    },
    social_network_icon: {
        width: '2.5em',
        height: '1.5em'
    },
    footer_info_text: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        margin: '1em'
    }
}));

type IFooterProps = {
    show?: boolean
};

const Footer: React.FC<IFooterProps> = (props) => {
    console.log(StaticData);
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <div className={classes.contact_info}>
                <Grid container>
                    <Grid container item xs={12} sm={3} md={3} lg={3} xl={3}>
                        <div className={classes.footer_info_text}>
                            <MapIcon className={classes.social_network_icon}/>
                            <Typography  variant="body1">{StaticData.businessInfo.address}</Typography>
                        </div>
                    </Grid>
                    <Grid container item xs={12} sm={3} md={3} lg={3} xl={3}>
                        <div className={classes.footer_info_text}>
                            <EmailIcon className={classes.social_network_icon}/>
                            <Typography  variant="body1">{StaticData.businessInfo.contactEmail}</Typography>
                        </div>
                    </Grid>
                    <Grid container item xs={12} sm={3} md={3} lg={3} xl={3}>
                        <div className={classes.footer_info_text}>
                            <CallIcon className={classes.social_network_icon}/>
                            <Typography  variant="body1">{StaticData.businessInfo.telephone}</Typography>
                        </div>
                    </Grid>
                    <Grid container item xs={12} sm={3} md={3} lg={3} xl={3}>
                        <div className={classes.social_networks}>
                            <FacebookIcon className={classes.social_network_icon}/>
                            <InstagramIcon className={classes.social_network_icon}/>
                            <WhatsAppIcon className={classes.social_network_icon}/>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.legal_rights}>
                {StaticData.businessInfo.legal}
            </div>
        </div>
    )
}

export default Footer;