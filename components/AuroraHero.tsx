'use client';
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import Link from 'next/link';
import GradientButton from '@/components/GradientButton';
const COLORS_TOP = ["#a855f7", "#8b5cf6", "#ec4899", "#DD335C"];



export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);
  const placeholders = [
    "Put your PDF link",
    "Put your document link",
    "Put you video link",
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    
    <motion.section
  style={{
    backgroundImage,
  }}
  className="relative grid min-h-screen place-content-center overflow-hidden bg-white dark:bg-gray-950 px-4 py-24 text-gray-200"
>
  {/* Header */}
  <header className="absolute top-0 left-0 right-0 flex justify-between items-center py-8 bg-transparent z-10 lg:px-40">
    <div className="text-white text-lg font-bold">
      <Link href="/">
        <img src="/assets/logo2.webp" alt="Logo" className="h-20" />
      </Link>
    </div>
    <div>

      {/* <Link href="/sign-up"> */}
      
      <GradientButton text="Sign Up →"  href="/sign-up" />
      {/* </Link> */}

    </div>
  </header>

  <div className="relative z-10 flex flex-col gap-6 items-center">
    <h1 className="text-7xl xl:text-9xl font-bold gradient-text animate-gradient">
      Cardify
    </h1>
    <h3 className="text-5xl xl:text-7xl font-bold text-neutral-50 text-center">
      Study Smart Not Hard!
    </h3>

    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onChange={handleChange}
      onSubmit={onSubmit}
    />
  </div>

  <div className="absolute inset-0 z-0">
    <Canvas>
      <Stars radius={50} count={2500} factor={4} fade speed={2} />
    </Canvas>
  </div>
</motion.section>
  );
};
export default AuroraHero;