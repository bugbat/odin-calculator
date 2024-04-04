// math functions
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function divide(a, b) {
  if (b === 0) return "ERROR";
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

// display
const display = document.querySelector("#calc-screen p")

function updateDisplay(input) {
  if (display.textContent === "0") {
    display.textContent = input;
  }
  else {
    display.textContent += input;
  }
}

function clearDisplay() {
  display.textContent = "0";
}

// buttons
const buttons = document.querySelectorAll("button");

function buttonSelect(button) {
  const type = button.className;
  const value = button.value;
  console.log("Value " + button.value + ", Class " + button.className);

  if (value === "clear") {
    clearDisplay();
  }

  if (type === "operand") {
    updateDisplay(button.value);
  }
}

buttons.forEach (button => {
  button.addEventListener("click", function() {
    buttonSelect(button)
  });
});