
export const ArrayMerger = function<T> (original_array: T[], new_array: T[], callback: any) {
    if (new_array.length < 1) 
        callback(null);
    let result_array: T[] = [];
    if (!Object.keys(new_array[0]).includes('_id'))
        callback(null);
    // se ignora la siguiente linea del typescript, debido a que con la validacion anterior
    // ya aseguramos que el valor de id existe.
    // @ts-ignore: Unreachable code error
    let original_ids = original_array.map((e: T) => {return e['_id'];});
    let unmoddified: boolean = true;
    new_array.forEach( (newElement: T) => {
        // @ts-ignore: Unreachable code error
        if (!original_ids.includes(newElement.id)) {
            result_array.push(newElement);
            unmoddified = false;
        }
    });
    // si el arreglo no fue modificado se manda un null.
    (unmoddified) ? callback(null) : callback([...original_array, ...result_array]);
}
