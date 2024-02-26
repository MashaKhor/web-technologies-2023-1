document.addEventListener('DOMContentLoaded', init);

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
        super("Сырный бортик (маленькая)", 150, 50);
    }
}

class BigCheeseBoardTopping extends Topping {
    constructor() {
        super("Сырный бортик (большая)", 300, 50);
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
            throw new TypeError('Выбрана не пицца');
        }
    }

    checkContainsPizza = function() {
        let listPizza = this.resultPizza.filter(p => p instanceof Pizza);
        return listPizza.length != 0;
    }

    removePizza = function(pizza) {
        if (!(pizza instanceof Pizza)) {
            throw new TypeError('Выбрана не пицца');
        } else if (this.resultPizza.indexOf(pizza) == -1) {
            throw new Error('Выбранная пицца не была изначально добавлена');
        } else {
            let indexPizza = this.resultPizza.indexOf(pizza);
            this.resultPizza.splice(indexPizza, 1);
            this.resultPrice -= pizza.price;
            this.resultCalories -= pizza.calories;
        }
    }

    addTopping = function(topping) {
        if (!this.checkContainsPizza()) {
            throw new Error('Сначала выберите пиццу');
        } else if (topping instanceof Topping) {
            this.resultPizza.push(topping);
            this.resultPrice += topping.price;
            this.resultCalories += topping.calories;
        } else {
            throw new TypeError('Выбран не топпинг');
        }
    }

    removeTopping = function(topping) {
        if (!(topping instanceof Topping)) {
            console.log('Выбран для удаления не топпинг');
        } else {
            for (let i = 0; i < this.resultPizza.length; i++) {
                if (this.resultPizza[i].constructor.name == topping.constructor.name) {
                    this.resultPizza.splice(i, 1);
                    this.resultPrice -= topping.price;
                    this.resultCalories -= topping.calories;
                    break;
                }
            }
        }
    }

    addSize = function(size) {
        if (!this.checkContainsPizza()) {
            throw new Error('Сначала выберите пиццу');
        } else if (this.checkContainsSize()) {
            let oldSize = this.resultPizza.filter(p => p instanceof Size)[0];
            this.removeSize(oldSize);
            this.addSize(size);
        } else if (size instanceof Size) {
            this.resultPizza.push(size);
            this.resultPrice += size.price;
            this.resultCalories += size.calories;
        } else {
            throw new TypeError('Выбран не размер');
        }
    }

    checkContainsSize = function() {
        let listSize = this.resultPizza.filter(p => p instanceof Size);
        return listSize.length != 0;
    }

    removeSize = function(size) {
        if (!(size instanceof Size)) {
            throw new TypeError('Выбран не размер');
        } else if (this.resultPizza.indexOf(size) == -1) {
            throw new Error('Выбраный размер не был добавлен');
        } else {
            let indexSize = this.resultPizza.indexOf(size);
            this.resultPizza.splice(indexSize, 1);
            this.resultPrice -= size.price;
            this.resultCalories -= size.calories;
        }
    }

    getToppings = function() {
        let toppings = this.resultPizza.filter(t => t instanceof Topping);
        return toppings;
    }

    getSize = function() {
        let size = this.resultPizza.filter(s => s instanceof Size)
                                   .map(s => s.name);
        return size;
    }

    getPizza = function() {
        let typePizza = this.resultPizza.filter(p => p instanceof Pizza)
                                        .map(p => p.name);
        return typePizza;
    }

    calculatePrice = function() {
        return this.resultPrice;
    }

    calculateCalories = function() {
        return this.resultCalories;
    }
}

