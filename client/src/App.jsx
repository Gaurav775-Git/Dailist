import React from 'react'
import Login from './loginpages/Login'
import Sidebar from './sidebar/Sidebar'
import Social from './mainpages/Social'
import Search from './search/Search'
import Chats from './chats/Chats'
import Profile from './profile/Profile'
import Aitasks from './ai/Aitasks'
import {Router,Route,Routes} from 'react-router-dom'
import TaskLog from './pages/TaskLog'
const App = () => {
  return (
    <div >
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/social' element={<Social/>}/>
      <Route path='/tasks' element={<TaskLog/>}/>
     <Route path='/search' element={<Search/>}/>
     <Route path='/chats' element={<Chats/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/aitask' element={<Aitasks/>}/>
    </Routes>
    </div>
  )
}

export default App