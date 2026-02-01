import React, { useState } from 'react'
import Sidebar from '../sidebar/Sidebar'
import ChatList from './ChatList'
import ChatWindow from './ChatWindow'

const Chats = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className='flex h-screen bg-gray-900'>
      <div className='flex flex-col w-1/4 max-h-screen border-r border-gray-700'>
        <Sidebar />
        <ChatList setSelectedUser={setSelectedUser} />
      </div>
      <ChatWindow selectedUser={selectedUser} />
    </div>
  )
}

export default Chats