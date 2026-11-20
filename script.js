// Convert a character into its numeric value
function digitValue(char) {
    const digits = "0123456789ABCDEF";
    return digits.indexOf(char.toUpperCase());
}

// Convert a number from any supported base to decimal
function toDecimal(number, base) {
    number = number.trim().toUpperCase();

    if (!number || ![2, 8, 10, 16].includes(base)) {
        throw new Error("Invalid input!");
    }

    let result = 0n;
    const b = BigInt(base);

    for (const char of number) {
        const digit = digitValue(char);

        if (digit < 0 || digit >= base) {
            throw new Error("Invalid number for selected base!");
        }

        result = result * b + BigInt(digit);
    }

    return result;
}

// Convert decimal to another base
function fromDecimal(number, base) {
    return number.toString(base).toUpperCase();
}

// Number system converter
function convertNumber() {
    const number = document.getElementById("number").value;
    const fromBase = Number(document.getElementById("fromBase").value);
    const toBase = Number(document.getElementById("toBase").value);
    const output = document.getElementById("convertResult");

    try {
        const decimal = toDecimal(number, fromBase);
        const result = fromDecimal(decimal, toBase);

        output.textContent = "Converted Result: " + result;
    } catch (error) {
        output.textContent = "Error: " + error.message;
    }
}

// Binary calculator
function calculateBinary() {
    const first = document.getElementById("firstNumber").value;
    const second = document.getElementById("secondNumber").value;
    const operation = document.getElementById("operation").value;
    const output = document.getElementById("calcResult");

    try {
        const a = toDecimal(first, 2);
        const b = toDecimal(second, 2);

        let result;

        switch (operation) {
            case "+":
                result = a + b;
                break;

            case "-":
                if (a < b) {
                    throw new Error("Negative results are not supported!");
                }
                result = a - b;
                break;

            case "*":
                result = a * b;
                break;

            case "/":
                if (b === 0n) {
                    throw new Error("Cannot divide by zero!");
                }
                result = a / b;
                break;

            default:
                throw new Error("Invalid operation!");
        }

        output.textContent =
            "Binary Result: " + fromDecimal(result, 2) +
            " | Decimal Result: " + result.toString();

    } catch (error) {
        output.textContent = "Error: " + error.message;
    }
}

// Display all number systems
function displayAll() {
    const number = document.getElementById("decimalNumber").value;
    const output = document.getElementById("allResults");

    try {
        const decimal = toDecimal(number, 10);

        output.innerHTML = `
            <div>
                <span>Binary</span>
                <strong>${fromDecimal(decimal, 2)}</strong>
            </div>
            <div>
                <span>Octal</span>
                <strong>${fromDecimal(decimal, 8)}</strong>
            </div>
            <div>
                <span>Decimal</span>
                <strong>${decimal}</strong>
            </div>
            <div>
                <span>Hexadecimal</span>
                <strong>${fromDecimal(decimal, 16)}</strong>
            </div>
        `;
    } catch (error) {
        output.textContent = "Error: " + error.message;
    }
}