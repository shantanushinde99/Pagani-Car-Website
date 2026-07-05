'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { huayraData } from '@/data/carData';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-border-gray py-4'
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border-2 border-pagani-red flex items-center justify-center font-orbitron font-bold text-pagani-red text-xl">
            P
          </div>
          <div className="flex flex-col">
            <span className="font-orbitron font-bold text-near-black tracking-widest text-lg leading-tight">
              {huayraData.brand}
            </span>
            <span className="font-rajdhani text-pagani-red tracking-widest text-sm leading-tight">
              {huayraData.model}
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-10">
          {huayraData.navLinks.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={cn(
                "relative font-orbitron tracking-widest text-sm font-medium transition-colors duration-300 group",
                i === 0 ? "text-pagani-red" : "text-near-black hover:text-pagani-red"
              )}
            >
              {link}
              <span 
                className={cn(
                  "absolute -bottom-2 left-0 h-[2px] transition-all duration-300",
                  i === 0 ? "w-full bg-pagani-red" : "w-0 bg-pagani-red group-hover:w-full"
                )}
              />
            </a>
          ))}
        </div>

      </div>
    </motion.nav>
  );
}