function init() {
    showMainFunctionality();

    const resultPizza = new ResultPizza();

    const buttonAddPizza = document.querySelectorAll('.add-pizza'),
          buttonRemovePizza = document.querySelectorAll('.remove-pizza');
    let currentPizza;
    let currentSize;

    buttonAddPizza.forEach(but => but.addEventListener('click', () => {
        const parentButton = but.closest('.pizza'),
              namePizza = parentButton.querySelector('span').innerText,
              buttonRemove = parentButton.querySelector('.remove-pizza');
        
        switch(namePizza) {
            case 'Пепперони':
                currentPizza = new Pepperoni();
                resultPizza.addPizza(currentPizza);
                break;
            case 'Маргаритта':
                currentPizza = new Margaritta();
                resultPizza.addPizza(currentPizza);
                break;
            case 'Баварская':
                currentPizza = new Bavarskaya();
                resultPizza.addPizza(currentPizza);
                break;
        }
        removeActiveRemoveButtonPizza();
        buttonRemove.classList.add('active');
        getResultPriceCalories(resultPizza);
    }));

    buttonRemovePizza.forEach(but => but.addEventListener('click', () => {
        resultPizza.removePizza(currentPizza);
        but.classList.remove('active');
        getResultPriceCalories(resultPizza);
    }));

    const bigSizeButton = document.querySelector('.big-pizza'),
          smallSizeButton = document.querySelector('.small-pizza');

    smallSizeButton.addEventListener('click', () => {
        currentSize = new SmallSizePizza();
        try {
            resultPizza.addSize(currentSize);

            if (resultPizza.getToppings().length > 0) {
                for (let i = 0; i < resultPizza.resultPizza.length; i++) {
                    if (resultPizza.resultPizza[i] instanceof BigCheddarParmesanTopping) {
                        i--;
                        resultPizza.removeTopping(new BigCheddarParmesanTopping());
                        resultPizza.addTopping(new SmallCheddarParmesanTopping());
                    } else if (resultPizza.resultPizza[i] instanceof BigMozzarellaTopping) {
                        i--;
                        resultPizza.removeTopping(new BigMozzarellaTopping());
                        resultPizza.addTopping(new SmallMozzarellaTopping());
                    } else if (resultPizza.resultPizza[i] instanceof BigCheeseBoardTopping) {
                        i--;
                        resultPizza.removeTopping(new BigCheeseBoardTopping());
                        resultPizza.addTopping(new SmallCheeseBoardTopping());
                    }
                }
            }
            smallSizeButton.classList.add('current-size');
            bigSizeButton.classList.remove('current-size');
        } 
        catch(err) {
            const errorBlock = document.querySelector('.view-error');
            errorBlock.classList.add('active');
        }

        getResultPriceCalories(resultPizza);
    });
    
    bigSizeButton.addEventListener('click', () => {
        currentSize = new BigSizePizza();
        try {
            resultPizza.addSize(currentSize);
            smallSizeButton.classList.remove('current-size');
            bigSizeButton.classList.add('current-size');

            if (resultPizza.getToppings().length > 0) {
                for (let i = 0; i < resultPizza.resultPizza.length; i++) {
                    if (resultPizza.resultPizza[i] instanceof SmallCheddarParmesanTopping) {
                        i--;
                        resultPizza.removeTopping(new SmallCheddarParmesanTopping());
                        resultPizza.addTopping(new BigCheddarParmesanTopping());
                    } else if (resultPizza.resultPizza[i] instanceof SmallMozzarellaTopping) {
                        i--;
                        resultPizza.removeTopping(new SmallMozzarellaTopping());
                        resultPizza.addTopping(new BigMozzarellaTopping());
                    } else if (resultPizza.resultPizza[i] instanceof SmallCheeseBoardTopping) {
                        i--;
                        resultPizza.removeTopping(new SmallCheeseBoardTopping());
                        resultPizza.addTopping(new BigCheeseBoardTopping());
                    }
                }
            }


        } 
        catch(err) {
            const errorBlock = document.querySelector('.view-error');
            errorBlock.classList.add('active');
        }

        getResultPriceCalories(resultPizza);
    });

    window.addEventListener('click', (e) => {
        const blockSize = document.querySelector('.size-pizza'),
              errorBlock = document.querySelector('.view-error'),
              blockToppings = document.querySelector('.toppins-all'),
              errorTopping = document.querySelector('.view-error-topping');

        if(!blockSize.contains(e.target)) {
            errorBlock.classList.remove('active');
        }

        if (!blockToppings.contains(e.target)) {
            errorTopping.classList.remove('active');
        }
    });

    const buttonAddTopping = document.querySelectorAll('.add-topping'),
          buttonRemoveTopping = document.querySelectorAll('.remove-topping');
        
    buttonAddTopping.forEach(but => but.addEventListener('click', () => {
        const parentDivCount = but.closest('.count-topping'),
              parentDivTopping = but.closest('.topping'),
              nameTopping = parentDivTopping.querySelector('.topping-name').innerText,
              paragraphCount = parentDivCount.querySelector('p'),
              removeButtonTop = parentDivCount.querySelector('.remove-topping');
        
        const sizePizza = resultPizza.getSize()[0];

        if (sizePizza == undefined) {
            document.querySelector('.view-error-topping').classList.add('active');
        } else {
            const nameToppingRes = `${nameTopping} (${sizePizza.toLowerCase()})`;
            let countCurTopping;

            switch(nameToppingRes) {
                case 'Сырный бортик (маленькая)':
                    resultPizza.addTopping(new SmallCheeseBoardTopping());
                    countCurTopping = resultPizza.getToppings().filter(t => t instanceof SmallCheeseBoardTopping);
                    break;
                case 'Сырный бортик (большая)':
                    resultPizza.addTopping(new BigCheeseBoardTopping());
                    countCurTopping = resultPizza.getToppings().filter(t => t instanceof BigCheeseBoardTopping);
                    break;
                case 'Сливочная моцарелла (маленькая)':
                    resultPizza.addTopping(new SmallMozzarellaTopping());
                    countCurTopping = resultPizza.getToppings().filter(t => t instanceof SmallMozzarellaTopping);
                    break;
                case 'Сливочная моцарелла (большая)':
                    resultPizza.addTopping(new BigMozzarellaTopping());
                    countCurTopping = resultPizza.getToppings().filter(t => t instanceof BigMozzarellaTopping);
                    break;
                case 'Чеддер и пармезан (маленькая)':
                    resultPizza.addTopping(new SmallCheddarParmesanTopping());
                    countCurTopping = resultPizza.getToppings().filter(t => t instanceof SmallCheddarParmesanTopping);
                    break;
                case 'Чеддер и пармезан (большая)':
                    resultPizza.addTopping(new BigCheddarParmesanTopping());
                    countCurTopping = resultPizza.getToppings().filter(t => t instanceof BigCheddarParmesanTopping);
                    break;
            }

            if (countCurTopping.length == 0) {
                paragraphCount.innerText = "";
                paragraphCount.classList.remove('active');
                removeButtonTop.classList.remove('active');
            } else {
                paragraphCount.innerText = countCurTopping.length;
                paragraphCount.classList.add('active');
                removeButtonTop.classList.add('active');
            }
        }

        getResultPriceCalories(resultPizza);
    }));

    buttonRemoveTopping.forEach(but => but.addEventListener('click', () => {
        const parentDivCount = but.closest('.count-topping'),
              parentDivTopping = but.closest('.topping'),
              nameTopping = parentDivTopping.querySelector('.topping-name').innerText,
              paragraphCount = parentDivCount.querySelector('p'),
              removeButtonTop = parentDivCount.querySelector('.remove-topping');

        const sizePizza = resultPizza.getSize()[0];
        const nameToppingRes = `${nameTopping} (${sizePizza.toLowerCase()})`;
        let countCurTopping;

        switch(nameToppingRes) {
            case 'Сырный бортик (маленькая)':
                resultPizza.removeTopping(new SmallCheeseBoardTopping());
                countCurTopping = resultPizza.getToppings().filter(t => t instanceof SmallCheeseBoardTopping);
                break;
            case 'Сырный бортик (большая)':
                resultPizza.removeTopping(new BigCheeseBoardTopping());
                countCurTopping = resultPizza.getToppings().filter(t => t instanceof BigCheeseBoardTopping);
                break;
            case 'Сливочная моцарелла (маленькая)':
                resultPizza.removeTopping(new SmallMozzarellaTopping());
                countCurTopping = resultPizza.getToppings().filter(t => t instanceof SmallMozzarellaTopping);
                break;
            case 'Сливочная моцарелла (большая)':
                resultPizza.removeTopping(new BigMozzarellaTopping());
                countCurTopping = resultPizza.getToppings().filter(t => t instanceof BigMozzarellaTopping);
                break;
            case 'Чеддер и пармезан (маленькая)':
                resultPizza.removeTopping(new SmallCheddarParmesanTopping());
                countCurTopping = resultPizza.getToppings().filter(t => t instanceof SmallCheddarParmesanTopping);
                break;
            case 'Чеддер и пармезан (большая)':
                resultPizza.removeTopping(new BigCheddarParmesanTopping());
                countCurTopping = resultPizza.getToppings().filter(t => t instanceof BigCheddarParmesanTopping);
                break;
        }

        if (countCurTopping.length == 0) {
            paragraphCount.innerText = "";
            paragraphCount.classList.remove('active');
            removeButtonTop.classList.remove('active');
        } else {
            paragraphCount.innerText = countCurTopping.length;
            paragraphCount.classList.add('active');
            removeButtonTop.classList.add('active');
        }

        getResultPriceCalories(resultPizza);
    }));
}

function showMainFunctionality() {
    const infoIcon = document.querySelector('.icon-info'),
          infoBlockHover = document.querySelector('.info-size');

    infoIcon.addEventListener('mouseover', () => {
        infoBlockHover.classList.add('active');
    });

    infoIcon.addEventListener('mouseout', () => {
        infoBlockHover.classList.remove('active');
    });
}

function getResultPriceCalories(resultPizza) {
    const buttonResult = document.querySelector('.button-price-cal'),
          resultPrice = resultPizza.calculatePrice(),
          resultCalories = resultPizza.calculateCalories();
    
    buttonResult.innerText = `${resultPrice} ₽ (${resultCalories} кКалл)`;
}

function removeActiveRemoveButtonPizza() {
    const removeButtons = document.querySelectorAll('.remove-pizza');
    removeButtons.forEach(but => {
        if (but.classList.contains('active')) but.classList.remove('active');
    })
}