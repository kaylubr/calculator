let firstNumber = null;
let secondNumber = null;
let operator = null;
let timesClicked = 0;
let operatorClicked = false;
const displayContainer = document.querySelector('.left-section');
const displayedValue = document.querySelector('#displayed-value');
const calcBtns = document.querySelector('.operation-buttons');
const calcHistory = document.createElement('div');
calcHistory.setAttribute('id', 'calc-history');
let calcHistoryExists = false;

calcBtns.addEventListener('click', (e) => {
  e.preventDefault();
  switch(e.target.id) {
    case 'clear':
      clearData();
      break;
    case 'delete':
      deleteInput();
      break;
    case '7':
      clicked('7');
      break;
    case '8':
      clicked('8');
      break;
    case '9':
      clicked('9');
      break;
    case '4':
      clicked('4');
      break;
    case '5':
      clicked('5');
      break;
    case '6':
      clicked('6');
      break;
    case '1':
      clicked('1');
      break;
    case '2':
      clicked('2');
      break;
    case '3':
      clicked('3');
      break;
    case '0':
      clicked('0');
      break;
    case 'plus':
      operator = '+';
      handleOperation(operator);
      break;
    case 'minus':
      operator = '-';
      handleOperation(operator);
      break;
    case 'multiply':
      operator = 'x';
      handleOperation(operator);
      break;
    case 'divide':
      operator = '/';
      handleOperation(operator);
      break;
    case 'equal':
      if (firstNumber !== null || secondNumber !== null) {
        secondNumber = parseInt(displayedValue.textContent);
        operate(firstNumber, secondNumber, operator);
        calcHistory.textContent = `${firstNumber} ${operator} ${secondNumber} =`;
      }

      equalClicked = true;
      break;
  }
  playType();
});

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
        displayedValue.textContent = "Cannot be divided to zero!"
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
  if (firstNumber == 0 && 
      secondNumber == 0 && 
      displayedValue.textContent === '0' &&
      operator === null) {
        return;
      }

  console.log(calcHistory);
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
  if (operatorClicked === true) {
    return;
  }

  if (displayedValue.textContent === '0') {
    return;
  }

  let str = displayedValue.textContent.split("");
  str.pop();
  displayedValue.textContent = str.join("");
}

function handleOperation(operator) {
  operatorClicked = true;
  firstNumber = parseInt(displayedValue.textContent);
  calcHistory.textContent = `${firstNumber} ${operator}`;
  calcHistoryExists = true;
  displayContainer.append(calcHistory);
}
