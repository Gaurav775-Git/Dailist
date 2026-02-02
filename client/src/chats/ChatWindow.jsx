import React, { useState } from 'react';

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([
    { id: 1, name: 'Alice', message: 'Hi, how are you?', time: '10:00 AM' },
    { id: 2, name: 'You', message: 'I\'m good, thanks! How about you?', time: '10:05 AM' },
  ]);
  const [msg, setMsg] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { id: messages.length + 1, name: 'You', message: msg.trim() }]);
    setMsg('');
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[#222] text-white p-5">
      <div
        id="message-container"
        className="w-[700px] h-[600px] p-5 border-2 border-white rounded-3xl flex flex-col gap-4 overflow-y-auto"
      >
        {selectedUser && (
          <h2 className="text-lg font-semibold text-white pb-2 border-b border-white/30">{selectedUser.name}</h2>
        )}
        {messages.map((item, i) => (
          <div
            key={item.id ?? i}
            className={`flex ${item.name === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div className="p-2 border border-white rounded-md max-w-xs">
              <b>{item.name}:</b> {item.message}
            </div>
          </div>
        ))}
      </div>
      <div id="send" className="mt-4">
        <form id="send-form" onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type a message..."
            className="border-2 border-white rounded-md h-9 w-[400px] bg-transparent px-3 text-white placeholder-gray-400 outline-none focus:ring-1 focus:ring-white"
          />
          <input
            type="submit"
            value="Submit"
            className="border-2 border-white rounded-md p-2 px-5 cursor-pointer hover:bg-white hover:text-[#222] transition"
          />
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
