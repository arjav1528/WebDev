import express from 'express'

const app = express();
app.use(express.json());

const port = 4000;
let tasks = [];
let nextID = 1;


// Create a new task
app.post('/post', (req, res) => {
    const {name,due} = req.body;
    const newTask = {
        id : nextID,
        name : name,
        due : due
    };
    nextID++;
    tasks.push(newTask);
    res.send(newTask);
});


// Get all tasks

app.get('/get', (req, res) => {

    res.send(tasks);
});


// Get a Task by ID
app.get('/get/:id', async (req, res) => {
    try {
        const task = tasks.find(t => t.id === parseInt(req.params.id))
        if (!task) {
            return res.status(404).send('Task not found')
        }
        // res.json(task)
        res.send(task);
    } catch (error) {
        res.status(404).send(error.message)
    }
})

// Update Task by ID

app.put('/update/:id', async (req, res) => {
    try {
        const { name, due } = req.body;
        const task = tasks.find(t => t.id === parseInt(req.params.id));
        if(!task){
            res.send('No Task Found');
        }
        else{
            task.name = name;
            task.due = due;
            res.send(tasks);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {

    console.log(`Server is set up on port ${port}`);
    console.log(`http://localhost:${port}`);
});