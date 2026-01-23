import React from "react";
import { useState } from "react";
import axios from "axios"; 
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const navigate=useNavigate()
  const [show, setshow] = useState(false);
  const [data, setdata] = useState({
    email: "",
    name: "",
    date: "",
    password: "",
    phone: "",
  });

  const handlechange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  const isValidPhone = (phone) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const isStrongPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
      password,
    );
  };
  const isValidName = (name) => {
    return /^[A-Za-z ]+$/.test(name);
  };
  const isAdult = (date) => {
    const dob = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    return age >= 18;
  };

 const handlesubmit = async (e) => {
  e.preventDefault()

  try {
    
    if (!data.name || !data.email || !data.password || !data.phone || !data.date) {
      alert("All fields are required")
      return
    }

    if (!isValidName(data.name)) {
      alert("Name should contain only letters")
      return
    }

    if (!isValidEmail(data.email)) {
      alert("Invalid email format")
      return
    }

    if (!isStrongPassword(data.password)) {
      alert("Password must contain uppercase, lowercase, number & symbol")
      return
    }

    if (!isValidPhone(data.phone)) {
      alert("Phone must be 10 digits")
      return
    }

    if (!isAdult(data.date)) {
      alert("You must be at least 18 years old")
      return
    }


    const res = await axios.post(
      "http://localhost:3000/register",
      data,{
        withCredentials: true
      }
    )
    
    if(res.status === 200){
      navigate("/social")
    }
  
    setdata({
      email: "",
      name: "",
      date: "",
      password: "",
      phone: "",
    })

  } catch (error) {
    console.log(error.response?.data || error.message)
    alert("Something went wrong")
  }
}


  return (
    <div className="min-h-screen flex bg-[#000000] text-[#D1D0D0]">
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <h1 className="text-[260px] font-extrabold text-[#D1D0D0]">D</h1>
      </div>

      <div className="w-full md:w-1/2 flex items-center px-10">
        <div className="max-w-md w-full">
          <h1 className="text-6xl font-extrabold mb-6">join us today</h1>

          <h2 className="text-3xl font-bold mb-10">
            to enhance your productivity .
          </h2>

          <div className="space-y-4">
            <button className="w-70 py-2 rounded-full bg-[#D1D0D0] text-black font-semibold hover:opacity-90 transition">
              Sign up
            </button>

            <button className="w-70 py-2 rounded-full bg-[#D1D0D0] text-black font-semibold hover:opacity-90 transition">
              Sign up with Apple
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-[#5C4E4E]"></div>
              <span className="px-3 text-sm text-[#988686]">OR</span>
              <div className="flex-grow h-px bg-[#5C4E4E]"></div>
            </div>

            <button
              onClick={() => setshow(!show)}
              className="w-70 py-2 rounded-full border border-[#5C4E4E] text-[#D1D0D0] hover:bg-[#5C4E4E] transition"
            >
              Create account
            </button>
          </div>

          <div className="mt-10 space-y-4">
            <p className="text-[#988686]">Already have an account?</p>

            <button className="w-70 py-2 rounded-full border border-[#5C4E4E] hover:bg-[#5C4E4E] transition">
              Sign in
            </button>

            <button className="w-70 py-2 rounded-full border border-[#988686] text-[#988686] hover:bg-[#988686] hover:text-black transition">
              Get App
            </button>
          </div>
        </div>
      </div>

      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl p-6 bg-[#000000]">
            <div className="flex justify-end">
              <button
                onClick={() => setshow(false)}
                className="text-white text-lg hover:opacity-80"
              >
                ✕
              </button>
            </div>

            <p className="text-xl font-semibold mb-4 text-white">
              Create your account
            </p>

            <form className="space-y-3" onSubmit={handlesubmit}>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handlechange}
                placeholder="Name"
                className="w-full px-3 py-2 rounded bg-black text-white border border-transparent hover:border-white focus:outline-none"
              />

              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handlechange}
                placeholder="Email"
                className="w-full px-3 py-2 rounded bg-black text-white border border-transparent hover:border-white focus:outline-none"
              />

              <label className="block text-sm text-white">
                Date of birth
                <input
                  type="date"
                  name="date"
                  value={data.date}
                  onChange={handlechange}
                  className="mt-1 w-full px-3 py-2 rounded bg-black text-white border border-transparent hover:border-white focus:outline-none"
                />
              </label>

              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handlechange}
                placeholder="Password"
                className="w-full px-3 py-2 rounded bg-black text-white border border-transparent hover:border-white focus:outline-none transition "
              />

              <input
                type="number"
                onChange={handlechange}
                name="phone"
                value={data.phone}
                placeholder="Phone number"
                className="w-full px-3 py-2 rounded bg-black text-white border border-transparent hover:border-white focus:outline-none"
              />

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/2 mt-4 py-2 rounded-full bg-white text-black font-semibold hover:opacity-90 transition"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
