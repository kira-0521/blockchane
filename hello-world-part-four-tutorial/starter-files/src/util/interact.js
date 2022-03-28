import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import contractABI from '../contract-abi.json'
import notEthPattern from './notEthPattern'

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const web3 = createAlchemyWeb3(alchemyKey)
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS

// helloworldコントラクトオブジェクトをインスタンス化
export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)

// 現在のメッセージ取得
export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.world().call()
  return message
}

// ウォレットとの接続
export const connectWallet = async () => {
  console.log('成功！', window.ethereum)
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
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
      status: notEthPattern,
    }
  }
}

// 現在のウォレットとの接続状況を確認
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      console.log('addressArray', addressArray)
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: '👆🏽 Write a message in the text-field above.',
        }
      } else {
        return {
          address: '',
          status: '🦊 Connect to Metamask using the top right button.',
        }
      }
    } catch (err) {
      return {
        address: '',
        status: '😥 ' + err.message,
      }
    }
  } else {
    return {
      address: '',
      status: notEthPattern,
    }
  }
}

export const updateMessage = async (address, message) => {}
