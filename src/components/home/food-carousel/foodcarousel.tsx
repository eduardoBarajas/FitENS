import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
require('./foodcarousel.css');

const FoodCarousel: React.FC = () => {
    return (
        <Grid className={'grid-food-container'} container spacing={1}>
            <Grid className={'grid-food-carousel-item'} container item xs={12} sm={8} md={8} lg={8} xl={8}>
                <img src={require('../../../assets/images/comida_principal1.png')}/>
            </Grid>
            <Grid className={'grid-food-carousel-item-text'} container item xs={12} sm={4} md={4} lg={4} xl={4}>
                <div className={'food-title-div'}>
                    <Typography variant="h3">Comida numero 1</Typography>
                    <Typography variant="body1">comida para comer por que is no se te muere s de abamrbe</Typography>
                </div>
            </Grid>
        </Grid>
    )
}

export default FoodCarousel;