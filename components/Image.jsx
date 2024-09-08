'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import Image from 'next/image'; // Ensure you have this import

export default function ImageWithScrollEffect({ src, alt }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={container} className="">
      <motion.div 
        className="relative sm:m-6 lg:w-full h-[30rem]" 
        style={{ opacity }}
      >
        <Image 
          src={src} 
          alt={alt}
          fill 
          style={{ objectFit: 'contain' }} 
        />
      </motion.div>
    </div>
  );
}