import detectEthereumProvider from "@metamask/detect-provider";

import './App.css'
import {Select} from "./components/Select";
import {Title} from "./components/Title";

function App() {
  const enable = async() => {
    const provider = await detectEthereumProvider({mustBeMetaMask: true});
    if(provider && window.ethereum?.isMetaMask) {
      console.log('Welcome to MetaMask User🎉')
      console.log('provider ===>', provider)
    } else {
      console.log('Please Install MetaMask🙇‍♂️')
      console.log('provider ===>', provider)
    }
  }
  enable()


  return (
    <div>
      <div>Vite</div>
        <div><Select /></div>
        <Title level='h2' children='h2タグだよ' />
    </div>
  )
}

export default App
