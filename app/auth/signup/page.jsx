"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../../../supabase";
import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaFacebook,
  FaGithub,
  FaEdit,
  FaUsers,
  FaSearch,
  FaShareAlt,
} from "react-icons/fa";

const features = [
  {
    title: "Easy Publishing",
    desc: "Share your ideas with a simple and clean editor.",
    icon: <FaEdit className="text-blue-500 text-xl" />,
  },
  {
    title: "Join the Community",
    desc: "Engage with other writers and readers.",
    icon: <FaUsers className="text-green-500 text-xl" />,
  },
  {
    title: "Quick Search",
    desc: "Discover blogs easily with smart filters.",
    icon: <FaSearch className="text-purple-500 text-xl" />,
  },
  {
    title: "Share Everywhere",
    desc: "Post your content on social platforms instantly.",
    icon: <FaShareAlt className="text-pink-500 text-xl" />,
  },
];

const SignupPage = () => {
  let router = useRouter();

  const [emailS, setEmailS] = useState("");
  const [NameS, setNameS] = useState("");
  const [passS, setpassS] = useState("");
  const [confirmpassS, setconfirmpassS] = useState("");
  let onsubmit = async (e) => {
    e.preventDefault();

    if (passS !== confirmpassS) {
      alert("Passwords do not match");
      return;
    } else if (!emailS || !passS || !confirmpassS || !NameS) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: emailS,
          password: passS,
        });

      if (signUpError) {
        console.log("Signup error:", signUpError.message);
        return;
      }

      const userId = signUpData?.user?.id;

      if (userId) {
        const signData = {
          userid: userId,
          username: NameS,
        };

        const { data: insertData, error: insertError } = await supabase
          .from("signData") // Table name
          .insert(signData);

        if (insertError) {
          console.error("Error inserting user data:", insertError.message);
        } else {
          console.log("User data inserted successfully:", insertData);
        }

        // Redirect to login page
        router.push("/auth/login");
      }
    } catch (err) {
      console.log("Unexpected error:", err);
    }
  };

  return (
    <div className="flex justify-center flex-wrap  items-center gap-20 font-sans min-h-screen">
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

      {/* Right: Form */}
      <div className="flex items-center justify-center  ">
        <form
          className="border border-[#2e333e] p-8 shadow-lg w-[500px] rounded-lg space-y-4 bg-[rgb(0,0,0,0.2)]"
          onSubmit={onsubmit}
        >
          <h1 className="text-[40px] font-bold text-white">Sign up</h1>

          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#94a0b8]">
              Username
            </label>
            <div className="relative">
              <FaUsers className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                onChange={(e) => setNameS(e.target.value)}
                value={NameS}
                required
                type=""
                placeholder="Enter your username"
                className="p-2 pl-10 border w-full border-gray-800 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#94a0b8]">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                onChange={(e) => setEmailS(e.target.value)}
                value={emailS}
                required
                type="email"
                placeholder="your@gmail.com"
                className="p-2 pl-10 border w-full border-gray-800 bg-black text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#94a0b8]">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                onChange={(e) => setpassS(e.target.value)}
                value={passS}
                required
                type="password"
                placeholder="Create a password"
                className="p-2 pl-10 border w-full bg-black text-white border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block mb-2 text-sm font-medium text-[#94a0b8]">
              Confirm Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                onChange={(e) => setconfirmpassS(e.target.value)}
                value={confirmpassS}
                type="password"
                placeholder="Re-enter your password"
                className="p-2 pl-10 border w-full bg-black text-white border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center text-sm text-white">
            <input
              type="checkbox"
              className="accent-gray-600 bg-gray-800 mr-2"
            />
            I agree to the Terms & Conditions
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-lg hover:bg-gray-700 hover:text-white transition"
          >
            Sign up
          </button>

          <p className="text-white text-center block mt-0.5 mb-0.5">
            Already have an account?{" "}
            <a href="/auth/login" className="underline font-[500]">
              Sign in
            </a>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <hr className="flex-grow border-gray-600" />
            <span className="text-sm text-gray-400">or</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          {/* Social signup */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-600 text-white rounded-lg py-2 hover:bg-gray-800 transition"
            >
              <FaGoogle className="text-red-500" />
              Sign up with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-600 text-white rounded-lg py-2 hover:bg-gray-800 transition"
            >
              <FaFacebook className="text-blue-500" />
              Sign up with Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
