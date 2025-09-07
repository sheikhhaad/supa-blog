import Navbar from "@/Component/Headers";
import HomeCard from "@/Component/HomeCard";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="m-30">
        <h1 className="font-sans font-[600] text-6xl">Blog</h1>
        <p className="font-sans font-[400] text-lg mt-5">
          Stay in the loop with the latest about our products
        </p>
      </div>

      <div>
        <HomeCard/>
      </div>
    </>
  );
};

export default page;
