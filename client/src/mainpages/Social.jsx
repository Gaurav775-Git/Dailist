import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Sidebar from "../sidebar/Sidebar";
import Navigator from "../../components/Navigator";
import { IoClose, IoImageOutline } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { MdTag } from "react-icons/md";
import { OrbitProgress } from "react-loading-indicators";
import socket from '../socket.io.js';

const Social = () => {
  const [text, settext] = useState("");
  const [post, setpost] = useState([]);
  const [user, setuser] = useState(null);
  const [loader, setloader] = useState(false);
  const [message , setmessage] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showTagInput, setShowTagInput] = useState(false);
  const emojiPickerRef = useRef(null);
  const tagInputRef = useRef(null);
  const navigate = useNavigate();

  const emojis = [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
    "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
    "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩",
    "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "😣", "😖",
    "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯",
    "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔",
    "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦",
    "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴",
    "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈", "👿",
    "👹", "👺", "🤡", "💩", "👻", "💀", "☠️", "👽", "👾", "🤖",
    "🎃", "😺", "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾"
  ];


  useEffect(() => {

    setloader(true);
    api
      .get('/profile')
      .then((res) => {
        setuser(res.data.profile);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .get('/getuserpost')
      .then((res) => {
        setpost(res.data.post);
        setloader(false);
      })
      .catch((err) => {
        console.log(err);
        setloader(false);
      });
  }, []);

  const countWords = (str) => {
    return str.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const addEmoji = (emoji) => {
    settext((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      setShowTagInput(false);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Escape") {
      setShowTagInput(false);
      setTagInput("");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    settext("");
    setTags([]);
    setTagInput("");
    setShowEmojiPicker(false);
    setShowTagInput(false);
  };

  const submitpost = () => {
    setloader(true);
    if (!text.trim()) {
      alert("post is required");
      setloader(false);
      return;
    }

    const wordCount = countWords(text);
    if (wordCount > 100) {
      alert("Post cannot exceed 100 words");
      setloader(false);
      return;
    }

    const postText = tags.length > 0 
      ? `${text} ${tags.map(tag => `#${tag}`).join(' ')}`
      : text;

    api
      .post('/userpost', { text: postText })
      .then((res) => {
        const newPost = res.data.fullpost;
        socket.emit("sendPost", newPost);

        setpost((prev) => [newPost, ...prev]);
        closeModal();
        setloader(false); 
      })
      .catch((err) => {
        console.log(err.response?.data || err);
        alert(err.response?.data?.message || "Failed to create post.");
        setloader(false);
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
      if (tagInputRef.current && !tagInputRef.current.contains(event.target)) {
        setShowTagInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
  socket.on("receivePost", (newPost) => {
    setpost((prev) => [newPost, ...prev]);
  });

  return () => {
    socket.off("receivePost");
  };
}, []);


  if (loader) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <OrbitProgress color="#ffffff" size="medium" text="" textColor="" />
      </div>
    );
  }

return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="lg:ml-80 md:ml-60 flex flex-col w-full md:w-auto">
        <header className="w-full sticky top-0 z-50 bg-black border-b border-gray-800 flex items-center px-3 sm:px-4 py-3 gap-2 sm:gap-3">
          <div
            onClick={() => navigate("/profile")}
            className="w-10 h-10 sm:w-12 sm:h-12 cursor-pointer rounded-full border border-gray-600 bg-[#1f1f1f] flex items-center justify-center text-white text-lg sm:text-xl mr-1 sm:mr-3 font-semibold shadow flex-shrink-0"
          >
            {user?.username?.[0]?.toUpperCase()}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center gap-2 sm:gap-3 bg-[#111] px-3 sm:px-4 py-2 sm:py-3 rounded-full shadow-md border border-gray-800 hover:border-gray-600 transition text-left"
          >
            <span className="text-gray-400 text-xs sm:text-sm truncate">What's on your mind?</span>
          </button>
        </header>

        <main className="w-full flex flex-col items-center px-2 sm:px-4 py-4 space-y-3 sm:space-y-4 pb-20 md:pb-4">
          <div className="w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl space-y-3 sm:space-y-4">
            {post.map((post) => (
              <div
                key={post._id}
                className="bg-[#0f0f0f] border border-gray-800 p-3 sm:p-4 rounded-lg sm:rounded-xl"
              >
                <div className="text-xs sm:text-sm text-gray-400 truncate">
                  {post.userpost_id?.name}
                </div>

                <div className="text-white mt-2 text-sm sm:text-base break-words">{post.text}</div>

                <div className="text-xs text-gray-500 mt-2">
                  {new Date(post.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </main>

        <div className="fixed bottom-0 left-0 right-0 md:static relative w-full flex justify-center items-center md:pb-4">
          <Navigator />
        </div>
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-black border border-gray-800 rounded-xl sm:rounded-2xl w-full h-[85vh] sm:h-auto sm:max-h-[90vh] max-w-xs sm:max-w-lg md:max-w-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-800 flex-shrink-0">
              <button
                onClick={closeModal}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-900 transition flex-shrink-0"
              >
                <IoClose size={20} className="text-white" />
              </button>
              <button
                onClick={submitpost}
                disabled={!text.trim() || countWords(text) > 100}
                className="bg-white text-black px-4 sm:px-6 py-2 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white flex-shrink-0"
              >
                Post
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-600 bg-[#1f1f1f] flex items-center justify-center text-white text-lg sm:text-xl font-semibold flex-shrink-0">
                  {user?.username?.[0]?.toUpperCase()}
                </div>

                <div className="flex-1 w-full">
                  <textarea
                    value={text}
                    onChange={(e) => {
                      const newText = e.target.value;
                      const wordCount = countWords(newText);
                      if (wordCount <= 100) {
                        settext(newText);
                      }
                    }}
                    placeholder="What's happening?"
                    className="w-full bg-transparent text-white placeholder-gray-500 text-base sm:text-lg resize-none outline-none min-h-[120px] sm:min-h-[150px]"
                    rows={6}
                  />

                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 mb-3">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                        >
                          #{tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="hover:text-blue-300"
                          >
                            <IoClose size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between mt-4 pt-4 border-t border-gray-800 gap-3 sm:gap-0">
                    <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <div className="relative" ref={emojiPickerRef}>
                        <button
                          onClick={() => {
                            setShowEmojiPicker(!showEmojiPicker);
                            setShowTagInput(false);
                          }}
                          className="text-blue-400 hover:text-blue-300 transition p-2 rounded-full hover:bg-gray-900 flex-shrink-0"
                        >
                          <BsEmojiSmile size={20} />
                        </button>

                        {showEmojiPicker && (
                          <div className="absolute bottom-full left-0 mb-2 bg-[#1f1f1f] border border-gray-700 rounded-xl p-2 sm:p-3 w-56 sm:w-64 h-40 sm:h-48 overflow-y-auto z-10 shadow-2xl">
                            <div className="grid grid-cols-7 sm:grid-cols-8 gap-1 sm:gap-2">
                              {emojis.map((emoji, index) => (
                                <button
                                  key={index}
                                  onClick={() => addEmoji(emoji)}
                                  className="text-xl sm:text-2xl hover:bg-gray-700 rounded p-1 transition"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="relative" ref={tagInputRef}>
                        <button
                          onClick={() => {
                            setShowTagInput(!showTagInput);
                            setShowEmojiPicker(false);
                          }}
                          className="text-blue-400 hover:text-blue-300 transition p-2 rounded-full hover:bg-gray-900 flex-shrink-0"
                        >
                          <MdTag size={20} />
                        </button>

                        {showTagInput && (
                          <div className="absolute bottom-full left-0 mb-2 bg-[#1f1f1f] border border-gray-700 rounded-xl p-3 z-10 shadow-2xl min-w-[200px]">
                            <input
                              type="text"
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyPress={handleTagKeyPress}
                              placeholder="Add tag (press Enter)"
                              className="w-full bg-transparent text-white placeholder-gray-500 outline-none border-b border-gray-700 pb-2 mb-2 text-sm"
                              autoFocus
                            />
                            <button
                              onClick={addTag}
                              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1 rounded-lg text-sm transition"
                            >
                              Add Tag
                            </button>
                          </div>
                        )}
                      </div>

                      <button className="text-blue-400 hover:text-blue-300 transition p-2 rounded-full hover:bg-gray-900 flex-shrink-0">
                        <IoImageOutline size={20} />
                      </button>
                    </div>

                    <div className={`text-xs sm:text-sm whitespace-nowrap ${countWords(text) > 100 ? 'text-red-500' : countWords(text) > 80 ? 'text-yellow-500' : 'text-gray-500'}`}>
                      {countWords(text)}/100 words
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Social;
