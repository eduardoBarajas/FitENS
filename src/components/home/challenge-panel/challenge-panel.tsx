import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import {StaticData} from '../../../utils/StaticData';

const useStyles = makeStyles(theme => ({
    titulo: {
        textAlign: 'center',
        width: '100%'
    },
    challengeElementImage: {
        height: '30vh'
    }
}));

const ChallengePanel: React.FC = () => {
    const classes = useStyles();
    let grid_elements: any[] = [];
    // Obtenemos los datos estaticos para rellenar la vista
    StaticData.home.challenge.grid_elements.forEach( (element) => {
        grid_elements.push(
            <Grid key={element.key} container item xs={12} sm={12} md={6} lg={6} xl={6}>
                <ChallengeElement body={element.body} route={element.route} image={element.image}/>
            </Grid>
        );
    });
    return (
        <Grid container spacing={2}>
            <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div className={classes.titulo}>
                    <Typography  variant="h5">Unete al reto FitENS</Typography>
                    <Typography variant="body1">Y baja hasta 12 kg en tu primer mes.</Typography>
                </div>
            </Grid>
            {grid_elements}
        </Grid>
    )
}

type IChallengeElementProps = {
    show?: boolean,
    image: any,
    body: string,
    route: string
};
function ChallengeElement(props: IChallengeElementProps) {
    const classes = useStyles();
    return (
        <Card>
            <CardMedia className={classes.challengeElementImage} image={props.image}/>
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {props.body}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => {
                    console.log(props.route);
                }}>
                    Ver Mas
                </Button>
            </CardActions>
        </Card>
    )
}
export default ChallengePanel;