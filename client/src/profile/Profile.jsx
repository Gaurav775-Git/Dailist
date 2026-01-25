import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { Commet } from "react-loading-indicators";
import { MdOutlineFileUpload } from "react-icons/md";
import Navigator from "../../components/Navigator";
const Profile = () => {
  const colortoken = "bg-[#000000]";
  const [userprofile, setuserProfile] = useState(null);
  const [image, setimage] = useState(null);

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

  return (
    <div className="ml-94 flex h-screen">
      <Sidebar />

      <div
        className={`flex-1 ${colortoken} flex flex-col border-r border-gray-700`}
      >
        <header className="flex items-center p-2 border-b border-gray-700 text-white">
          <FaArrowLeft className="cursor-pointer mx-4 w-5 h-5" />

          <div className="flex flex-col px-3">
            <span className="text-[19px]">{userprofile.username}</span>
            <span className="text-[12px] text-gray-400">Streak</span>
          </div>
        </header>

        <main className="h-screen w-full">
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
            <div className="flex items-center gap-3 w-full max-w-2xl bg-[#1f1f1f] p-3 rounded-xl">
              <input
                type="text"
                placeholder="Write something that inspires others..."
                className="flex-1 bg-transparent text-white outline-none border-b border-gray-600 focus:border-white transition px-2 py-1"
              />

              <button type="button">
                <label className="cursor-pointer hover:bg-gray-700 p-2 rounded-full transition">
                  <MdOutlineFileUpload className="w-6 h-6 text-white" />
                </label>
              </button>
            </div>
          </div>
          <div></div>
        </main>
      </div>
      <Navigator />
    </div>
  );
};

export default Profile;
