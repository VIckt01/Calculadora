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
