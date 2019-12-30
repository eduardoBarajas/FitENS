import React, {useReducer, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import DeleteIcon from '@material-ui/icons/Delete';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import {fileUpload, fileDelete} from '../../../utils/FirebaseFileUploader';
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import AlertDialog from '../alertDialog/alertDialog';
require('./imageUploader.css');

const IMAGES_STORAGE_REF = '/fitens/images/[CATEGORY]/';
// mapa que contendra la referencia a las imagenes que se suban.
let images_map: {[key: string]: string} = {};
// definimos un objeto que tendra los datos que se mostraran al momento de abrir un alertDialog.
let dialog_data = {title: '', body: '', options: {}};

const initialState = () => {
    return {
        busy: false,
        imageOperationComplete: false,
        alertDialogShow: false,
        deleteImageId: -1,
    }
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'operationUploadStarted': return {busy: true, imageOperationComplete: false};
        case 'operationFinished': return {deleteImageId: -1, busy: false, imageOperationComplete: true};
        case 'alertDialogShow': {
            // si se mandan datos del dialogo se agregan, si no solo se cambia de estado.
            if (action.title != null)
                dialog_data = {title: action.title, body: action.body, options: action.options};
            return {...state, alertDialogOpen: action.isOpen};
        }
        case 'operationDeleteStarted': return {alertDialogOpen: false, deleteImageId: action.id, busy: true, imageOperationComplete: false};
    }
    return state;
}


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
      width: '100%'
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    grid_list_add_new_tile: {
        width: 'auto!important',
    },
    add_image_icon: {
        width: '3em',
        height: '3em'
    },
    delete_imagen_icon: {
        color: 'white'
    }
}));

type ImageUploaderProps = {
    stateDispatcher: any,
    imagesRef: string,
    label: string,
    images: string[],
    validation: {[key: string]: any},
    clearAll: boolean
};

const ImageUploaderComponent: React.FC<ImageUploaderProps> = (props) => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, undefined, initialState);
    // si el componente padre realiza la accion de limpiar el registro, entonces se eliminan todas las imagenes del arreglo.
    if (props.clearAll) {
        // se eliminan todas la imagenes.
        Object.keys(images_map).forEach(key => {
            fileDelete(IMAGES_STORAGE_REF.replace('[CATEGORY]', props.imagesRef), images_map[key]);
        });
        // se reinicia el mapa.
        images_map = {};
    }
    // si el id de la imagen a eliminar es mayor a -1 quiere decir que si se elimino una imagen.
    if (state.deleteImageId > -1) {
        fileDelete(IMAGES_STORAGE_REF.replace('[CATEGORY]', props.imagesRef), images_map[state.deleteImageId]);
        // una vez se elimina la imagen de la nube, se elimina del mapa.
        delete images_map[state.deleteImageId];
        // se cambia el estado a operacion terminada.
        dispatch({type: 'operationFinished'});
        // se comunica al padre que una imagen ha sido eliminada y se envia el index para que haga el cambio respectivo en los props.
        props.stateDispatcher({type: 'imageDeleted', index: state.deleteImageId, label: props.label});
    } 
    let fileSelector: HTMLInputElement;
    useEffect( () => {
        fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        fileSelector.setAttribute('multiple', 'multiple');
        fileSelector.addEventListener('change', (e) => {
            // si no se ha llegado al limite de imagenes que se pueden subir entonces se sube.
            if (props.images.length < props.validation.maxImages) {
                // si el selector de archivos no es nulo entonces se procede.
                if (fileSelector != null && fileSelector.files != null) {
                    dispatch({type: 'operationUploadStarted'});
                    // se obtiene el nombre y el tipo de archivo.
                    let [filename, filetype] = fileSelector.files[0].name.split('.');
                    // se crea el nuevo nombre utilizando el tiempo para hacerlo unico.
                    filename = `${filename}${new Date().getTime()}.${filetype}`;
                    let file_ref = `${IMAGES_STORAGE_REF.replace('[CATEGORY]', props.imagesRef)}${filename}`;
                    fileUpload(file_ref, fileSelector.files[0]).then((result) => {
                        // si la imagen se subio correctamente se envia el url de la imagen, si no
                        // entonces solo se regresa el error.
                        if (result.state === 'success') {
                            // se agrega la referencia al mapa.
                            images_map[`${props.images.length}`] = filename;
                            props.stateDispatcher({type: 'imageUpload', status: 'success', image: result.url, label: props.label});
                        } else {
                            props.stateDispatcher({type: 'imageUpload', status: 'error'});
                        }
                        // se actualiza el estado del componente para actualizar la vista.
                        dispatch({type: 'operationFinished'});
                    });
                }
            } else {
                // si ya llego al limite se le avisa al usuario.
                props.stateDispatcher({type: 'snackbarShow', isOpen: true, message: 'El limite de imagenes permitidas es: ' + props.validation.maxImages, status: 'warning'});
            }
        });
    });
    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={2.5}>
            <GridListTile key={0} className={classes.grid_list_add_new_tile}>
                <Button disabled={state.busy} className={'add_image_button ' + (state.busy ? 'add_image_button_loading' : '')} size="medium" color="primary" aria-label="add" onClick={(e) => {
                    e.preventDefault();
                    fileSelector.click();
                }}>
                    <div>
                        <PhotoCameraIcon className={'icon_camera ' + (state.busy ? 'icon_camera_loading' : '')} />
                        <Typography variant="body2">{(state.busy ? 'Cargando...' : 'Nueva Imagen')}</Typography>
                    </div>
                </Button>
            </GridListTile>
            {props.images.map(image => (
                <Slide key={props.images.indexOf(image) + 1} direction="left" in={true} mountOnEnter unmountOnExit>
                    <GridListTile>
                    <img src={image} alt={`Imagen${props.images.indexOf(image)}`} />
                    <GridListTileBar
                        title={`Imagen ${props.images.indexOf(image) + 1}`}
                        className={classes.titleBar}
                        actionIcon={
                        <IconButton onClick={() => {
                            dispatch({type: 'alertDialogShow', isOpen: true, title: 'Eliminar imagen', body: 'Deseas eliminar esta imagen?', options: {one: {label: 'Cancelar', value: ''}, two: {label: 'Eliminar', value: props.images.indexOf(image)}}});
                        }} className={classes.delete_imagen_icon} aria-label={`eliminar foto`}>
                            <DeleteIcon />
                        </IconButton>
                        }
                    />
                    </GridListTile>
                </Slide>
            ))}
        </GridList>
        <AlertDialog callback={(option_selected: string) => {
            // la opcion seleccionada tendra el id o vacio si se cancelo
            if (option_selected !== '') {
                dispatch({type: 'operationDeleteStarted', id: option_selected});
            } else {
                dispatch({type: 'alertDialogShow', isOpen: false});
            }
        }} open={state.alertDialogOpen} title={dialog_data.title} body={dialog_data.body} options={dialog_data.options} />
        </div>
    )
};

export default ImageUploaderComponent;