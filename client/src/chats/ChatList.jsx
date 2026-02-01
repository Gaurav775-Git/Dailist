import React from 'react';

const ChatList = ({ setSelectedUser }) => {
  const users = [
    { id: 1, name: 'Alice', lastMessage: 'Hey there!', avatar: 'https://via.placeholder.com/40', isOnline: true },
    { id: 2, name: 'Bob', lastMessage: 'Are you free tomorrow?', avatar: 'https://via.placeholder.com/40', isOnline: false },
    { id: 3, name: 'Charlie', lastMessage: 'See you soon!', avatar: 'https://via.placeholder.com/40', isOnline: true },
  ];

  return (
    <div className="w-full bg-gray-800 p-4 flex-1 overflow-y-auto">
      <h2 className="text-xl font-semibold text-white mb-4">Connected Users</h2>
      <div className="space-y-3">
        {users.map(user => (
          <div key={user.id} className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition cursor-pointer"
            onClick={() => setSelectedUser(user)}
          >
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
            <div>
              <h3 className="text-white font-medium">{user.name}</h3>
              <p className="text-gray-400 text-sm">{user.lastMessage}</p>
            </div>
            {user.isOnline && <span className="ml-auto w-3 h-3 bg-green-500 rounded-full"></span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;

