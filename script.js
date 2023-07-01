
const inputScreen = document.querySelector('.input-screen');

const buttons = document.querySelectorAll('.row button:not(#ans):not(#del):not(#plusminus):not(#sqrt)');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    inputScreen.textContent += button.textContent;
  });
});

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', () => {
  inputScreen.textContent = '';
});

const plusminusButton = document.getElementById('plusminus');
plusminusButton.addEventListener('click', () => {
  const expression = inputScreen.textContent;
  const reversedExpression = reverseSign(expression);
  inputScreen.textContent = reversedExpression;
});

let lastResult = null;
const equalsButton = document.getElementById('equals');
equalsButton.addEventListener('click', () => {
  const expression = inputScreen.textContent;
  const result = calculateResult(expression);
  if (result !== null) {
    inputScreen.textContent = result;
    lastResult = result; // Store the result
  } else {
    inputScreen.textContent = 'Error';
  }
});
const ansButton = document.getElementById('ans');
ansButton.addEventListener('click',()=>{
  if(lastResult!==null){
    inputScreen.textContent+= lastResult;
  }
  else{
    inputScreen.textContent='Error';
  }
});
// Remove the last character from the expression on the input screen
const delButton = document.getElementById('del');
delButton.addEventListener('click', () => {
  const currentExpression = inputScreen.textContent;
  inputScreen.textContent = currentExpression.slice(0, -1);
});

// Handle the opening bracket button
const openBracketButton = document.getElementById('open-bracket');
openBracketButton.addEventListener('click', () => {
  inputScreen.textContent += '(';
});

// Handle the closing bracket button
const closeBracketButton = document.getElementById('close-bracket');
closeBracketButton.addEventListener('click', () => {
  inputScreen.textContent += ')';
});

// Function to evaluate the expression
function calculateResult(expression) {
  try {
    // Resolve parentheses first
    while (expression.includes('(')) {
      const openingIndex = expression.lastIndexOf('(');
      const closingIndex = expression.indexOf(')', openingIndex);

      if (openingIndex === -1 || closingIndex === -1) {
        return null; // Invalid parentheses placement
      }

      const subExpression = expression.slice(openingIndex + 1, closingIndex);
      const subResult = calculateResult(subExpression);

      if (subResult === null) {
        return null; // Invalid sub-expression
      }

      expression = expression.replace(`(${subExpression})`, subResult);
    }

    // Evaluate the remaining expression
    return evaluateExpression(expression);
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Function to evaluate the expression without parentheses
function evaluateExpression(expression) {
  try {
    let num1 = '';
    let num2 = '';
    let operator = '';

    for (let i = 0; i < expression.length; i++) {
      if (isNaN(Number(expression[i])) && expression[i] !== '.') {
        operator = expression[i];
        num1 = expression.slice(0, i);
        num2 = expression.slice(i + 1);
        break;
      }
    }

    if (num1 === '' || num2 === '' || operator === '') {
      return null; // Invalid expression
    }

    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    if (isNaN(num1) || isNaN(num2)) {
      return null; // Invalid numbers
    }

    if (operator === '+') {
      return num1 + num2;
    } else if (operator === '-') {
      return num1 - num2;
    } else if (operator === '*') {
      return num1 * num2;
    } else if (operator === '/') {
      return num2 !== 0 ? num1 / num2 : null;
    } else if (operator === '%') {
      return (num1 * num2) / 100;
    } else {
      return null; // Invalid operator
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
const sqrtButton = document.getElementById('sqrt');
sqrtButton.addEventListener('click', () => {
  const expression = inputScreen.textContent;
  const number = parseFloat(expression);
  
  if (!isNaN(number)) {
    const squareRoot = Math.sqrt(number);
    inputScreen.textContent = squareRoot;
  } else {
    inputScreen.textContent = 'Error';
  }
});

// Function to reverse the sign of the last number in the expression
function reverseSign(expression) {
  const reversedExpression = expression.replace(/(-?\d+(?:\.\d+)?)$/, (match, number) => {
    return -parseFloat(number);
  });
  return reversedExpression;
}
