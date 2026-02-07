import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { Commet } from "react-loading-indicators";
import { MdOutlineFileUpload } from "react-icons/md";
import Navigator from "../../components/Navigator";
import Editbio from "./Editbio";
import Heatmap from "./heatmapsec/Heatmap";
import Tasksec from "./tasksection/Tasksec";
import Addtask from "../../components/Addtask";
import Notify from "../profile/notification/Notify"

import { Function } from "./Function";
const Profile = () => {
  const colortoken = "bg-[#000000]";
  const [userprofile, setuserProfile] = useState(null);
  const [image, setimage] = useState(null);
  const [quote, setquote] = useState("");
  const [editbio, seteditbio] = useState(false);

  const clicked = Function((state) => state.clicked);
  const open = Function((state) => state.open);

  useEffect(() => {
    axios
      .get("http://localhost:3000/profile", {
        withCredentials: "include",
      })
      .then((res) => {
        console.log(res.data.profile);
        setuserProfile(res.data.profile);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!userprofile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Commet color="#101010" size="medium" />
      </div>
    );
  }

  const handleimageupload = async () => {
    if (!image) {
      alert("Image is required");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:3000/upload_image",
        formData,
        { withCredentials: true },
      );

      setuserProfile((prev) => ({
        ...prev,
        image: res.data.image,
      }));

      console.log(res.data.image);
      alert("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  const submitquote = async () => {
    try {
      if (!quote && quote.length > 10) {
        alert("Quote is required or more than 10 characters");
        return;
      }
      const res = await axios.post(
        "http://localhost:3000/updatequote",
        { quote },
        { withCredentials: true },
      );

      setuserProfile((prev) => ({
        ...prev,
        bio: res.data.bio,
      }));
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <Sidebar />

      <div
        className={`flex-1 ${colortoken} flex flex-col border-r  ml-72 overflow-hidden border-gray-700 bg-black`}
      >
        <header className="flex items-center p-2 border-b border-gray-700 text-white">
          <FaArrowLeft className="cursor-pointer mx-4 w-5 h-5" />

          <div className="flex flex-col px-3">
            <span className="text-[19px]">{userprofile.username}</span>
            <span className="text-[12px] text-gray-400">Streak</span>
          </div>

          <div className="flex flex-end mx-5">
            <Notify/>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto  overflow-x-hidden">
          <div className="h-40 w-full border-b border-gray-700 bg-[#1f1f1f] flex justify-center items-center">
            <label className="relative w-[140px] h-[140px] rounded-full bg-gray-600 flex items-center justify-center cursor-pointer">
              {userprofile.image ? (
                <img
                  src={userprofile.image}
                  alt="avatar"
                  className="w-[140px] h-[140px] rounded-full object-cover border-2 border-gray-500"
                />
              ) : (
                <span className="text-white text-5xl font-semibold">
                  {userprofile.username?.[0]?.toUpperCase()}
                </span>
              )}

              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setimage(e.target.files[0])}
              />

              <div
                onClick={handleimageupload}
                className="absolute bottom-2 right-2 bg-black/70 p-2 rounded-full text-white cursor-pointer"
              >
                <MdOutlineFileUpload />
              </div>
            </label>
          </div>

          <div className="flex justify-center p-4 text-white">
            {userprofile.bio ? (
              <div className="relative w-full max-w-2xl bg-transparent border border-gray-700 rounded-xl p-5 group hover:border-blue-500 transition">
                <p className="text-gray-300 leading-relaxed min-h-[60px]">
                  {userprofile.bio}
                </p>

                <button
                  onClick={() => seteditbio(true)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition bg-gray-800 hover:bg-blue-600 p-2 rounded-full"
                  title="Edit Bio"
                >
                  ✏️
                </button>

                {editbio && (
                  <Editbio
                    currentBio={userprofile.bio}
                    close={() => seteditbio(false)}
                    info={setuserProfile}
                  />
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3 w-full max-w-2xl bg-transparent border-b border-gray-600 p-3">
                <input
                  type="text"
                  value={quote}
                  placeholder="Write something that inspires others..."
                  onChange={(e) => setquote(e.target.value)}
                  className="w-full bg-transparent text-white outline-none"
                />

                <button onClick={submitquote}>
                  <MdOutlineFileUpload className="w-6 h-6" />
                </button>
              </div>
            )}

            {open && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="relative">
                  <Addtask onClose={clicked} />
                </div>
              </div>
            )}
          </div>

          <div className="w-full flex item-center justify-center">
            <Heatmap />
          </div>
          <div className="flex w-full">
            <div className="w-3/5 flex justify-center">
              <h1 className="text-white text-2xl font-bold">All Tasks</h1>
              
            </div>

            <div className="w-2/5 flex justify-center">
              <Tasksec />
            </div>
          </div>
          <div className="relative w-full flex justify-center items-center">
            <Navigator />
          </div>
        </main>
        
      </div>
      
    </div>
  );
};

export default Profile;
