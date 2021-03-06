import { createAlchemyWeb3 } from '@alch/alchemy-web3'
import CONTRACT_ABI from '../assets/contract-abi.json'
import notEthPattern from './notEthPattern'

const ALCHEMY_KEY = process.env.REACT_APP_ALCHEMY_KEY
const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADDRESS
const web3 = createAlchemyWeb3(ALCHEMY_KEY)

// helloworldコントラクトオブジェクトをインスタンス化
export const helloWorldContract = new web3.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS
)

// 現在のメッセージ取得
export const loadCurrentMessage = async () => {
  const message = await helloWorldContract.methods.world().call()
  return message
}
// メッセージ更新
export const updateMessage = async (address, message) => {
  // ethereumオブジェクトが存在しない or スマコンのアドレスが間違っている
  if (!window.ethereum || address === null) {
    return {
      status:
        '💡 Connect your Metamask wallet to update the message on the blockchain.',
    }
  }

  // 文字が未入力
  if (message.trim() === '') {
    return {
      status: '❌ Your message cannot be an empty string.',
    }
  }

  // トランザクションのためのパラーメータをセットアップ
  const transactionParameters = {
    to: CONTRACT_ADDRESS,
    from: address,
    data: helloWorldContract.methods.update(message).encodeABI(),
  }

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    })
    return {
      status: (
        <span>
          ✅{' '}
          <a target='_blank' href={`https://ropsten.etherscan.io/tx/${txHash}`}>
            View the status of your transaction on Etherscan!
          </a>
          <br />
          ℹ️ Once the transaction is verified by the network, the message will
          be updated automatically.
        </span>
      ),
    }
  } catch (error) {
    return {
      status: '😥 ' + error.message,
    }
  }
}

// ウォレットとの接続
export const connectWallet = async () => {
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
