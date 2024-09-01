'use client';
import {useMotionValueEvent, useScroll} from 'framer-motion';
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import React, { ReactNode, useRef } from "react";

const placeholders = [
    "Put your YouTube link to start",
    "Put your PDF link to start",
    "Put your paper link to start",
  ];

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
};
const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
};

export const Hero = () => {
    return ( 
    <div className='text-black bg-[linear-gradient(to_bottom,#ffffff,#200D42_45%,#4F21A1_65%,#A46EDB_82%)] py-[72px] relative overflow-clip'>
        
        <div className="hero-container relative">
            <div className='flex items-center justify-center'>
            <a href="#" className='border py-1 px-2 rounded-lg border-neutral-900/30'>
                <span className='bg-gradient-to-r from-purple-500 to-violet-500 text-transparent bg-clip-text [-webkit-background-clip:text]'>Start Now</span>
            </a>
            </div>
            <h1 className="text-7xl xl:text-9xl tracking-tight text-center mt-8 font-bold gradient-text animate-gradient">
                Cardify
            </h1>
            <p className="text-center text-2xl xl:text-4xl mt-8 text-neutral-950">
                Study Smart Not Hard!
            </p>
            <div className="flex justify-center mt-8">
            <button className='bg-neutral-900 text-white py-3 px-5 rounded-lg font-medium'>Get Started for free</button>
            </div>
            
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />
        </div>

        </div>
    );
};
export default Hero;