let inputText = document.getElementById('form-input');
let submitButton = document.getElementById('addTask');
let taskList = document.getElementById('addTask');

let task = [];


submitButton.addEventListener('click', function(event) {
    const taskText = inputText.value.trim();
    if(task === '') {
        alert('Please enter a task');
        return;
    }
    const newTask = {
        text: taskText,
        isDone: false,
        id : Date.now()
    }

    task.push(newTask);
    inputText.value = '';
    task.forEach((val) => {
        console.log(val);

    })
});