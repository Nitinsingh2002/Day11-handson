import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Login } from './Login'
import { BatchList } from './BtachList'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from './NavBar'
import { AddBatch } from './AddBatch'
import { EditBatch } from './EditBatch'
// import jwtDecode from "jwt-decode";
import { useCookies } from 'react-cookie'
import { jwtDecode } from 'jwt-decode'


function App() {
  const [cookies] = useCookies(["token"]);
  const [decodedDetails, setDecodedDetails] = useState();


  useEffect(() => {
    if (cookies.token) {
      try {
        const decoded = jwtDecode(cookies.token);
        console.log(decoded);
        setDecodedDetails(decoded);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [cookies.token]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<><Login /></>} />
          <Route path='/' element={<><Navbar decodedDetails={decodedDetails} /><BatchList decodedDetails={decodedDetails} /></>} />
          <Route path='/nav' element={<Navbar />} />
          <Route path='/add' element={<><Navbar /><AddBatch /></>} />
          <Route path='edit/:id' element={<><Navbar /><EditBatch /></>} />
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
