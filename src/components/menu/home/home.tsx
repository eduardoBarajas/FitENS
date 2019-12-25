import React, {useState} from 'react';
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

type IMenuHomeProps = {
    show?: boolean
};

const grid_elements: any[] = [];

const MenuHome: React.FC<IMenuHomeProps> = (props) => {
    const classes = useStyles();
    FoodService.insertOne(new Food(1, 'Lol', 'lolxd', 12.50, {'kcal': 22, 'proteinas': 212}, ['xd.jpg']));
    renderElements(0, classes);
    const [showMoreEntries, setShowMoreEntries] = useState(false);
    let elements = 
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth={false}>
            <Grid container className={classes.grid} spacing={2}>
                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <PanelBusqueda title={StaticData.menu.search_title_label} fields={StaticData.menu.search_fields} listener={executeSearch}/>
                </Grid>
                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <VerticalGrid entries={grid_elements} onMoreShowData={(dataSize: number, callback: any) => {
                        console.log(dataSize);
                        setShowMoreEntries(true);
                        // dataSize nos dira el tamanio del arreglo para poder sumarle 5 y obtener los nuevos datos.
                        renderElements(dataSize + 5, classes);
                        setTimeout(() => {
                            // llamamos la funcion callback para que el componente hijo sepa que ya se actualizaron los datos.
                            callback();
                            setShowMoreEntries(false);
                        }, 2000);
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

function renderElements(new_size: number, classes: any) {
    if (new_size === 0) {
        if (grid_elements.length !== 0) {
            return;
        } else {
            new_size = 5;
        }
    }
    grid_elements.splice(0, grid_elements.length);
    for (let i = 0; i < new_size; i++) {
        grid_elements.push(
            <Grid key={i} container item xs={12} sm={4} md={4} lg={4} xl={4}>
                <Card elevation={4} className={classes.grid_card}>
                    <CardActionArea>
                        <CardMedia
                        className={classes.grid_image}
                        component="img"
                        alt="Comida ejemplo"
                        height="140"
                        image={require('../../../assets/images/example.png')}
                        title="Comida ejemplo"
                        />
                        <CardContent className={classes.grid_card_content}>
                        <Typography gutterBottom variant="h5" component="h2">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    }
}



export default MenuHome;