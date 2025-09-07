"use client";
import { supabase } from "@/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  let router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [Id, setId] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  let logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("");
    } else {
      router.push("/auth/login");
      console.log("logout successfully");
    }
  };
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setId(session.user.id);
        } else {
          setId("");
        }
      }
    );
  }, []);

  return (
    <header>
      {/* Desktop Header */}
      <div className="hidden  md:flex justify-between items-center  md:m-30  p-2.5 md:mt-4 rounded-2xl bg-[#050a11] border border-white/20 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:hover:border-white/30">
        <div className="flex gap-2 items-center">
          <div className="text-amber-50 font-bold font-sans text-xl">
            <h1>My Blog</h1>
          </div>
          <div className="ml-4 md:ml-10">
            <Link
              href={"/"}
              className="text-amber-50 font-[400] text-[15px] font-sans hover:bg-white/10 py-2 px-3 md:px-4 rounded-xl transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href={"/about"}
              className="text-amber-50 font-[400] text-[15px] font-sans hover:bg-white/10 py-2 px-3 rounded-xl transition-colors duration-300"
            >
              About
            </Link>
            <Link
              href={"/contact"}
              className="text-amber-50 font-[400] text-[15px] font-sans hover:bg-white/10 py-2 px-3 rounded-xl transition-colors duration-300"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="flex gap-3">
          {Id ? (
            <button
              className="text-white px-3 md:px-4 py-2 rounded-xl font-[400] font-sans hover:bg-white/10 transition-all duration-300"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <button
              className="text-white px-3 md:px-4 py-2 rounded-xl font-[400] font-sans hover:bg-white/10 transition-all duration-300"
              onClick={() => router.push("/auth/login")}
            >
              Sign in
            </button>
          )}
          {Id ? (
            <button
              className="text-black bg-[#f5f6fa] px-3 md:px-4 py-2 rounded-xl font-[500] font-sans hover:bg-gray-200 transition-all duration-300 shadow-md shadow-gray-200/20 hover:shadow-amber-200/40"
              onClick={() => router.push("/create")}
            >
              Create Post
            </button>
          ) : (
            <button className="text-black bg-[#f5f6fa] px-3 md:px-4 py-2 rounded-xl font-[500] font-sans hover:bg-gray-200 transition-all duration-300 shadow-md shadow-gray-200/20 hover:shadow-amber-200/40">
              Sign up
            </button>
          )}
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center m-4 p-4 mt-5 rounded-2xl bg-[#070719] border border-white/20 shadow-2xl backdrop-blur-sm">
        <div className="text-amber-50 font-bold font-sans text-xl">
          <h1>My Blog</h1>
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-amber-50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden m-4 p-6 rounded-2xl bg-[#070719] border border-white/20 shadow-2xl backdrop-blur-sm">
          <div className="flex flex-col space-y-4">
            <Link
              href={"/"}
              className="text-amber-50 font-bold text-[15px] font-sans hover:bg-white/10 py-3 px-4 rounded-xl transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href={"/about"}
              className="text-amber-50 font-[500] text-[15px] font-sans hover:bg-white/10 py-3 px-4 rounded-xl transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href={"/contact"}
              className="text-amber-50 font-bold text-[15px] font-sans hover:bg-white/10 py-3 px-4 rounded-xl transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>

            <div className="flex flex-col space-y-3 pt-4 border-t border-white/20">
              <button className="text-white w-full py-3 rounded-xl font-[400] font-sans hover:bg-white/10 transition-all duration-300">
                Sign in
              </button>
              <button className="text-black bg-[#f5f6fa] w-full py-3 rounded-xl font-[500] font-sans hover:bg-gray-200 transition-all duration-300 shadow-md shadow-gray-200/20 hover:shadow-amber-200/40">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
