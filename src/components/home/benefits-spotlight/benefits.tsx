import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import {StaticData} from '../../../utils/StaticData';

require('./benefits.css');
const useStyles = makeStyles((theme) => ({
    root_grid: {
        marginTop: '2em',
        marginBottom: '2em'
    },
    card: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 151,
    },
    titulo: {
        textAlign: 'center',
        width: '100%'
    },
    flex_container: {
        display: 'flex',
        margin: '1em',
        '& h4': {
            color: 'rgb(27, 94, 32)'
        },
        '& svg': {
            color: 'rgb(27, 94, 32)'
        },
        flexDirection: 'row',
        "&:hover": {
            "& h4": {
                animationName: 'GreenToRedKeyFrames',
                animationDuration: '.75s',
                animationTimingFunction: 'ease-in-out',
                color: 'rgba(213,0,0 ,1)'
            },
            "& svg": {
                animationName: 'GreenToRedKeyFrames',
                animationDuration: '.75s',
                animationTimingFunction: 'ease-in-out',
                color: 'rgba(213,0,0 ,1)'
            }
        },
    }
}));

type IBenefitsSpotlightProps = {
    show?: boolean
};

const BenefitsSpotlight: React.FC<IBenefitsSpotlightProps> = (props) => {
    const classes = useStyles();
    let grid_elements: any[] = [];
    // Obtenemos los datos estaticos para rellenar la vista
    StaticData.home.benefits.grid_elements.forEach( (element) => {
        grid_elements.push(
            <Grid key={element.key} container item xs={12} sm={4} md={4} lg={4} xl={4}>
                <BenefitsSpotlightElement title={element.title} text_body={element.text} icon={element.icon} />   
            </Grid>
        );
    });
    return (
        <Grid className={classes.root_grid} container spacing={1}>
            <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className={classes.titulo}>
                    <Typography  variant="h5">Por que FitENS?</Typography>
                </div>
            </Grid>
            {grid_elements}
        </Grid>
    )
}

type IBenefitsSpotlightElement = {
    show?: boolean,
    title: string, 
    text_body: string,
    icon: any
};

const BenefitsSpotlightElement: React.FC<IBenefitsSpotlightElement> = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.flex_container}>
            {props.icon}
            <div>
                <Typography variant="h4">{props.title}</Typography> 
                <Typography variant="body1">{props.text_body}</Typography>
            </div>   
        </div>
    )
}

export default BenefitsSpotlight;