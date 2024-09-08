'use client';
import Section from '@/components/Section';
import React, { useEffect, useState, useRef } from 'react';
import Header from '@/components/nav/Header';
import Paragraph from '@/components/Paragraph';
import Image from "next/image";
import GradientButton from '@/components/GradientButton';
import Footer from '@/components/Footer';
import NavBar from '@/components/nav/nav-bar';


const paragraph = "Select the subscription plan that best suits your needs. Whether you’re a student looking for a single-user plan or an educator needing multiple accounts, we have options designed for everyone.";
const paragraph2 = "To proceed with your purchase, please fill in your billing details. Ensure that all information is accurate to avoid any delays in processing your payment.";
const paragraph3 = "We value your security and privacy. All transactions are processed through a secure payment gateway, using industry-standard encryption to protect your sensitive information.";


const pricingPlans = [
  {
    id: 1,
    name: 'Free Plan',
    price: '0',
    bestFor: '',
    features: [
      { text: '1 quiz per day', available: true },
      { text: '5 flashcards per day', available: true },
      { text: '1 video per day', available: true },
      { text: '1 Document summarization', available: true },
      { text: 'Email support', available: true },
      { text: 'Community access', available: true },
      { text: 'Limited analytics tools', available: true },
    ],
    buttonText: 'Get started free',
  },
  {
    id: 2,
    name: 'Pro Plan',
    price: '15',
    bestFor: '',
    features: [
      { text: 'Unlimited quizzes creation', available: true },
      { text: 'Unlimited flashcards creation', available: true },
      { text: 'Unlimited document summarization', available: true },
      { text: 'Unlimited Video summarization', available: true },
      { text: 'Custom study plans', available: true },
      { text: 'Email support with priority response', available: true },
      { text: 'Access to exclusive content', available: true },
    ],
    buttonText: 'Start Now',
  },
  {
    id: 3,
    name: 'Basic Plan',
    price: '9',
    bestFor: '',
    features: [
      { text: '10 flashcards per day', available: true },
      { text: '5 video per day', available: true },
      { text: '5 Document summarization per day', available: true },
      { text: '5 quizes per day', available: true },
      { text: 'Customizable assessments', available: true },
      { text: 'Dedicated account manager', available: true },
      { text: 'Analytics and reporting tools', available: true },
      
    ],
    buttonText: 'Start Now',
  },
];

export default function PaymentPage() {
    const [theme, setTheme] = useState('light');


  return (
    <div className={`${theme}`}>
        <div className="flex items-center justify-center  w-full">
        <NavBar />
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
        <div className="bg-black text-white py-20">
            <h2 className="text-5xl xl:text-6xl mb-5 font-bold gradient-text animate-gradient pb-2 text-center">
            Pricing
            </h2>
            <div className="mb-8">
              <div className="relative w-full h-[15rem]">
                <Image 
                  src='/assets/undraw_credit_card_re_blml.svg' 
                  alt=''
                  fill 
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
      <div className=" max-w-6xl lg:mx-auto sm:mx-10 grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {pricingPlans.map((plan) => (
          <div key={plan.id} className="border-2 border-neutral-500 rounded-lg p-6 ">
            <h2 className="text-xl  mb-4 text-neutral-300">{plan.name}</h2>
            <p className="text-3xl mb-2 font-bold gradient-text animate-gradient">${plan.price}/mo</p>
            <p className="mb-4">{plan.bestFor}</p>
            <hr className='border-neutral-200 mb-4 ' />
            <ul className="mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center  mb-4">
                  {feature.available ? (
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 bg-neutral-100 p-1 rounded-full text-violet-500 mr-2 font-bold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M7.629 12.133l-3.77-3.77a1 1 0 10-1.414 1.414l4.5 4.5a1 1 0 001.414 0l10-10a1 1 0 10-1.414-1.414l-9.293 9.293z" />
                  </svg>
                  ) : (
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0zm0 18C5.58 18 2 14.42 2 10S5.58 2 10 2s8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2V5zm0 8h2v2h-2v-2z" />
                    </svg>
                  )}
                  <span className={feature.available ? 'text-gray-300' : 'text-gray-500'}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-start mb-4 mt-20">
            <GradientButton
                text={plan.buttonText}
                href="#" // Open in a new tab
            />
            </div>
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