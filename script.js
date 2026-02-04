const add = function (firstNumber, secondNumber) {
    return firstNumber + secondNumber;
};

const subtract = function (firstNumber, secondNumber) {
    return firstNumber - secondNumber;
};

const multiply = function (firstNumber, secondNumber) {
    return firstNumber * secondNumber;
};

const divide = function (firstNumber, secondNumber) {
    return firstNumber / secondNumber;
};

const operate = function (operator, firstNumber, secondNumber) {
    switch (operator) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber, secondNumber);
    }
};

let firstNumber = 2;
let secondNumber = 3;
let operator = "+";

console.log(operate(operator, firstNumber, secondNumber));
