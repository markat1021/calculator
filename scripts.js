document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("click",inputFired);
});

window.addEventListener('keyup', function(event) {
  console.log(event)
  if (event.key === "0") {addInput("0")};
  if (event.key === "1") {addInput("1")};
  if (event.key === "2") {addInput("2")};
  if (event.key === "3") {addInput("3")};
  if (event.key === "4") {addInput("4")};
  if (event.key === "5") {addInput("5")};
  if (event.key === "6") {addInput("6")};
  if (event.key === "7") {addInput("7")};
  if (event.key === "8") {addInput("8")};
  if (event.key === "9") {addInput("9")};
  if (event.key === "Enter") {evaluate()};
  if (event.key === "=") {evaluate()};
  if (event.key === ".") {addPeriod()};
  if (event.key === "+") {advance("+")};
  if (event.key === "-") {advance("–")};
  if (event.key === "x") {advance("x")};
  if (event.key === "*") {advance("x")};
  if (event.key === "/") {advance("÷")};
  if (event.key === "Delete") {allClear()};
  if (event.key === "Backspace") {removeLastInput()};
});

let expression = document.querySelector("#expression p");
let input = document.querySelector("#input p");

function inputFired(e) {
  if(e.target.id=="equal") { evaluate() };

  if(e.target.id=="add") { advance("+") };
  if(e.target.id=="subtract") { advance("–") };
  if(e.target.id=="multiply") { advance("x") };
  if(e.target.id=="divide") { advance("\÷") };

  if(e.target.id=="AC") { allClear() };
  if(e.target.id=="C") { clear() };
  if(e.target.id=="period") { addPeriod() };
  if(e.target.id=="negate") { negate() };

  if(e.target.id=="zero") { addInput("0") };
  if(e.target.id=="one") { addInput("1") };
  if(e.target.id=="two") { addInput("2") };
  if(e.target.id=="three") { addInput("3") };
  if(e.target.id=="four") { addInput("4") };
  if(e.target.id=="five") { addInput("5") };
  if(e.target.id=="six") { addInput("6") };
  if(e.target.id=="seven") { addInput("7") }; 
  if(e.target.id=="eight") { addInput("8") };
  if(e.target.id=="nine") { addInput("9") };
}

function advance(str) {
  //evaluate();
  if (expression.textContent.indexOf(' ') !== -1) {//operator already added
    expStr = expression.textContent;
    if (expStr.split(" ").length > 2) { //move evaluation in input up
      expression.textContent = input.textContent;
      clear();
    } else if (expression.textContent.indexOf(' ') == expression.textContent.length-2) {  //remove last sign 
      expression.textContent = expStr.slice(0,expStr.length-2);
    }
    expression.textContent = expression.textContent+" "+str;
  } else if (input.textContent.length == 0) {
    // Do nothing if operator added with no input    
  } else {
    expression.textContent += input.textContent +" "+ str;
    clear();
  }
  
}

function addPeriod() {
  if (input.textContent.indexOf('.') !== -1) {//decimal already added
  } else if (input.textContent.length == 0) {
    addInput("0.");
  } else {
    addInput(".");
  }
}

function negate() { 
  if (input.textContent.indexOf('-') !== -1) { //negative already
    input.textContent = input.textContent.slice(1);
  } else {
    input.textContent = "-"+input.textContent;
  }
}

function addInput(str) {
  console.log(expression.textContent.split(""))

  //implies that expression was evaluated without prior operand
  if (expression.textContent.split("")[0] == " ") {
    input.textContent = input.textContent +=str;
  // implies prior expression was already evaluated
  } else if (expression.textContent.split(" ").length > 2) { 
    allClear()
    input.textContent = input.textContent +=str;
  } else {
    input.textContent = input.textContent +=str;
  }
}

function clear() {
  input.textContent = "";
}

function allClear() {
  clear();
  expression.textContent = "";
}


function evaluate() {
  let output;
  let operands = [];
  if (expression.textContent.split(" ").length <= 2) {
    expression.textContent += " "+input.textContent;
  }

  clear();
  if (expression.textContent.indexOf('+') !== -1) { //addition
    operands = expression.textContent.split(" + ");
    output = Number(operands[0]) + Number(operands[1]);
  } else if (expression.textContent.indexOf('–') !== -1) { //subtraction
    operands = expression.textContent.split(" – ");
    console.log(operands);
    output = operands[0] - operands[1];
  } else if (expression.textContent.indexOf('x') !== -1) { //multiplication
    operands = expression.textContent.split(" x ");
    output = operands[0] * operands[1];
  } else if (expression.textContent.indexOf('÷') !== -1) { //division
    operands = expression.textContent.split(" ÷ ");
    output = operands[0] / operands[1];
  } else if (expression.textContent.length == 0) {
    output = input.textContent;
    clear();
  }
  if (!isNaN(output)) {
    input.textContent = Math.round(output * 1000) / 1000;
  }
}

function removeLastInput() {
  input.textContent = input.textContent.slice(0,input.textContent.length-1);
}
