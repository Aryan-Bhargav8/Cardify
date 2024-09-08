'use client';
import Link from 'next/link';
import GradientButton from '@/components/GradientButton';

const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 flex justify-between items-center lg:py-8 sm:p-10 bg-transparent z-10 lg:px-40">
    <div className="text-white text-lg font-bold">
      <Link href="/">
        <img src="/assets/logo2.webp" alt="Logo" className="h-20" />
      </Link>
    </div>
    <div>
      <Link href="/login">
      
      <GradientButton text="Sign Up →"  onClick={() => window.open('https://youtube.com', '_blank')}  />
      
      </Link>
    </div>
  </header>
  );
};

export default Header;