import VALIDATION_TYPES from './ValidationsConstants';
// function que validara si un input es valido.
// como parametro recibe un arreglo de dicccionarios con las epecificaciones de la validacion.
const InputValidator = (validation: {[key: string]: any}, value: any) => {
    // si el arreglo de validaciones esta vacio entonces regresamos una cadena vacia.
    if (Object.keys(validation).length === 0)
        return '';
    if (validation.type === VALIDATION_TYPES.TYPES.TEXT) 
        return validateTextInput(validation, value);
    if (validation.type === VALIDATION_TYPES.TYPES.NUMBER)
        return validateNumberInput(validation, value);
}

const validateTextInput = (validation: {[key: string]: any}, value: string) => {
    let regexp: RegExp;
    let hasError: string;
    let expression: string = '';
    switch (validation.content_type) {
        // se generara un regexp dependiendo el tipo de input que se quiera utilizar
        // los casos de tipo de contenido son constantes.
        case VALIDATION_TYPES.TEXT: expression = '^[^0-9\\.\\,\\"\\?\\!\\;\\:\\#\\$\\%\\&\\(\\)\\*\\+\\-\\/\\<\\>\\=\\@\\[\\]\\\\\\^\\_\\{\\}\\|\\~]{3,50}$'; break;
        case VALIDATION_TYPES.EMAIL: expression = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";break;
        case VALIDATION_TYPES.TEXT_LONG: expression = '^[^0-9\\.\\,\\"\\?\\!\\;\\:\\#\\$\\%\\&\\(\\)\\*\\+\\-\\/\\<\\>\\=\\@\\[\\]\\\\\\^\\_\\{\\}\\|\\~]{3,250}$'; break;;
    }
    regexp = new RegExp(expression);
    (regexp.test(value)) ? hasError = '' : hasError =  validation.errorMessage;
    return hasError;
}

const validateNumberInput = (validation: {[key: string]: any}, value: string) => {
    let regexp: RegExp;
    let hasError: string;
    let expression: string = '';
    switch (validation.content_type) {
         // se generara un regexp dependiendo el tipo de input que se quiera utilizar
         // los casos de tipo de contenido son constantes.
         case VALIDATION_TYPES.SHORT_NUMBER: expression = '^[0-9]{0,10}$'; break;
         case VALIDATION_TYPES.DECIMAL_NUMBER: expression = '^([+-]?(?=\\.\\d|\\d)(?:\\d+)?(?:\\.?\\d*))(?:[eE]([+-]?\\d+))?$'; break;
    }
    regexp = new RegExp(expression);
    (regexp.test(value)) ? hasError = '' : hasError =  validation.errorMessage;
    return hasError;
}

export default InputValidator;