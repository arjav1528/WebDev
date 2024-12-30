document.addEventListener('DOMContentLoaded', function() {
    let numbers = [];
    let operators = [];
    let result = 0;
    
    operators.push(document.getElementById('+'));
    operators.push(document.getElementById('-'));
    operators.push(document.getElementById('x'));
    operators.push(document.getElementById('/'));
    let display = document.getElementById('display');
    for(let i=0;i<10;i++){
        let temp = document.getElementById(i);
        numbers.push(temp);
    }
    for(let i=0;i<4;i++){
        operators[i].addEventListener('click', function(){
            display.innerHTML += operators[i].innerHTML;
        });
    }
    


    

    // numbers[0].addEventListener('click', function(){
    //     display.innerHTML += '0';
    // }
    // );
    for(let i=0;i<10;i++){
        numbers[i].addEventListener('click', function(){
            display.innerHTML += i.toString();
        });
    }


});