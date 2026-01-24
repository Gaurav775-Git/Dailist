import React from 'react'
import axios from "axios";
import {useState} from "react";
import { useNavigate } from "react-router-dom";
const Sign = ({open,setopen}) => {
    const navigate=useNavigate()

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

   const isStrongPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
      password,
    );
  };

    const handlelogin = async ()=>{
        try {
            if(!email || !password){
            alert("All fields are required")
            return
        }

        if(!isValidEmail(email)){
            alert("Invalid email format")
            return
        }
        
        if(!isStrongPassword(password) && password.length<8){
            alert("Password must contain uppercase, lowercase, number & symbol")
            return
        }

        const res= await axios.post("http://localhost:3000/login",{
            email,password
        },{
            withCredentials:true
        })
        console.log(email,password);
         
        if (res.status === 200){
            navigate("/social")
        }

        } catch (error) {
            console.log(error.response?.data || error);
        }
    }

  return (
    
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm ">
          <div className="w-full max-w-lg rounded-2xl p-6 bg-[#000000] shadow-lg shadow-[0_0_40px_rgba(255,255,255,0.15)]"
>
            <div className="flex justify-end">
              <button
                onClick={() => setopen(!open)}
                className="text-white text-lg hover:opacity-80"
              >
                ✕
              </button>
            </div>

            <p className="text-xl font-semibold mb-4 text-white">
              login to your account
            </p>
             <form className="space-y-3" >
               <input
                type="email"
                name="email"
                value={email}
                onChange={(e)=>setemail(e.target.value)}
                placeholder="Email"
                className="w-full px-3 py-2 rounded bg-black text-white border border-transparent hover:border-white focus:outline-none"
                     />
                <input
                type="password"
                name="password"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                placeholder="password"
                className="w-full px-3 py-2 rounded bg-black text-white border border-transparent hover:border-white focus:outline-none"
                />
                <div className="flex justify-center">
                <button 
                  type='button'
                  onClick={handlelogin}
                  className="w-1/2 mt-4 py-2 rounded-full bg-white text-black font-semibold hover:opacity-90 transition"
                >
                  submit
                </button>
              </div>

              </form>

              
          </div>
        </div>

  )
}

export default Sign