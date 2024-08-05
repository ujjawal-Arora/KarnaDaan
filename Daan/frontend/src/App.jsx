import { useState } from 'react'
import Appbar from './Components/Appbar'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Donates from './Pages/Donates'
function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
   
     <Route exact path="/"  element={<Appbar/>} />
     <Route exact path="/donate"  element={<Donates/>} />
  gh
    </Routes>
   </BrowserRouter>
  
  )
}

export default App
