import React, { useEffect, useState } from 'react'

import {
  helloWorldContract,
  // connectWallet,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
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
    addSmartContractListener()
  }, [])

  function addSmartContractListener() {
    helloWorldContract.events.UpdatedMessages({}, (error, data) => {
      if (error) {
        setStatus('😥 ' + error.message)
      } else {
        setMessage(data.returnValues[1])
        setNewMessage('')
        setStatus('🎉 Your message has been updated!')
      }
    })
  }

  function addWalletListener() {
    //TODO: implement
  }

  // interact.jsだとなぜか使えない
  const connectWallet = async () => {
    console.log('成功！', window.ethereum)
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        console.log('addressArray ===> ', addressArray)
        const obj = {
          status: '👆🏽 Write a message in the text-field above.',
          address: addressArray[0],
        }
        return obj
      } catch (err) {
        return {
          address: '',
          status: '😥 ' + err.message,
        }
      }
    } else {
      return {
        address: '',
        status: (
          <span>
            <p>
              {' '}
              🦊{' '}
              <a target='_blank' href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      }
    }
  }
  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet()
    setStatus(walletResponse.status)
    setWallet(walletResponse.address)
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
      <p>{message}</p>

      <h2 style={{ paddingTop: '18px' }}>New Message:</h2>

      <div>
        <input
          type='text'
          placeholder='Update the message in your smart contract.'
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <p id='status'>{status}</p>

        <button id='publish' onClick={onUpdatePressed}>
          Update
        </button>
      </div>
    </div>
  )
}

export default HelloWorld
