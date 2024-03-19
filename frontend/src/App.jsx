import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Login />
    </div>
  )
}

export default App
