'use client';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import Section from '@/components/Section';
import React, { useEffect, useState, useRef } from 'react';
import { ScrollTrigger } from 'gsap/all';
import Header from '@/components/nav/Header';
import Paragraph from '@/components/Paragraph';
import Image from "next/image";
import Footer from '@/components/Footer';
import Title from '@/components/Title';
import ImageWithScrollEffect from '@/components/Image';
import { quizzes } from '@/data/quizzes';
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
    
    const [history, setHistory] = useState([]);
    const router = useRouter();
    
    useEffect(() => {
        // Fetch quiz history from local storage or a database
        const storedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
        setHistory(storedHistory);
      }, []);
    
      const handleBack = () => {
        router.push('/quizzes'); // Redirect back to the quiz page
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
        <div className="flex-1 flex flex-col justify-center lg:max-w-7xl lg:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 lg:p-4 md:p-20 sm:p-10">
            <div className="flex flex-col gap-8 justify-center sm:text-center">              
            <Title paragraph={'Quizzes History Page'}/>
            <Paragraph paragraph={""}/>
            </div>
            <ImageWithScrollEffect src={'/assets/undraw_quiz_re_aol4.svg'} alt={'Engineering Team Illustration'} />
          </div>
        </div>
        </Section>
        
        <Section theme='dark' setTheme={setTheme}>
        <div className="container mx-auto p-10 border border-neutral-500 text-white rounded">
        <Title paragraph={'Quizzes History'}/>
      {history.length === 0 ? (
        <p>No quiz history found.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((entry, index) => (
            <li key={index} className="p-4 bg-gray-700 rounded shadow-md">
              <h2 className="font-semibold">{entry.title}</h2>
              <p>
                Score: {entry.score} out of {entry.totalQuestions}
              </p>
              <p>Date: {new Date(entry.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
      <button
        className="mt-6 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200"
        onClick={handleBack}
      >
        Back to Quizzes
      </button>
    </div>
        </Section>
        <Section theme='dark' setTheme={setTheme}>
            <Footer />
      </Section>
    </div>
    
  );
}