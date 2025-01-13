import express from 'express';

const app = express();

const port = 3000;
app.use(express.json());


// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// app.get('/tea', (req, res) => {
//     res.send('Hello Tea');
// });


let teaData = [];
let nextId = 1;

app.post('/post', (req, res) => {

    const {name,price} = req.body;
    const newTea = {id : nextId++, name, price};
    teaData.push(newTea);
    res.status(201).send(newTea);
});

app.get('/get', (req, res) => {
    res.send(teaData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});