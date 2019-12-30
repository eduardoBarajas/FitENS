import React, {useReducer} from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import inputValidator from '../../../utils/inputValidator';
import ImageUploaderComponent from '../imageUploader/imageUploader';
import MySnackBar from '../snackbar/mSnackBar';
import AlertDialog from '../alertDialog/alertDialog';
import CircularProgress from '@material-ui/core/CircularProgress';

// definimos los estilos para la vista.
const useStyles = makeStyles(theme => ({
    card: {
        marginTop: '2em',
        marginBottom: '2em',
        marginLeft: '5%',
        marginRight: '5%'
    },
    grid: {
        padding: '2em'
    },
    textfield: {
        width: '100%',
        marginTop: '1em',
        marginLeft: '1em',
        marginRight: '1em'
    },
    button_form: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '1em',
        marginBottom: '1em'
    },
    divider: {
        marginRight: '8vw',
        marginLeft: '8vw',
        marginTop: '1em',
        marginBottom: '.5em',
        height: '3px',
        width: '80%',
        backgroundColor: 'rgba(56,142,60 ,0.6)'
    }, 
    divider_title: {
        width: '100%',
        textAlign: 'center',
        marginTop: '1.5em'
    }, 
    loading_div: {
        margin: 'auto'
    }, 
    loading_div_circle: {
        marginLeft: '30%'
    }
}));

// creamos un arreglo que almacenara las etiquetas de los inputs para definir los estados.
const stateLabels: any[] = [];
// definimos el arreglo que contendra todos los elementos del formulario.
let grid_elements: any[] = [];
// definimos los campos de datos del snackbar
let snackbar_data = {message: '', status: ''};
// definimos las constantes para diferenciar el estado en que se redibujaran los inputs.
const ENTRY_ADDED = 200;
const FORM_CLEARED = 201;
const FORM_SUBMITED = 202;
const INVALID_FORM = 203;


    
// funcion que inicializa los estados de los inputs.
function initStates(inputs: any[]) {
    let states: {[key: string]: any} = {};
    // si las etiquetas no han sido agregadas entonces es un hecho que es la primera vez que entrara.
    if (stateLabels.length === 0) {
        inputs.forEach(input => {
            // por cada input del formulario se obtiene su nombre para generar el estado inicial.
            if (input.type != 'separator' && input.type != 'imageselector') {
                // mientras no sea de tipo separator se agrega a la lista de estados.
                let label: string = input.label;
                stateLabels.push({'label': label, 'required': input.validation.required});
                (input.validation.required) ? states[label] = {value: '', error: 'NotChanged'} : states[label] = {value: '', error: ''};
            }
        });
    } else {
        // entrara aqui si se quiere volver a inicializar los estados.
        stateLabels.forEach( state_label => {
            // si el campo es required
            (state_label.required) ? states[state_label.label] = {value: '', error: 'NotChanged'} : states[state_label.label] = {value: '', error: ''};
        });
    }
    // por ultimo se crea el objeto de estados y se regresa.
    return {alertDialogOpen: false, addNew: false, loading: false, redrawComponent: '', images: [],
        snackbarOpen: false, ...states};
}

// funcion en la que se manejan los estados.
function reducer(state: any, action: any) {
    switch (action.type) {
        // cuando se quieran reiniciar los estados debera entrar aqui.
        case 'clean': grid_elements = []; return initStates([]);
        case 'newRegisterAdded': {
            grid_elements = [];
            let obj = initStates([]);
            // al agregar un nuevo registro reiniciamos el estado pero dejamos abierto el snackbar para mostrar el mensaje.
            obj['snackbarOpen'] = true;
            // cambiamos esto para no crear un nuevo estado, y que al momento de guardar el registro no se eliminen las imagenes
            obj['redrawComponent'] = 'ALL';
            return obj;
        }
        // si se subio una nueva imagen en el componente entrara aqui.
        case 'imageUpload': {
            if (action.status === 'success') {
                state.images.push(action.image);
                snackbar_data = {message: 'Se agrego correctamente', status: action.status};
                return {...state, snackbarOpen: true, redrawComponent: action.label};
            } else {
                // si fallo solamente se muestra el mensaje de error.
                snackbar_data = {message: 'Ocurrio un problema', status: action.status};
                return {...state, snackbarOpen: true};
            }
        }
        case 'imageDeleted': {
            //si se elimino una imagen, se quita del arreglo y se muestra el mensaje.
            state.images.splice(action.index, 1);
            snackbar_data = {message: 'Se elimino correctamente', status: 'success'};
            return {...state, snackbarOpen: true, redrawComponent: action.label};
        }
        // cuando se vaya a agregar un nuevo registro debera entrar aqui.
        case 'submit': {
            return {...state, addNew: true, loading: true, snackbarOpen: false};
        }
        case 'invalidForm': {
            return {...state, addNew: false, loading: false, snackbarOpen: true};
        }
        case 'snackbarShow': {
            // si se envia un mensaje se agrega a los datos del snackbar si no solo se cambia el estado.
            if (action.message != null)
                snackbar_data = {message: action.message, status: action.status};
            return {...state, snackbarOpen: action.isOpen};
        }
    }
    let obj: {[key: string]: any} = {...state};
    // si no es un estado de tipo especifico, lo obtendra con el label del input directamente.
    obj[action.type] = {value: action.newValue, error: action.error}
    // se agrega el componente que el cual sera actualizado en la vista.
    obj['redrawComponent'] = action.type;
    return obj;
}

// se define la interfaz de los valores que se pueden usar en los props.
type GenericFormProps = {
    form_inputs: any[],
    imagesRef: string,
    onSubmit: any
};

