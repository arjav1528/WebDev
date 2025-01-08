import fs, { readFileSync } from 'fs';
const filePath = './todo.txt';
const command = process.argv[2];
const argument = process.argv[3];
const saveTasks = (tasks) => {
    try{
        const data = JSON.stringify(tasks);
        fs.writeFileSync(filePath, data);
    }
catch(e) {
        console.log(e);
    }

     
}

const loadTask = () => {
    try{
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
        // return dataBuffer;

    }catch(e) {
        console.log(e);
        return [];
    }
}
const addTask = (argument) => {
    const tasks = loadTask();
    tasks.push(argument);
    saveTasks(tasks);
    

}

const listTasks = () => {
    const tasks = loadTask();
    console.log('Your tasks:');
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
}

const removeTask = (index) => {
    const tasks = loadTask();
    if(index >= 1 && index <= tasks.length) {
        const removedTask = tasks.splice(index - 1, 1);
        saveTasks(tasks);
        console.log(`Removed task: ${removedTask}`);
    }else{
        console.log('Invalid task number');
    }
}



if(command === 'add') {
    addTask(argument);
}else if(command === 'list') {
    listTasks();
}else if(command === 'remove') {
    removeTask(parseInt(argument));
}else{
    console.log('Invalid command');
}

