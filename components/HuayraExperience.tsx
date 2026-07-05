'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, MotionValue } from 'framer-motion';
import { huayraData } from '@/data/carData';

interface Props {
  scrollYProgress: MotionValue<number>;
}

export default function HuayraExperience({ scrollYProgress }: Props) {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setProgress(latest);
      const index = huayraData.phases.findIndex(
        p => latest >= p.scrollRange[0] && latest <= p.scrollRange[1]
      );
      if (index !== -1 && index !== activePhaseIndex) {
        setActivePhaseIndex(index);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, activePhaseIndex]);

  const activePhase = huayraData.phases[activePhaseIndex];

  const variants = {
    initial: { y: 30, opacity: 0, filter: 'blur(8px)' },
    animate: { 
      y: 0, 
      opacity: 1, 
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.08 }
    },
    exit: { 
      y: -20, 
      opacity: 0, 
      filter: 'blur(4px)',
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const childVariants = {
    initial: { y: 30, opacity: 0, filter: 'blur(8px)' },
    animate: { y: 0, opacity: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
    exit: { y: -20, opacity: 0, filter: 'blur(4px)', transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-8 md:p-16">
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 h-[2px] bg-pagani-red z-50" style={{ width: `${progress * 100}%` }} />

      {/* Persistent HUD Elements - Vertically Centered Right Dots */}
      <div className="absolute top-1/2 right-8 md:right-16 -translate-y-1/2 flex flex-col gap-3 z-50">
        {huayraData.phases.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-500 ${
                i === activePhaseIndex 
                  ? 'bg-pagani-red border-pagani-red' 
                  : 'border-near-black bg-transparent'
              }`}
            />
          ))}
        </div>


      {/* Phase Content */}
      <div className="flex-1 relative mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase.id}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 flex flex-col justify-between"
          >
            {/* Top Left Phase Label */}
            <motion.div variants={childVariants} className="max-w-md">
              <div className="font-orbitron text-pagani-red text-sm tracking-[0.2em] mb-4">
                {activePhase.label}
              </div>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex justify-between items-end w-full pb-8">
              {/* Left Side: Title & Description */}
              <motion.div variants={childVariants} className="max-w-xl">
                <div className="w-12 h-[1px] bg-pagani-red mb-4" />
                <h1 className="font-orbitron font-black text-pagani-red drop-shadow-lg text-5xl md:text-7xl leading-none mb-2 tracking-tight">
                  {activePhase.title}
                </h1>
                <h2 className="font-rajdhani text-pagani-red tracking-[0.2em] text-xl md:text-2xl mb-6">
                  {activePhase.subtitle}
                </h2>
                <p className="font-rajdhani text-pagani-red drop-shadow-md text-lg md:text-xl leading-relaxed max-w-lg">
                  {activePhase.description}
                </p>

                {activePhase.id === 'hero' && (
                  <div className="flex gap-4 mt-8 pointer-events-auto">
                    <button className="bg-pagani-red text-white font-orbitron tracking-widest text-sm px-6 py-3 font-semibold hover:bg-pagani-red-bright transition-colors duration-300">
                      SCROLL TO EXPLORE
                    </button>
                    <a href="#specs" className="border-2 border-near-black text-near-black font-orbitron tracking-widest text-sm px-6 py-3 font-semibold hover:bg-near-black hover:text-white transition-colors duration-300">
                      SPECIFICATIONS
                    </a>
                  </div>
                )}
              </motion.div>

              {/* Right Side Extras */}
              <motion.div variants={childVariants} className="text-right flex flex-col items-end justify-end">
                {activePhase.id === 'hero' && (
                  <div className="mb-8">
                    <div className="font-orbitron font-black text-pagani-red drop-shadow-lg text-4xl mb-1">{huayraData.price}</div>
                    <div className="font-orbitron text-pagani-red tracking-widest text-sm drop-shadow-md">20 UNITS ONLY</div>
                  </div>
                )}
                {activePhase.id === 'exterior' && (
                  <div className="border border-pagani-red p-4 relative bg-white/80 backdrop-blur-sm mb-8">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-pagani-red" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-pagani-red" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-pagani-red" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-pagani-red" />
                    <div className="font-orbitron text-near-black tracking-widest">CARBOTANIUM™</div>
                  </div>
                )}
                {activePhase.id === 'doors' && (
                  <div className="flex items-center gap-4 mb-8 bg-white/80 p-4 backdrop-blur-sm">
                    <div className="relative w-16 h-16 border border-border-gray rounded-full flex items-center justify-center">
                      <div className="w-[1px] h-8 bg-near-black absolute bottom-8 origin-bottom rotate-0" />
                      <motion.div 
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 73 }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                        className="w-[2px] h-8 bg-pagani-red absolute bottom-8 origin-bottom" 
                      />
                    </div>
                    <div className="text-left">
                      <div className="font-orbitron text-pagani-red text-2xl font-bold">73°</div>
                      <div className="font-rajdhani text-mid-gray tracking-widest text-xs uppercase">Opening Angle</div>
                    </div>
                  </div>
                )}
                {activePhase.id === 'engine' && (
                  <div className="flex flex-col gap-4 mb-8">
                    {[{l: "POWER", v: "745 HP"}, {l: "TORQUE", v: "1,000 NM"}, {l: "0-100", v: "2.8 SEC"}].map((spec, i) => (
                      <div key={i} className="text-right pb-2 border-b border-pagani-red">
                        <div className="font-rajdhani text-pagani-red drop-shadow-md tracking-widest text-xs">{spec.l}</div>
                        <div className="font-orbitron font-bold text-pagani-red drop-shadow-lg text-xl">{spec.v}</div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom HUD Elements */}
      <div className="flex justify-between items-end w-full">
        {/* Scroll Indicator */}
        <div className="w-32">
          {activePhase.id === 'hero' && (
            <motion.div 
              initial={{ opacity: 1 }}
              animate={{ opacity: progress > 0.05 ? 0 : 1 }}
              className="flex flex-col items-center absolute bottom-8 left-1/2 -translate-x-1/2"
            >
              <div className="w-[1px] h-16 bg-border-gray relative overflow-hidden mb-2">
                <motion.div 
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="w-full h-1/2 bg-pagani-red absolute top-0" 
                />
              </div>
              <span className="font-orbitron text-pagani-red text-xs tracking-widest">SCROLL</span>
            </motion.div>
          )}
        </div>
        
        {/* Bottom Right Location */}
        <div className="font-rajdhani text-mid-gray text-xs tracking-[0.2em] uppercase bg-white/50 px-2 py-1 backdrop-blur-sm">
          {huayraData.origin} · {huayraData.year}
        </div>
      </div>
    </div>
  );
}
