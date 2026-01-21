import React from 'react'
import Login from './loginpages/Login'
import Social from './mainpages/Social'
import {Router,Route,Routes} from 'react-router-dom'
const App = () => {
  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/social' element={<Social/>}/>

    </Routes>
    </>
  )
}

export default App