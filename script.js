const display = document.querySelector(".display");
const table = document.querySelector("table");

let firstNumber = "";
let operator = null;
let secondNumber = "";
let valueToShow = "";

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "Error" : a / b);
const modulo = (a, b) => a % b;
const root = (a, b) => Math.pow(a, 1 / b);

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
    firstNumber = "";
    operator = null;
    secondNumber = "";
    valueToShow = "0";
};

const updateDisplay = function (number) {
    display.innerText = number;
};

const evaluteNumbers = function (numberInput) {
    if (operator === null) {
        firstNumber += numberInput;
        return firstNumber;
    } else {
        secondNumber += numberInput;
        return secondNumber;
    }
};

const handleOperators = function (operatorInput) {
    if (firstNumber !== "" && secondNumber !== "" && operator !== null) {
        const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        firstNumber = result.toString();
        secondNumber = "";
    }

    if (operatorInput === "equal") {
        operator == null;
    } else {
        operator = operatorInput;
    }
    return firstNumber || "0";
};

table.addEventListener("click", (event) => {
    const target = event.target;
    const action = target.dataset.type;
    const numberInput = target.innerText;
    const operatorInput = target.name;

    switch (action) {
        case "number":
            valueToShow = evaluteNumbers(numberInput);
            break;
        case "operator":
            valueToShow = handleOperators(operatorInput);
            break;
        case "function":
            clear();
            break;
    }

    updateDisplay(valueToShow);
});
