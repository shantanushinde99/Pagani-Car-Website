'use client';

import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import HuayraScrollCanvas from './HuayraScrollCanvas';

export default function EngineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0]);
  const yOffset = useTransform(scrollYProgress, [0, 0.05], [50, 0]);

  return (
    <section id="engine-exhibition" ref={containerRef} style={{ height: '500vh', position: 'relative' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-pure-white border-t border-border-gray">
        {/* Layer 0: Canvas */}
        <HuayraScrollCanvas 
          scrollYProgress={scrollYProgress} 
          totalFrames={144} 
          imageFolderPath="/images/engine-sequence" 
        />
        
        {/* Layer 1: Subtle vignette */}
        <div style={{ 
          position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
          background: 'radial-gradient(circle at center, transparent 40%, rgba(255,255,255,0.8) 100%)'
        }} />
        
        {/* Layer 2: HUD Overlay */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-between py-32 px-8"
        >
          <motion.div style={{ y: yOffset }} className="text-center">
            <div className="w-16 h-[1px] bg-pagani-red mx-auto mb-6" />
            <div className="font-orbitron text-pagani-red tracking-[0.3em] text-sm mb-4 uppercase drop-shadow-md">
              Mechanical Architecture
            </div>
            <h2 className="font-orbitron font-black text-pagani-red drop-shadow-lg text-4xl md:text-6xl uppercase tracking-tight">
              M158 V12 <span className="text-near-black">BITURBO</span>
            </h2>
          </motion.div>

          <div className="flex justify-between items-end w-full max-w-7xl mx-auto">
            <div className="max-w-md bg-white/60 p-6 backdrop-blur-sm border-l-2 border-pagani-red">
              <div className="font-rajdhani text-pagani-red font-bold text-xl tracking-widest mb-2 uppercase drop-shadow-md">
                Anti-Gravity Exhibition
              </div>
              <p className="font-rajdhani text-near-black font-semibold text-lg leading-relaxed">
                6.0L twin-turbocharged V12 separated with absolute mechanical precision. 
                Every component hovers perfectly parallel to its original engineering position.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
