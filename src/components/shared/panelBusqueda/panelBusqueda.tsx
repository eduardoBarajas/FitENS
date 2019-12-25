import React, {useState} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    panelBusqueda: {
        width: '100%'
    },
    grid: {
        
    },
    input_busqueda: {
        width: '100%'
    },
    panelBusquedaHeader: {
        backgroundColor: 'rgba(0, 0, 0, 0.87)',
        '& p': {
            color: 'white'
        },
        '& span': {
            color: 'white'
        }
    },
    botonBuscar: {
        color: 'white',
        margin: 'auto',
        width: 'auto'
    }, 
    select_form_control: {
        width: 'inherit'
    }
}));

type IPanelBusquedaProps = {
    show?: boolean,
    fields: any[],
    title: string,
    listener: any
};
const PanelBusqueda: React.FC<IPanelBusquedaProps> = (props) => {
    // obtenemos los ids de los inputs que se utilizaran en la busqueda.
    var search_data: any = {};
    props.fields.forEach(field => {
        // inicializamos los valores en vacio.
        search_data[field.id] = '';
    });
    // definimos el estado inicial con los datos de los inputs
    const [search_inputs, setSearchInputs] = useState(search_data);
    const classes = useStyles();
    const search_fields_to_render: any[] = [];
    // iteramos en los campos que se utilizaran para la busqueda.
    props.fields.forEach(field => {
        let element;
        // field: {type: 'tipo control', label: 'etiqueta del campo'}
        switch (field.type) {
            case 'input': {
                element = <TextField className={classes.input_busqueda} id={field.id} label={field.label} onChange={(e) => {
                    let new_search_inputs = Object.assign({}, search_inputs);
                    new_search_inputs[field.id] = e.target.value;
                    setSearchInputs(new_search_inputs);
                }} variant="outlined" />;
                break;
            }
            case 'select': {
                let select_items: any[] = [];
                field.select_options.forEach((option: any) => {
                    select_items.push(
                        <MenuItem key={option.key} value={option.label}>{option.label}</MenuItem>
                    );
                });
                element = <FormControl className={classes.select_form_control}>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                        id={field.id}
                        value={search_inputs[field.id]}
                        onChange={(e) => {
                                let new_search_inputs = Object.assign({}, search_inputs);
                                new_search_inputs[field.id] = e.target.value;
                                setSearchInputs(new_search_inputs);
                            }
                        }
                        >
                        {select_items}
                    </Select>
                </FormControl>
                break;
            }
        }
        search_fields_to_render.push(
            <Grid container key={field.key} item xs={field.rowSize} sm={'auto'}>
                {element}
            </Grid>
        );
    });
    return (
        <ExpansionPanel className={classes.panelBusqueda}>
            <ExpansionPanelSummary className={classes.panelBusquedaHeader}
            expandIcon={<SearchIcon />}
            aria-controls="Panel Busqueda"
            id="panelBusqueda"
            >
                <Typography>{props.title}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid className={classes.grid} container spacing={1}>
                    {search_fields_to_render}
                    <Grid key={search_fields_to_render.length + 1} container item xs>
                        <Button
                            variant="contained"
                            className={classes.botonBuscar}
                            color="primary"
                            onClick={() => props.listener(search_inputs)}
                            endIcon={<SearchIcon/>}
                        >
                            Buscar
                        </Button>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

export default PanelBusqueda;