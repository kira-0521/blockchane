import React, { createContext } from 'react'

export const WalletContext = createContext({})

export const WalletProvider = (props) => {
  const { children } = props
  const walletName = 'Metamask'
  return (
    <WalletContext.Provider value={walletName}>
      {children}
    </WalletContext.Provider>
  )
}
