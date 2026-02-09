import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
const EditBio = ({ currentBio, close ,info}) => {
  const navigate=useNavigate()
  const [quote, setquote] = useState(currentBio);

  const submit = async() => {
    if(!quote){
      alert("bio is required")
      return
    }

    const res=await api.post('/updatequote', { quote })

      if(res.status===200){
        navigate("/social")
      }
      
      info((prev)=>({...prev,bio:res.data.bio}))
    
  };

  return (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
    
    <div className="w-[90%] max-w-md bg-[#1f1f1f] p-6 rounded-xl shadow-xl animate-fadeIn">

      <h2 className="text-xl font-semibold mb-4 text-white">
        Edit Bio
      </h2>

      <textarea
        value={quote}
        onChange={(e) => setquote(e.target.value)}
        className="w-full h-32 bg-transparent border border-gray-600 rounded-md p-3 text-white focus:outline-none focus:border-blue-500"
        placeholder="Write something about yourself..."
      />

      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={close}
          className="px-4 py-2 rounded-md text-gray-400 hover:bg-gray-700"
        >
          Cancel
        </button>

        <button
          onClick={submit}
          className="px-5 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
        >
          Update
        </button>
      </div>

    </div>
  </div>
);

};

export default EditBio;
