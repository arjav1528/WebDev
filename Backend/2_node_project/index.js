import express from 'express'

const app = express();
app.use(express.json());

const port = 8000;
let tasks = [];
let nextID = 1;

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



app.get('/get', (req, res) => {

    res.send(tasks);
});

app.listen(port, () => {

    console.log(`Server is set up on port ${port}`);
    console.log(`http://localhost:${port}`);
});