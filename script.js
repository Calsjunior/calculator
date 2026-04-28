const createCalculator = (() => {
    const state = {
        firstNumber: "0",
        secondNumber: "0",
        operator: null,
    };

    const operations = {
        add: (a, b) => a + b,
        subtract: (a, b) => a - b,
        multiply: (a, b) => a * b,
        divide: (a, b) => (b === 0 ? "Error" : a / b),
        modulo: (a, b) => a % b,
    };

    const setCurrentNumber = (currentNum) => {
        if (state.operator === null) {
            state.firstNumber = currentNum;
        } else {
            state.secondNumber = currentNum;
        }
    };

    const getCurrentNumber = () => {
        state.operator === null ? state.firstNumber : state.secondNumber;
    };
})();

const result = document.querySelector(".calc__result");
const keypad = document.querySelector(".calc__keypad");

const keyMap = {
    Enter: { type: "operator", value: "equal" },
    "=": { type: "operator", value: "equal" },
    c: { type: "function", value: "clear" },
    Backspace: { type: "function", value: "backspace" },
    ".": { type: "number", value: "." },
    "+": { type: "operator", value: "add" },
    "-": { type: "operator", value: "subtract" },
    "*": { type: "operator", value: "multiply" },
    "/": { type: "operator", value: "divide" },
    "%": { type: "operator", value: "modulo" },
};

const clear = () => {
    firstNumber = "0";
    operator = null;
    secondNumber = "";
    valueToShow = "0";
};

const updateDisplay = (number) => {
    result.innerText = number.length > 10 ? parseFloat(number).toExponential(5) : number;
};

const evaluteNumbers = (numberInput) => {
    let current = getCurrentNumber();

    // Prevents multiple dots
    if (numberInput === "." && current.includes(".")) {
        return current;
    }

    if (current === "0" && numberInput !== ".") {
        current = numberInput;
    } else {
        current += numberInput;
    }

    setCurrentNumber(current);
    return current;
};

const handleOperators = (operatorInput) => {
    if (firstNumber !== "" && secondNumber !== "" && operator !== null) {
        const result = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        firstNumber = (Math.round(result * 1e10) / 1e10).toString();
        secondNumber = "";
    }

    if (operatorInput === "equal") {
        operator = null;
    } else {
        operator = operatorInput;
    }
    return firstNumber || "0";
};

const handleFunctions = (functionInput) => {
    if (functionInput === "clear") {
        clear();
        return firstNumber;
    }

    if (functionInput === "backspace") {
        let current = getCurrentNumber();

        if (current.length <= 1 || current === "0" || current === "-") {
            current = "0";
        } else {
            current = current.slice(0, -1);
        }

        setCurrentNumber(current);
        return current;
    }

    if (functionInput === "plusminus") {
        let current = getCurrentNumber();

        current = (parseFloat(current) * -1).toString();

        setCurrentNumber(current);
        return current;
    }
};

const processInput = (action, inputValue) => {
    switch (action) {
        case "number":
            return evaluteNumbers(inputValue);
        case "operator":
            return handleOperators(inputValue);
        case "function":
            return handleFunctions(inputValue);
    }
};

keypad.addEventListener("click", (event) => {
    const target = event.target;
    if (!target.dataset.type) return;
    valueToShow = processInput(target.dataset.type, target.value);
    updateDisplay(valueToShow);
});

document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        valueToShow = processInput("number", key);
    } else if (keyMap[key]) {
        valueToShow = processInput(keyMap[key].type, keyMap[key].value);
    }

    updateDisplay(valueToShow);
});
