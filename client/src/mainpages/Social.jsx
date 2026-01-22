import React, { useState } from "react";
import Navigator from "../../components/Navigator";
import {
  Home,
  Search,
  Bell,
  Mail,
  User,
  Heart,
  Repeat2,
  MessageCircle,
  Share2,
} from "lucide-react";

const dummyPosts = [
  {
    id: 1,
    name: "Elon",
    handle: "@elonmusk",
    time: "2h",
    text: "Exciting things coming to X!",
  },
  {
    id: 2,
    name: "Dev Gaurav",
    handle: "@gauravdev",
    time: "5h",
    text: "yo",
  },
  {
    id: 3,
    name: "Open Source",
    handle: "@opensource",
    time: "1d",
    text: "Contribute to open source. It changes your career.",
  },
];

export default function Social() {
  const [postText, setPostText] = useState("");

  return (
    <div className="min-h-screen bg-black text-white flex justify-center">
      
      {/* Left Sidebar - Desktop */}
      <aside className=" hidden md:flex w-64 border-r border-gray-800 p-4 flex-col gap-6">
        <div className="text-2xl font-bold">Dailist</div>

        <NavItem icon={<Home />} label="Home" />
        <NavItem icon={<Search />} label="Explore" />
        <NavItem icon={<Bell />} label="Notifications" />
        <NavItem icon={<Mail />} label="Messages" />
        <NavItem icon={<User />} label="Profile" />

        <button className="mt-4 bg-blue-500 hover:bg-blue-600 rounded-full py-3 font-semibold">
          Spark
        </button>
      </aside>

      {/* Main Feed */}
      <main className="flex-1 max-w-2xl w-full border-r border-gray-800">
        {/* Composer */}
        <div className="p-4 border-b border-gray-800">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's happening?"
            className="w-full bg-black border border-gray-800 rounded-lg p-3 resize-none focus:outline-none focus:border-blue-500"
          />
          <div className="flex justify-end mt-2">
            <button className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-full font-semibold">
              Spark
            </button>
          </div>
        </div>

        {/* Feed */}
        {dummyPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </main>

      {/* Right Panel */}
      <aside className="hidden lg:block w-80 p-4">
        <div className="bg-gray-900 rounded-xl p-4">
          <h2 className="font-bold mb-3">Trends for you</h2>
          <Trend title="#ReactJS" posts="12.3K" />
          <Trend title="#TailwindCSS" posts="8.1K" />
          <Trend title="#WebDev" posts="22K" />
          <Trend title="#OpenSource" posts="15K" />
        </div>
      </aside>
      <Navigator/>
    </div>
  );
}
/* ---------- Sub Components ---------- */

function NavItem({ icon, label }) {
  return (
    <div className="flex items-center gap-4 text-lg cursor-pointer hover:bg-gray-900 px-3 py-2 rounded-full">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function Post({ post }) {
  return (
    <div className="p-4 border-b border-gray-800 hover:bg-gray-950 transition">
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center font-bold">
          {post.name[0]}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="font-semibold text-white">{post.name}</span>
            <span>{post.handle}</span>
            <span>· {post.time}</span>
          </div>

          <p className="mt-2">{post.text}</p>

          <div className="flex justify-between mt-3 text-gray-400 max-w-md">
            <MessageCircle className="hover:text-blue-500 cursor-pointer" />
            <Repeat2 className="hover:text-green-500 cursor-pointer" />
            <Heart className="hover:text-pink-500 cursor-pointer" />
            <Share2 className="hover:text-blue-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Trend({ title, posts }) {
  return (
    <div className="py-2 cursor-pointer hover:bg-gray-800 px-2 rounded">
      <div className="text-sm text-gray-400">Trending</div>
      <div className="font-semibold">{title}</div>
      <div className="text-sm text-gray-400">{posts} posts</div>
    </div>
  );
}