const GenericForm: React.FC<GenericFormProps> = (props) => {
    const classes = useStyles();
    // se define el estado y su funcion para actualizarlo.
    const [state, dispatch] = useReducer(reducer, props.form_inputs, initStates);
    console.log(state);
    // si se agrego un nuevo registro entra aqui
    if (state.addNew) {
        console.log('addnew');
        // validamos que los datos sean los necesarios para poder almacenar.
        if (validateForm(state)) {
            console.log('valido');
            // si el formulario es valido se agrega el registro a la bd y se limpia.
            props.onSubmit(state).then( (result: any) => {
                if (result.status === 'success') {
                    snackbar_data = {message: result.message, status: result.status}; 
                    // limpiamos el formulario.
                    dispatch({type: 'newRegisterAdded'});
                    console.log('entro aqui alv');
                    // regresamos al inicio de la vista con scroll.
                    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
                } else {
                    snackbar_data = {message: 'Ocurrio un problema al agregar el registro, intentalo de nuevo.', status: 'error'};   
                }
            });
        } else {
            console.log('invalido');
            dispatch({type: 'invalidForm'});
        }
    } else {
        // hacemos una copia del arreglo de elementos en caso de que solo se ocupe reemplazar un componente.
        let temp_list: any[];
        // debido a que no se renderearan los nuevos elementos a menos que la estructura de datos cambie.
        if (state.redrawComponent.length > 0)
            temp_list = [...grid_elements];
        grid_elements = [];
        // solo si es la primera vez que se entra se van a renderizar todos los elementos.
        props.form_inputs.forEach((input: any) => {
            let element: any;
            // si el estado para realizar una actualizacion de render es la inicial o si un input cambio entonces entra.
            if (state.redrawComponent === '' || state.redrawComponent === 'ALL' || state.redrawComponent === input.label) {
                switch (input.type) {
                    // si es del tipo input se agrega un textfield.
                    case 'input': {
                        let error = state[input.label].error;
                        element = <Grid key={input.key} container item xs={12} sm={4}>
                                <TextField error={error.length > 0 && error !== 'NotChanged' } helperText={(error === 'NotChanged') ? '' : state[input.label].error}
                                    value={state[input.label].value} onChange={ (e) => {
                                        dispatch({type: input.label, error: inputValidator(input.validation, e.target.value), newValue: e.target.value});
                                }} className={classes.textfield} label={input.label} variant="outlined" />
                            </Grid>
                        break;
                    }
                    // si es un separador entonces se agrega un divider.
                    case 'separator': {
                        element = <Grid key={input.key} container item xs={12} sm={12}>
                                <Typography className={classes.divider_title} variant="h5">{input.label}</Typography>
                                <Divider className={classes.divider} variant="middle" />
                            </Grid>
                        break;
                    }
                    // si el formulario tendra la opcion de subir imagen se agrega el siguiente componente, y se le pasa el
                    // el dispatcher para modificar el estado.
                    case 'imageselector': {
                        element = <Grid key={input.key} container item xs={12} sm={12}>
                                <ImageUploaderComponent clearAll={(state.redrawComponent === '') ? true : false} validation={input.validation} images={state.images} imagesRef={props.imagesRef} label={input.label} stateDispatcher={dispatch}/>
                            </Grid>;
                        break;
                    }
                }
                // si el estado para renderear un componente no ha cambiado, significa que es la primera vez que se renderizara.
                if (state.redrawComponent === '' || state.redrawComponent === 'ALL') {
                    grid_elements.push(element); 
                } else {
                    // si el componente que se desea renderizar esta definido entonces solo modificamos ese elemento del arreglo.
                    if (state.redrawComponent === input.label) {
                        temp_list.splice(input.key, 1, element);
                        grid_elements = [...temp_list];
                    }
                }
            }
        });
    }
    let loading_column;
    if (!state.loading) {
        loading_column = null;
    } else {
        loading_column = <Grid container item xs={12} sm={12}>
            <div className={classes.loading_div}>
                <CircularProgress className={classes.loading_div_circle} />
                <p>Por favor espere...</p>
            </div>
        </Grid>;
    }
    return (
        <div>
            <Card elevation={4} className={classes.card}>
                <Grid className={classes.grid} container spacing={2}>
                    {grid_elements}
                    <Grid container item xs={12} sm={12}>
                        <Grid container item xs={4} sm={4}>
                            <Button disabled={state.loading} className={classes.button_form}>Regresar</Button>
                        </Grid>
                        <Grid container item xs={4} sm={4}>
                            <Button disabled={state.loading} className={classes.button_form} onClick={() => dispatch({type: 'clean'})}>Limpiar</Button>
                        </Grid>
                        <Grid container item xs={4} sm={4}>
                            <Button disabled={state.loading} className={classes.button_form} color="primary" onClick={() => dispatch({type: 'submit'})}>Guardar</Button>
                        </Grid>
                    </Grid>
                    {loading_column}
                </Grid>
            </Card>
            <MySnackBar isOpen={state.snackbarOpen} message={snackbar_data.message}
                    status={snackbar_data.status} dispatcher={dispatch}></MySnackBar>
        </div>
    );
} 
// funcion que revisara que el formulario no tenga errores antes de enviar el nuevo registro.
function validateForm(state: {[key: string]: any}) {
    let valid = true;
    Object.keys(state).forEach( key => {
        if (key === 'images' && state[key].length === 0) {
            snackbar_data = {message: `Debe de haber al menos una imagen para guardar`, status: 'error'};
            valid = false;
        }
        if (state[key].error != null && state[key].error != '') {
            let message;
            (state[key].error == 'NotChanged') ? message = '[Error] El campo "' + key +'" no puede estar vacio' : message = '[Error] ' + key + ': ' + state[key].error;
            snackbar_data = {message: message, status: 'error'};
            valid = false;
        } 
    });
    return valid;
}

export default GenericForm;