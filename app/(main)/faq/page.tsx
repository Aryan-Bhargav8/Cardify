'use client';
import Section from '@/components/Section';
import React, { useEffect, useState, useRef } from 'react';
import Header from '@/components/nav/Header';
import Paragraph from '@/components/Paragraph';
import Image from "next/image";
import Footer from '@/components/Footer';
import NavBar from '@/components/nav/nav-bar';

const paragraph = "At Cardify, we believe that studying smart is the key to academic success. Our Frequently Asked Questions (FAQ) section is designed to provide students like you with quick answers to common questions about our resources, study techniques, and how to make the most of your learning experience.";
const paragraph2 = "Whether you’re looking for tips on effective study methods, information about our tools, or guidance on how to balance your studies with other commitments, you’ll find valuable insights here.";



export default function PaymentPage() {
    const [theme, setTheme] = useState('light');
    
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
        <NavBar />
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
              
              <div className='w-full flex justify-end mb-10'>
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