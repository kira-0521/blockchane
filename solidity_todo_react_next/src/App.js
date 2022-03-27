import { useState } from 'react'

import './App.css'
import { TodoInput } from './components/TodoInput'
import { todoAbi } from './contracts/Todo_ABI' // ここを追加

const address = process.env.REACT_APP_CONTRACT_ADDRESS
const httpUrl = process.env.REACT_APP_API_URL

function App() {
  return (
    <div className='App'>
      TodoApp
      <TodoInput />
    </div>
  )
}

export default App
