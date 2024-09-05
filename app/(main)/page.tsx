'use client';
import React, { useEffect, useState, useRef, MouseEventHandler } from 'react';
import styles from '@/styles/page.module.css'
import Head from 'next/head'; 
import { ScrollTrigger } from 'gsap/all';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import gsap from 'gsap'
import Image from "next/image";
import Section from '@/components/Section';
import Paragraph from '@/components/Paragraph';
import { FloatingDock } from "@/components/ui/floating-dock";

// import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

// import HoverDevCards from '@/components/HoverDevCards';
// import {projects} from '@/data';
import Lenis from '@studio-freight/lenis';
// import Card from '@/components/Card/index';
// import Example from '@/components/HorizontalScrollCarousel';
import { useScroll, useTransform } from 'framer-motion';
import AuroraHero from '@/components/AuroraHero';
import FeatureCard from "@/components/FeatureCard";
import VelocityText from '@/components/VelocityText';

import Footer  from '@/components/Footer';
import Title from '@/components/Title';

import { IconHome, IconCurrencyDollar, IconMessageCircle, IconMail, IconVideo, IconFileText, IconBook, IconClipboard } from '@tabler/icons-react';//   IconDollarSign,
import { useRouter } from 'next/navigation';


import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";


const paragraph = "At Cardify, we believe that studying should be both effective and enjoyable. Our platform is designed to simplify the learning process, helping you retain information more efficiently through customizable flashcards and interactive tools."
const paragraph1 = "Whether you're preparing for an exam, learning a new language, or mastering a new topic, Cardify provides the resources you need to succeed. With our user-friendly interface and diverse features, you can create, share, and study flashcards tailored to your learning style."
const paragraph2 = "Join thousands of learners who have transformed their study habits with Cardify. Let's make learning easier, together!"
const paragraph3 = "Say goodbye to information overload! Our Document Summarization feature automatically condenses academic papers, PDFs, and other lengthy texts into concise summaries. Highlight the key points and essential information, making it easier for you to grasp complex subjects quickly."
const paragraph4 = "In today’s fast-paced academic environment, simply studying hard isn’t enough. To truly excel, you must study smart. Here are some strategies to help you maximize your study potential and achieve your academic goals"



