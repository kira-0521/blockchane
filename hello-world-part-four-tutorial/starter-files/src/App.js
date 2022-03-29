import { WalletProvider } from './providers/WalletProvider'
import HelloWorld from './components/HelloWorld'
import './assets/App.css'

function App() {
  return (
    <WalletProvider>
      <div className='App'>
        <HelloWorld></HelloWorld>
      </div>
    </WalletProvider>
  )
}

export default App
