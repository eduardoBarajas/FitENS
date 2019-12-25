import Food from '../../entities/food';
class FoodService {
    constructor() {
        console.log('se creo');
    }

    async insertOne(food) {
        console.log(food);
        console.log(food.toString());
    }

    async login() {
        console.log('login in');
    }
}

export default Object.create(new FoodService);