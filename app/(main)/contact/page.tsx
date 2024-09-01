'use client';
import gsap from 'gsap';
import Section from '@/components/Section';
import React, { useEffect, useState, useRef } from 'react';
import { IconHome, IconCurrencyDollar, IconMessageCircle, IconMail, IconVideo, IconFileText, IconBook } from '@tabler/icons-react';//   IconDollarSign,
import { ScrollTrigger } from 'gsap/all';
import Header from '@/components/nav/Header';
import { FloatingDock } from "@/components/ui/floating-dock";
import Paragraph from '@/components/Paragraph';
import Image from "next/image";
import GradientButton from '@/components/GradientButton';
import Footer from '@/components/Footer';
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import { SiTiktok, SiYoutube, SiX, SiLinkedin, SiInstagram } from "react-icons/si";
import { motion } from "framer-motion";


const word = 'Welcome to the Cardify payment page! We’re committed to providing you with a seamless and secure transaction experience. Here’s everything you need to know to complete your purchase.';
const paragraph = "  We’d love to hear from you! Fill out the form below or reach out through our social media channels.";
const paragraph2 = "To proceed with your purchase, please fill in your billing details. Ensure that all information is accurate to avoid any delays in processing your payment.";
const paragraph3 = "We value your security and privacy. All transactions are processed through a secure payment gateway, using industry-standard encryption to protect your sensitive information.";

const Block = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg border border-zinc-700  p-6",
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <img
      src="assets/logo2.webp"
      alt="avatar"
      className="mb-4 size-14 rounded-full"
    />
    <h1 className="mb-12 text-4xl font-medium leading-tight">
      If you faced an issue {" "}
      <span className="text-zinc-400">
        We are here to help 
      </span>
    </h1>
    <a
      href="#"
      className="flex items-center gap-1 text-purple-300 hover:underline"
    >
      Contact our <FiArrowRight />
    </a>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-red-500 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiYoutube />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-pink-600 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiInstagram />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-blue-600 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-black"
      >
        <SiLinkedin />
      </a>
    </Block>
    
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-black md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiX />
      </a>
    </Block>
  </>
);

// const AboutBlock = () => (
//   <Block className="col-span-12 text-3xl leading-snug">
//     <p>
//       My passion is building cool stuff.{" "}
//       <span className="text-zinc-400">
//         I build primarily with React, Tailwind CSS, and Framer Motion. I love
//         this stack so much that I even built a website about it. I've made over
//         a hundred videos on the subject across YouTube and TikTok.
//       </span>
//     </p>
//   </Block>
// );

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-zinc-400">Cyberspace</p>
  </Block>
);

const EmailListBlock = () => (
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg">Join our mailing list</p>
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2"
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
      />
      <button
        type="submit"
        className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
      >
        <FiMail /> Join the list
      </button>
    </form>
  </Block>
);



const Footer2 = () => {
  return (
    <footer className="mt-12">
      <p className="text-center text-zinc-400">
        Made with ❤️ by{" "}
        <a href="#" className="text-red-300 hover:underline">
          @tomisloading
        </a>
      </p>
    </footer>
  );
};

export default function PaymentPage() {
    const [theme, setTheme] = useState('light');
    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);

    useEffect( () => {
        gsap.registerPlugin(ScrollTrigger);
        requestAnimationFrame(animate);
        gsap.to(slider.current, {
          scrollTrigger: {
            trigger: document.documentElement,
            scrub: 0.25,
            start: 0,
            end: window.innerHeight,
            onUpdate: e => direction = e.direction * -1
          },
          x: "-500px",
        })
        
      }, [])
      const animate = () => {
        if(xPercent < -100){
          xPercent = 0;
        }
        else if(xPercent > 0){
          xPercent = -100;
        }
        gsap.set(firstText.current, {xPercent: xPercent})
        gsap.set(secondText.current, {xPercent: xPercent})
        xPercent += 0.1 * direction;
        requestAnimationFrame(animate);
      };
      const getMousePosition = (e: React.MouseEvent<Element, MouseEvent>) => {

        const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    
        const currentMouseX = e.clientX - left;
        const currentMouseY = e.clientY - top;
    
        return {
          currentMouseX,
          currentMouseY,
          containerWidth: width, 
          containerHight: height,
        };
      };

    let xPercent = 0;
    let direction = -1;
    const links = [
        {
          title: "Home",
          icon: (
            <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#",
        },
        {
          title: "Pricing",
          icon: (
            <IconCurrencyDollar className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#",
        },
        {
          title: "Chat",
          icon: (
            <IconMessageCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#",
        },
        {
          title: "Contact",
          icon: (
            <IconMail className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#",
        },
        {
          title: "Video",
          icon: (
            <IconVideo className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#",
        },
        {
          title: "Document",
          icon: (
            <IconFileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#",
        },
        {
          title: "Flashcards",
          icon: (
            <IconBook className="h-full w-full text-neutral-500 dark:text-neutral-300" />
          ),
          href: "#",
        },
        
      ];
    const [payment, setPayment] = useState(0);
    const handlePricing = (amount: number) => {
    setPayment(amount);
    };


  return (
    <div className={`${theme}`}>
        <div className="flex items-center justify-center  w-full">
            <FloatingDock
                mobileClassName="" 
                items={links}
            />
        </div>
        
        
        <Section theme='dark' setTheme={setTheme}>
        <div className='h-[20vh] '>
        <Header />
        </div>
        <div className="flex flex-col justify-center lg:max-w-5xl lg:mx-auto">
            <div className="">
            <h2 className="text-5xl xl:text-6xl font-bold gradient-text animate-gradient pb-12 text-center">
              Contact Us
            </h2>
            <div className="">
              <div className="relative  sm:m-6 lg:w-full h-[30rem]">
                <Image 
                  src='/assets/undraw_online_transactions_-02-ka.svg' 
                  alt=''
                  fill 
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            <div className='w-1/2  py-8 align-middle'>
            <Paragraph paragraph={paragraph}/>
            </div>
            
          </div>
        </div>

      <div className="min-h-screen p-20 text-zinc-50">
      
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <HeaderBlock />
        <SocialsBlock />
        {/* <AboutBlock /> */}
        <LocationBlock />
        <EmailListBlock />
      </motion.div>
    </div>
      </Section>
        {/* <Section theme='dark' setTheme={setTheme}>
      
        </Section> */}
        <Section theme='dark' setTheme={setTheme}>
            <Footer />
      </Section>
    </div>
    
  );
}