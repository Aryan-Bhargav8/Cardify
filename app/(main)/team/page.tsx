'use client';
import { useRouter } from 'next/navigation';
import {cn} from "@/lib/utils";
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
import Title from '@/components/Title';
import ImageWithScrollEffect from '@/components/Image'


const paragraph = "Select the subscription plan that best suits your needs. Whether you’re a student looking for a single-user plan or an educator needing multiple accounts, we have options designed for everyone.";


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
                <Paragraph paragraph={paragraph}/>
            </div>
                
            </div>
            <div className='w-full flex justify-center align-middle'>
                
                <div className='sm:w-full lg:w-1/2'>
                <Title paragraph={"shatha dalhoumy"} />
                <Paragraph paragraph={'BackEnd Developer'}/>
                <ImageWithScrollEffect src={'/assets/G2.png'} alt={'shatha dalhoumy'} />
                <Paragraph paragraph={paragraph}/>
                </div>
            </div>
            <div className='w-full flex justify-end'>
                <div className='sm:w-full lg:w-1/2'>
                
                <Title paragraph={"Abdulrahman Mohammed"} />
                <Paragraph paragraph={'Full-stack Developer'}/>
                <ImageWithScrollEffect src={'/assets/G4.png'} alt={'Abdulrahman Mohammed'} />
                <Paragraph paragraph={paragraph}/>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <div className='sm:w-full lg:w-1/2'>
                
                <Title paragraph={"Hibah Sindi"} />
                <Paragraph paragraph={'Data Science / FrontEnd Developer'}/>
                <ImageWithScrollEffect src={'/assets/G3.png'} alt={'Hibah Sindi'} />
                <Paragraph paragraph={paragraph}/>
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