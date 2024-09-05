'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import Image from 'next/image'; // Ensure you have this import
import styles from '@/styles/styles.css';

export default function ImageWithScrollEffect({ src, alt }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="flex flex-col items-center" ref={container}>
      <motion.div 
        className="relative w-full md:h-[30rem] h-[40rem]" 
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
