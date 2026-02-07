import React from "react";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import Sign from "./Sign";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, register } = useAuth();
  const [open, setopen] = useState(false);
  const [show, setshow] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/social", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);
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

    // Use register function from AuthContext
    const success = await register(data);
    
    if (success) {
      alert("Registration successful!");
      navigate("/social");
      setshow(false);
    }

    setdata({
      email: "",
      name: "",
      date: "",
      password: "",
      phone: "",
    });
  } catch (error) {
    console.log(error.response?.data || error.message);
    alert(error.response?.data?.message || "Something went wrong during registration.");
  }
}


  const handleSignUpWithApple = () => {
    alert("Apple Sign Up coming soon!");
  };

  const handleGetApp = () => {
    // You can replace this with actual app store links
    alert("App download links coming soon!");
    // window.open("https://apps.apple.com/...", "_blank"); // For iOS
    // window.open("https://play.google.com/...", "_blank"); // For Android
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#000000]">
        <div className="text-[#D1D0D0] text-xl">Loading...</div>
      </div>
    );
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
            <button 
              onClick={() => setshow(true)}
              className="w-full py-3 rounded-full bg-[#D1D0D0] text-black font-semibold hover:opacity-90 transition active:scale-95">
              Sign up
            </button>

            <button 
              onClick={handleSignUpWithApple}
              className="w-full py-3 rounded-full bg-[#D1D0D0] text-black font-semibold hover:opacity-90 transition active:scale-95 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.08-.4C5.24 18.12 4.78 13.8 7.5 13.45c1.1.07 1.9.67 2.92.67 1.01 0 1.63-.57 2.8-.57 1.18 0 1.9.55 2.8.67 1.1-.35 1.8-1.02 2.5-1.73-1.4-1.95-3.4-2.7-5.3-2.7-1.3 0-2.4.4-3.2 1.2-2.1 2.1-1.8 5.8-1.3 8.1 1.1 3.5 3.1 5.8 5.5 5.7.5 0 1-.1 1.5-.3-1.1-3.3-.4-6.5 1.5-8.7zM16 3.5c.8 1 1.2 2.3 1.1 3.6-1.1-.05-2.4-.7-3.2-1.6-.7-.8-1.3-2-1.1-3.2 1.2.1 2.4.7 3.2 1.2z"/>
              </svg>
              Sign up with Apple
            </button>

            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-[#5C4E4E]"></div>
              <span className="px-3 text-sm text-[#988686]">OR</span>
              <div className="flex-grow h-px bg-[#5C4E4E]"></div>
            </div>

            <button
              onClick={() => setshow(true)}
              className="w-full py-3 rounded-full border-2 border-[#5C4E4E] text-[#D1D0D0] hover:bg-[#5C4E4E] transition active:scale-95">
              Create account
            </button>
          </div>

          <div className="mt-10 space-y-4">
            <p className="text-[#988686] text-center">Already have an account?</p>

            <button 
              onClick={() => setopen(true)} 
              className="w-full py-3 rounded-full border-2 border-[#5C4E4E] hover:bg-[#5C4E4E] transition active:scale-95">
              Sign in
            </button>

            <button 
              onClick={handleGetApp}
              className="w-full py-3 rounded-full border-2 border-[#988686] text-[#988686] hover:bg-[#988686] hover:text-black transition active:scale-95">
              Get App
            </button>
          </div>
        </div>
      </div>
      {open && <Sign open={open} setopen={setopen} />}

      {show && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setshow(false);
          }}
        >
          <div className="w-full max-w-lg rounded-2xl p-6 bg-[#000000] border border-[#5C4E4E] shadow-lg shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold text-white">
                Create your account
              </p>
              <button
                onClick={() => setshow(false)}
                className="text-white text-2xl hover:opacity-80 transition hover:rotate-90 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#5C4E4E]"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4" onSubmit={handlesubmit}>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handlechange}
                placeholder="Name"
                required
                className="w-full px-4 py-3 rounded-lg bg-black text-white border border-[#5C4E4E] hover:border-[#D1D0D0] focus:border-[#D1D0D0] focus:outline-none transition"
              />

              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handlechange}
                placeholder="Email"
                required
                className="w-full px-4 py-3 rounded-lg bg-black text-white border border-[#5C4E4E] hover:border-[#D1D0D0] focus:border-[#D1D0D0] focus:outline-none transition"
              />

              <label className="block text-sm text-white">
                Date of birth
                <input
                  type="date"
                  name="date"
                  value={data.date}
                  onChange={handlechange}
                  required
                  className="mt-1 w-full px-4 py-3 rounded-lg bg-black text-white border border-[#5C4E4E] hover:border-[#D1D0D0] focus:border-[#D1D0D0] focus:outline-none transition"
                />
              </label>

              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handlechange}
                placeholder="Password"
                required
                className="w-full px-4 py-3 rounded-lg bg-black text-white border border-[#5C4E4E] hover:border-[#D1D0D0] focus:border-[#D1D0D0] focus:outline-none transition"
              />

              <input
                type="tel"
                onChange={handlechange}
                name="phone"
                value={data.phone}
                placeholder="Phone number"
                required
                className="w-full px-4 py-3 rounded-lg bg-black text-white border border-[#5C4E4E] hover:border-[#D1D0D0] focus:border-[#D1D0D0] focus:outline-none transition"
              />

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-white text-black font-semibold hover:opacity-90 transition active:scale-95"
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
