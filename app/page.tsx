'use client';
import React, { useEffect, useState, useRef, MouseEventHandler } from 'react';
import styles from '@/styles/page.module.css'
import Navbar from '@/components/nav/navbar'
import Head from 'next/head'; 
import { ScrollTrigger } from 'gsap/all';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import gsap from 'gsap'
import Image from "next/image";
import Section from '@/components/Section';
import Paragraph from '@/components/Paragraph';
import Word from '@/components/Word';
import Character from '@/components/Character';
import { FloatingDock } from "@/components/ui/floating-dock";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
// import {projects} from '@/data';
import Lenis from '@studio-freight/lenis';
// import Card from '@/components/Card/index';
import Example from '@/components/HorizontalScrollCarousel';
import { useScroll } from 'framer-motion';
import GradientButton from '@/components/GradientButton';
import Marquee from '@/components/Marquee';

import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#a855f7", "#8b5cf6", "#ec4899", "#DD335C"];
const paragraph = "At Cardify, we believe that studying should be both effective and enjoyable. Our platform is designed to simplify the learning process, helping you retain information more efficiently through customizable flashcards and interactive tools."
const paragraph1 = "Whether you're preparing for an exam, learning a new language, or mastering a new topic, Cardify provides the resources you need to succeed. With our user-friendly interface and diverse features, you can create, share, and study flashcards tailored to your learning style."
const paragraph2 = "Join thousands of learners who have transformed their study habits with Cardify. Let's make learning easier, together!"
const paragraph3 = "Unlock your full academic potential with Cardify! Our platform is designed to transform the way you study, making learning more effective and enjoyable. Whether you're preparing for exams or mastering new concepts, we have the tools to help you succeed."




