let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
const equalBtn = document.querySelector('.equalBtn');
const recentCalculationsList = document.getElementById('recent-calculations');

let recentCalculations = JSON.parse(localStorage.getItem('recentCalculations')) || [];

function updateRecentCalculationsList() {
  recentCalculationsList.innerHTML = '';
  recentCalculations.forEach(calculation => {
    const li = document.createElement('li');
    li.textContent = calculation;
    recentCalculationsList.appendChild(li);
  });
}

function saveRecentCalculations() {
  localStorage.setItem('recentCalculations', JSON.stringify(recentCalculations));
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
   
    button.disabled = true;
   
    setTimeout(() => {
      button.disabled = false;
    }, 200);
   
    const value = button.textContent;
   
    if (value === 'AC') {
      input.value = '';
      recentCalculations = [];
      updateRecentCalculationsList();
      saveRecentCalculations();
    } 
    else if (value === 'DEL') {
      input.value = input.value.slice(0, -1);
    } 
    else if (value === '=') {
      const calculation = input.value;
      const result = eval(calculation);
      input.value = result;
      recentCalculations.push(`${calculation} = ${result}`);
      updateRecentCalculationsList();
      saveRecentCalculations();
    } else {
      input.value += value;
    }
  });
});


updateRecentCalculationsList();
let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) =>{
        if(e.target.innerHTML == '='){
            string = eval(string);
            input.value = string;
        }

        else if(e.target.innerHTML == 'AC'){
            string = "";
            input.value = string;
        }
        else if(e.target.innerHTML == 'DEL'){
            string = string.substring(0, string.length-1);
            input.value = string;
        }
        else{
            string += e.target.innerHTML;
            input.value = string;
        }
        
    })
})

