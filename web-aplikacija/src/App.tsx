import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  type Todo = {
    text: string
    completed: boolean
  }

  const [inputText, setInputText] = useState('')
  const [items, setItems] = useState<Todo[]>([])


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputText.trim() !== '') {
      setItems([...items, {text: inputText.trim(), completed: false}])
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
     
     <ul>
      {items.map((item, index) => (
        <li key={index}>
          <label className={ item.completed ? 'done' : ''}>
            <input type="checkbox" 
            checked={item.completed} 
            onChange={() => {
              const newItems = items.map((item, i) => {
                if (i === index) {
                  return {...item, completed: !item.completed}
                }
                return item
              })
              setItems(newItems)
            }}/>
            {item.text}
          </label>
        </li>
      ))}
     </ul>
      
    </>
  )
}

export default App
