import { useState } from 'react'
// import Web3 from 'web3'

import './App.css'
import { TodoInput } from './components/TodoInput'
import { todoAbi } from './contracts/Todo_ABI' // ここを追加

const address = import.meta.env.VITE_CONTRACT_ADDRESS
const httpUrl = import.meta.env.VITE_API_URL

// const web3 = new Web3(new Web3.providers.HttpProvider(httpUrl))
// const contract = new Web3.eth.getAccounts()
// console.log(contract)

function App() {
  return (
    <div className='App'>
      TodoApp
      <TodoInput />
    </div>
  )
}

export default App
