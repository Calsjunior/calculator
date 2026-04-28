const createCalculator = (() => {
    let state = {
        firstNumber: "0",
        secondNumber: "",
        operator: null,
    };

    const operatorConfig = {
        add: { symbol: "+", key: "+", calc: (a, b) => a + b },
        subtract: { symbol: "-", key: "-", calc: (a, b) => a - b },
        multiply: { symbol: "×", key: "*", calc: (a, b) => a * b },
        divide: { symbol: "÷", key: "/", calc: (a, b) => (b === 0 ? "Error" : a / b) },
        modulo: { symbol: "%", key: "%", calc: (a, b) => a % b },
    };

    /**
     * Format state numbers with commas as thousands separator.
     * @param   {string} currentNum - The string number to format.
     * @returns {string} The formatted number with decimal value if exist.
     */
    const formatNumber = (currentNum) => {
        if (!currentNum) return currentNum;

        // Split the string number into two between decimal point.
        // If used without splitting, parseFloat will hide the decimal point on
        // input and prevent user from inputing more that 3 values after
        // decimal point.
        currentNum = currentNum.split(".");
        const integerPart = currentNum[0];
        const decimalPart = currentNum[1];

        const formattedInteger = parseFloat(integerPart).toLocaleString("en-US");
        return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
    };

    /**
     * Update state numbers to the current input string number.
     * @param {string} currentNum - The input string number to set the state numbers to.
     */
    const setCurrentNumber = (currentNum) => {
        if (state.operator === null) {
            state.firstNumber = currentNum;
        } else {
            state.secondNumber = currentNum;
        }
    };

    /**
     * @returns {string} The state number based on the state operator's existence.
     */
    const getCurrentNumber = () => {
        return state.operator === null ? state.firstNumber : state.secondNumber;
    };

    /**
     * @returns {string} The complete math expression of user's input.
     */
    const getFullExpression = () => {
        const formattedFirst = formatNumber(state.firstNumber);
        if (!state.operator) return formattedFirst;

        const symbol = operatorConfig[state.operator].symbol;
        const formattedSecond = formatNumber(state.secondNumber);
        return `${formattedFirst} ${symbol} ${formattedSecond}`;
    };

    const processNumber = (inputNum) => {
        let currentNum = getCurrentNumber();
        if (inputNum === "." && currentNum.includes(".")) return;

        currentNum = currentNum === "0" && inputNum !== "." ? inputNum : currentNum + inputNum;
        setCurrentNumber(currentNum);
    };

    const processOperator = (inputOperator) => {
        if (state.firstNumber !== "" && state.secondNumber !== "" && state.operator !== null) {
            const result = operatorConfig[state.operator].calc(
                parseFloat(state.firstNumber),
                parseFloat(state.secondNumber),
            );
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
