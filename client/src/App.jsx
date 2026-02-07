import React from 'react'
import Login from './loginpages/Login'
import Sidebar from './sidebar/Sidebar'
import Social from './mainpages/Social'
import Search from './search/Search'
import Chats from './chats/Chats'
import Profile from './profile/Profile'
import Aitasks from './ai/Aitasks'
import {Route,Routes} from 'react-router-dom'
import TaskLog from './pages/TaskLog'
import ProtectedRoute from './components/ProtectedRoute'
import './app.css'

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public route - login page */}
        <Route path='/' element={<Login/>}/>
        
        {/* Protected routes - require authentication */}
        <Route path='/social' element={
          <ProtectedRoute>
            <Social/>
          </ProtectedRoute>
        }/>
        
        <Route path='/tasks' element={
          <ProtectedRoute>
            <TaskLog/>
          </ProtectedRoute>
        }/>
        
        <Route path='/search' element={
          <ProtectedRoute>
            <Search/>
          </ProtectedRoute>
        }/>
        
        <Route path='/chats' element={
          <ProtectedRoute>
            <Chats/>
          </ProtectedRoute>
        }/>
        
        <Route path='/profile' element={
          <ProtectedRoute>
            <Profile/>
          </ProtectedRoute>
        }/>
        
        <Route path='/aitask' element={
          <ProtectedRoute>
            <Aitasks/>
          </ProtectedRoute>
        }/>
      </Routes>
    </div>
  )
}

export default App