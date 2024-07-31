let firstNumber = null;
let secondNumber = null;
let operator = null;
let operatorClicked = false;
const displayContainer = document.querySelector('.left-section');
const displayedValue = document.querySelector('#displayed-value');
const calcBtns = document.querySelector('.operation-buttons');
const calcHistory = document.createElement('div');
calcHistory.setAttribute('id', 'calc-history');
let calcHistoryExists = false;

calcBtns.addEventListener('click', (e) => {
  e.preventDefault();
  isDisplayAnError();
  switch(e.target.id) {
    case 'clear':
      clearData();
      playType();
      break;
    case 'delete':
      deleteInput();
      playType();
      break;
    case '7':
      clicked('7');
      playType();
      break;
    case '8':
      clicked('8');
      playType();
      break;
    case '9':
      clicked('9');
      playType();
      break;
    case '4':
      clicked('4');
      playType();
      break;
    case '5':
      clicked('5');
      playType();
      break;
    case '6':
      clicked('6');
      playType();
      break;
    case '1':
      clicked('1');
      playType();
      break;
    case '2':
      clicked('2');
      playType();
      break;
    case '3':
      clicked('3');
      playType();
      break;
    case '0':
      clicked('0');
      playType();
      break;
    case 'decimal':
      clicked('.');
      playType();
      break;
    case 'plus':
      operator = '+';
      handleOperation(operator);
      playType();
      break;
    case 'minus':
      operator = '-';
      handleOperation(operator);
      playType();
      break;
    case 'multiply':
      operator = 'x';
      handleOperation(operator);
      playType();
      break;
    case 'divide':
      operator = '/';
      handleOperation(operator);
      playType();
      break;
    case 'equal':
      equal();
      playType();
      break;
  }
});

document.addEventListener('keydown', (e) => {
  isDisplayAnError();
  switch(e.key) {
    case 'Escape':
      clearData();
      playType();
      break;
    case 'Backspace':
      deleteInput();
      playType();
      break;
    case '7':
      clicked('7');
      playType();
      break;
    case '8':
      clicked('8');
      playType();
      break;
    case '9':
      clicked('9');
      playType();
      break;
    case '4':
      clicked('4');
      playType();
      break;
    case '5':
      clicked('5');
      playType();
      break;
    case '6':
      clicked('6');
      playType();
      break;
    case '1':
      clicked('1');
      playType();
      break;
    case '2':
      clicked('2');
      playType();
      break;
    case '3':
      clicked('3');
      playType();
      break;
    case '0':
      clicked('0');
      playType();
      break;
    case '.':
      clicked('.');
      playType();
      break;
    case '+':
      operator = '+';
      playType();
      handleOperation(operator);
      break;
    case '-':
      operator = '-';
      handleOperation(operator);
      playType();
      break;
    case '*':
      operator = 'x';
      handleOperation(operator);
      playType();
      break;
    case '/':
      operator = '/';
      handleOperation(operator);
      playType();
      break;
    case 'Enter':
      equal();
      playType();
      break;
  }
});

function add(firstNumber, secondNumber) {
  if (containDecimal(firstNumber) || containDecimal(secondNumber)) {
    return (firstNumber + secondNumber).toFixed(1);
  } else {
    return firstNumber + secondNumber;
  }
}

function subtract(firstNumber, secondNumber) {
  if (containDecimal(firstNumber) || containDecimal(secondNumber)) {
    return (firstNumber - secondNumber).toFixed(1);
  } else {
    return firstNumber - secondNumber;
  }
}

function multiply(firstNumber, secondNumber) {
  if (containDecimal(firstNumber) || containDecimal(secondNumber)) {
    return (firstNumber * secondNumber).toFixed(1);
  } else {
    return firstNumber * secondNumber;
  }
}

function divide(firstNumber, secondNumber) {
  if (containDecimal(firstNumber) || containDecimal(secondNumber)) {
    return (firstNumber / secondNumber).toFixed(1);
  } else {
    return firstNumber / secondNumber;
  }
}

function operate(firstNumber, secondNumber, operator) {
  switch(operator) {
    case '+':
      displayedValue.textContent = add(firstNumber, secondNumber);
      break;
    case '-':
      displayedValue.textContent = subtract(firstNumber, secondNumber);
      break;
    case 'x':
      displayedValue.textContent = multiply(firstNumber, secondNumber);
      break;
    case '/':
      if (secondNumber == 0) {
        displayedValue.textContent = "Cannot be divided to zero!";
        displayedValue.style.fontSize = '25px';
        break;
      }

      displayedValue.textContent = divide(firstNumber, secondNumber);
      break;
  }
}

//Keyboard sound effect
function playType() {
  let audio = document.getElementById('audio');
  audio.play();
}

function clearData() {
  displayedValue.style.fontSize = '38px';
  if (firstNumber == 0 && 
      secondNumber == 0 && 
      displayedValue.textContent === '0' &&
      operator === null) {
        return;
      }

  firstNumber = 0;
  secondNumber = 0;
  displayedValue.textContent = '0';
  operator = null;

  if (calcHistoryExists === true)  {
    displayContainer.removeChild(calcHistory);
    calcHistoryExists = false;
  }
}

function clicked(input) {
  if (input === '.'){
    let displayChecker = Array.from(displayedValue.textContent);

    if (displayChecker.includes('.')) {
      return;
    }

    displayedValue.textContent += input;
    return;
  }

  displayedValue.style.fontSize = '38px';
  if (displayedValue.textContent === '0') {
    displayedValue.textContent = input;
    return;
  }

  if (operatorClicked === true) {
    displayedValue.textContent = "";
    displayedValue.textContent += input;
    operatorClicked = false;
    return;
  }

  if (displayedValue.textContent.length === 14) {
    return;
  }
  
  displayedValue.textContent += input;
}

function deleteInput() {
  displayedValue.style.fontSize = '38px';
  if (operatorClicked === true) {
    return;
  }

  if (displayedValue.textContent.length === 1) {
    if (calcHistoryExists === true)  {
      displayContainer.removeChild(calcHistory);
      calcHistoryExists = false;
    }
    displayedValue.textContent = '0';
    calcHistoryExists = false;
    return;
  }

  if (displayedValue.textContent === 'Cannot be divided to zero!') {
    clearData();
    return;
  }

  let str = displayedValue.textContent.split("");
  str.pop();
  displayedValue.textContent = str.join("");
}

function handleOperation(operator) {
  if (firstNumber !== null && secondNumber === null) {
    equal();
  }

  operatorClicked = true;

  if (containDecimal(displayedValue.textContent)) {
    firstNumber = parseFloat(displayedValue.textContent);
  } 
  else {
    firstNumber = parseInt(displayedValue.textContent);
  }
  
  calcHistory.textContent = `${firstNumber} ${operator}`;
  calcHistoryExists = true;
  displayContainer.append(calcHistory);
}

function equal() {
  if (firstNumber !== null || secondNumber !== null) {
    if (containDecimal(displayedValue.textContent)) {
      secondNumber = parseFloat(displayedValue.textContent);
    } 
    else {
      secondNumber = parseInt(displayedValue.textContent);
    }
    
    operate(firstNumber, secondNumber, operator);
    calcHistory.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
    equalClicked = true;
  }
}

function isDisplayAnError() {
  if (displayedValue.textContent === 'Cannot be divided to zero!') {
    clearData();
  }
}

function containDecimal(input) {
  let checker = Array.from(input.toString());
  if (checker.includes('.')) {
    return true;
  } 

  return false;
}