export default function Home() {
  const [theme, setTheme] = useState('light');
  const router = useRouter();
    const handlePayment = async () => {
        router.push('/payment');
    };

  let ref = useRef(null);
  let { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });
  let y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const placeholders = [
    "Put your YouTube link to start",
    "Put your PDF link to start",
    "Put your paper link to start",
  ];

  const container = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: container,
  //   offset: ['start start', 'end end']
  // })
  const handleQuizzes = async () => {
    router.push('/quizzes');
};

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })
 

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Pricing",
      icon: (
        <IconCurrencyDollar className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/payment",
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
      href: "/contact",
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
    {
      title: "Quizzes", // New entry for quizzes
      icon: (
        <IconClipboard className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/quizzes", 
    },
  ];


  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

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
  const handleMouseMove: MouseEventHandler = (e) => {
    const { currentMouseX, currentMouseY, containerWidth, containerHight} = getMousePosition(e)
  }
  
  return (
    <div className={`${theme}`}>
      
      <div className="flex items-center justify-center  w-full">
      <FloatingDock
        mobileClassName="" 
        items={links}
      />
      </div>
  <Section theme='dark' setTheme={setTheme}>
    <AuroraHero />
  </Section>
      
      {/* About Section */}
      
      

      <Section theme='dark' setTheme={setTheme}>
        <div className="flex-1 flex flex-col justify-center lg:max-w-6xl lg:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8">
            <div className="flex flex-col gap-8 justify-center sm:items-center sm:m-8 lg:text-start sm:text-center ">
              <Title paragraph={'About Us'}/>
              <Paragraph paragraph={paragraph}/>
              <Paragraph paragraph={paragraph1}/>
            </div>
            <div className="">
              <div className="relative w-full h-[40rem]">
                <Image 
                  src='/assets/undraw_notebook_re_id0r.svg' 
                  alt=''
                  fill 
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section theme='dark' setTheme={setTheme}>
        <VelocityText />
      </Section>

      <Section theme='dark' setTheme={setTheme}>
        <div className="bg-black flex flex-col justify-center lg:max-w-5xl lg:mx-auto">
          <div className="">
          <Title paragraph={'Learn Efficiently, Succeed Easily'}/>
            <div className="">
              <div className="relative w-full h-[30rem]">
                <Image 
                  src='/assets/undraw_learning_re_32qv.svg' 
                  alt=''
                  fill 
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-8 justify-center pt-12 sm:items-center sm:m-8 lg:text-center sm:text-center ">        
              <Paragraph paragraph={paragraph3}/>
            </div>
          </div>
        </div>
      </Section>

    <Section theme='dark' setTheme={setTheme}>
      <div className="flex flex-col bg-black min-h-[170vh]">

        <div className="relative w-full max-h-[40rem] h-screen" ref={ref}>
          <div className="relative flex flex-col h-full z-10">
            
            <div className="flex-1 flex justify-center items-center">
              <h1 className="text-white font-bold text-6xl text-center">
              Ace your exams in half the time you usually spend studying.
              </h1>
            </div>
          </div>
          
          <motion.div className="absolute top-0 left-0 right-0 bottom-0" style={{ y }}>
            <video
              className="w-full h-full object-cover opacity-50 "
              loop
              autoPlay
              muted
              playsInline
            >
              <source src="/assets/v1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-transparent to-black" />
          </motion.div>
        </div>

        <main className="max-w-[90%] md:max-w-[70%] mx-auto my-8 z-50">
        <h1 className="text-white font-bold text-4xl md:text-6xl my-8 text-center">
          Change your experience with our features
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
          <FeatureCard feature="Document Summarization" desc="Automatically summarize academic papers and PDFs to highlight key points, making it easier for students to grasp essential information quickly." />
          <FeatureCard feature="Video Summarization" desc="Analyze educational videos and provide concise summaries or key takeaways, allowing students to focus on important content without watching entire videos." />
          <FeatureCard feature="Flashcard Creation" desc="Generate flashcards from summarized content, enabling students to study key concepts in a quick and efficient manner." />
          <FeatureCard feature="User-Friendly Interface" desc="Ensure a clean, user-friendly interface that is not only visually appealing but also highly intuitive. This interface seamlessly supports multiple languages." />
          <FeatureCard feature="Multi-Format Support" desc="Support various file formats, including PDFs, Word documents, and video links, for seamless integration of study materials." />
          <FeatureCard feature="Quiz Generation" desc="Create quizzes based on the content of papers, PDFs, and videos, allowing students to test their knowledge and reinforce learning." />
        </div>
      </main>
      </div>
    </Section>

      <Section theme='dark' setTheme={setTheme}>
        <div className="flex-1 flex flex-col justify-center lg:max-w-7xl lg:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 lg:p-4 md:p-20 sm:p-10">
            <div className="flex flex-col gap-8 justify-center sm:text-center">              
            <Title paragraph={'Maximize Your Study Potential'}/>
            <Paragraph paragraph={paragraph4}/>
            </div>
            <div className="">
              <div className="relative w-full md:h-[30rem] h-[40rem]">
                <Image 
                  src='/assets/undraw_exams_re_4ios.svg' 
                  alt=''
                  fill 
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* <div> */}
        {/* <Marquee text="Success isn't about working harder; it's about working smarter. Focus on understanding, not just memorizing, and let efficiency be your guide." />
      </div> */}
      
      
      <Section theme='dark' setTheme={setTheme}>
      
          <Footer />
      </Section>
            
  
    </div>
  );
}