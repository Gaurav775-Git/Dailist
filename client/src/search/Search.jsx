import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import api from "../api/axios";
import { CiSearch } from "react-icons/ci";
import {sendrequest} from "../chats/api"
import { PiUserListDuotone } from "react-icons/pi";

const Search = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const query = search.trim();

    if (query.length < 3) {
      setUsers([]);
      return;
    }

    const timer = setTimeout(() => {
      api
        .get(`/search-users?q=${query}`)
        .then((res) => setUsers(res.data))
        .catch(console.log);
    }, 400);
    return () => clearTimeout(timer);
    
  }, [search]);

  const submitid = async (userid) => {
    try {
      sendrequest(userid)
      alert("Friend request sent 🚀");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen bg-[#121212] text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col ml-72">
        
        <header className="sticky top-0 z-50 bg-black border-b border-gray-800 flex items-center px-6 py-4">
          <div className="flex items-center bg-[#1e1e1e] px-4 py-2 rounded-full w-full max-w-xl">
            <CiSearch className="text-gray-400 text-xl mr-2" />
            <input
              type="text"
              value={search}
              placeholder="Search users..."
              className="bg-transparent outline-none text-white w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </header>

        
        <div className="p-6 max-w-xl">
          {users.length === 0 && search.length >= 3 && (
            <p className="text-gray-400">No users found</p>
          )}

          {users.map((user) => (
            <div
              key={user._id}
              className="flex items-center justify-between bg-[#1f1f1f] p-4 mb-3 rounded-xl hover:bg-[#2a2a2a] transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-green-600 rounded-full text-xl font-bold">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>

              <button
                onClick={() => submitid(user._id)}
                className="bg-green-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-500 transition"
              >
                Add Friend
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
