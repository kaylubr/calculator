let firstNumber = 0;
let secondNumber = 0;
let operator = null;
let displayedValue = null;

function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
  return firstNumber / secondNumber;
}

function operate(firstNumber, secondNumber, operator) {
  switch(operator) {
    case '+':
      displayedValue = add(firstNumber, secondNumber);
      break;
    case '-':
      displayedValue = subtract(firstNumber, secondNumber);
      break;
    case '*':
      displayedValue = multiply(firstNumber, secondNumber);
      break;
    case '/':
      if (secondNumber == 0) {
        displayedValue = "Cannot be divided to zero!"
        break;
      }

      displayedValue = divide(firstNumber, secondNumber);
      break;
  }
}