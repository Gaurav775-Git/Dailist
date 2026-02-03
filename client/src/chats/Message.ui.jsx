import React, { useEffect, useState } from 'react'
import socket from '../socket.io.js';

const Messagebox= () => {

  const [msg, setmsg] = useState('')
  const [list, setlist] = useState([])

  useEffect(() => {
    socket.emit('new-user', 'Gaurav')

    socket.on('receive', (data) => {
      setlist(prev => [...prev, data])
    })

    return () => {
      socket.off('receive')
    }
  }, []) // ✅ run once

  const sendmsg = (e) => {
    e.preventDefault()
    if (!msg) return

    socket.emit('send', msg)

    setlist(prev => [...prev, { name: 'You', message: msg }])
    setmsg('')
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#222] text-white">
      
      <div
        id="message-container"
        className="w-[700px] h-[600px] p-5 border-2 border-white rounded-3xl flex flex-col gap-4 overflow-y-auto"
      >
        {list.map((item, i) => (
          <div
            key={i}
            className={`flex ${item.name === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="p-2 border border-white rounded-md max-w-xs">
              <b>{item.name}:</b> {item.message}
            </div>
          </div>
        ))}
      </div>

      <div id="send" className="absolute top-152">
        <form id="send-form" onSubmit={sendmsg}>
          <input
            type="text"
            value={msg}
            onChange={(e) => setmsg(e.target.value)}
            className="border-3 rounded-md h-8.5 w-100"
          />
          <input
            type="submit"
            value="Submit"
            className="border-2 rounded-md p-1 m-5"
          />
        </form>
      </div>

    </div>
  )
}

export default Messagebox
