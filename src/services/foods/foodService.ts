import Food from '../../entities/food';
const axios = require('axios').default;
const api_url = 'http://localhost:4200/';

class FoodService {
    constructor() {
        console.log('se creo');
    }

    async insert(food: Food) {
        const result = await axios.post(`${api_url}foods/insertFood/`, {
            'food': food
        });
        return result.data;
    }

    async find(type: string, params: {[key: string]: any}) {
        const result = await axios.get(`${api_url}foods/find/${type}/${JSON.stringify(params)}`);
        console.log(result);
        return result.data;
    }

    async paginate(start: number, end: number) {
        const result = await axios.get(`${api_url}foods/paginate/${start}/${end}/`);
        console.log(result);
        return result;
    }
}

export default Object.create(new FoodService);