import React, { useEffect, useState } from 'react'

import {
  helloWorldContract,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
  connectWallet,
} from './util/interact.js'
import notEthPattern from './util/notEthPattern.js'
import alchemylogo from './assets/alchemylogo.svg'

const HelloWorld = () => {
  //state variables
  const [walletAddress, setWallet] = useState('')
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('No connection to the network.') //default message
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    // メッセージ取得
    callFetchMessage().then(async () => {
      // 現在のウォレット接続状況を取得
      const { address, status } = await getCurrentWalletConnected()
      setWallet(address)
      setStatus(status)
    })

    // メッセージの更新をリッスン
    addSmartContractListener()
    // ウォレットの変更、削除などをリッスン
    addWalletListener()
  }, [])

  const callFetchMessage = async () => {
    const message = await loadCurrentMessage()
    console.log('message ===> ', message)
    setMessage(message)
  }
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
  // ユーザーがウォレットとの接続状態を変更したときUIを更新する
  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0])
          setStatus('👆🏽 Write a message in the text-field above.')
        } else {
          setWallet('')
          setStatus('🦊 Connect to Metamask using the top right button.')
        }
      })
    } else {
      setStatus(notEthPattern)
    }
  }

  // ウォレットとの接続
  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet()
    setStatus(walletResponse.status)
    setWallet(walletResponse.address)
  }

  // メッセージの更新
  const onUpdatePressed = async () => {
    const { status } = await updateMessage(walletAddress, newMessage)
    setStatus(status)
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
