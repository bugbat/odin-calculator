// variables
let firstOperand = null;
let secondOperand = null;
let operator = null;
let result = null;

// math functions
function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  if (b === 0 || b === "0") return "ERROR";
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

function doMath(a, b, op) {
  switch(op) {
    case "divide":
      result = divide(a, b);
      break;
    case "multiply":
      result = multiply(a, b);
      break;
    case "add":
      result = add(a, b);
      break;
    case "subtract":
      result = subtract(a, b);
      break;
  }
  updateDisplay(result);
  // resets values to allow calculation based on result
  firstOperand = null;
  secondOperand = null;
  operator = null;
}

// display
const display = document.querySelector("#calc-screen p")

function updateDisplay(input) {
  display.textContent = input;
}

function clearDisplay() {
  result = null;
  firstOperand = null;
  secondOperand = null;
  operator = null;
  display.textContent = "0";
}

function deleteNum() {
  if (!secondOperand && !operator) {
    if (!firstOperand || firstOperand.length <= 1) {
      firstOperand = "0";
    }
    else {
      firstOperand = firstOperand.substring(0, firstOperand.length - 1);
    }
    updateDisplay(firstOperand);
  }
  else if (firstOperand && operator) {
    if (!secondOperand || secondOperand.length <= 1) {
      secondOperand = "0";
    }
    else {
      secondOperand = secondOperand.substring(0, secondOperand.length - 1);
    }
    updateDisplay(secondOperand);
  }
}

function tooLong(string) {
  if (!string) return false;
  else if (string.length > 9) return true;
}

function hasDecimal(string) {
  if (!string) return false;
  const stringArr = string.split("");
  if (stringArr.includes(".")) {
    return true;
  }
  return false;
}

// buttons
const buttons = document.querySelectorAll("button");

buttons.forEach (button => {
  button.addEventListener("click", function() {
    buttonSelect(button);
  });
});

function buttonSelect(button) {
  const type = button.className.split(" ");
  const value = button.value;

  if (value === "clear") {
    clearDisplay();
  }
  else if (value === "backspace") {
    deleteNum();
  }
  else if (value === "decimal") {
    // send input to firstOperand
    if (!secondOperand && !operator){
      if (tooLong(firstOperand) || hasDecimal(firstOperand)) return;
      else if (!firstOperand || firstOperand === "0") firstOperand = "0.";
      else{
        firstOperand += ".";
      }
      updateDisplay(firstOperand);
    }
    // send input to secondOperand
    else if (operator){
      if (tooLong(secondOperand) || hasDecimal(secondOperand)) return;
      if (!secondOperand || secondOperand === "0") secondOperand = "0.";
      else{
        secondOperand += ".";
      }
      updateDisplay(secondOperand);
    }
  }
  else if (value === "equals") {
    if (firstOperand && secondOperand && operator){
      doMath(firstOperand, secondOperand, operator);
    }
    else if (result && secondOperand && operator){
      doMath(result, secondOperand, operator);
    }
  }
  else if (type.includes("operand")) {
    // send input to firstOperand
    if (!secondOperand && !operator){
      if (tooLong(firstOperand)) return;
      else if (!firstOperand || firstOperand === "0") firstOperand = value;
      else{
        firstOperand += value;
      }
      updateDisplay(firstOperand);
    }
    // send input to secondOperand
    else if (operator){
      if (tooLong(secondOperand)) return;
      if (!secondOperand || secondOperand === "0") secondOperand = value;
      else{
        secondOperand += value;
      }
      updateDisplay(secondOperand);
    }
  }
  else if (type.includes("operator")) {
    operator = value;
    if (firstOperand && secondOperand) {
      doMath(firstOperand, secondOperand, operator);
    }
    if (result && secondOperand) {
      doMath(result, secondOperand, operator);
    }
  }
}