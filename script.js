const previousOperandTxt = document.querySelector("[data-previous-operand]");
const currentOperandTxt = document.querySelector("[data-current-operand]");

const numbers = document.querySelectorAll("[data-number]");
const equalsButton = document.querySelector("[data-equals]");
const operationButtons = document.querySelectorAll("[data-operator]");
const clearAll = document.querySelector("[data-clear]");
const numberDelete = document.querySelector("[data-delete]");

class Calculator {
  constructor(previousOperandTxt, currentOperandTxt) {
    this.previousOperandTxt = previousOperandTxt;
    this.currentOperandTxt = currentOperandTxt;
    this.clear();
  }

  formatDisplayNumber(number) {
    const strNumber = number.toString();
    const intDigits = parseFloat(strNumber.split(".")[0]);
    const decimalDigits = strNumber.split(".")[1];

    let intDisplay;

    if (isNaN(intDigits)) {
      intDisplay = "";
    } else {
      intDisplay = intDigits.toLocaleString("en", { maximumFractionDigits: 0 });
    }

    if (decimalDigits != null) {
      return `${intDisplay}.${decimalDigits}`;
    } else {
      return intDisplay;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let result;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case "+":
        result = _previousOperand + _currentOperand;
        break;
      case "-":
        result = _previousOperand - _currentOperand;
        break;
      case "÷":
        result = _previousOperand / _currentOperand;
        break;
      case "*":
        result = _previousOperand * _currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = result.toString();
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseOperation(operation) {
    if (this.currentOperand == "") return;

    if (this.previousOperand != "") {
      this.calculate();
    }

    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;

    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousOperandTxt.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ""}`;
    this.currentOperandTxt.innerText = this.formatDisplayNumber(
      this.currentOperand
    );

    if (this.currentOperand == "" && this.previousOperand == "") {
      this.currentOperandTxt.innerText = "0";
    }
  }
}

const calculator = new Calculator(previousOperandTxt, currentOperandTxt);

clearAll.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

for (const number of numbers) {
  number.addEventListener("click", () => {
    calculator.appendNumber(number.innerText);
    calculator.updateDisplay();
  });
}

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

numberDelete.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
