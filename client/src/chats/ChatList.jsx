import React, { useState, useEffect } from 'react'
import { getChats, getUsersForChat, createChat } from './api'

const ChatList = ({ selectedChat, setSelectedChat, currentUserId, refreshTrigger }) => {
  const [chats, setChats] = useState([])
  const [users, setUsers] = useState([])
  const [showNewChat, setShowNewChat] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchChats = () => {
    getChats()
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data?.chats ?? res.data?.data ?? [])
        setChats(data)
      })
      .catch(() => setChats([]))
  }

  useEffect(() => {
    fetchChats()
  }, [refreshTrigger])

  useEffect(() => {
    fetchChats()
    getUsersForChat()
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data?.users ?? res.data?.data ?? [])
        setUsers(data)
      })
      .catch(() => setUsers([]))
      .finally(() => setLoading(false))
  }, [])

  const handleSelectChat = (chat) => {
    setSelectedChat(chat)
    setShowNewChat(false)
  }

  const handleStartNewChat = async (user) => {
    try {
      const res = await createChat(user._id)
      const chat = res.data
      const otherMember = chat.otherMember || chat.members?.find(m => String(m._id) !== String(currentUserId)) || { _id: user._id, name: user.name }
      const newChat = {
        _id: chat._id,
        otherMember: {
          _id: otherMember._id,
          name: otherMember.name || user.name,
          image: chat.otherMember?.image ?? user.image ?? null,
        },
      }
      setChats(prev => [newChat, ...prev])
      setSelectedChat(newChat)
      setShowNewChat(false)
    } catch (err) {
      console.error(err)
      fetchChats()
    }
  }

  return (
    <div className="bg-gray-800 pl-70  flex-1 overflow-y-auto flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Chats</h2>
        <button
          onClick={() => setShowNewChat(!showNewChat)}
          className="text-sm px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white"
        >
          {showNewChat ? 'Cancel' : 'New chat'}
        </button>
      </div>

      {showNewChat ? (
        <div className="space-y-2">
          <p className="text-gray-400 text-sm">Select a user to start chatting</p>
          {users.map(user => (
            <div
              key={user._id}
              className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer"
              onClick={() => handleStartNewChat(user)}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-gray-600 flex items-center justify-center mr-3 overflow-hidden border-2 border-gray-500 flex-shrink-0">
                {user.image?.trim() ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white text-lg font-semibold">
                    {user.name?.[0]?.toUpperCase() || '?'}
                  </span>
                )}
              </div>
              <h3 className="text-white font-medium">{user.name}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3 flex-1">
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : chats.length === 0 ? (
            <p className="text-gray-400 text-sm">No chats yet. Start a new chat!</p>
          ) : (
            chats.map(chat => (
              <div
                key={chat._id}
                className={`flex items-center p-3 rounded-lg transition cursor-pointer ${
                  selectedChat?._id === chat._id ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
                onClick={() => handleSelectChat(chat)}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-gray-600 flex items-center justify-center mr-3 overflow-hidden border-2 border-gray-500 flex-shrink-0">
                  {chat.otherMember?.image?.trim() ? (
                    <img
                      src={chat.otherMember.image}
                      alt={chat.otherMember.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-lg font-semibold">
                      {chat.otherMember?.name?.[0]?.toUpperCase() || '?'}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium truncate">{chat.otherMember?.name || 'Unknown'}</h3>
                  <p className="text-gray-400 text-sm truncate">
                    {chat.lastMessage?.text || 'No messages yet'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default ChatList
