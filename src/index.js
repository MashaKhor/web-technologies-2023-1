// Задание 1
function pickPropArray(arrayObj, property) {
    valueProperty = [];
    arrayObj.forEach(stud => {
        if (stud.hasOwnProperty(property)) {
            valueProperty.push(stud[property])
        }
    });
    return valueProperty;
}

const students = [
    { name: 'Павел', age: 20 },
    { name: 'Иван', age: 20 },
    { name: 'Эдем', age: 20 },
    { name: 'Денис', age: 20 },
    { name: 'Виктория', age: 20 },
    { age: 40 },
 ]
 
const result = pickPropArray(students, 'name')
 
console.log(result)


// Задание 2
function createCounter() {
    let count = 1;

    return function () {
        console.log(count++);
    }
}

const counter1 = createCounter()
counter1() // 1
counter1() // 2
counter1() // 3

const counter2 = createCounter()
counter2() // 1
counter2() // 2


// Задание 3
function spinWords(line) {
    resultLine = [];

    line.split(' ').forEach(item => {
        item.length >= 5 ? resultLine.push(item.split('').reverse().join('')) : resultLine.push(item)
    });

    return resultLine.join(' ');
}

const result1 = spinWords( "Привет от Legacy" )
console.log(result1) // тевирП от ycageL

const result2 = spinWords( "This is a test" )
console.log(result2) // This is a test

// Задание 4
function getIndexes(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return [i, j];
            }
        }
    }
}

let nums = [2,7,11,15];
let target = 9;
indexes = getIndexes(nums, target);
console.log(indexes);

target = 17;
indexes = getIndexes(nums, target);
console.log(indexes);


// Задание 5
function getPefix(strs) {
    resultPref = "";

    for (let i = 0; i < strs[0].length; i++) {
        pref = strs[0][i];
        for (let j = i + 1; j < strs[0].length; j++) {
            pref += strs[0][j];
            check = true;
            for (let g = 0; g < strs.length; g++) {
                if (!strs[g].includes(pref)) {
                    check = false;
                    break
                }
            }

            if (check && pref.length > resultPref.length) {
                resultPref = pref;
            }
        }
    }
    return resultPref;
}

let strs = ["цветока","потока","хлопока"]
aaa = getPefix(strs) // ока
console.log(aaa)