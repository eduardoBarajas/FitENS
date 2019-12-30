import Nutrients from "./INutrients";

export default class Food {
    _id: string;
    name: string;
    description: string;
    price: number;
    nutrients: Nutrients;
    images: string[];
    available: boolean;

    constructor(name: string, description: string, price: number, nutrient: Nutrients, images: string[], available: boolean, id?: string) {
        (id != undefined) ? this._id = id: this._id = '';
        this.name = name;
        this.description = description;
        this.price = price;
        this.nutrients = nutrient;
        this.images = images;
        this.available = available;
    }

    toString(): string {
        return `${this._id}, ${this.name}, ${this.description}, ${this.price}, ${this.nutrients}, ${this.images}`;
    }
}