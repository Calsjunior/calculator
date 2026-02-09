const display = document.querySelector(".display");
const table = document.querySelector("table");

let firstNumber = 0;
let operator = "";
let secondNumber = 0;

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

const modulo = function (firstNumber, secondNumber) {
    return firstNumber % secondNumber;
};

const root = function (firstNumber, secondNumber) {
    return Math.pow(firstNumber, 1 / secondNumber);
};

const operate = function (operator, firstNumber, secondNumber) {
    switch (operator) {
        case "add":
            return add(firstNumber, secondNumber);
        case "subtract":
            return subtract(firstNumber, secondNumber);
        case "multiply":
            return multiply(firstNumber, secondNumber);
        case "divide":
            return divide(firstNumber, secondNumber);
        case "modulo":
            return modulo(firstNumber, secondNumber);
        case "root":
            return root(firstNumber, secondNumber);
    }
};

const clear = function () {
    firstNumber = 0;
    operator = "";
    secondNumber = 0;
    display.innerText = 0;
};

table.addEventListener("click", (event) => {
    if (event.target.classList.contains("number")) {
        if (operator === "") {
            firstNumber = firstNumber * 10 + parseFloat(event.target.innerText);
            display.innerText = firstNumber;
        } else {
            secondNumber = secondNumber * 10 + parseFloat(event.target.innerText);
            display.innerText = secondNumber;
        }
    } else if (event.target.classList.contains("operator")) {
        if (event.target.name === "equal") {
            firstNumber = operate(operator, firstNumber, secondNumber);
            operator = "";
            secondNumber = 0;
            display.innerText = firstNumber;
        } else if (firstNumber != undefined && operator && secondNumber != undefined) {
            firstNumber = operate(operator, firstNumber, secondNumber);
            operator = event.target.name;
            secondNumber = 0;
            display.innerText = firstNumber;
        } else {
            operator = event.target.name;
        }
    } else if (event.target.classList.contains("function")) {
        if (event.target.name === "clear") {
            clear();
        }
    }
});
