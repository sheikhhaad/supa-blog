"use client";
import Navbar from "@/Component/Headers";
import HomeCard from "@/Component/HomeCard";
import { supabase } from "@/supabase";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState("");

  // Track auth state
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          setUserId(session.user.id);
        } else {
          setUserId("");
        }
      }
    );

    return () => {
      subscription?.subscription.unsubscribe();
    };
  }, []);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.from("signData").select("*");
      if (error) {
        console.error("Error fetching user data:", error.message);
      } else {
        setUserData(data);
      }
    };

    fetchUser();
  }, []);

  // Fetch blog posts
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase.from("BlogPosts").select("*");
      if (error) {
        console.error("Error fetching blog posts:", error.message);
      } else {
        setBlogPosts(data);
        console.log(data);
        
      }

    };

    fetchPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="m-30">
        <h1 className="font-sans font-[600] text-6xl">Blog</h1>
        <p className="font-sans font-[400] text-lg mt-5">
          Stay in the loop with the latest about our products
        </p>
      </div>

      <div className="mt-10 flex flex-wrap gap-6 m-30">
        {blogPosts.map((itm, indx) => (
          <div key={indx}>
            <HomeCard
              title={itm.title}
              description={itm.description}
              img={itm.image}
              date={itm.date}
              id={itm.id}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
