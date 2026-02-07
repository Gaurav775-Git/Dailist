import React, { useEffect, useState } from "react";
import socket  from "/src/socket.io";
import { FaRegBell } from "react-icons/fa";

const Notify = () => {
  const [open, setOpen] = useState(false);
  const [requests, setRequests] = useState([]);


  useEffect(() => {
    const handler = (data) => {
      console.log(data)
      if (data?.senderinfo?.length) {
        setRequests((prev) => [...prev, ...data.senderinfo]);
      }
    };

    socket.on("friend_request", handler);
    console.log("user info",requests)

    return () => {
      socket.off("friend_request", handler);
    };
  }, []);

  return (
    <div className="relative">

      {requests.length > 0 && (
        <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full z-50" />
      )}

      
      <div
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-[#1f1f1f] flex items-center justify-center cursor-pointer"
      >
        <FaRegBell className="text-white" />
      </div>

    
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-[#2a2a2a] z-50 text-white rounded-lg shadow-lg p-3">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Notifications</span>
            <span
              className="cursor-pointer hover:text-red-400"
              onClick={() => setOpen(false)}
            >
              ✕
            </span>
          </div>

          {requests.length === 0 ? (
            <p className="text-gray-400 text-sm">No requests</p>
          ) : (
            requests.map((user) => (
              <div
                key={user._id}
                className="p-2 hover:bg-[#3a3a3a] rounded"
              >
                <p className="font-medium text-sm">
                  {user.name} sent you a friend request
                </p>
                <button className="mt-1 px-2 py-1 text-xs bg-green-600 rounded">
                  Accept
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notify;
