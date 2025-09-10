"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/Component/Headers";
import { supabase } from "@/supabase";

const ImageUploadPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [userId, setUserId] = useState("");
  const [posts, setPosts] = useState([]);
  const fileInputRef = useRef(null);

  // Drag & Drop
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
      } else {
        alert("Please upload an image file");
      }
    }
  }, []);

  // File input select
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      description,
      Id: userId,
      date: new Date().toLocaleDateString(),
    };

    const { data, error } = await supabase.from("BlogPosts").insert(newPost);

    if (error) {
      console.error("Insert error:", error.message);
    } else {
      setPosts((prev) => [...prev, newPost]);
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Fetch userId
  useEffect(() => {
    const fetchId = async () => {
      const { data, error } = await supabase.from("signData").select("userid");
      if (error) {
        console.error("Error fetching user id:", error.message);
      } else if (data && data.length > 0) {
        setUserId(data[0].userid);
      }
    };

    fetchId();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-2xl mx-auto bg-[rgb(0,0,0,0.4)] border border-[#2e333e] rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-sans font-bold text-[#94a0b8] mb-2">
              Create Blog Post
            </h1>
            <p className="text-gray-600 mb-8 font-sans">
              Add a title, description, and image to create your content
            </p>

            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-[#94a0b8] mb-1"
                >
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Enter a title"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-[#94a0b8] mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="Enter a description"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#94a0b8] mb-1">
                  Image
                </label>

                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
                  ${
                    isDragging
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-800 hover:border-indigo-400"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                  />

                  {preview ? (
                    <div className="relative">
                      <div className="w-full h-64 relative mb-4">
                        <Image
                          src={preview}
                          alt="Preview"
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveImage();
                        }}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-gray-700 font-medium">
                        Drag and drop an image here
                      </p>
                      <p className="text-gray-500 text-sm">or click to browse</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-800 font-sans rounded-lg text-[#94a0b8] hover:bg-white transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 font-sans text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                  disabled={!title || !description}
                >
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUploadPage;
