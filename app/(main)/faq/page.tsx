'use client';
import { useRouter } from 'next/navigation';
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

const paragraph = "At Cardify, we believe that studying smart is the key to academic success. Our Frequently Asked Questions (FAQ) section is designed to provide students like you with quick answers to common questions about our resources, study techniques, and how to make the most of your learning experience.";
const paragraph2 = "Whether you’re looking for tips on effective study methods, information about our tools, or guidance on how to balance your studies with other commitments, you’ll find valuable insights here.";
const paragraph3 = "Feel free to reach our team for any additional questions.";
const paragraph4 = ""



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
    
      const [activeIndex, setActiveIndex] = useState(null);

      const faqs = [
        {
          question: "What services do you offer to help students study smart?",
          answer: "We provide tools to generate quizzes and flashcards, as well as summarize documents and videos, making studying more efficient and effective."
        },
        {
          question: "How do I create quizzes and flashcards?",
          answer: "Simply input the material you want to study, and our platform will generate customized quizzes and flashcards tailored to your needs."
        },
        {
          question: "Can I summarize long documents or videos?",
          answer: "Yes! Upload your documents or provide links to videos, and our system will create concise summaries to help you grasp the key concepts quickly."
        },
        {
          question: "Is there a limit to the number of quizzes or flashcards I can create?",
          answer: "No, there is no limit! You can create as many quizzes and flashcards as you need to support your learning."
        },
        {
          question: "How can I track my progress?",
          answer: "Our platform includes tracking features that allow you to monitor your performance on quizzes and see how well you're retaining information."
        },
        {
          question: "How can I contact customer support?",
          answer: "You can reach our customer support team via email at support@example.com or through our contact form on the website. We're here to help!"
        },
        {
          question: "Is my data safe with you?",
          answer: "Absolutely! We prioritize your privacy and security, and we use industry-standard encryption to protect your data."
        },
        {
          question: "Can I access the platform on mobile devices?",
          answer: "Yes! Our platform is fully responsive, allowing you to access it on any device, including smartphones and tablets."
        },
      ];
    
      const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
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
          <div className="flex flex-col justify-center lg:max-w-6xl lg:mx-auto">
            <div>
            <h2 className="text-5xl xl:text-6xl font-bold gradient-text animate-gradient pb-12 text-center">
             F&Q Page
            </h2>
            <div className="">
              <div className="relative sm:m-6 lg:w-full h-[30rem]">
                <Image 
                  src='/assets/undraw_faq_re_31cw.svg' 
                  alt=''
                  fill 
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
          <div className='grid grid-col lg:p-10 sm:p-40 gap-24 '>
              <div className='w-full justify-start md:justify-center'>
              <div className='sm:w-full lg:w-1/2  h-full'>
                  <Paragraph paragraph={paragraph}/>
              </div>
                  
              </div>
              
              <div className='w-full flex justify-end'>
                  
                  <div className='sm:w-full lg:w-1/2'>
                  <Paragraph paragraph={paragraph2}/>
                  </div>
              </div>
              
          </div>
          </div>
      </Section>
        <Section theme='dark' setTheme={setTheme}>
        <div className="lg:container sm:mx-8  lg:mx-auto p-10 border border-zinc-700 shadow-md rounded-lg">
          <h1 className="text-3xl font-bold text-center my-8 text-neutral-100">Frequently Asked Questions
          </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-zinc-700 rounded-lg overflow-hidden shadow-sm">
            <button
              className="flex justify-between items-center w-full p-6 text-left bg-neutral-100 hover:bg-neutral-200 transition duration-200 ease-in-out"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-semibold text-neutral-800 text-xl">{faq.question}</span>
              <span className="text-neutral-800 text-xl">{activeIndex === index ? '−' : '+'}</span>
            </button>
            {activeIndex === index && (
              <div className="p-6 bg-neutral-50">
                <p className="text-neutral-800 text-xl">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
        </Section>
        <Section theme='dark' setTheme={setTheme}>
            <Footer />
      </Section>
    </div>
    
  );
}