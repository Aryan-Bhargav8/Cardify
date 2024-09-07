'use client';
import React from 'react';
import { motion } from 'framer-motion';

const GradientButton = ({ text, href }: { text: string, href: string }) => {
    return (
        
        <motion.a
            href={href}
            className="p-4 rounded-lg text-white bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 cursor-pointer"
            initial={{ scale: 1, rotate: 0 }}
            whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { type: 'spring', stiffness: 300 },
            }}
            whileTap={{
                scale: 0.95,
                rotate: -5,
                transition: { type: 'spring', stiffness: 300 },
            }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            {text}
        </motion.a>
    );
};

export default GradientButton;