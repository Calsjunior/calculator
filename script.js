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
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber, secondNumber);
        case "%":
            return modulo(firstNumber, secondNumber);
        case "root":
            return root(firstNumber, secondNumber);
    }
};

const clear = function () {
    firstNumber = "";
    operator = "";
    secondNumber = "";
    display.innerText = 0;
};

let firstNumber = "";
let operator = "";
let secondNumber = "";

const display = document.querySelector(".display");
const table = document.querySelector("table");
table.addEventListener("click", (event) => {
    if (event.target.classList.contains("number")) {
        if (operator === "") {
            firstNumber += event.target.innerText;
            display.innerText = firstNumber;
            console.log(firstNumber);
        } else {
            secondNumber += event.target.innerText;
            display.innerText = secondNumber;
            console.log(secondNumber);
        }
    }

    if (event.target.classList.contains("operator")) {
        if (event.target.innerText === "=") {
            firstNumber = parseFloat(firstNumber);
            secondNumber = parseFloat(secondNumber);
            let result = operate(operator, firstNumber, secondNumber);
            display.innerText = result;
        } else {
            operator = event.target.innerText;
            console.log(operator);
        }
    }

    if (event.target.classList.contains("function")) {
        if (event.target.innerText === "C") {
            clear();
        }
    }
});
