// DOM Elements
const displayBG = document.querySelector('.display');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const allClearBtn = document.querySelector('[data-all-clear]');
const deleteBtn = document.querySelector('[data-delete]');
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const equalsBtn = document.querySelector('[data-equals]');
const allBtns = [
  allClearBtn,
  deleteBtn,
  ...numberBtns,
  ...operatorBtns,
  equalsBtn
];

//construcor
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement; // previous operand
    this.currentOperandTextElement = currentOperandTextElement; // current operand
    this.allClear();
  }

  allClear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operator = undefined;

    displayBG.classList.add('flash');
    setTimeout(() => {
      displayBG.classList.remove('flash');
    }, 200);
  }
  deleteDigit() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }
  appendNumber(number) {
    // reject inputs that render the operand invalid
    if (number === '.' && this.currentOperand.includes('.')) return; // prevent multiple decimals

    // if number is zero, do not allow multiple initial zeros
    if (number === '0' && this.currentOperand === '0') return;

    // if number is zero and a number is added, remove the zero
    if (number !== '0' && this.currentOperand === '0') {
      this.currentOperand = '';
    }

    // if number is '.' and there are no prior digits, add a zero
    if (number === '.' && this.currentOperand === '') this.currentOperand = '0';

    // clean the unnecessary zeros when appending
    this.currentOperand += number;
  }

  selectOperation(operation) {
    if (this.currentOperand === '' && operation === '-') {
      this.appendNumber (operation);
      return;
    }

    if (this.currentOperand === '') return;
    
    if (this.previousOperand !== '') this.calculate();

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  calculate() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '÷':
        result = prev / current;
        break;
      case 'x':
        result = prev * current;
        break;
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      default:
        return;
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = '';
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.formatAsNumber(this.currentOperand);
    if (this.operation != undefined) {
      this.previousOperandTextElement.innerText = `${this.formatAsNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }

  formatAsNumber(numberAsString ) {
    if (numberAsString === '') return '0';

    let formattedString = '';
    const integerDigits = parseFloat(numberAsString.split('.')[0]);
    const decimalDigitsAsStrings = numberAsString.split('.')[1];

    if (decimalDigitsAsStrings === undefined) {
      formattedString = integerDigits.toLocaleString('en-us');
    } else {
      formattedString = `${integerDigits.toLocaleString('en-us')}.${decimalDigitsAsStrings}`;
    }

    return formattedString;
  }
  // TODO: add animation to the buttons
}

// TODO: add keyboard support