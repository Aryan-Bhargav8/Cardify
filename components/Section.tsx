'use client';
import {useMotionValueEvent, useScroll} from 'framer-motion';
import React, { ReactNode, useRef } from "react";

const Section: React.FC<{
    theme: string;
    setTheme: (value: string) => void;
    children: ReactNode;

    }> = ({theme, setTheme, children}) => {
    let container = useRef(null);
    let {scrollYProgress} = useScroll ({
        target: container,
        offset: ["start center", "end center"],
    });

    useMotionValueEvent(scrollYProgress, "change", (value) => {
        if (value > 0 && value < 1) {
            console.log(value);
            setTheme(theme);
        }
    })


    return (
      <section className="bg-white dark:bg-black min-h-screen flex flex-col "
               ref={container}>
          {children}
      </section>
    );
};
// min-h-screen
export default Section;