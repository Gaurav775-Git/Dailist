import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { Commet } from "react-loading-indicators";

const Profile = () => {
  const colortoken = "bg-[#000000]";
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/profile", {
      withCredentials: "include",   
    })
      .then((res) => {
        setProfile(res.data);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Commet color="#101010" size="medium" />
      </div>
    );
  }

  return (
    <div className="ml-94 flex h-screen">
      <Sidebar />

      <div className={`flex-1 ${colortoken} flex flex-col border-r border-gray-700`}>
        <header className="flex items-center p-2 border-b border-gray-700 text-white">
          <FaArrowLeft className="cursor-pointer mx-4 w-5 h-5" />

          <div className="flex flex-col px-3">
            <span className="text-[19px]">{profile.username}</span>
            <span className="text-[12px] text-gray-400">Streak</span>
          </div>
        </header>

        <main className="h-screen w-full">
          <div className="h-40 w-full border-b border-gray-700 bg-[#1f1f1f] flex justify-center">
            <img
              src={profile.image}
              alt="avatar"
              className="w-[140px] h-[140px] rounded-full mt-2 object-cover"
            />
          </div>

          <div className="flex flex-col p-4 text-white">
            <p>{profile.bio}</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
