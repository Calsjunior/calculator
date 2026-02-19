const display = document.querySelector(".display");
const table = document.querySelector("table");

let firstNumber = "0";
let operator = null;
let secondNumber = "";
let valueToShow = "0";

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "Error" : a / b);
const modulo = (a, b) => a % b;

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
    }
};

const clear = function () {
    firstNumber = "0";
    operator = null;
    secondNumber = "";
    valueToShow = "0";
};

const updateDisplay = function (number) {
    display.innerText = number;
};

const evaluteNumbers = function (numberInput) {
    let current = operator === null ? firstNumber : secondNumber;

    // Prevents multiple dots
    if (numberInput === "." && current.includes(".")) {
        return current;
    }

    // FIX: properly implement a way to handle long numbers from input and during calculations
    if (current.length > 12) {
        return current;
    }

    if (current === "0" && numberInput !== ".") {
        current = numberInput;
    } else {
        current += numberInput;
    }

    if (operator === null) {
        firstNumber = current;
    } else {
        secondNumber = current;
    }

    return current;
};

const handleOperators = function (operatorInput) {
    if (firstNumber !== "" && secondNumber !== "" && operator !== null) {
        const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        firstNumber = result.toString();
        secondNumber = "";
    }

    if (operatorInput === "equal") {
        operator = null;
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
