import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import contractABI from '../contract-abi.json'

const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
export const web3 = createAlchemyWeb3(alchemyKey)

export const helloWorldContract = new web3.eth.Contract(
  contractABI,
  contractAddress
)

export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.world().call()
  return message
}

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

export const updateMessage = async (address, message) => {}
