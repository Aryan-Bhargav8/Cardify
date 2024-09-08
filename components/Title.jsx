'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import styles from '@/styles/styles.css';

export default function Title({paragraph}) {

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"]
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.h1 
      ref={container}         
      className='flex text-6xl xl:text-7xl font-bold gradient-text animate-gradient pb-12 line-height-1 max-w-1280  flex-wrap'
      style={{opacity: scrollYProgress}}
    >
      {paragraph}
    </motion.h1>
  )
}
