'use client';
import Link from 'next/link';
import GradientButton from '@/components/GradientButton';

const Header = () => {
  return (
    <header className="flex justify-between items-center px-40 py-6 bg-transparent">
      <div className="text-white text-lg font-bold">
        <Link href="/">
          <div>
            <img src="/assets/logo2.webp" alt="Logo" className="h-20" />
          </div>
        </Link>
      </div>
      <div>
        <Link href="/login">
        <button className="flex justify-center">
            <GradientButton text="Sign Up →" href="https://youtube.com" />
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;