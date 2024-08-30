'use client';
import React, { useEffect, useState, useRef } from 'react';
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
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
// import {projects} from '@/data';
import Lenis from '@studio-freight/lenis';
// import Card from '@/components/Card/index';
import { useScroll } from 'framer-motion';
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

import {
  IconBrandGithub,
  IconBrandX,
  IconExchange,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";

const paragraph = "At Cardify, we believe that studying should be both effective and enjoyable. Our platform is designed to simplify the learning process, helping you retain information more efficiently through customizable flashcards and interactive tools."
const paragraph1 = "Whether you're preparing for an exam, learning a new language, or mastering a new topic, Cardify provides the resources you need to succeed. With our user-friendly interface and diverse features, you can create, share, and study flashcards tailored to your learning style."
const paragraph2 = "Join thousands of learners who have transformed their study habits with Cardify. Let's make learning easier, together!"
const paragraph3 = "Unlock your full academic potential with Cardify! Our platform is designed to transform the way you study, making learning more effective and enjoyable. Whether you're preparing for exams or mastering new concepts, we have the tools to help you succeed."
const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <Image
              src="/assets/bg.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};
 

const data = [
  {
    category: "",
    title: "Flashcard Creation",
    src: "/assets/p8.jpg",
    content: <DummyContent />,
  },
  {
    category: "",
    title: "Study Schedule Planner",
    src: "/assets/p6.png",
    content: <DummyContent />,
  },
  {
    category: "",
    title: "Collaborative Study Groups",
    src: "/assets/p9.jpg",
    content: <DummyContent />,
  },
 
  {
    category: "",
    title: "Interactive Quizzes",
    src: "/assets/p2.jpg",
    content: <DummyContent />,
  },
  {
    category: "",
    title: "Note-Taking Tools",
    src: "/assets/p3.jpg",
    content: <DummyContent />,
  },
  {
    category: "",
    title: "Mobile Accessibility",
    src: "/assets/p7.jpg",
    content: <DummyContent />,
  },
  
];

export default function Home() {
  const [theme, setTheme] = useState('light');
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));
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

    function raf(time: number) {
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
      {/* Add your paragraph or h3 here */}
      {/* <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
        Discover how Cardify can enhance your learning experience and help you retain information effortlessly.
      </p>
      <h3 className="mt-2 text-xl text-gray-800 dark:text-gray-200">
        
      </h3> */}
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
  </BackgroundBeamsWithCollision>

  {/* Other content can go here */}
</Section>
      
      
      <Section theme='dark' setTheme={setTheme}>
        <div className="flex-1 flex flex-col justify-center lg:max-w-6xl lg:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8">
            <div className="flex flex-col gap-8 justify-center">
            <h2 className="text-5xl xl:text-7xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent">
                About Us
            </h2>              
              <Paragraph paragraph={paragraph}/>
              <Paragraph paragraph={paragraph1}/>
              <Paragraph paragraph={paragraph2}/>
              {/* <div style={{height: "100vh"}}></div> */}
        
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
      <div className="absolute inset-0 bg-black opacity-40"></div>
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
            <h2 className="text-5xl xl:text-7xl max-w-7xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent  ">
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

      

      <Section theme='dark' setTheme={setTheme}>
      <div className="w-full h-full py-20 ml-4">
      <h2 className="text-5xl  xl:text-7xl font-bold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent text-center">
                Our Features
      </h2> 
      <Carousel items={cards} />
    </div> 
      </Section>

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