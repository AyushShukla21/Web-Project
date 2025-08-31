let display = document.getElementById('display');
let buttonsContainer = document.getElementById('buttons');
let toggleBtn = document.getElementById('toggleTheme');
let historyPanel = document.getElementById('history');

let currentInput = '';
let operator = '';
let firstValue = '';

buttonsContainer.addEventListener('click', (e) => handleInput(e.target.value));

document.addEventListener('keydown', (e) => {
    if (!isNaN(e.key) || e.key === '.') {
        handleInput(e.key);
    } 
    else if (['+', '-', '*', '/'].includes(e.key)) {
        handleInput(e.key);
    } 
    else if (e.key === '%') {
        handleInput('%');
    }
    else if (e.key === 'Enter' || e.key === '=') {
        handleInput('=');
    } 
    else if (e.key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        display.innerText = currentInput || '0';
    }
    else if (e.key === 'Escape') {
        handleInput('AC');
    }
});

function handleInput(value) {
    if (!value) return;

    if (!isNaN(value) || value === '.') { 
        currentInput += value;
        display.innerText = currentInput;
    } 
    else if (['+', '-', '*', '/'].includes(value)) {
        firstValue = currentInput;
        operator = value;
        currentInput = '';
    } 
    else if (value === '%') {
   
        if (firstValue && operator && currentInput) {
            currentInput = (parseFloat(firstValue) * parseFloat(currentInput) / 100).toString();
            display.innerText = currentInput;
        }
    }
    else if (value === '=') {
        if (firstValue && operator && currentInput) {
            let result = evaluateExpression(firstValue, operator, currentInput);
            display.innerText = result;

            let entry = document.createElement('div');
            entry.innerText = `${firstValue} ${operator} ${currentInput} = ${result}`;
            entry.dataset.result = result;
            historyPanel.appendChild(entry);
            historyPanel.scrollTop = historyPanel.scrollHeight;

            currentInput = result.toString();
            operator = '';
        }
    } 
    else if (value === 'AC') {
        currentInput = '';
        firstValue = '';
        operator = '';
        display.innerText = '0';
        historyPanel.innerHTML = '';
    }
}

function evaluateExpression(firstValue, operator, secondValue) {
    let result = 0;
    switch (operator) {
        case '+': result = parseFloat(firstValue) + parseFloat(secondValue); break;
        case '-': result = parseFloat(firstValue) - parseFloat(secondValue); break;
        case '*': result = parseFloat(firstValue) * parseFloat(secondValue); break;
        case '/': result = parseFloat(firstValue) / parseFloat(secondValue); break;
    }
    return result;
}


toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});


historyPanel.addEventListener('click', (e) => {
    if (e.target.tagName === 'DIV') {
        let resultValue = e.target.dataset.result;
        currentInput = resultValue;
        display.innerText = resultValue;
    }
});

