import React, { useState, useEffect, Component, useRef, useLayoutEffect, ReactNode} from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    button_row: {
        alignContent: 'center',
        '& button': {
            width: '100%'
        }
    }
}));

interface IVerticalGrid {
    show?: boolean,
    onMoreShowData: any,
    entries: any[]
};

const VerticalGrid: React.FC<IVerticalGrid> = (props) => {
    console.log(props);
    const classes = useStyles();
    // definimos los estados iniciales.
    const [loadingElementsState, setLoadingElementsState] = useState(false);
    let button = <Button size="large" onClick={() => {
            console.log('cargando');
            setLoadingElementsState(true);
            props.onMoreShowData(props.entries.length, () => {
                setLoadingElementsState(false);
                console.log('cargadooo');
            });
        }}>
        Cargar Mas Comidas
        </Button>;
    return (
        <div>
            <Grid container spacing={2}>
                {props.entries}
                <Grid className={classes.button_row} container item xs={12} sm={12} md={12} lg={12} xl={12}>
                    {loadingElementsState ? <p>loading ...</p>: button}
                </Grid>
            </Grid>
        </div>
    )
}
export default VerticalGrid;