// Precisamos trazer a tela da calculadora para o Javascript para poder alterar os números nela.
const previousDisplay = document.getElementById("previous");
const currentDisplay = document.getElementById("current");
const buttons = document.querySelectorAll(".btn");

// Variáveis de estado
let currentOperand = "0";
let previousOperand = "";
let operation = undefined;
