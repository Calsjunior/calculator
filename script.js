const createCalculator = (() => {
    let state = {
        firstNumber: "0",
        secondNumber: "",
        operator: null,
    };

    const operatorSymbols = {
        add: "+",
        subtract: "-",
        multiply: "*",
        divide: "÷",
        modulo: "%",
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
        return state.operator === null ? state.firstNumber : state.secondNumber;
    };

    const getFullExpression = () => {
        const symbol = operatorSymbols[state.operator];
        if (!state.operator) return state.firstNumber;
        return `${state.firstNumber} ${symbol} ${state.secondNumber}`;
    };

    const processNumber = (inputNum) => {
        let currentNum = getCurrentNumber();
        if (inputNum === "." && currentNum.includes(".")) return;

        currentNum = currentNum === "0" && inputNum !== "." ? inputNum : currentNum + inputNum;
        setCurrentNumber(currentNum);
    };

    const processOperator = (inputOperator) => {
        if (state.firstNumber !== "" && state.secondNumber !== "" && state.operator !== null) {
            const result = operations[state.operator](parseFloat(state.firstNumber), parseFloat(state.secondNumber));
            state.firstNumber = (Math.round(result * 1e10) / 1e10).toString();
            state.secondNumber = "";
        }

        state.operator = inputOperator === "equal" ? null : inputOperator;
    };

    const processFunctions = (inputFunction) => {
        if (inputFunction === "clear") {
            state = { firstNumber: "0", secondNumber: "", operator: null };
            return;
        }

        let currentNum = getCurrentNumber();
        if (inputFunction === "backspace") {
            currentNum = currentNum.length <= 1 || currentNum === "0" ? "0" : currentNum.slice(0, -1);
        } else if (inputFunction === "plusminus") {
            currentNum = (parseFloat(currentNum) * -1).toString();
        }
        setCurrentNumber(currentNum);
    };

    return {
        processAllInputs(type, value) {
            switch (type) {
                case "number":
                    processNumber(value);
                    break;
                case "operator":
                    processOperator(value);
                    break;
                case "function":
                    processFunctions(value);
                    break;
            }
            return getFullExpression();
        },
    };
})();

const createCalculatorApp = (() => {
    const display = document.querySelector(".calc__result");
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

    const updateDisplay = (valueToShow) => {
        display.innerText = valueToShow;
    };

    const eventStart = () => {
        keypad.addEventListener("click", (event) => {
            const target = event.target;
            if (!target.dataset.type) return;
            valueToShow = createCalculator.processAllInputs(target.dataset.type, target.value);
            updateDisplay(valueToShow);
        });

        document.addEventListener("keydown", (event) => {
            const key = event.key;
            if (/[0-9]/.test(key)) {
                valueToShow = createCalculator.processAllInputs("number", key);
            } else if (keyMap[key]) {
                valueToShow = createCalculator.processAllInputs(keyMap[key].type, keyMap[key].value);
            }

            updateDisplay(valueToShow);
        });
    };

    return {
        init() {
            eventStart();
            updateDisplay("0");
        },
    };
})(createCalculator);

createCalculatorApp.init();
