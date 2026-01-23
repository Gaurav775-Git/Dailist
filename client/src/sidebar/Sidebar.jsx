import React from "react";
import { NavLink } from "react-router-dom";
import { FaGlobeAmericas } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { PiChatsTeardropLight } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { GiGlowingArtifact } from "react-icons/gi";
import { LuSwords } from "react-icons/lu";

const Sidebar = () => {
  const colortoken = "bg-[#000000]";

  const linkClass = ({ isActive }) =>
    `flex items-center justify-end w-full pr-29  py-3 text-xl transition 
     ${isActive ? "bg-[#1f1f1f] text-white" : "text-[#D1D0D0] hover:bg-[#1a1a1a]"}`;

  return (
    <div className={`h-screen w-94 ${colortoken} flex flex-col fixed left-0 top-0`}>

      
      <div className="h-16 flex items-center justify-center text-xl text-white border-b border-gray-700">
        <LuSwords  className="mr-3 text-2xl w-10 h-10"/>
      </div>

  
      <div className="flex-1 flex flex-col  pt-4 space-y-2">
        <NavLink to="/social" className={linkClass}>
          <FaGlobeAmericas className="mr-3 text-2xl" />
          Social
        </NavLink>

        <NavLink to="/search" className={linkClass}>
          <IoIosSearch className="mr-3 text-2xl" />
          Search
        </NavLink>

        <NavLink to="/chats" className={linkClass }>
          <PiChatsTeardropLight className="mr-3 text-2xl" />
          Chats
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          <CgProfile className="mr-3 text-2xl" />
          Profile
        </NavLink>

        <NavLink to="/aitask" className={linkClass}>
          <GiGlowingArtifact className="mr-3 text-2xl" />
          AI Task
        </NavLink>
      </div>

     
      <div className="py-4 pr-5 flex justify-end ">
        <button className="w-3/5 h-12 bg-[#D1D0D0] rounded-3xl text-black text-lg hover:bg-white transition">
          Today Task
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
