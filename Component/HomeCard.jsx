"use client";
import Image from "next/image";

export default function HomeCard({title,description,img ,date}) {
  return (
    <div className="w-110 border-[0.2] border-[#2e333e] bg-[rgb(0,0,0,0.3)] text-white rounded-xl overflow-hidden shadow-lg font-sans">
      {/* Image */}
      <div className="relative w-full h-90">
        {/* <Image
          src='' // replace with your image path
          alt="Lake and Mountain"
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        /> */}
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs text-white font-sans font-light uppercase tracking-wide mt-2">Engineering</p>
        <h2 className="mt-2 text-lg font-semibold">
         {title}
        </h2>
        <p className=" text-sm text-gray-400 leading-snug mt-4">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4">
      
          <span className="text-xs text-gray-400">{date}</span>
        </div>
      </div>
    </div>
  );
}
