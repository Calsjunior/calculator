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

let firstNumber = "";
let operator = "";
let secondNumber = "";

const table = document.querySelector("table");
table.addEventListener("click", (event) => {
    if (event.target.classList.contains("number")) {
        if (operator === "") {
            firstNumber += event.target.innerText;
            console.log(firstNumber);
        } else {
            secondNumber += event.target.innerText;
            console.log(secondNumber);
        }
    }

    if (event.target.classList.contains("operator")) {
        if (event.target.innerText === "=") {
            firstNumber = parseFloat(firstNumber);
            secondNumber = parseFloat(secondNumber);
            console.log(operate(operator, firstNumber, secondNumber));
        } else {
            operator = event.target.innerText;
            console.log(operator);
        }
    }
});
