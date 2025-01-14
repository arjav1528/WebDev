import express from 'express';
import dotenv from 'dotenv';
import module from 'module';
import logger from "./logger.js";
import morgan from "morgan";



dotenv.config();

const app = express();
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";
app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

const port = process.env.PORT || 3000;
let tasks = [];
let nextID = 1;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Create a new task
app.post('/post', (req, res) => {
    try {
        const {name, due} = req.body;
        
        if (!name || !due) {
            return res.status(400).json({ error: 'Name and due date are required' });
        }

        const newTask = {
            id: nextID,
            name,
            due
        };
        
        nextID++;
        tasks.push(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
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

//Delete A Data

app.delete('/delete/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if(!task){
        res.send('No Task Found');
    }
    else{
        tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
        res.send(tasks);
    }
});

// app.delete

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

module.exports = app;