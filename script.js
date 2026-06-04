// Precisamos trazer a tela da calculadora para o Javascript para poder alterar os números nela.
const previousDisplay = document.getElementById("previous");
const currentDisplay = document.getElementById("current");
const buttons = document.querySelectorAll(".btn");

// Variáveis de estado
let currentOperand = "0";
let previousOperand = "";
let operation = undefined;

function appendNumber(number) {
  // Se a tela já tem 0 e o usuário clica em 0, não fazemos nada
  if (number === "0" && currentOperand === "0") return;
  // Se o usuário clica em vírgula e já existe uma vírgula, ignoramos
  if (number === "," && currentOperand.includes(",")) return;
  // Se for só 0, substituímos. Caso contrário, concatenamos os números.
  if (currentOperand === "0" && number !== ",") {
    currentOperand = number;
  } else {
    currentOperand = currentOperand.toString() + number.toString();
  }
}

function chooseOperation(op) {
  if (currentOperand === "") return;

  if (previousOperand !== "") {
    calculate();
  }

  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
}

function calculate() {
    let computation;
    const prev = parseFloat(previousOperand.replace(',', '.'));
    const current = parseFloat(currentOperand.replace(',', '.'));
    
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case 'add':
            computation = prev + current;
            break;
        case 'subtract':
            computation = prev - current;
            break;
        case 'multiply':
            computation = prev * current;
            break;
        case 'divide':
            if (current === 0) {
                alert("Erro espacial: Divisão por zero!");
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }

    currentOperand = computation.toString().replace('.', ',');
    operation = undefined;
    previousOperand = '';
}

function clearAll() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
}

function clearEntry() {
    currentOperand = '0';
}

function calculatePercent() {
    if (currentOperand === '') return;
    const current = parseFloat(currentOperand.replace(',', '.'));
    currentOperand = (current / 100).toString().replace('.', ',');
}


function toggleSign() {
    if (currentOperand === '' || currentOperand === '0') return;
    if (currentOperand.startsWith('-')) {
        currentOperand = currentOperand.slice(1);
    } else {
        currentOperand = '-' + currentOperand; 
    }
}

function updateDisplay() {
    currentDisplay.innerText = currentOperand;
    if (operation != null) {
        let symbol = '';
        if (operation === 'add') symbol = '+';
        if (operation === 'subtract') symbol = '-';
        if (operation === 'multiply') symbol = '×';
        if (operation === 'divide') symbol = '÷';
        
        previousDisplay.innerText = `${previousOperand} ${symbol}`;
    } else {
        previousDisplay.innerText = '';
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        
        if (button.dataset.number) {
            appendNumber(button.dataset.number);
            updateDisplay();
        }
        
        if (button.dataset.action) {
            const action = button.dataset.action;
            
            switch(action) {
                case 'add':
                case 'subtract':
                case 'multiply':
                case 'divide':
                    chooseOperation(action);
                    updateDisplay();
                    break;
                case 'calculate':
                    calculate();
                    updateDisplay();
                    break;
                case 'clear':
                    clearAll();
                    updateDisplay();
                    break;
                case 'clear-entry':
                    clearEntry();
                    updateDisplay();
                    break;
                case 'percent':
                    calculatePercent();
                    updateDisplay();
                    break;
                case 'toggle-sign':
                    toggleSign();
                    updateDisplay();
                    break;
                case 'decimal':
                    appendNumber(',');
                    updateDisplay();
                    break;
            }
        }
    });
});