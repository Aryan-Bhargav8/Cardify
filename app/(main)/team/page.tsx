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


const word = 'Welcome to the Cardify payment page! We’re committed to providing you with a seamless and secure transaction experience. Here’s everything you need to know to complete your purchase.';
const paragraph = "Select the subscription plan that best suits your needs. Whether you’re a student looking for a single-user plan or an educator needing multiple accounts, we have options designed for everyone.";
const paragraph2 = "To proceed with your purchase, please fill in your billing details. Ensure that all information is accurate to avoid any delays in processing your payment.";
const paragraph3 = "We value your security and privacy. All transactions are processed through a secure payment gateway, using industry-standard encryption to protect your sensitive information.";



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
            Secure Payment Page
            </h2>
            <div className="">
              <div className="relative  sm:m-6 lg:w-full h-[30rem]">
                <Image 
                  src='/assets/undraw_credit_card_payments_re_qboh.svg' 
                  alt=''
                  fill 
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-col p-40 gap-14'>
            <div className='sm:w-full lg:w-1/2 justify-start md:justify-center'>
            <div className='sm:w-full lg:w-1/2  h-full'>
                <Paragraph paragraph={paragraph}/>
            </div>
                
            </div>
            <div className='1/2 flex justify-center align-middle'>
                
                <div className='sm:w-full lg:w-1/4'>
                <Paragraph paragraph={paragraph2}/>
                </div>
            </div>
            <div className='1/2 flex justify-end'>
                
                <div className='sm:w-full lg:w-1/4'>
                <Paragraph paragraph={paragraph3}/>
                </div>
            </div>
            
        </div>
        
      </Section>
        <Section theme='dark' setTheme={setTheme}>
          <div></div>
        </Section>
        <Section theme='dark' setTheme={setTheme}>
            <Footer />
      </Section>
    </div>
    
  );
}