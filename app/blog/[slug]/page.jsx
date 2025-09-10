"use client";
import { supabase } from "@/supabase";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Page = () => {
  const { slug } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("BlogPosts")
        .select("*")
        .eq("id", slug); // slug ke match wali rows sab aaengi

      if (error) {
        console.error("Error fetching blogs:", error);
      } else {
        setBlogs(data);
      }
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  return (
    <div>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div
            key={blog.id}
            className="border p-4 my-2 rounded-md shadow-md bg-white"
          >
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            <p className="text-gray-600">{blog.description}</p>
            <p className="text-sm text-gray-400">{blog.date}</p>
          </div>
        ))
      ) : (
        <p>No blogs found</p>
      )}
    </div>
  );
};

export default Page;
