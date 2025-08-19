import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.get('/todo', (req, res) => {
    res.json([
        {id: 1, text: 'something', completed: false},
        {id: 2, text: "else", completed: true}
    ]);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


