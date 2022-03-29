import React, { createContext } from 'react'
import { useState } from 'react'

export const WalletContext = createContext({})

export const WalletProvider = (props) => {
  const { children } = props
  const [walletAddress, setWallet] = useState('')
  return (
    <WalletContext.Provider value={{ walletAddress, setWallet }}>
      {children}
    </WalletContext.Provider>
  )
}
