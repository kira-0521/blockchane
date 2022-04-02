import './App.css'
import {Select} from "./components/Select";
import {Title} from "./components/Title";


function App() {
  return (
    <div>
      <div>Vite</div>
        <div><Select /></div>
        <Title level='h2' children='h2タグだよ' />
    </div>
  )
}

export default App
