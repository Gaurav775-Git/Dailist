import React from 'react'
import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sign = ({open,setopen}) => {
    const navigate = useNavigate();
    const { login } = useAuth();

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

        // Use login function from AuthContext
        const success = await login(email, password);
         
        if (success) {
            alert("Login successful!");
            navigate("/social");
            setopen(false);
        }

        } catch (error) {
            console.log(error.response?.data || error);
            alert(error.response?.data?.message || "Something went wrong during login.");
        }
    }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) setopen(false);
      }}
    >
      <div className="w-full max-w-lg rounded-2xl p-6 bg-[#000000] border border-[#5C4E4E] shadow-lg shadow-[0_0_40px_rgba(255,255,255,0.15)]">
        <div className="flex justify-between items-center mb-4">
          <p className="text-xl font-semibold text-white">
            Login to your account
          </p>
          <button
            onClick={() => setopen(false)}
            className="text-white text-2xl hover:opacity-80 transition hover:rotate-90 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#5C4E4E]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        
        <form 
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handlelogin();
          }}
        >
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-black text-white border border-[#5C4E4E] hover:border-[#D1D0D0] focus:border-[#D1D0D0] focus:outline-none transition"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-lg bg-black text-white border border-[#5C4E4E] hover:border-[#D1D0D0] focus:border-[#D1D0D0] focus:outline-none transition"
          />
          <div className="flex justify-center pt-2">
            <button 
              type="submit"
              className="w-full py-3 rounded-full bg-white text-black font-semibold hover:opacity-90 transition active:scale-95"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Sign