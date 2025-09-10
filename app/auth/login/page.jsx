"use client";

import { supabase } from "@/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaFacebook,
  FaEdit,
  FaUsers,
  FaSearch,
  FaShareAlt,
} from "react-icons/fa";

// Feature list
const features = [
  {
    title: "Easy Publishing",
    desc: "Write and publish your blogs quickly with a clean editor.",
    icon: <FaEdit className="text-blue-500 text-xl" />,
  },
  {
    title: "Community Engagement",
    desc: "Connect with readers through comments and discussions.",
    icon: <FaUsers className="text-green-500 text-xl" />,
  },
  {
    title: "Smart Search",
    desc: "Find blogs instantly with powerful search filters.",
    icon: <FaSearch className="text-purple-500 text-xl" />,
  },
  {
    title: "Social Sharing",
    desc: "Share your posts on social media with one click.",
    icon: <FaShareAlt className="text-pink-500 text-xl" />,
  },
];

const LoginPage = () => {
  const router = useRouter();
  const [emailL, setEmailL] = useState("");
  const [passL, setPassL] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: emailL,
        password: passL,
      });
      if (error) {
        alert(error.message);
      } else {
        router.push("/home");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center gap-20 font-sans min-h-screen">
      {/* Left: Features */}
      <div>
        {features.map((item, i) => (
          <div key={i} className="mb-6 flex items-start gap-3">
            <span>{item.icon}</span>
            <div>
              <h3 className="font-semibold text-[18px] text-white">
                {item.title}
              </h3>
              <p className="font-medium text-[15px] leading-6 text-gray-400">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Login Form */}
      <div>
        <form
          onSubmit={handleSubmit}
          className="border border-[#2e333e] p-8 shadow-lg w-[500px] rounded-lg space-y-4 bg-[rgb(0,0,0,0.2)]"
        >
          <h1 className="text-[40px] font-bold text-white">Sign in</h1>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#94a0b8]">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                onChange={(e) => setEmailL(e.target.value)}
                value={emailL}
                type="email"
                placeholder="your@gmail.com"
                className="p-2 pl-10 border w-full border-gray-800 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 text-sm flex justify-between font-medium text-[#94a0b8]">
              Password
              <a href="#" className="text-white underline">
                Forgot password?
              </a>
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                onChange={(e) => setPassL(e.target.value)}
                value={passL}
                type="password"
                placeholder="••••••••"
                className="p-2 pl-10 border w-full bg-black text-white border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Remember */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center font-bold gap-2 text-white">
              <input type="checkbox" className="accent-gray-600 bg-gray-800" />
              Remember me
            </label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
          >
            Sign in
          </button>

          {/* Signup redirect */}
          <p className="text-white text-center mt-2">
            Don't have an account?{" "}
            <a href="/auth/signup" className="underline font-[500]">
              Signup
            </a>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="text-sm text-gray-400">or</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          {/* Social login */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-600 text-white rounded-lg py-2 hover:bg-gray-800 transition"
            >
              <FaGoogle className="text-red-500" />
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-600 text-white rounded-lg py-2 hover:bg-gray-800 transition"
            >
              <FaFacebook className="text-blue-500" />
              Continue with Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
