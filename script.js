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
     * Formats state numbers with commas as thousands separator.
     * @param   {string} currentNum - The string number to format.
     * @returns {string} The formatted number with decimal value if exist.
     */
    const formatNumber = (currentNum) => {
        if (!currentNum) return currentNum;
        // Use regex to add commas every 3 digits
        // This keeps the input as a string, avoiding parseFloat precision issues.
        // https://stackoverflow.com/questions/2901102/how-can-i-format-a-number-with-commas-as-thousands-separators#2901298
        return currentNum.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    };

    /**
     * Assigns the input value to the appropriate operand in the state.
     * @param {string} currentNum - The numeric string value to store.
     */
    const setCurrentNumber = (currentNum) => {
        if (state.operator === null) {
            state.firstNumber = currentNum;
        } else {
            state.secondNumber = currentNum;
        }
    };

    /**
     * Retrieves the operand that is being modified.
     * @returns {string} The active numeric string (firstNumber or secondNumber).
     */
    const getCurrentNumber = () => {
        return state.operator === null ? state.firstNumber : state.secondNumber;
    };

    /**
     * Generates a formatted string representing the full calculation.
     * @returns {string} The complete math expression for display (e.g., "1,234 + 56").
     */
    const getFullExpression = () => {
        const formattedFirst = formatNumber(state.firstNumber);
        if (!state.operator) return formattedFirst;

        const symbol = operatorConfig[state.operator].symbol;
        const formattedSecond = formatNumber(state.secondNumber);
        return `${formattedFirst} ${symbol} ${formattedSecond}`;
    };

    /**
     * Prevents duplicate decimal point and updates state numbers with new input.
     * @param {string} inputNum - The string number that user just input.
     */
    const processNumber = (inputNum) => {
        let currentNum = getCurrentNumber();
        if (inputNum === "." && currentNum.includes(".")) return;

        currentNum = currentNum === "0" && inputNum !== "." ? inputNum : currentNum + inputNum;
        setCurrentNumber(currentNum);
    };

    /**
     * Performs the arithmetic calculation based on current state and updates the operator.
     *
     * If both numbers and an operator exists, it executes the math, updates
     * the first number with the result, and reset the second number.
     * @param {string} inputOperator - The key operation (e.g., "add", "subtract"...)
     */
    const processOperator = (inputOperator) => {
        if (state.firstNumber !== "" && state.secondNumber !== "" && state.operator !== null) {
            const result = operatorConfig[state.operator].calc(
                parseFloat(state.firstNumber),
                parseFloat(state.secondNumber),
            );

            // Prevents precision loss when converting to string
            state.firstNumber = (Math.round(result * 1e10) / 1e10).toString();
            state.secondNumber = "";
        }

        state.operator = inputOperator === "equal" ? null : inputOperator;
    };

    /**
     * Executes non-arithmetic operations.
     * @param {string} inputFunction - The type of function to execute (e.g., "clear").
     */
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
            const valueToShow = createCalculator.processAllInputs(target.dataset.type, target.value);
            updateDisplay(valueToShow);
        });

        document.addEventListener("keydown", (event) => {
            const key = event.key;
            let valueToShow;
            if (/[0-9]/.test(key)) {
                valueToShow = createCalculator.processAllInputs("number", key);
            } else if (keyMap[key]) {
                valueToShow = createCalculator.processAllInputs(keyMap[key].type, keyMap[key].value);
            }

            if (valueToShow) {
                updateDisplay(valueToShow);
            }
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
