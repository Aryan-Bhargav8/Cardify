'use client';
import {
    motion,
    useScroll,
    useVelocity,
    useTransform,
    useSpring,
} from "framer-motion";
import React, { useRef } from "react";


export const VelocityText = () => {
    const targetRef = useRef(null);

    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start start", "end start"],
    });
  
    const scrollVelocity = useVelocity(scrollYProgress);
  
    const skewXRaw = useTransform(
      scrollVelocity,
      [-0.5, 0.5],
      ["45deg", "-45deg"]
    );
    const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });
  
    const xRaw = useTransform(scrollYProgress, [0, 1], [0, -4000]);
    const x = useSpring(xRaw, { mass: 3, stiffness: 400, damping: 50 });
  
    return (
      <section
        ref={targetRef}
        className="h-[100vh] bg-white dark:bg-black   text-neutral-950 dark:text-neutral-50"
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.p
            style={{ skewX, x }}
            className="origin-bottom-left text-white whitespace-nowrap text-5xl font-black uppercase leading-[0.85] md:text-7xl md:leading-[0.85]"
          >
            It’s not about how hard you study, but how smart you study that leads to success.
          </motion.p>
        </div>
      </section>
    );
  };
  export default VelocityText;