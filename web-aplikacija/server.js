import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

let todos = [
  {id: 5, text: 'something', completed: false},
  {id: 6, text: "else", completed: true}
];
let nextId = 1;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.use(express.json());

app.get('/todo', (req, res) => {
    res.json(todos);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post('/todo', (req, res) => {
  const newTodo = {
    id: nextId++,
    text: req.body.text,
    completed: false
  };
  todos.push(newTodo);
  res.json(newTodo);
});

app.patch('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({error: "Todo not found"});
  }

  todo.completed = req.body.completed;
  res.json(todo);
});

app.delete('/todo', (req, res) => {
  todos = [];
  res.json({ success: true});
});

app.delete('/todo/completed', (req, res) => {
  todos = todos.filter(todo => !todo.completed);
  res.json({ success: true});
});