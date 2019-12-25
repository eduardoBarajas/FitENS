import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import FoodCarousel from './food-carousel/foodcarousel';
import BenefitsSpotlight from './benefits-spotlight/benefits';
import Map from '../mapa/map';
import { makeStyles } from '@material-ui/core/styles';
import ChallengePanel from './challenge-panel/challenge-panel';
import LocationPanel from './location-panel/location';

const useStyles = makeStyles(theme => ({
    divider: {
        marginRight: '5vw',
        marginLeft: '5vw',
        marginTop: '4em',
        marginBottom: '4em',
        height: '3px'
    }
}));

const HomeComponent: React.FC = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth={false}>
                <FoodCarousel/>
                <Divider className={classes.divider} variant="middle" />
                <BenefitsSpotlight/>
                <Divider className={classes.divider} variant="middle" />
                <ChallengePanel/>
                <Divider className={classes.divider} variant="middle" />
                <LocationPanel/>
                <Map/>
            </Container>
        </React.Fragment>
    )
}
export default HomeComponent;