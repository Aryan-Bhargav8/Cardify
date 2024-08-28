'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/nav/navbar'
import Head from 'next/head'; 
import Image from "next/image";
import Section from '@/components/Section';


export default function Home() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme; // Update body class based on theme
  }, [theme]);

  return (
    <div className={`${theme}`}>
      <Navbar />
      <Head>
        <title>Scrolling dark mode transition</title>
      </Head>
      
      <Section theme='light' setTheme={setTheme}>
        <div className="flex-1 flex flex-col justify-center lg:max-w-6xl lg:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8">
            <div className="flex flex-col gap-8 justify-center">
              <h1 className="text-5xl xl:text-7xl font-bold text-black dark:text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1>
              <p className="text-lg font-semibold text-zinc-400">
                <span className="text-black dark:text-white">Pro accessories</span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Rerum quas iusto quos cum nihil modi veritatis suscipit
                quisquam maxime dicta.
              </p>
            </div>
            <div className="">
              <div className="relative w-full h-[40rem]">
                <Image 
                  src='/next.svg' 
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
        <div className="flex-1 flex flex-col justify-center lg:max-w-6xl lg:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8">
            <div className="flex flex-col gap-8 justify-center">
              <h1 className="text-5xl xl:text-7xl font-bold text-black dark:text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1>
              <p className="text-lg font-semibold text-zinc-400">
                <span className="text-black dark:text-white">Pro accessories</span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Rerum quas iusto quos cum nihil modi veritatis suscipit
                quisquam maxime dicta.
              </p>
            </div>
            <div className="">
              <div className="relative w-full h-[40rem]">
                <Image 
                  src='/next.svg' 
                  alt=''
                  fill 
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section theme={theme} setTheme={setTheme}>
        <div className="flex-1 flex flex-col justify-center lg:max-w-6xl lg:mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-8">
            <div className="flex flex-col gap-8 justify-center">
              <h1 className="text-5xl xl:text-7xl font-bold text-black dark:text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h1>
              <p className="text-lg font-semibold text-zinc-400">
                <span className="text-black dark:text-white">Pro accessories</span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Rerum quas iusto quos cum nihil modi veritatis suscipit
                quisquam maxime dicta.
              </p>
            </div>
            <div className="">
              <div className="relative w-full h-[40rem]">
                <Image 
                  src='/next.svg' 
                  alt=''
                  fill 
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}