'use client';
import gsap from 'gsap';
import Section from '@/components/Section';
import React, { useEffect, useState, useRef } from 'react';
import { IconHome, IconCurrencyDollar, IconMessageCircle, IconMail, IconVideo, IconFileText, IconBook, IconClipboard } from '@tabler/icons-react';//   IconDollarSign,
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
import NavBar from '@/components/nav/nav-bar';


const paragraph = "We’re here to support you on your journey to studying smart, not hard! Whether you have questions about our services, need assistance with using our quizzes and flashcards, or want to share your feedback, we’d love to hear from you.";
const paragraph2 = "Our dedicated team is committed to providing you with the best tools and resources to enhance your learning experience. Please feel free to reach out to us using the form below or through our contact information provided.";
const paragraph3 = "Your success is our priority, and we’re eager to help you achieve your academic goals!";

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


const AboutBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug p-6">
    <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
    <p className="mb-4">
      We’d love to hear from you! Please fill out the form below, and our team will get back to you as soon as possible.
    </p>
    
    <form className="p-8 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-purple-300 text-md  mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow  appearance-none border-2 bg-black border-neutral-400 rounded w-full py-2 px-3 text-gray-700 dark:text-neutral-100 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Your Name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-purple-300 text-md  mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="shadow appearance-none border-2 bg-black border-neutral-400 rounded w-full py-2 px-3 text-gray-700 dark:text-neutral-100 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Your Email"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 dark:text-purple-300 text-md  mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          className="shadow appearance-none border-2 bg-black border-neutral-400 rounded  w-full py-2 px-3 text-gray-700 dark:text-neutral-100 leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          rows="4"
          placeholder="Your Message"
          required
        ></textarea>
      </div>

      <div className="flex items-center justify-between">
        <button
          className="bg-purple-500 hover:bg-purple-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Send Message
        </button>
      </div>
    </form>
  </Block>
);


const TextBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <Paragraph paragraph={paragraph}/>
  </Block>
);

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-zinc-400">WorldWide</p>
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
        className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-purple-300 focus:outline-0"
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
    
    const [payment, setPayment] = useState(0);
    const handlePricing = (amount: number) => {
    setPayment(amount);
    };


  return (
    <div className={`${theme}`}>
        <div className="flex items-center justify-center  w-full">
        <NavBar />
        </div>
        
        
        <Section theme='dark' setTheme={setTheme}>
        <div className='h-[20vh] '>
        <Header />
        </div>
        <div className="flex flex-col justify-center lg:max-w-6xl lg:mx-auto">
          <div>
            <h2 className="text-5xl xl:text-6xl font-bold gradient-text animate-gradient pb-12 text-center">
             Contact Us
            </h2>
            <div className="">
              <div className="relative sm:m-6 lg:w-full h-[20rem]">
                <Image 
                  src='/assets/undraw_voting_nvu7.svg' 
                  alt=''
                  fill 
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            </div>
          
          <div className='grid grid-col p-10 gap-20'>
              <div className='w-full justify-start md:justify-center'>
              <div className='sm:w-full lg:w-1/2  h-full'>
                  <Paragraph paragraph={paragraph}/>
              </div>
                  
              </div>
              <div className='w-full flex justify-center align-middle'>
                  
                  <div className='sm:w-full lg:w-1/2'>
                  <Paragraph paragraph={paragraph2}/>
                  </div>
              </div>
              <div className='w-full flex justify-end'>
                  
                  <div className='sm:w-full lg:w-1/2'>
                  <Paragraph paragraph={paragraph3}/>
                  </div>
              </div>
              
          </div>
          </div>
      
      </Section>
      
      <Section theme='dark' setTheme={setTheme}>
      <div className="min-h-screen p-20 text-zinc-50">
      
      <motion.div
        initial="initial"
        animate="animate"
        transition={{
          staggerChildren: 0.05,
        }}
        className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
      >
        <TextBlock />
        <HeaderBlock />
        <SocialsBlock />
        <AboutBlock />
        <LocationBlock />
        <EmailListBlock />
      </motion.div>
    </div>
      </Section>
      <Section theme='dark' setTheme={setTheme}>
            <Footer />
      </Section>
    </div>
    
  );
}