export default function Home() {
  const [theme, setTheme] = useState('light');

  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 6,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(150% 150% at 50% 0%, white 40%, ${color})`;  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  
  const placeholders = [
    "Put your YouTube link to start",
    "Put your PDF link to start",
    "Put your paper link to start",
  ];

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  })
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
 
    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: (
        <Image
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
 
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
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
      {/* <Navbar /> */}
      <div className="flex items-center justify-center  w-full">
      <FloatingDock
        mobileClassName="" // only for demo, remove for production
        items={links}
      />
    </div>
    <Section theme='light' setTheme={setTheme}>
  <motion.section
    style={{
      backgroundImage,
    }}
    className="relative grid min-h-screen place-content-center overflow-hidden bg-white dark:bg-gray-950 px-4 py-24 text-gray-200 rounded-3xl"
  >
    <header className="absolute top-0 left-0 right-0 flex justify-center p-4">
      <img src="/assets/logo.webp" alt="Logo" className="h-20" />
    </header>

    <div className="relative z-10 flex flex-col gap-6 items-center">
      <h1 className="text-5xl xl:text-6xl font-bold gradient-text animate-gradient">
        Cardify
      </h1>
      <h3 className="text-4xl xl:text-5xl font-bold text-neutral-950">
        Study Smart Not Hard!
      </h3>

      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />

      {/* Uncomment the button if needed */}
      {/* <motion.button
        style={{
          border,
          boxShadow,
        }}
        whileHover={{
          scale: 1.015,
        }}
        whileTap={{
          scale: 0.985,
        }}
        className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-gray-50 transition-colors hover:bg-gradient-to-r hover:from-pink-500 hover:to-violet-500"
      >
        Get Started
        <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
      </motion.button> */}
    </div>

    <div className="absolute inset-0 z-0">
      <Canvas>
        <Stars radius={50} count={2500} factor={4} fade speed={2} />
      </Canvas>
    </div>
  </motion.section>
</Section>

    {/* <Section theme='light' setTheme={setTheme}>
      <BackgroundBeamsWithCollision>
    <div className="text-center z-20 relative">
      <h1 className="text-2xl md:text-4xl lg:text-7xl font-bold text-black dark:text-white font-sans tracking-tight">
        Transform your study sessions into a breeze with{" "}
        <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
          <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
            <span>Cardify</span>
          </div>
          <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
            <span>Cardify</span>
          </div>
        </div>
      </h1>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  </BackgroundBeamsWithCollision>

</Section> */}
      
      
      <Section theme='dark' setTheme={setTheme}>
        <div className="flex-1 flex flex-col justify-center lg:max-w-6xl lg:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8">
            <div className="flex flex-col gap-8 justify-center">
            <h2 className="text-5xl xl:text-7xl font-bold gradient-text animate-gradient">
                About Us
            </h2>              
              <Paragraph paragraph={paragraph}/>
              <Paragraph paragraph={paragraph1}/>
              <Paragraph paragraph={paragraph2}/>
        
            </div>
            <div className="">
              <div className="relative w-full h-[40rem]">
                <Image 
                  src='/assets/book.png' 
                  alt=''
                  fill 
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <section className="relative w-full h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/v1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <h3 className="text-white text-3xl md:text-5xl font-bold">
        Ace your exams in half the time you usually spend studying.
        </h3>
      </div>
    </section>

      <Section theme='dark' setTheme={setTheme}>
        <div className="flex-1 flex flex-col justify-center lg:max-w-6xl lg:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8">
            <div className="flex flex-col gap-8 justify-center">
            <h2 className="text-5xl xl:text-7xl max-w-7xl font-bold gradient-text animate-gradient ">
            Maximize Your Study Potential
            </h2>               
            <Paragraph paragraph={paragraph3}/>
            </div>
            <div className="">
              <div className="relative w-full h-[40rem]">
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

      


      {/* <Section theme='dark' setTheme={setTheme}>
      <div className="flex items-center justify-center h-screen">
      <GradientButton text="Start Free Trial" href="https://youtube.com" />
      </div>
      </Section> */}

      <Section theme='dark' setTheme={setTheme}>
      <h2 className="text-5xl xl:text-7xl font-bold gradient-text animate-gradient text-center">
                Our Features
      </h2>
      <div className="flex flex-wrap gap-4 justify-center">

      <CardContainer  className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black border-purple-500 w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem translateZ="50" className="text-xl font-bold gradient-text">
          Document Summarization
          </CardItem>
          <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-100">
          Automatically summarize academic papers and PDFs to highlight key points, making it easier for students to grasp essential information quickly.
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="/assets/feature1.jpg"
              height="300"
              width="300"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-start mb-4 mt-20">
            <GradientButton text="Try Now →" href="https://youtube.com" />
          </div>
        </CardBody>
      </CardContainer>
  
      <CardContainer  className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black border-purple-500 w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem translateZ="50" className="text-xl font-bold gradient-text">
          Video Summarization
          </CardItem>
          <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-100">
          Analyze educational videos and provide concise summaries or key takeaways, allowing students to focus on important content without watching entire videos.
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="/assets/feature2.jpg"
              height="300"
              width="300"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-start mb-4 mt-20">
            <GradientButton text="Try Now →" href="https://youtube.com" />
          </div>
        </CardBody>
      </CardContainer>
  
      <CardContainer  className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black border-purple-500 w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem translateZ="50" className="text-xl font-bold gradient-text">
          Flashcard Creation
          </CardItem>
          <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-100">
          Generate flashcards from summarized content, enabling students to study key concepts in a quick and efficient manner.
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="/assets/feature3.jpg"
              height="300"
              width="300"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-start mb-4 mt-20">
            <GradientButton text="Try Now →" href="https://youtube.com" />
          </div>
        </CardBody>
      </CardContainer>
  
      <CardContainer  className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black border-purple-500 w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem translateZ="50" className="text-xl font-bold gradient-text">
          User-Friendly Interface
          </CardItem>
          <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-100">
          Ensure a clean, user-friendly interface that is not only visually appealing but also highly intuitive. This interface seamlessly support multiple languages
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="/assets/feature4.jpg"
              height="300"
              width="300"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-start mb-4 mt-20">
            <GradientButton text="Try Now →" href="https://youtube.com" />
          </div>
        </CardBody>
      </CardContainer>
      <CardContainer  className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black border-purple-500 w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem translateZ="50" className="text-xl font-bold gradient-text">
          Multi-Format Support
          </CardItem>
          <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-100">
          Support various file formats, including PDFs, Word documents, and video links, for seamless integration of study materials.

          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="/assets/feature6.jpg"
              height="300"
              width="300"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-start mb-4 mt-20">
            <GradientButton text="Try Now →" href="https://youtube.com" />
          </div>
        </CardBody>
      </CardContainer>
      <CardContainer  className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black border-purple-500 w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem translateZ="50" className="text-xl font-bold gradient-text">
          Quiz Generation
          </CardItem>
          <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-100">
          Create quizzes based on the content of papers, PDFs, and videos, allowing students to test their knowledge and reinforce learning.

          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="/assets/feature5.jpg"
              height="300"
              width="300"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-start mb-4 mt-20">
            <GradientButton text="Try Now →" href="https://youtube.com" />
          </div>
        </CardBody>
      </CardContainer>
  
      </div>
      </Section>

      {/* <Section theme='dark' setTheme={setTheme}>
      <Example />
      </Section> */}

      {/* <div> */}
        {/* <h1>Welcome to My Next.js App</h1> */}
        {/* <Marquee text="Success isn't about working harder; it's about working smarter. Focus on understanding, not just memorizing, and let efficiency be your guide." />
      </div> */}
      

      <Section theme='light' setTheme={setTheme}>
      <footer className="text-black dark:text-white py-6">
        
      <div className="flex justify-between container mx-auto text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} Cardify. All rights reserved.</p>
        <nav className="mb-4">
          <a href="/about" className="mx-2 hover:underline">About Us</a>
          <a href="/contact" className="mx-2 hover:underline">Contact</a>
          <a href="/privacy" className="mx-2 hover:underline">Privacy Policy</a>
        </nav>
        <div className="flex justify-center space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} className="text-xl hover:text-blue-600" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} className="text-xl hover:text-blue-400" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} className="text-xl hover:text-pink-600" />
          </a>
        </div>
      </div>
    </footer>
      </Section>
            
        

      

      
    </div>
  );
}