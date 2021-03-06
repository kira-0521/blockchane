import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  memo,
} from 'react'

import {
  helloWorldContract,
  updateMessage,
  loadCurrentMessage,
  getCurrentWalletConnected,
  connectWallet,
} from '../util/interact'
import { WalletContext } from '../providers/WalletProvider'
import notEthPattern from '../util/notEthPattern.js'
import alchemylogo from '../assets/alchemylogo.svg'

const HelloWorld = memo(() => {
  //state variables
  const [status, setStatus] = useState('')
  const [message, setMessage] = useState('No connection to the network.') //default message
  const [newMessage, setNewMessage] = useState('')
  const { walletAddress, setWallet } = useContext(WalletContext)

  const callFetchMessage = useCallback(async () => {
    const message = await loadCurrentMessage()
    console.log('message ===> ', message)
    setMessage(message)
  }, [])
  const addSmartContractListener = useCallback(() => {
    helloWorldContract.events.UpdatedMessages({}, (error, data) => {
      if (error) {
        console.log('error', error)
        setStatus('๐ฅ ' + error.message)
      } else {
        console.log('data', data)
        setMessage(data.returnValues[1])
        setNewMessage('')
        setStatus('๐ Your message has been updated!')
      }
    })
  }, [])
  const addWalletListener = useCallback(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0])
          setStatus('๐๐ฝ Write a message in the text-field above.')
        } else {
          setWallet('')
          setStatus('๐ฆ Connect to Metamask using the top right button.')
        }
      })
    } else {
      setStatus(notEthPattern)
    }
  }, [setWallet])

  useEffect(() => {
    // ใกใใปใผใธๅๅพ
    callFetchMessage().then(async () => {
      // ็พๅจใฎใฆใฉใฌใใๆฅ็ถ็ถๆณใๅๅพ
      const { address, status } = await getCurrentWalletConnected()
      setWallet(address)
      setStatus(status)
    })

    // ใกใใปใผใธใฎๆดๆฐใใชใในใณ
    addSmartContractListener()
    // ใฆใฉใฌใใใฎๅคๆดใๅ้คใชใฉใใชใในใณ
    addWalletListener()
  }, [setWallet, callFetchMessage, addSmartContractListener, addWalletListener])

  // ๅฅๅๅคใใปใใ
  const onSetNewMessage = useCallback((e) => setNewMessage(e.target.value), [])
  // ใฆใฉใฌใใใจใฎๆฅ็ถ
  const onConnectWalletPressed = useCallback(async () => {
    const walletResponse = await connectWallet()
    setStatus(walletResponse.status)
    setWallet(walletResponse.address)
  }, [setWallet])
  // ใกใใปใผใธใฎๆดๆฐ
  const onUpdatePressed = useCallback(async () => {
    const { status } = await updateMessage(walletAddress, newMessage)
    setStatus(status)
  }, [walletAddress, newMessage])

  return (
    <div id='container'>
      <img id='logo' src={alchemylogo}></img>
      <button id='walletButton' onClick={onConnectWalletPressed}>
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
          onChange={onSetNewMessage}
          value={newMessage}
        />
        <p id='status'>status: {status}</p>

        <button id='publish' onClick={onUpdatePressed}>
          Update
        </button>
      </div>
    </div>
  )
})

export default HelloWorld
