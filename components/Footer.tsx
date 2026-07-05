import { huayraData } from '@/data/carData';

export default function Footer() {
  return (
    <footer id="contact" className="bg-pure-white border-t border-pagani-red pt-16 pb-8 relative z-20">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-pagani-red to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          {/* Left */}
          <div className="flex flex-col items-center md:items-start">
            <div className="w-12 h-12 border-2 border-pagani-red flex items-center justify-center font-orbitron font-bold text-pagani-red text-2xl mb-4">
              P
            </div>
            <div className="font-orbitron font-bold text-near-black tracking-widest text-xl mb-1">
              PAGANI AUTOMOBILI S.P.A.
            </div>
            <div className="font-rajdhani text-mid-gray tracking-[0.2em] text-sm uppercase">
              {huayraData.tagline}
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border-gray gap-4">
          <div className="font-rajdhani text-mid-gray text-sm">
            © {new Date().getFullYear()} Pagani Automobili. All rights reserved. (Portfolio Concept)
          </div>
          <div className="font-rajdhani text-light-gray text-xs tracking-widest uppercase">
            Built by Shantanu
          </div>
        </div>
      </div>
    </footer>
  );
}
