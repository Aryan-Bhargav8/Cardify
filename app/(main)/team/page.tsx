'use client';
import { useRouter } from 'next/navigation';
import {cn} from "@/lib/utils";
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
import Title from '@/components/Title';
import ImageWithScrollEffect from '@/components/Image';
import NavBar from '@/components/nav/nav-bar';




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
    

  return (
    <div className={`${theme}`}>
        <div className="flex items-center justify-center  w-full">
        <NavBar />
        </div>
        
        
        <Section theme='dark' setTheme={setTheme}>
        <div className='h-[20vh] '>
        <Header />
        </div>
        <div className="flex-1 flex flex-col justify-center lg:max-w-7xl lg:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 lg:p-4 md:p-20 sm:p-10">
            <div className="flex flex-col gap-8 justify-center sm:text-center">              
            <Title paragraph={'Meet Cardify Team'}/>
            <Paragraph paragraph={"At Cardify, our team is our greatest asset. We are a diverse group of passionate individuals committed to excellence and innovation. Together, we strive to achieve our mission."}/>
            </div>
            <ImageWithScrollEffect src={'/assets/undraw_engineering_team_a7n2.svg'} alt={'Engineering Team Illustration'} />
          </div>
        </div>
        </Section>
        
        <Section theme='dark' setTheme={setTheme}>
        <div className='grid grid-col p-40 gap-14 items-center'>
            <div className='w-full justify-center'>
            <div className='sm:w-full lg:w-1/2 h-full'>
                <Title paragraph={"ARYAN BHARGAV"} />
                <Paragraph paragraph={'Full-stack Developer'}/>
                <ImageWithScrollEffect src={'/assets/G1.png'} alt={'ARYAN BHARGAV'} />
                <Paragraph paragraph={"Experienced software engineer specializing in Python, C, Java, and web development with Next.js, HTML5, and CSS. Exploring Android development using Flutter. Currently working as a Software Engineer Fellow at @Headstarter AI, with strong expertise in cloud computing using Google Cloud and Firebase, DevOps practices with Kubernetes and Linux, and API integration involving LangChain and OpenAI API. Dedicated to continuous learning and collaboration, I focus on developing innovative projects and building impactful technology solutions."}/>
            </div>
                
            </div>
            <div className='w-full flex justify-center align-middle'>
                
                <div className='sm:w-full lg:w-1/2'>
                <Title paragraph={"shatha dalhoumy"} />
                <Paragraph paragraph={'BackEnd Developer'}/>
                <ImageWithScrollEffect src={'/assets/G2.png'} alt={'shatha dalhoumy'} />
                <Paragraph paragraph={"Enthusiastic computer science student that is eager to learn"}/>
                </div>
            </div>
            <div className='w-full flex justify-end'>
                <div className='sm:w-full lg:w-1/2'>
                
                <Title paragraph={"Abdulrahman Mohammed"} />
                <Paragraph paragraph={'Full-stack Developer'}/>
                <ImageWithScrollEffect src={'/assets/G4.png'} alt={'Abdulrahman Mohammed'} />
                <Paragraph paragraph={"A passionate developer with Knowledge in Fields such as FullStack Development, AI, Cross-platform Development, Logic design, and Circuits design. Focus on creating high-quality high-qualityprojects that can change the world."}/>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <div className='sm:w-full lg:w-1/2'>
                
                <Title paragraph={"Hibah Sindi"} />
                <Paragraph paragraph={'Data Science / FrontEnd Developer'}/>
                <ImageWithScrollEffect src={'/assets/G3.png'} alt={'Hibah Sindi'} />
                <Paragraph paragraph={"A machine learning engineer intern with a Google TensorFlow developer certification, possessing a strong foundation in artificial intelligence (AI), machine learning (ML), data engineering (DE), and robotics. A passion for these fields drives ongoing exploration and updates on the latest advancements. Expertise in building and deploying ML models using TensorFlow, one of the industry's leading frameworks, is demonstrated through the Google TensorFlow certification. This certification validates the ability to develop deep learning models, optimize performance, and deploy solutions at scale. In addition to AI and ML, a keen interest in the Internet of Things (IoT) is held. Multidisciplinary projects that integrate these technologies are enjoyed, enabling the creation of innovative solutions that effectively leverage data and intelligent systems. As a self-learner, a commitment to expanding knowledge is maintained through the exploration of new algorithms, techniques, and technologies. Active engagement with online communities and participation in competitions are undertaken to stay ahead of industry trends and quickly adapt to new concepts. This adaptability allows real-world challenges to be tackled with confidence and creativity."}/>
                </div>
            </div>
        </div>
        </Section>
        <Section theme='dark' setTheme={setTheme}>
            <Footer />
      </Section>
    </div>
    
  );
}