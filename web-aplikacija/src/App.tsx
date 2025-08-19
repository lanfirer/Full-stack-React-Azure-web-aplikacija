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
      setItems([...items, {id: Date.now(), text: " " + inputText.trim(), completed: false}])
      setInputText('')
    }
  }

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
            onChange={() => {
              const newItems = items.map((x) => {
                if (x.id === item.id) {
                  return {...item, completed: !item.completed}
                }
                return x
              })
              setItems(newItems)
            }}/>
            {item.text}
          </label>
        </li>
      ))}
     </ol>
      
      <button className='button'
      onClick={() => setItems([])} >
        Clear
      </button>

      <button className='button'
      onClick={() => {
        const newItems = items.filter((item) => !item.completed);
        setItems(newItems);
      }} >
        Clear completed
      </button>

    </>
  )
}

export default App
