import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../sidebar/Sidebar";
import Navigator from "../../components/Navigator";
import { IoSend } from "react-icons/io5";
const Social = () => {
  const [text, settext] = useState("");
  const [post, setpost] = useState([]);
  const [user, setuser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/profile", {
        withCredentials: "include",
      })
      .then((res) => {
        console.log(res.data.profile);
        setuser(res.data.profile);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("http://localhost:3000/getuserpost", { withCredentials: "include" })
      .then((res) => {
        setpost(res.data.post);
      })
      .catch((err) => {
        console.log(err);
        alert("unable to post");
      });
  }, []);
  const submitpost = () => {
    if (!text) {
      alert("post is required");
      return;
    }
    axios
      .post(
        "http://localhost:3000/userpost",
        {
          text,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(res.data.post);
        setpost((prev) => [ res.data.post,...prev]);
        settext("");
      })
      .catch((err) => {
        console.log(err.response.data || err);
      });
  };
  return (
    <div className="max-h-screen ">
      <div className=" max-h-screen">
        <Sidebar />
      </div>
      <div className="ml-94 flex  flex-col justify-center">
        <header className="w-full sticky top-0 z-50 bg-black h-30 text-white border-b flex items-center justify-center px-4 py-3 max-w-7xl mx-auto p-2 border-gray-800">
          <div
            onClick={() => navigate("/profile")}
            className="w-12 h-12 cursor-pointer rounded-full border border-gray-600 bg-[#1f1f1f] flex items-center justify-center text-white text-xl mr-3 font-semibold shadow"
          >
            {user?.username[0].toUpperCase()}
          </div>

          <div className="w-full flex items-center gap-3 bg-[#111] px-4 py-2 rounded-full shadow-md border border-gray-800 hover:border-gray-600 transition">
            <input
              type="text"
              value={text}
              onChange={(e) => settext(e.target.value)}
              placeholder="What’s on your mind?"
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-sm"
            />

            <button
              onClick={submitpost}
              className="bg-white text-black p-2 rounded-full hover:bg-gray-300 transition flex items-center justify-center"
            >
              <IoSend size={18} />
            </button>
          </div>
        </header>
        <main className="p-4 space-y-4">
          {post.map((post) => (
            <div
              key={post._id}
              className="bg-[#111] border border-gray-800 p-4 rounded-xl"
            >
              <div className="text-sm text-gray-400">{post.userpost_id.name}</div>

              <div className="text-white mt-1">{post.text}</div>

              <div className="text-xs text-gray-500 mt-2">
                {new Date(post.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </main>

        <Navigator />
      </div>
    </div>
  );
};
export default Social;
