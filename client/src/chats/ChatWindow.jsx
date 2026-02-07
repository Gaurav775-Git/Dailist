import React, { useState, useEffect, useRef } from 'react'
import socket from '../socket.io'
import { getMessages, createMessage } from './api'

const ChatWindow = ({ selectedChat, currentUser, onMessageSent, onMessageReceived }) => {
  const [messages, setMessages] = useState([])
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    if (!selectedChat?._id) {
      setMessages([])
      return
    }

    setLoading(true)
    getMessages(selectedChat._id)
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : (res.data?.data ?? [])
        const currentId = String(currentUser?.id ?? currentUser?._id ?? '')
        const msgs = data.map(m => {
          const senderId = m.sender?._id ? String(m.sender._id) : String(m.sender || '')
          return {
            _id: m._id,
            name: senderId === currentId ? 'You' : m.sender?.name || 'Unknown',
            message: m.text,
          }
        })
        setMessages(msgs)
      })
      .catch(() => setMessages([]))
      .finally(() => { setLoading(false); setTimeout(scrollToBottom, 100) })

    const chatId = selectedChat._id
    socket.emit('join_chat', chatId)

    const handleReceive = (message) => {
      const senderId = message.sender?._id ? String(message.sender._id) : String(message.sender || '')
      const currentId = String(currentUser?.id ?? currentUser?._id ?? '')
      const isOwn = senderId === currentId
      setMessages(prev => [...prev, {
        _id: message._id,
        name: isOwn ? 'You' : message.sender?.name || selectedChat?.otherMember?.name || 'Unknown',
        message: message.text,
      }])
      onMessageReceived?.()
      setTimeout(scrollToBottom, 50)
    }

    socket.on('receive_message', handleReceive)
    return () => {
      socket.off('receive_message', handleReceive)
      socket.emit('leave_chat', chatId)
    }
  }, [selectedChat?._id, currentUser?.id ?? currentUser?._id])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!msg.trim() || !selectedChat?._id || sending) return

    const text = msg.trim()
    setMsg('')
    setSending(true)

    try {
      const res = await createMessage(selectedChat._id, text)
      const newMsg = res.data

      setMessages(prev => [...prev, {
        _id: newMsg._id,
        name: 'You',
        message: newMsg.text,
      }])

      socket.emit('send_message', {
        chatId: selectedChat._id,
        message: {
          _id: newMsg._id,
          text: newMsg.text,
          sender: { _id: currentUser?.id ?? currentUser?._id, name: currentUser?.name },
        },
      })
      onMessageSent?.()
      setTimeout(scrollToBottom, 50)
    } catch (err) {
      setMsg(text)
      console.error(err)
    } finally {
      setSending(false)
    }
  }

  if (!selectedChat) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#222] text-white p-5">
        <p className="text-gray-400">Select a chat or start a new one</p>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-black text-white p-5">
      <div
        id="message-container"
        className="w-[700px] h-[600px] p-5 border-2 border-white rounded-3xl flex flex-col gap-4 overflow-y-auto"
      >
        <div className="pb-2 border-b border-white/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-600 to-gray-600 flex items-center justify-center overflow-hidden border-2 border-white/50 flex-shrink-0">
            {selectedChat.otherMember?.image?.trim() ? (
              <img
                src={selectedChat.otherMember.image}
                alt={selectedChat.otherMember.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-sm font-semibold">
                {selectedChat.otherMember?.name?.[0]?.toUpperCase() || '?'}
              </span>
            )}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              {selectedChat.otherMember?.name || 'Chat'}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">
              You: <span className="text-white">{currentUser?.name || 'Unknown'}</span>
              <span className="mx-2">↔</span>
              {selectedChat.otherMember?.name || 'Unknown'}
            </p>
          </div>
        </div>
        {loading ? (
          <p className="text-gray-400">Loading messages...</p>
        ) : (
          messages.map((item, i) => (
            <div
              key={item._id || i}
              className={`flex ${item.name === 'You' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="p-2 border border-white rounded-md max-w-xs">
                <b>{item.name}:</b> {item.message}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div id="send" className="mt-4">
        <form id="send-form" onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type a message..."
            disabled={sending}
            className="border-2 border-white rounded-md h-9 w-[400px] bg-transparent px-3 text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-white disabled:opacity-50"
          />
          <input
            type="submit"
            value={sending ? '...' : 'Submit'}
            disabled={sending}
            className="border-2 border-white rounded-md p-2 px-5 cursor-pointer hover:bg-white hover:text-[#222] transition disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </form>
      </div>
    </div>
  )
}

export default ChatWindow
