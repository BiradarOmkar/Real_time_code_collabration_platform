import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'
import { useAuthStore } from "../store/AuthStore";

function RightAuth() {
  const [toggle, settoggle] = useState(false); 
  return (
    <div className="w-full flex flex-col ">
      {/* toggle */}
      <div className="flex gap-4 mb-6 justify-start">
        <button
          onClick={() => settoggle(true)}
          className={`px-6 py-2 rounded-lg font-medium transition cursor-pointer
      ${
        toggle
          ? "bg-blue-600 text-white shadow-md"
          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
      }`}
        >
          Login
        </button>

        <button
          onClick={() => settoggle(false)}
          className={`px-6 py-2 rounded-lg font-medium transition cursor-pointer
      ${
        !toggle
          ? "bg-blue-600 text-white shadow-md"
          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
      }`}
        >
          Sign Up
        </button>
      </div>
      {/* form */}
      <div>
        {toggle ? (
          <Login settoggle={settoggle} />
        ) : (
          <Register settoggle={settoggle} />
        )}
      </div>
    </div>
  );
}

function Login({ settoggle }) {
   const setUser=useAuthStore((state)=>state.setUser)   
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  // handle onchange
  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  //    handle submit

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (res.status == 404) {
        toast.error(`${data.message}`)
        // alert(`${data.message}`);
        return;
      }else if(res.status==400){
        toast.error("Invalid Credentials")
        return
      }
       setUser(data.user);
       console.log(data.user);
      console.log(data.user.role);
      if (data.user.role === "candidate") navigate("/candidateDashboard");
      else if (data.user.role === "interviewer") navigate("/interviewerDashboard");
    // store user details in state
       toast.success("Successfully Logged In")
    } catch (e) {
      console.log(e);
    }
    console.log(formdata);
  };

  return (
    <div className=" w-full mx-auto p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Welcome Back !!!</h2>

        <p className="text-sm text-gray-600 mt-2">
          don't have account ?{" "}
          <button
            className="text-blue-600 font-medium hover:underline"
            onClick={() => settoggle(false)}
          >
            Sign in
          </button>
        </p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={handlechange}
            placeholder="Enter your email"
            className="px-4 py-3 rounded-xl border border-gray-300 
                       focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500
                       transition-all duration-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            name="password"
            type="password"
            value={formdata.password}
            onChange={handlechange}
            placeholder="Enter your password"
            className="px-4 py-3 rounded-xl border border-gray-300 
                       focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500
                       transition-all duration-200"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 
                   text-white font-semibold rounded-xl 
                   transition-all duration-200 
                   shadow-md hover:shadow-lg cursor-pointer"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  );
}

// register componenet

function Register({ settoggle }) {
  const [role, setRole] = useState(null);
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
    user_name: "",
    role: '',
  });
  //   handle change
  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
         const res=await fetch('http://localhost:5000/api/auth/register',
            {
                method:"POST",
                headers:{
                 "content-Type": "application/json",
                },
                credentials: "include",
                body:JSON.stringify(formdata)
            }   
         )
         const data=await res.json()
         console.log(data);
         toast.success("Successfully Created Account")
         settoggle(true)
         
    }catch(e){
          console.log("Error",e);
    }
    // console.log("Successfully Created Account");
    // console.log(formdata);
  };
  return (
    <div className=" w-full mx-auto p-8 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>

        <p className="text-sm text-gray-600 mt-2">
          Already have an account?{" "}
          <button
            className="text-blue-600 font-medium hover:underline"
            onClick={() => settoggle(true)}
          >
            Sign in
          </button>
        </p>
      </div>

      {/* Role Selection */}
      <div className="flex justify-between gap-4">
        {/* Candidate */}
        <div
          onClick={() => {
            setRole("candidate");
            setformdata((prev) => ({
              ...prev,
              role: "candidate",
            }));
            console.log(role);
          }}
          className={`flex flex-col items-center text-center 
            p-6 flex-1 rounded-2xl cursor-pointer
            transition-all duration-300
            ${
              role === "candidate"
                ? "bg-blue-100 ring-2 ring-blue-500 shadow-md"
                : "bg-blue-50 hover:bg-blue-100 hover:shadow-md hover:scale-105"
            }`}
        >
          <div className="text-3xl mb-2">🧑‍💻</div>
          <h6 className="font-semibold">Candidate</h6>
          <p className="text-xs text-gray-600 mt-1">I am here to interview</p>
        </div>

        {/* Interviewer */}
        <div
          onClick={() => {
            setRole("interviewer");
            setformdata((prev) => ({
              ...prev,
              role: "interviewer",
            }));
            console.log(role);
          }}
          className={`flex flex-col items-center text-center 
            p-6 flex-1 rounded-2xl cursor-pointer
            transition-all duration-300
            ${
              role === "interviewer"
                ? "bg-blue-100 ring-2 ring-blue-500 shadow-md"
                : "bg-blue-50 hover:bg-blue-100 hover:shadow-md hover:scale-105"
            }`}
        >
          <div className="text-3xl mb-2">🧑‍💼</div>
          <h6 className="font-semibold">Interviewer</h6>
          <p className="text-xs text-gray-600 mt-1">I am here to hire</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">User Name</label>
          <input
            name="user_name"
            value={formdata.user_name}
            onChange={handlechange}
            type="text"
            placeholder="Enter your name"
            className="px-4 py-3 rounded-xl border border-gray-300 
                       focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500
                       transition-all duration-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formdata.email}
            onChange={handlechange}
            placeholder="Enter your email"
            className="px-4 py-3 rounded-xl border border-gray-300 
                       focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500
                       transition-all duration-200"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={handlechange}
            placeholder="Enter your password"
            className="px-4 py-3 rounded-xl border border-gray-300 
                       focus:outline-none 
                       focus:ring-2 focus:ring-blue-500 
                       focus:border-blue-500
                       transition-all duration-200"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 
                   text-white font-semibold rounded-xl 
                   transition-all duration-200 
                   shadow-md hover:shadow-lg"
        onClick={handleSubmit}
      >
        Create Account
      </button>

    </div>
  );
}

export default RightAuth;
