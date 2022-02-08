const previousTextElement = document.querySelector('[data-previous]');
const currentTextElement = document.querySelector('[data-current]');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const pointButton = document.querySelector('[data-point]');

let isNewNumber = true;
let numberCurrent = '';
let numberPrevious = '';
let operationCurrent = '';
let operationPrevious = '';

const calculate = () => {
    switch (operationCurrent) {
        case '+':
            numberCurrent = parseFloat(numberPrevious) + parseFloat(numberCurrent);
            break;
        case '-':
            numberCurrent = parseFloat(numberPrevious) - parseFloat(numberCurrent);
            break;
        case '*':
            numberCurrent = parseFloat(numberPrevious) * parseFloat(numberCurrent);
            break;
        case '÷':
            numberCurrent = parseFloat(numberPrevious) / parseFloat(numberCurrent);
            break;    
        default:
            return;
    }
}

const updateDisplay = () => {
    currentTextElement.innerHTML = numberCurrent;
    if(operationCurrent!==''){
        previousTextElement.innerHTML = `${numberPrevious} ${operationCurrent}`;
    }
}

for(const numberButton of numberButtons){
    numberButton.addEventListener('click', () => {
        if(isNewNumber){
            numberCurrent =  numberButton.innerHTML;
            isNewNumber = false;
        } else numberCurrent += numberButton.innerHTML;
        updateDisplay();
    });
}
for(const operatorButton of operatorButtons){
    operatorButton.addEventListener('click', () => {
        if(operationCurrent!==''){
            calculate();
            operationCurrent = operatorButton.innerHTML;
            numberPrevious = numberCurrent;
            numberCurrent = '0';
            updateDisplay();
            isNewNumber = true;
        } else {
            operationCurrent = operatorButton.innerHTML;
        
            numberPrevious = numberCurrent;
            numberCurrent = '0';
            isNewNumber = true;
            updateDisplay();
        }
    });
}
equalButton.addEventListener('click', () => {
    calculate();
    operationCurrent = '';
    previousTextElement.innerHTML = '';
    isNewNumber = true;
    updateDisplay();
});
allClearButton.addEventListener('click', () => {
    currentTextElement.innerHTML = '0';
    previousTextElement.innerHTML = '';

    isNewNumber = true;
    numberCurrent = '';
    numberPrevious = '';
    operationCurrent = '';
});
deleteButton.addEventListener('click', () => {
    if(operationCurrent!==''){
        operationCurrent = '';
        isNewNumber = false;
        numberCurrent = numberPrevious;
        numberPrevious = '';
        previousTextElement.innerHTML = '';
        updateDisplay();
    }
});
pointButton.addEventListener('click', () => {
    if(currentTextElement.innerHTML.indexOf(".")<0){
        numberCurrent += pointButton.innerHTML;
        updateDisplay();
    } else{
        return;
    }
});
/*

const updateDisplay = () => {
    currentTextElement.innerHTML = numberCurrent;
    if(operationCurrent!==''){
        previousTextElement.innerHTML = numberCurrent + operationCurrent;
        numberPrevious = numberCurrent;
        numberCurrent = '0';
        currentTextElement.innerHTML = '0';
    }
}

for(const numberButton of numberButtons){
    numberButton.addEventListener('click', () => {
        if(isNewNumber){
            numberCurrent =  numberButton.innerHTML;
            isNewNumber = false;
        } else numberCurrent += numberButton.innerHTML;
        updateDisplay();
    });
}

for(const operatorButton of operatorButtons){
    operatorButton.addEventListener('click', () => {
        if(numberCurrent!=='' && operationCurrent==''){
            operationCurrent = ` ${operatorButton.innerHTML}`;
            isNewNumber = true;
            updateDisplay();
        } else {
            calculate(operatorButton.innerHTML, parseFloat(numberPrevious), parseFloat(numberCurrent));
            updateDisplay();
        }
    });
}
*/

/*
class Calculator{
    constructor(previousTextElement, currentTextElement){
        this.previousTextElement = previousTextElement;
        this.currentTextElement = currentTextElement;
        this.clear();
    }
    formatDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;

        if(isNaN(integerDigits)){
            integerDisplay = '';
        } else{
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }
        
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`;
        } else{
            return integerDisplay;
        }
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    calculate(){
        let result;

        const previousOperandFloat = parseFloat(this.previousOperand);
        const currentOperandFloat = parseFloat(this.currentOperand);

        if(isNaN(previousOperandFloat) || isNaN(currentOperandFloat)) return;

        switch(this.operation){
            case '+':
                result = previousOperandFloat + currentOperandFloat;
                break;
            case '-':
                result = previousOperandFloat - currentOperandFloat;
                break;
            case '÷':
                result = previousOperandFloat / currentOperandFloat;
                break;
            case '*':
                result = previousOperandFloat * currentOperandFloat;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }
    chooseOperation(operation){
        if(this.currentOperand == '') return;

        if(this.previousOperand !== ''){
            this.calculate();
        }
        
        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    appendNumber(number){
        if(this.currentOperand.includes(".") && number == ".") return;
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }
    clear(){
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }
    updateDisplay(){
        this.previousTextElement.innerHTML = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ''}`;
        this.currentTextElement.innerHTML = this.formatDisplayNumber(this.currentOperand);
    }
}

const calculator = new Calculator(previousTextElement, currentTextElement);

for(const numberButton of numberButtons){
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerHTML);
        calculator.updateDisplay();
    });
}
for (const operationButton of operationButtons){
    operationButton.addEventListener('click', ()=>{
        calculator.chooseOperation(operationButton.innerHTML);
        calculator.updateDisplay();
    })
}
allClearButton.addEventListener('click', ()=>{
    calculator.clear();
    calculator.updateDisplay();
})

equalButton.addEventListener('click', ()=>{
    calculator.calculate();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', ()=>{
    calculator.delete();
    calculator.updateDisplay();
})
*/