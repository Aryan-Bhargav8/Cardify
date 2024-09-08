'use client';
import Section from '@/components/Section';
import React, { useEffect, useState, useRef } from 'react';
import Header from '@/components/nav/Header';
import Paragraph from '@/components/Paragraph';
import Footer from '@/components/Footer';
import Title from '@/components/Title';
import ImageWithScrollEffect from '@/components/Image';
import NavBar from '@/components/nav/nav-bar';


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
            <div className='flex flex-col justify-center items-center'>
              <Title paragraph={"ARYAN BHARGAV"} />
              <Paragraph paragraph={'Full-stack Developer'}/>
            </div>
                <ImageWithScrollEffect src={'/assets/G1.png'} alt={'ARYAN BHARGAV'} />
                <div className='text-center'>
                <Paragraph paragraph={"Experienced software engineer specializing in Python, C, Java, and web development with Next.js, HTML5, and CSS. Exploring Android development using Flutter. Currently working as a Software Engineer Fellow at @Headstarter AI, with strong expertise in cloud computing using Google Cloud and Firebase, DevOps practices with Kubernetes and Linux, and API integration involving LangChain and OpenAI API. Dedicated to continuous learning and collaboration, I focus on developing innovative projects and building impactful technology solutions."}/>
                </div>
            </div>
                
            </div>
            <div className='w-full flex justify-center align-middle'>
                <div className='sm:w-full lg:w-1/2'>
                <div className='flex flex-col justify-center items-center'>
                <Title paragraph={"shatha dalhoumy"} />
                <Paragraph paragraph={'BackEnd Developer'}/>
                </div>
                <ImageWithScrollEffect src={'/assets/G2.png'} alt={'shatha dalhoumy'} />
                <div className='text-center'>
                  <Paragraph paragraph={"Enthusiastic computer science student that is eager to learn"}/>
                </div>
                </div>
            </div>
            <div className='w-full flex justify-end'>
                <div className='sm:w-full lg:w-1/2'>
                <div className='flex flex-col justify-center items-center'>
                  <Title paragraph={"Abdulrahman Mohammed"} />
                  <Paragraph paragraph={'Full-stack Developer'}/>
                </div>
                <ImageWithScrollEffect src={'/assets/G4.png'} alt={'Abdulrahman Mohammed'} />
                <div className='text-center'>
                <Paragraph paragraph={"A passionate developer with Knowledge in Fields such as FullStack Development, AI, Cross-platform Development, Logic design, and Circuits design. Focus on creating high-quality high-qualityprojects that can change the world."}/>
                </div>
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <div className='sm:w-full lg:w-1/2'>
                <div className='flex flex-col justify-center items-center'>
                <Title paragraph={"Hibah Sindi"} />
                <Paragraph paragraph={'Data Science / FrontEnd Developer'}/>
                </div>
                <ImageWithScrollEffect src={'/assets/G3.png'} alt={'Hibah Sindi'} />
                <div className='text-center'>
                <Paragraph paragraph={"A Certified TensorFlow Developer and a passionate self-learner. Driven to build innovative and impactful applications using cutting-edge technologies. Developed a deep fascination with machine learning and its potential to solve complex real-world problems."}/>
                </div>
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