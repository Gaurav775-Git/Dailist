import React, { useState, useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import ChatList from './ChatList'
import ChatWindow from './ChatWindow'
import { getCurrentUser } from './api'

const Chats = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [chatListKey, setChatListKey] = useState(0)

  useEffect(() => {
    getCurrentUser()
      .then(res => {
        const d = res.data
        setCurrentUser({ id: d?.id ?? d?._id, name: d?.name })
      })
      .catch(() => setCurrentUser(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-900 items-center justify-center text-white">
        Loading...
      </div>
    )
  }

  if (!currentUser) {
    return (
      <div className="flex h-screen bg-gray-900 items-center justify-center text-white">
        <p>Please log in to use chats</p>
      </div>
    )
  }

  return (
    <div className='flex h-screen bg-gray-900'>
      <div className='flex flex-col w-1/4 max-h-screen border-r border-gray-700'>
        <Sidebar />
        <ChatList
          refreshTrigger={chatListKey}
          selectedChat={selectedChat}
          setSelectedChat={setSelectedChat}
          currentUserId={currentUser.id ?? currentUser._id}
        />
      </div>
      <ChatWindow
        selectedChat={selectedChat}
        currentUser={currentUser}
        onMessageSent={() => setChatListKey(k => k + 1)}
        onMessageReceived={() => setChatListKey(k => k + 1)}
      />
    </div>
  )
}

export default Chats
