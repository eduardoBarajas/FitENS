import React from 'react';
import Typography from '@material-ui/core/Typography';
import {StaticData} from '../../../utils/StaticData';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import MapIcon from '@material-ui/icons/Map';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import ScheduleIcon from '@material-ui/icons/Schedule';
import TodayIcon from '@material-ui/icons/Today';

const useStyles = makeStyles(theme => ({
    location_image: {
        height: '100%',
        width: '100%',
        minHeight: '40vh'
    },
    tituloSeccionMapa: {
        textAlign: 'center'
    },
    info_title: {
        width: '100%',
        fontSize: '2em',
        color: 'darkolivegreen'
    }, 
    info_icon: {
        width: '1em',
        height: '1em'
    }    

}));

const LocationPanel: React.FC = () => {
    const classes = useStyles();
    return (
        <div>
            <Typography className={classes.tituloSeccionMapa} variant="h5">Donde Nos Encontramos</Typography>
            <Card>
                <Grid container spacing={2}>
                    <Grid container item xs={12} sm={8} md={8} lg={8} xl={8}>
                        <CardMedia className={classes.location_image} image={'xd.jpg'}/>
                    </Grid>
                    <Grid container item xs={12} sm={4} md={4} lg={4} xl={4}>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid container item xs={12}>
                                    <div className={classes.info_title}><MapIcon className={classes.info_icon}/>Direccion:</div>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                    {StaticData.businessInfo.address}
                                    </Typography>
                                </Grid>
                                <Grid container item xs={12}>
                                    <div className={classes.info_title}><CallIcon className={classes.info_icon}/>Telefono:</div>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                    {StaticData.businessInfo.telephone}
                                    </Typography>
                                </Grid>
                                <Grid container item xs={12}>
                                    <div className={classes.info_title}><ScheduleIcon className={classes.info_icon}/>Horario:</div>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        De {StaticData.businessInfo.scheduleTimeStart} a {StaticData.businessInfo.scheduleTimeEnd}
                                    </Typography>
                                </Grid>
                                <Grid container item xs={12}>
                                    <div className={classes.info_title}><TodayIcon className={classes.info_icon}/>Dias:</div>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {StaticData.businessInfo.scheduleDate}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default LocationPanel;