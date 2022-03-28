import React, { useEffect, useState } from 'react'

import {
  helloWorldContract,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
  connectWallet,
} from './util/interact.js'
import alchemylogo from './alchemylogo.svg'

const HelloWorld = () => {
  //state variables
  const [walletAddress, setWallet] = useState('')
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('No connection to the network.') //default message
  const [newMessage, setNewMessage] = useState('')

  //called only once
  useEffect(() => {
    const callFetchMessage = async () => {
      const message = await loadCurrentMessage()
      console.log('message ===> ', message)
      setMessage(message)
    }
    callFetchMessage()
      .then(() => {
        addSmartContractListener()
      })
      .then(async () => {
        const { address, status } = await getCurrentWalletConnected()
        setWallet(address)
        setStatus(status)
      })
  }, [])

  const addSmartContractListener = () => {
    helloWorldContract.events.UpdatedMessages({}, (error, data) => {
      if (error) {
        console.log('error', error)
        setStatus('😥 ' + error.message)
      } else {
        console.log('data', data)
        setMessage(data.returnValues[1])
        setNewMessage('')
        setStatus('🎉 Your message has been updated!')
      }
    })
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet()
    setStatus(walletResponse.status)
    setWallet(walletResponse.address)
  }

  function addWalletListener() {
    //TODO: implement
  }

  const onUpdatePressed = async () => {
    //TODO: implement
  }

  //the UI of our component
  return (
    <div id='container'>
      <img id='logo' src={alchemylogo}></img>
      <button id='walletButton' onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          'Connected: ' +
          String(walletAddress).substring(0, 6) +
          '...' +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <h2 style={{ paddingTop: '50px' }}>Current Message:</h2>
      <p>message: {message}</p>

      <h2 style={{ paddingTop: '18px' }}>New Message:</h2>

      <div>
        <input
          type='text'
          placeholder='Update the message in your smart contract.'
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <p id='status'>state: {status}</p>

        <button id='publish' onClick={onUpdatePressed}>
          Update
        </button>
      </div>
    </div>
  )
}

export default HelloWorld
