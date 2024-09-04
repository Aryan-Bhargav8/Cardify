'use client';
import React from 'react';
import Image from 'next/image';
import FlipLink from '@/components/RevealLinks'; 
import { useRouter } from 'next/navigation';

const Footer = () => {
    const router = useRouter();
    const handlePayment = async () => {
        router.push('/payment');
    };
    const handleFaQ = async () => {
        router.push('/faq');
    };
    const handleTeam = async () => {
        router.push('/team');
    };
    const handleContact = async () => {
        router.push('/contact');
    };

  return (
    <section className="">
      <div className="flex flex-wrap  justify-between container mx-auto text-center">        
        <div className="grid place-content-center gap-10 px-8 py-24 text-black dark:text-white">
          {/* <FlipLink href="#">About Us</FlipLink> */}
          <FlipLink event={handlePayment}>Pricing</FlipLink>
          <FlipLink event={handleFaQ}>F&Q</FlipLink>
          <FlipLink event={handleTeam}>Team</FlipLink>
          <FlipLink event={handleContact}>Contact</FlipLink>
        </div>
        
        <div className="grid place-content-center gap-10  px-8 py-24 text-black dark:text-white">
          <FlipLink href="https://x.com/cardifyai">Twitter</FlipLink>
          <FlipLink href="https://www.linkedin.com/company/cardifyaii">Linkedin</FlipLink>
          <FlipLink href="https://www.youtube.com/@ElMundoDeLaProgramadora">YouTube</FlipLink>
          <FlipLink href="https://www.instagram.com/cardifyai/">Instagram</FlipLink>
        </div>
      </div>

      <div className="">
              <div className="relative w-full h-[10rem]">
                <Image 
                  src='/assets/logo.webp' 
                  alt=''
                  fill 
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>
            <div className='flex flex-wrap  justify-between container mx-auto text-center'>
              <p className="mb-2 pt-20 text-center text-xl text-neutral-950 dark:text-neutral-50">
                Made with ❤️ by Cardify Team
            
              </p>
              <p className="mb-2 pt-20 text-center text-xl text-neutral-950 dark:text-neutral-50">&copy; {new Date().getFullYear()} Cardify. All rights reserved.</p>
            </div>
        
    </section>
  );
};

export default Footer;