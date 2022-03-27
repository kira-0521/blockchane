import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import contractABI from '../contract-abi.json'

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

console.log('alchemyKey ===> ', alchemyKey)
console.log('contractAddress ===> ', contractAddress)

export const web3 = createAlchemyWeb3(alchemyKey)

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.world().call()
  console.log('interact message ===>', message)
  return message
}

export const connectWallet = async () => {}

export const getCurrentWalletConnected = async () => {}

export const updateMessage = async (address, message) => {}
