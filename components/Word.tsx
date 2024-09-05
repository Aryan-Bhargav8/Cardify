'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';

interface WordsProps {
  paragraph: string;
}

const Words: React.FC<WordsProps> = ({ paragraph }) => {
  const container = useRef<HTMLParagraphElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"]
  });

  const words = paragraph.split(" ");
  return (
    <p 
      ref={container}         
      style={{
        display: 'flex',
        fontSize: '100px',
        lineHeight: 1,
        padding: '40px',
        maxWidth: '1280px',
        color: 'white',
        flexWrap: 'wrap'
      }}
    >
      {
        words.map((word, i) => {
          const start = i / words.length;
          const end = (i + 1) / words.length; // Adjusted for clarity
          return <Word key={i} progress={scrollYProgress} range={[start, end]}>{word}</Word>;
        })
      }
    </p>
  );
};

interface WordProps {
  children: React.ReactNode;
  progress: any; // You might want to specify a more precise type based on your context
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span 
      style={{
        position: 'relative',
        marginRight: '12px',
        marginTop: '12px'
      }}
    >
      <span 
        style={{
          position: 'absolute',
          opacity: 0.2 // Changed to a float value
        }}
      >
        {children}
      </span>
      <motion.span style={{ opacity }}>
        {children}
      </motion.span>
    </span>
  );
};

export default Words;