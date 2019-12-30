import React, {useState, useReducer} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import PanelBusqueda from '../../shared/panelBusqueda/panelBusqueda';
import {StaticData} from '../../../utils/StaticData';
import VerticalGrid from '../../shared/verticalGrid/verticalGrid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FoodService from '../../../services/foods/foodService';
import Food from '../../../entities/food';
import {ArrayMerger} from '../../../utils/ArrayMerger';

// constante que define cual es el numero de elementos que traera de la api por click.
const ADD_CANT = 2;

const useStyles = makeStyles(theme => ({
    grid: {
        width: '100%',
        marginTop: '1em',
        marginBottom: '1em'
    },
    grid_image: {
        width: '40%',
        height: '40%',
        float: 'right'
    },
    grid_card: {
        color: '#43A047'
    }, 
    grid_card_content: {
        '& p': {
            color: 'rgba(0, 0, 0, 0.7)'
        }
    }
}));

function initState() {
    return {
        retrievedAll: false,
        showMoreEntries: false
    };
}

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'showMoreEntries': return {...state, showMoreEntries: true};
        case 'retrievedAll': return {...state, showMoreEntries: false, retrievedAll: true};
    }
}

type IMenuHomeProps = {
    show?: boolean
};
// arreglo que contendra la lista de comidas.
let food_elements: Food[] = [];
// arreglo que continen los elementos que se para realizar el render.
let grid_elements: any[] = [];

const MenuHome: React.FC<IMenuHomeProps> = (props) => {
    const classes = useStyles();
    const [state, dispatcher] = useReducer(reducer, undefined, initState);
    // mientras que no se hayan obtenido todos los registros
    if (!state.retrievedAll && state.showMoreEntries) {
        grid_elements = [];
        for (let i = 0; i < food_elements.length; i++) {
            grid_elements.push(
                <Grid key={i} container item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <Card elevation={4} className={classes.grid_card}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.grid_image}
                            component="img"
                            alt={food_elements[i].name}
                            height="140"
                            image={food_elements[i].images[0]}
                            title={food_elements[i].name}
                            />
                            <CardContent className={classes.grid_card_content}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {food_elements[i].name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {food_elements[i].description}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            );
        }
    }
    let elements = 
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth={false}>
            <Grid container className={classes.grid} spacing={2}>
                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <PanelBusqueda title={StaticData.menu.search_title_label} fields={StaticData.menu.search_fields} listener={executeSearch}/>
                </Grid>
                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <VerticalGrid hideLoadMoreButton={state.retrievedAll} entries={grid_elements} onMoreShowData={(callback: any) => {
                        let start = food_elements.length;
                        // traemos los registros de la api.
                        FoodService.paginate(start, ADD_CANT).then((result: any) => {
                            if (result.status === 200 && result.data.status === 'success') {
                                // si se obtuvieron con exito entonces unimos los dos arrays.
                                ArrayMerger<Food>(food_elements, result.data.data, ((new_array: Food[]) => {
                                    if (new_array != null) {
                                        // si el nuevo arreglo no es nulo, es por que si fue modificado.
                                        food_elements = new_array;
                                        dispatcher({type: 'showMoreEntries'});
                                        // si se llego al total de registros en la api se cambia de estado.
                                        if (result.data.count === food_elements.length) {
                                            // por lo que se marca como obtenidos todos para desaparecer el boton.
                                            dispatcher({type: 'retrievedAll'});
                                        }
                                    }
                                    // llamamos la funcion callback para que el componente hijo sepa que ya se actualizaron los datos.
                                    callback();
                                }));
                            }
                        });
                    }}/>
                </Grid>
            </Grid>
        </Container>
    </React.Fragment>;
    return (elements);
}

function executeSearch(searchParams: any) {
    console.log('Ejecutar Busqueda');
    console.log(searchParams);
}

export default MenuHome;