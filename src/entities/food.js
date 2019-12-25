class Food {
    constructor(id, name, description, price, nutrients, images) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.nutrients = nutrients;
        this.images = images;
    }

    toString() {
        return `${this.id}, ${this.name}, ${this.description}, ${this.price}, ${this.nutrients}, ${this.images}`;
    }
}

export default Food;