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
// constate que diferencia los estados de iniciado y de todos los registros obtenidos.
const NONE_RETRIEVED = 'NONE_RETRIEVED';
const SOME_RETRIEVED = 'SOME_RETRIEVED';
const ALL_RETRIEVED = 'ALL_RETRIEVED';


const useStyles = makeStyles(theme => ({
    root_container: {
        minHeight: '80vh'
    },
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
    let states = {};
    // revisamos el ultimo valor de elementos almacenado en la sesion
    let hasRetrivedAll = sessionStorage.getItem('MenuHomeHasRetrievedAll');
    // si existe el campo y ademas el arreglo de elementos es mayor a 0.
    if (hasRetrivedAll != null && hasRetrivedAll.includes('true') && food_elements.length > 0) {
        states = {...states, elements: ALL_RETRIEVED};
    } else {
        (food_elements.length === 0) ? states = {...states, elements: NONE_RETRIEVED} : states = {...states, elements: SOME_RETRIEVED};
    }
    return states;
}

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'EntriesUpdated': return {...state, elements: action.newElementsState, };
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
    // si no se han obtenido ningun elemento para mostrar se ejecuta.
    if (state.elements === NONE_RETRIEVED) {
        getMoreElements(dispatcher);
    }
    console.log(state);
    // mientras que no se hayan obtenido todos los registros
    if (state.elements !== ALL_RETRIEVED && state.elements === SOME_RETRIEVED) {
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
        <Container className={classes.root_container} maxWidth={false}>
            <Grid container className={classes.grid} spacing={2}>
                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <PanelBusqueda title={StaticData.menu.search_title_label} fields={StaticData.menu.search_fields} listener={executeSearch}/>
                </Grid>
                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <VerticalGrid hideLoadMoreButton={state.elements === ALL_RETRIEVED} entries={grid_elements} onMoreShowData={(callback: any) => {
                        getMoreElements(dispatcher, callback);
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

function getMoreElements(dispatcher: any, callback?: any) {
    let start = food_elements.length;
    // traemos los registros de la api.
    FoodService.paginate(start, ADD_CANT).then((result: any) => {
        if (result.status === 200 && result.data.status === 'success') {
            // si se obtuvieron con exito entonces unimos los dos arrays.
            ArrayMerger<Food>(food_elements, result.data.data, ((new_array: Food[]) => {
                if (new_array != null) {
                    // si el nuevo arreglo no es nulo, es por que si fue modificado.
                    food_elements = new_array;
                    dispatcher({type: 'EntriesUpdated', newElementsState: SOME_RETRIEVED});
                    // si se llego al total de registros en la api se cambia de estado.
                    if (result.data.count === food_elements.length) {
                        // por lo que se marca como obtenidos todos para desaparecer el boton.
                        dispatcher({type: 'EntriesUpdated', newElementsState: ALL_RETRIEVED});
                        // lo guardamos en la sesion actual en caso de que se cambie de pestana.
                        sessionStorage.setItem('MenuHomeHasRetrievedAll', 'true');
                    }
                }
                // llamamos la funcion callback para que el componente hijo sepa que ya se actualizaron los datos.
                if (callback != null) 
                    callback();
            }));
        }
    });
}

export default MenuHome;