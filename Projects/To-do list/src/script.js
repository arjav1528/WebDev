document.addEventListener('DOMContentLoaded',() => {
    let inputText = document.getElementById('form-input');
    let submitButton = document.getElementById('addTask');
    let taskList = document.getElementById('task-list');

    let allTasks = JSON.parse(localStorage.getItem('task')) || [];

    allTasks.forEach((val) => {
        renderTask(val);
        
    }      
    );


    submitButton.addEventListener('click', function(event) {
        const taskText = inputText.value.trim();
        
        const newTask = {
            text: taskText,
            isDone: false,
            id : Date.now()
        }
        if(taskText === '') {
            alert('Please enter a task');
            return;
        }
        else{
            renderTask(newTask);
            allTasks.push(newTask);
            saveTask();
            
            inputText.value = '';
        }

        

    });

    function taskButton(taskName){
        let style = "<div class=\"flex justify-between m-3\"><h1 class=\" text-white p-2 m-4 ml-10 rounded-[4px]\">" + taskName +"</h1><button class=\"text-white  mt-4 ml-4 mb-4 mr-10 p-1 w-36 hover:bg-purple-400 hover:transition-all hover:duration-200 hover:text-white\">Delete</button></div>";
        return style;
    }


    function renderTask(task){
        
        const li = document.createElement("li");
        li.setAttribute("data-id",task.id);
        li.innerHTML = taskButton(task.text);
        li.classList.add("flex");
        
        taskList.appendChild(li);
        li.addEventListener("click",(e) => {
            if(e.target.innerHTML === "Delete"){
                console.log(task);
                taskList.removeChild(li);
            }
            else{
                task.isDone = !task.isDone;
                li.classList.toggle('line-through');
            }
            
        });
        saveTask();
    }





    function saveTask(){
        localStorage.setItem('task',JSON.stringify(allTasks));
    }
});