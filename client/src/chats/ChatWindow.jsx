import React, { useState } from 'react';

const ChatWindow = ({ selectedUser }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alice', text: 'Hi, how are you?', time: '10:00 AM' },
      { id: 2, sender: 'You', text: 'I\'m good, thanks! How about you?', time: '10:05 AM' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'You', text: newMessage, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      <div className="bg-gray-800 p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white">{selectedUser ? selectedUser.name : 'Select a chat'}</h2>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`rounded-lg p-3 max-w-xs ${message.sender === 'You' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}
            >
              <p className="text-sm">{message.text}</p>
              <span className="text-xs opacity-75 block text-right mt-1">{message.time}</span>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-r-lg transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;
