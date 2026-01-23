import React from 'react'
import Sidebar from '../sidebar/Sidebar'
const Social = () => {
  return (
    <div className='flex max-h-screen '>
      <div className=' max-h-screen'>
        <Sidebar/>
      </div>
      Social</div>
  )
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