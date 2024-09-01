'use client';

import React, { useEffect, useState, useRef, MouseEventHandler } from 'react';
import { ScrollTrigger } from 'gsap/all';
import gsap from 'gsap'
import Image from "next/image";
import Section from '@/components/Section';
import Paragraph from '@/components/Paragraph';
import { FloatingDock } from "@/components/ui/floating-dock";
import Lenis from '@studio-freight/lenis';
import { useScroll, useTransform } from 'framer-motion';
import AuroraHero from '@/components/AuroraHero';
import FeatureCard from "@/components/FeatureCard";
import FlipLink from '@/components/RevealLinks';
import VelocityText from '@/components/VelocityText';

import { IconHome, IconCurrencyDollar, IconMessageCircle, IconMail, IconVideo, IconFileText, IconBook } from '@tabler/icons-react';//   IconDollarSign,
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
    {/* <Hero /> */}
    {/* <BackgroundGradientAnimation>
      <div className="absolute z-50 inset-0 flex flex-col gap-8 items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl">
        <h1 className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
        Cardify
        </h1>
        <p className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
        Study Smarter Not Harder
        </p>
        <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
        
      </div>
      
    </BackgroundGradientAnimation> */}
  <Section theme='dark' setTheme={setTheme}>
    
    <AuroraHero />
  {/* <motion.section
    style={{
      backgroundImage,
    }}
    className="relative grid min-h-screen place-content-center overflow-hidden bg-white dark:bg-gray-950 px-4 py-24 text-gray-200 rounded-3xl"
  >
    <header className="absolute top-0 left-0 right-0 flex justify-center p-4">
      <img src="/assets/logo2.webp" alt="Logo" className="h-24 opacity" />
    </header>

    <div className="relative z-10 flex flex-col gap-6 items-center">
      <h1 className="text-7xl xl:text-9xl font-bold gradient-text animate-gradient">
        Cardify
      </h1>
      <h3 className="text-5xl xl:text-7xl font-bold text-neutral-50 ">
        Study Smart Not Hard!
      </h3>

      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />

      
    </div>

    <div className="absolute inset-0 z-0">
      <Canvas>
        <Stars radius={50} count={2500} factor={4} fade speed={2} />
      </Canvas>
    </div>
  </motion.section> */}
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
      
      {/* About Section */}
      
      

      <Section theme='dark' setTheme={setTheme}>
        <div className="flex-1 flex flex-col justify-center lg:max-w-6xl lg:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8">
            <div className="flex flex-col gap-8 justify-center sm:items-center sm:m-8 lg:text-start sm:text-center ">
            <h2 className="text-6xl xl:text-7xl font-bold gradient-text animate-gradient">
                About Us
            </h2>              
              <Paragraph paragraph={paragraph}/>
              <Paragraph paragraph={paragraph1}/>
              {/* <Paragraph paragraph={paragraph2}/> */}
        
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
        <div className="flex flex-col justify-center lg:max-w-5xl lg:mx-auto">
          <div className="">
          <h2 className="text-5xl xl:text-6xl font-bold gradient-text animate-gradient pb-12 text-center">
          Learn Efficiently, Succeed Easily
          </h2>
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

      {/* <section className="relative w-full h-screen overflow-hidden">
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
    </section> */}
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

      <Section theme='light' setTheme={setTheme}>
        <div className="flex-1 flex flex-col justify-center lg:max-w-7xl lg:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 lg:p-4 md:p-20 sm:p-10">
            <div className="flex flex-col gap-8 justify-center sm:text-center">
            <h2 className="text-5xl xl:text-7xl max-w-7xl font-bold gradient-text animate-gradient text-center">
            Maximize Your Study Potential
            </h2>               
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

      

      
       

      {/* <Section theme='dark' setTheme={setTheme}>
      <div className="flex items-center justify-center h-screen">
      <GradientButton text="Start Free Trial" href="https://youtube.com" />
      </div>
      </Section> */}

      {/* <Section theme='dark' setTheme={setTheme}>
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
      </Section> */}

      {/* <Section theme='dark' setTheme={setTheme}>
      <Example />
      </Section> */}

      {/* <div> */}
        {/* <h1>Welcome to My Next.js App</h1> */}
        {/* <Marquee text="Success isn't about working harder; it's about working smarter. Focus on understanding, not just memorizing, and let efficiency be your guide." />
      </div> */}
      
      
      <Section theme='dark' setTheme={setTheme}>
      
      
        
      <div className="flex flex-wrap  justify-between container mx-auto text-center">        
        <div className="grid place-content-center gap-10 px-8 py-24 text-black dark:text-white">
          <FlipLink href="#">About Us</FlipLink>
          <FlipLink href="#">F&Q</FlipLink>
          <FlipLink href="#">Team</FlipLink>
          <FlipLink href="#">Contact</FlipLink>
         
        </div>
        
        <div className="grid place-content-center gap-6  px-8 py-24 text-black dark:text-white">
          <FlipLink href="https://www.linkedin.com/company/cardifyaii">Linkedin</FlipLink>
          <FlipLink href="https://x.com/cardifyai">Twitter</FlipLink>
          <FlipLink href="https://www.instagram.com/cardifyai/">Instagram</FlipLink>
        </div>
      </div>

      <div className="">
              <div className="relative w-full h-[10rem]">
                <Image 
                  src='/assets/logo.webp' 
                  alt=''
                  fill 
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
    <p className="mb-2 pt-20 text-center text-xl text-neutral-950 dark:text-neutral-50">&copy; {new Date().getFullYear()} Cardify. All rights reserved.</p>
      </Section>
            
  
    </div>
  );
}