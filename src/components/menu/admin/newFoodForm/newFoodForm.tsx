import React from 'react';
import GenericForm from '../../../shared/genericForm/GenericForm';
import VALIDATION_TYPES from '../../../../utils/ValidationsConstants';
import Food from '../../../../entities/food';
import MySnackBar from '../../../shared/snackbar/mSnackBar';
import FoodService from '../../../../services/foods/foodService';

// datos para mostrar en el snackbar
let snackbar_data = {message: '', status: ''};

const FORM_INPUTS: any[] = [
    {'key': 0, 'type': 'separator', 'label': 'Informacion Basica'},
    {'key': 1, 'type': 'input', 'label': 'Nombre', 'validation': {type: VALIDATION_TYPES.TYPES.TEXT, content_type: VALIDATION_TYPES.TEXT, errorMessage: 'Ingresa un nombre valido.', required: true}, 'rowSize': 4},
    {'key': 2, 'type': 'input', 'label': 'Descripcion', 'validation': {type: VALIDATION_TYPES.TYPES.TEXT, content_type: VALIDATION_TYPES.TEXT_LONG, errorMessage: 'Ingresa una descripcion valida.', required: true}, 'rowSize': 4},
    {'key': 3, 'type': 'input', 'label': 'Precio', 'validation': {type: VALIDATION_TYPES.TYPES.NUMBER, content_type: VALIDATION_TYPES.DECIMAL_NUMBER, errorMessage: 'Ingresa un precio valido.', required: true}, 'rowSize': 4},
    {'key': 4, 'type': 'separator', 'label': 'Informacion Detallada'},
    {'key': 5, 'type': 'input', 'label': 'Calorias', 'validation': {type: VALIDATION_TYPES.TYPES.NUMBER, content_type: VALIDATION_TYPES.SHORT_NUMBER, errorMessage: 'Ingresa un numero valido.', required: true}, 'rowSize': 2},
    {'key': 6, 'type': 'input', 'label': 'Proteinas', 'validation': {type: VALIDATION_TYPES.TYPES.NUMBER, content_type: VALIDATION_TYPES.SHORT_NUMBER, errorMessage: 'Ingresa un numero valido.', required: false}, 'rowSize': 2},
    {'key': 7, 'type': 'input', 'label': 'Calcio', 'validation': {type: VALIDATION_TYPES.TYPES.NUMBER, content_type: VALIDATION_TYPES.SHORT_NUMBER, errorMessage: 'Ingresa un numero valido.', required: false}, 'rowSize': 2},
    {'key': 8, 'type': 'input', 'label': 'Hidratos de carbono', 'validation': {type: VALIDATION_TYPES.TYPES.NUMBER, content_type: VALIDATION_TYPES.SHORT_NUMBER, errorMessage: 'Ingresa un numero valido.', required: false}, 'rowSize': 2},
    {'key': 9, 'type': 'input', 'label': 'Fibra', 'validation': {type: VALIDATION_TYPES.TYPES.NUMBER, content_type: VALIDATION_TYPES.SHORT_NUMBER, errorMessage: 'Ingresa un numero valido.', required: false}, 'rowSize': 2},
    {'key': 10, 'type': 'input', 'label': 'Vitamina A', 'validation': {type: VALIDATION_TYPES.TYPES.NUMBER, content_type: VALIDATION_TYPES.SHORT_NUMBER, errorMessage: 'Ingresa un numero valido.', required: false}, 'rowSize': 2},
    {'key': 11, 'type': 'input', 'label': 'Vitamina B', 'validation': {type: VALIDATION_TYPES.TYPES.NUMBER, content_type: VALIDATION_TYPES.SHORT_NUMBER, errorMessage: 'Ingresa un numero valido.', required: false}, 'rowSize': 2},
    {'key': 12, 'type': 'input', 'label': 'Vitamina D', 'validation': {type: VALIDATION_TYPES.TYPES.NUMBER, content_type: VALIDATION_TYPES.SHORT_NUMBER, errorMessage: 'Ingresa un numero valido.', required: false}, 'rowSize': 2},
    {'key': 13, 'type': 'input', 'label': 'Vitamina E', 'validation': {type: VALIDATION_TYPES.TYPES.NUMBER, content_type: VALIDATION_TYPES.SHORT_NUMBER, errorMessage: 'Ingresa un numero valido.', required: false}, 'rowSize': 2},
    {'key': 14, 'type': 'input', 'label': 'Lipidos', 'validation': {type: VALIDATION_TYPES.TYPES.NUMBER, content_type: VALIDATION_TYPES.SHORT_NUMBER, errorMessage: 'Ingresa un numero valido.'}, 'rowSize': 2},
    {'key': 15, 'type': 'separator', 'label': 'Imagenes'},
    {'key': 16, 'type': 'imageselector', 'label': 'imageselector', 'validation': {'minImages': 1, 'maxImages': 2}},
];

const NewFoodForm: React.FC<{}> = () => {
    const [showSnackbar, setShowSnackbar] = React.useState(false);
    return (
        <div>
            <GenericForm imagesRef={'foods'} form_inputs={FORM_INPUTS} onSubmit={(state: any) => {
                return handleSumbmit(state);
            }} />
            <MySnackBar isOpen={showSnackbar} message={snackbar_data.message} status={snackbar_data.status} setState={setShowSnackbar}/>
        </div>
    );
}

function handleSumbmit(final_state: any) {
    let food = new Food(final_state.Nombre.value, final_state.Descripcion.value, final_state.Precio.value,
        {kcal: final_state.Calorias.value, proteinas: final_state.Proteinas.value, calcio: final_state.Calcio.value,
            hidratosCarbono: final_state['Hidratos de carbono'].value, fibra: final_state.Fibra.value, 
            vitaminaA: final_state['Vitamina A'].value, vitaminaB: final_state['Vitamina B'].value, vitaminaD: final_state['Vitamina D'].value,
            vitaminaE: final_state['Vitamina E'].value, lipidos: final_state.Lipidos.value}, final_state.images, true);      
    return FoodService.insert(food);
}

export default NewFoodForm;