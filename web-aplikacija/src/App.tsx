import { useState, useEffect } from 'react'
import './App.css'

function App() {

  type Todo = {
    id: number
    text: string
    completed: boolean
  }


  const [inputText, setInputText] = useState('')
  const [items, setItems] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
  }, [items]);


  useEffect(() => {
    fetch('http://localhost:8080/todo')
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
      });
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputText.trim() !== '') {
      addTodo(inputText.trim())
      setInputText('')
    }
  }

  const addTodo = async (text: string) => {
    const res = await fetch('http://localhost:8080/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({text})
    });

    const NewTodo = await res.json();
    setItems([...items, NewTodo]);
  };

  const toggleTodo = async (id: number, completed: boolean) => {
    const res = await fetch(`http://localhost:8080/todo/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({completed:!completed})
    });

    const updated = await res.json();
    setItems(items.map((item) => item.id === id ? updated : item));
  };

  const clearAll = async () => {
    await fetch('http://localhost:8080/todo', {method: "DELETE"});
    setItems([]);
  };

  const clearCompleted = async () => {
    await fetch('http://localhost:8080/todo/completed', {method: "DELETE"});
    setItems(items.filter(item => !item.completed));
  };

  return (
    <>
     
      <h1 className='todo'>TO DO</h1>
      <p>
        What are some things you need to do?
      </p>
      <div className='list'>

        <input 
        type="text" 
        placeholder='Write what you have to do' 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyPress}
        /> 
        
      </div>
     
     <ol>
      {[...items]
      .sort((a,b) => Number(a.completed) - Number(b.completed))
      .map((item) => (
        <li key={item.id}>
          <label className={ item.completed ? 'done' : ''}>
            <input type="checkbox" 
            checked={item.completed} 
            onChange={() => toggleTodo(item.id, item.completed) }/>
            {item.text}
          </label>
        </li>
      ))}
     </ol>
      
      <button className='button'
      onClick={clearAll} >
        Clear
      </button>

      <button className='button'
      onClick={clearCompleted} >
        Clear completed
      </button>

    </>
  )
}

export default App
