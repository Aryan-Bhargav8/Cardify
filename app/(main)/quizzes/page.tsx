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
import ImageWithScrollEffect from '@/components/Image';
import { quizzes } from '@/data/quizzes';
import Link from 'next/link';




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
      
      const [selectedQuiz, setSelectedQuiz] = useState(null);
      const [userAnswers, setUserAnswers] = useState({});
      const [submitted, setSubmitted] = useState(false);
      const router = useRouter();
    
      const handleQuizSelect = (quiz) => {
        setSelectedQuiz(quiz);
        setUserAnswers({});
        setSubmitted(false);
      };
    
      const handleAnswerChange = (questionIndex, option) => {
        setUserAnswers({ ...userAnswers, [questionIndex]: option });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    
        // Save the quiz result to local storage (optional)
        const historyEntry = {
          title: selectedQuiz.title,
          score: calculateScore(),
          totalQuestions: selectedQuiz.questions.length,
          date: new Date().toISOString(),
        };
    
        const storedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
        storedHistory.push(historyEntry);
        localStorage.setItem('quizHistory', JSON.stringify(storedHistory));
      };
    
      const calculateScore = () => {
        if (!selectedQuiz) return 0;
        return selectedQuiz.questions.reduce((score, question, index) => {
          return score + (userAnswers[index] === question.answer ? 1 : 0);
        }, 0);
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
        <div className="flex-1 flex flex-col justify-center lg:max-w-7xl lg:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-10 lg:p-4 md:p-20 sm:p-10">
            
            <ImageWithScrollEffect src={'/assets/undraw_online_test_re_kyfx.svg'} alt={'Engineering Team Illustration'} />
            <div className="flex flex-col gap-8 justify-center sm:text-center">              
            <Title paragraph={'Quizzes page'}/>
            <Paragraph paragraph={""}/>
            </div>
          </div>
        </div>
        </Section>
        
        <Section theme='dark' setTheme={setTheme}>
        <div className="container mx-auto p-10 border border-neutral-400 rounded text-white ">
        <Title paragraph={'Quizzes'}/>
      {!selectedQuiz ? (
        <div>
          <h2 className="text-2xl mb-4">Select a Quiz:</h2>
          <div className="flex flex-wrap gap-4">
            {quizzes.map((quiz) => (
              <button
                key={quiz.id}
                className={`p-4 rounded border transition duration-200 ${
                  selectedQuiz?.id === quiz.id
                    ? 'bg-purple-500 border-purple-600'
                    : 'bg-gray-600 border-purple-500 hover:bg-purple-400'
                }`}
                onClick={() => handleQuizSelect(quiz)}
              >
                {quiz.title}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl mb-4">{selectedQuiz.title}</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {selectedQuiz.questions.map((question, index) => (
              <div key={index} className="p-6 bg-gray-700 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <p className="font-semibold mb-3 text-lg">{question.question}</p>
                <div className="space-y-3">
                  {question.options.map((option, i) => (
                    <label key={i} className="flex items-center p-2 bg-gray-600 rounded-md hover:bg-gray-500 transition duration-200">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={() => handleAnswerChange(index, option)}
                        checked={userAnswers[index] === option}
                        className="mr-2 accent-purple-500 cursor-pointer"
                      />
                      <span className="text-gray-300">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200"
            >
              Submit Answers
            </button>
          </form>

          {submitted && (
            <div className="mt-4">
              <h3 className="font-bold">Results:</h3>
              <p>
                You scored {calculateScore()} out of {selectedQuiz.questions.length}.
              </p>
              <button
                className="mt-4 text-purple-400 hover:text-purple-300 transition duration-200"
                onClick={() => handleQuizSelect(null)}
              >
                Retake Quiz
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* New Section for Quiz History */}
      <div className="mt-8">
        <h2 className="text-2xl mb-4">History</h2>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-200"
          onClick={() => router.push('/quizzes_history')}
        >
          View Quiz History
        </button>
      </div>
    </div>
        </Section>

        


       
        <Section theme='dark' setTheme={setTheme}>
            <Footer />
      </Section>
    </div>
    
  );
}