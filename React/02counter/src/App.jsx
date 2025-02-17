import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // let counter = 14;
  const [counter,setCounter] = useState(0);
  const addValue = () => {
    setCounter((prevValue) => prevValue + 1);


  }
  const removeValue = () => {
    setCounter((prevValue) => prevValue - 1);

  }
  
  

  return (
    <>
      <h1>React course</h1>
      <img src={reactLogo} alt="React Logo" />


      <h1>Vite course</h1>
      <h1>Counter : {counter}</h1>
      <button onClick={addValue}>Increment</button>
      
      <button onClick={removeValue}>Remove value</button>
      
    </>
  )
}

export default App
