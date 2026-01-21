import React from "react";
import {
  FaRegComment,
  FaRetweet,
  FaHeart,
  FaShare,
  FaCheckCircle,
} from "react-icons/fa";

const posts = [
  {
    id: 1,
    user: "John Doe",
    handle: "@johndoe",
    avatar: "https://i.pravatar.cc/100?img=1",
    content: "Just launched my new project! 🚀 #React #TailwindCSS",
    image: "https://source.unsplash.com/random/800x500?tech",
    time: "2h",
    likes: 120,
    comments: 18,
    retweets: 24,
    verified: true,
  },
  {
    id: 2,
    user: "Jane Smith",
    handle: "@janesmith",
    avatar: "https://i.pravatar.cc/100?img=2",
    content: "Loving the new features in React 18. The future looks exciting.",
    image: "",
    time: "4h",
    likes: 64,
    comments: 9,
    retweets: 12,
    verified: false,
  },
  {
    id: 3,
    user: "Dev Guru",
    handle: "@devguru",
    avatar: "https://i.pravatar.cc/100?img=3",
    content: "Tailwind CSS makes building UIs insanely fast and clean.",
    image: "https://source.unsplash.com/random/800x500?code",
    time: "6h",
    likes: 210,
    comments: 32,
    retweets: 58,
    verified: true,
  },
];

const TwitterFeed = () => {
  return (
    
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-xl mx-auto border-gray-800">
        {posts.map((post) => (
          <div
            key={post.id}
            className="px-4 py-3 border-b border-gray-800 hover:bg-gray-950 transition duration-200"
          >
            {/* User Row */}
            <div className="flex gap-3">
              <img
                src={post.avatar}
                alt={post.user}
                className="w-12 h-12 rounded-full cursor-pointer"
              />

              <div className="flex-1">
                {/* Name + Handle */}
                <div className="flex items-center gap-1">
                  <span className="font-semibold hover:underline cursor-pointer">
                    {post.user}
                  </span>
                  {post.verified && (
                    <FaCheckCircle className="text-blue-500 text-sm" />
                  )}
                  <span className="text-gray-500 text-sm">
                    {post.handle} · {post.time}
                  </span>
                </div>

                {/* Content */}
                <p className="mt-1 text-[15px] leading-relaxed">
                  {post.content}
                </p>

                {/* Image */}
                {post.image && (
                  <div className="mt-3 rounded-2xl overflow-hidden border border-gray-800">
                    <img
                      src={post.image}
                      alt="post"
                      className="w-full object-cover"
                    />
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between max-w-md mt-3 text-gray-500">
                  <Action
                    icon={<FaRegComment />}
                    count={post.comments}
                    hover="hover:text-blue-400"
                  />
                  <Action
                    icon={<FaRetweet />}
                    count={post.retweets}
                    hover="hover:text-green-400"
                  />
                  <Action
                    icon={<FaHeart />}
                    count={post.likes}
                    hover="hover:text-red-400"
                  />
                  <Action
                    icon={<FaShare />}
                    hover="hover:text-blue-400"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Action = ({ icon, count, hover }) => (
  <div
    className={`flex items-center gap-2 cursor-pointer transition ${hover}`}
  >
    <div className="p-2 rounded-full hover:bg-gray-900">
      {icon}
    </div>
    {count !== undefined && (
      <span className="text-sm">{count}</span>
    )}
  </div>
);//just copy pasted the stuff to check the design flow

export default TwitterFeed;
