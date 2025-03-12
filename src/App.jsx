import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Login } from './Login'
import { BatchList } from './BtachList'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from './NavBar'
import { AddBatch } from './AddBatch'
import { EditBatch } from './EditBatch'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<><Login /></>} />
          <Route path='/' element={<><Navbar /><BatchList /></>} />
          <Route path='/nav' element={<Navbar />} />
          <Route path='/add' element={<><Navbar /><AddBatch /></>} />
          <Route path='edit/:id' element={<><Navbar /><EditBatch /></>} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
