import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PanelBusqueda from '../../shared/panelBusqueda/panelBusqueda';
import {StaticData} from '../../../utils/StaticData';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    grid: {
        width: '100%',
        marginTop: '1em',
        marginBottom: '1em'
    }
}));

type IEjerciciosHomeProps = {
    show?: boolean
};

const EjerciciosHome: React.FC<IEjerciciosHomeProps> = (props) => {
    const classes = useStyles();
    let elements = 
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth={false}>
                <Grid container className={classes.grid}>
                    <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <PanelBusqueda title={StaticData.ejercicios.search_title_label} fields={StaticData.ejercicios.search_fields} listener={executeSearch}/>
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

export default EjerciciosHome;