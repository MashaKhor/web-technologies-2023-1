// document.addEventListener('DOMContentLoaded', () => {
//     console.log(document.getElementById('test-id'))
// })

class Pizza {
    constructor(name, price, calories) {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}

class Margaritta extends Pizza {
    constructor() {
        super("Маргаритта", 500, 300);
    }
}

class Pepperoni extends Pizza {
    constructor() {
        super("Пепперони", 800, 400);
    }
}

class Bavarskaya extends Pizza {
    constructor() {
        super("Баварская", 700, 450);
    }
}

class Size {
    constructor(name, price, calories) {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}

class BigSizePizza extends Size {
    constructor() {
        super("Большая", 200, 200);
    }
}

class SmallSizePizza extends Size {
    constructor() {
        super("Маленькая", 100, 100);
    }
}

class Topping {
    constructor(name, price, calories) {
        this.name = name;
        this.price = price;
        this.calories = calories;
    }
}

class SmallMozzarellaTopping extends Topping {
    constructor() {
        super("Сливочная моцарелла (маленькая)", 50, 20);
    }
}

class BigMozzarellaTopping extends Topping {
    constructor() {
        super("Сливочная моцарелла (большая)", 100, 40);
    }
}

class SmallCheeseBoardTopping extends Topping {
    constructor() {
        super("Сырный борт (маленькая)", 150, 50);
    }
}

class BigCheeseBoardTopping extends Topping {
    constructor() {
        super("Сырный борт (большая)", 300, 50);
    }
}

class SmallCheddarParmesanTopping extends Topping {
    constructor() {
        super("Чеддер и пармезан (маленькая)", 150, 50);
    }
}

class BigCheddarParmesanTopping extends Topping {
    constructor() {
        super("Чеддер и пармезан (большая)", 300, 50);
    }
}

class ResultPizza {
    resultPizza = [];
    resultPrice = 0;
    resultCalories = 0;
    
    addPizza = function(pizza) {
        if (this.checkContainsPizza()) {
            let oldPizza = this.resultPizza.filter(p => p instanceof Pizza)[0];
            this.removePizza(oldPizza);
            this.addPizza(pizza);
        } else if (pizza instanceof Pizza) {
            this.resultPizza.push(pizza);
            this.resultPrice += pizza.price;
            this.resultCalories += pizza.calories;
        } else {
            console.log('Выбрана не пицца');
        }
    }

    checkContainsPizza = function() {
        let listPizza = this.resultPizza.filter(p => p instanceof Pizza);
        return listPizza.length != 0;
    }

    removePizza = function(pizza) {
        if (!(pizza instanceof Pizza)) {
            console.log('Выбрана для удаления не пицца');
        } else if (this.resultPizza.indexOf(pizza) == -1) {
            console.log('Выбранная для удаления пицца не была изначально добавлена');
        } else {
            let indexPizza = this.resultPizza.indexOf(pizza);
            this.resultPizza.splice(indexPizza, 1);
            this.resultPrice -= pizza.price;
            this.resultCalories -= pizza.calories;
        }
    }

    addTopping = function(topping) {
        if (!this.checkContainsPizza()) {
            console.log('Нельзя выбрать топпинг, пока не выбрана пицца');
        } else if (topping instanceof Topping) {
            this.resultPizza.push(topping);
            this.resultPrice += topping.price;
            this.resultCalories += topping.calories;
        } else {
            console.log('Выбран не топпинг');
        }
    }

    removeTopping = function(topping) {
        if (!(topping instanceof Topping)) {
            console.log('Выбран для удаления не топпинг');
        } else if (this.resultPizza.indexOf(topping) == -1) {
            console.log('Выбранный для удаления топпинг не была изначально добавлен');
        } else {
            let indexTopping = this.resultPizza.indexOf(topping);
            this.resultPizza.splice(indexTopping, 1);
            this.resultPrice -= topping.price;
            this.resultCalories -= topping.calories;
        }
    }

    addSize = function(size) {
        if (!this.checkContainsPizza()) {
            console.log('Нельзя добавить размер, пока не выбрана пицца');
        } else if (this.checkContainsSize()) {
            let oldSize = this.resultPizza.filter(p => p instanceof Size)[0];
            this.removeSize(oldSize);
            this.addSize(size);
        } else if (size instanceof Size) {
            this.resultPizza.push(size);
            this.resultPrice += size.price;
            this.resultCalories += size.calories;
        } else {
            console.log('Выбран не размер');
        }
    }

    checkContainsSize = function() {
        let listSize = this.resultPizza.filter(p => p instanceof Size);
        return listSize.length != 0;
    }

    removeSize = function(size) {
        if (!(size instanceof Size)) {
            console.log('Выбран для удаления не размер');
        } else if (this.resultPizza.indexOf(size) == -1) {
            console.log('Выбранный для удаления размер не была изначально добавлен');
        } else {
            let indexSize = this.resultPizza.indexOf(size);
            this.resultPizza.splice(indexSize, 1);
            this.resultPrice -= size.price;
            this.resultCalories -= size.calories;
        }
    }

    getToppings = function() {
        let toppings = this.resultPizza.filter(t => t instanceof Topping)
                                       .map(t => t.name);
        return toppings.length == 0 ? 'Не вабрано ни одного топпинга' : toppings;
    }

    getSize = function() {
        let size = this.resultPizza.filter(s => s instanceof Size)
                                   .map(s => s.name);
        return size.length == 0 ? 'Не выбран размер' : size;
    }

    getPizza = function() {
        let typePizza = this.resultPizza.filter(p => p instanceof Pizza)
                                        .map(p => p.name);
        return typePizza.length == 0 ? 'Не выбрана пицца' : typePizza;
    }

    calculatePrice = function() {
        return this.resultPrice;
    }

    calculateCalories = function() {
        return this.resultCalories;
    }
}

let pizza = new ResultPizza();
let typePizza = new Margaritta();
let sizePizza = new BigSizePizza();
let mozzarellaTopping = new BigMozzarellaTopping();
let cheddTopping = new SmallCheddarParmesanTopping();

pizza.addPizza(typePizza);
pizza.addSize(sizePizza);
pizza.addTopping(mozzarellaTopping);
pizza.addTopping(cheddTopping);
pizza.removeTopping(cheddTopping);

console.log(pizza.getPizza());
console.log(pizza.getSize());
console.log(pizza.getToppings());
console.log(pizza.calculatePrice());
console.log(pizza.calculateCalories());