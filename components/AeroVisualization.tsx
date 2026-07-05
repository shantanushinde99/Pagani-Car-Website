'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import HuayraScrollCanvas from './HuayraScrollCanvas';

export default function AeroVisualization() {
  const [isTesting, setIsTesting] = useState(false);
  const [downforce, setDownforce] = useState(0);

  const progress = useMotionValue(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTesting) {
      animate(progress, 1, { duration: 8, ease: "easeOut" });
      interval = setInterval(() => {
        setDownforce((prev) => Math.min(prev + 25, 1000));
      }, 200);
    } else {
      animate(progress, 0, { duration: 2, ease: "easeOut" });
      interval = setInterval(() => {
        setDownforce((prev) => Math.max(prev - 50, 0));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isTesting, progress]);

  return (
    <section className="bg-pure-white py-32 border-t border-border-gray relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="w-16 h-[1px] bg-pagani-red mx-auto mb-6" />
          <div className="font-orbitron text-pagani-red tracking-[0.2em] text-sm mb-4">ACTIVE AERODYNAMICS</div>
          <h2 className="font-orbitron font-black text-near-black text-4xl md:text-5xl uppercase tracking-tight">
            WIND TUNNEL <span className="text-pagani-red">TESTING</span>
          </h2>
        </div>

        <div className="relative w-full max-w-5xl mx-auto h-[400px] flex items-center justify-center bg-off-white rounded-3xl border border-border-gray overflow-hidden">
          {/* Wind particles */}
          {isTesting && (
            <div className="absolute inset-0 z-0">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-[1px] bg-pagani-red/40"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: '-10%',
                    width: `${Math.random() * 200 + 100}px`
                  }}
                  animate={{
                    x: ['0vw', '100vw']
                  }}
                  transition={{
                    duration: Math.random() * 0.5 + 0.5,
                    ease: "linear",
                    repeat: Infinity,
                    delay: Math.random() * 0.5
                  }}
                />
              ))}
            </div>
          )}

          {/* Aero Frames */}
          <div className="relative z-10 w-full h-[600px] pointer-events-none">
            <HuayraScrollCanvas 
              scrollYProgress={progress} 
              totalFrames={240} 
              imageFolderPath="/images/aero-dynamics" 
            />
          </div>

          {/* Interactive Button */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 select-none">
            <button
              onMouseDown={() => setIsTesting(true)}
              onMouseUp={() => setIsTesting(false)}
              onMouseLeave={() => setIsTesting(false)}
              onTouchStart={() => setIsTesting(true)}
              onTouchEnd={() => setIsTesting(false)}
              className="bg-pagani-red text-white font-orbitron tracking-widest px-8 py-4 uppercase font-bold hover:bg-pagani-red-bright transition-colors active:scale-95 cursor-none"
            >
              {isTesting ? "Testing Aero..." : "Hold to Test Aero"}
            </button>
          </div>
        </div>

        {/* Dynamic Stats */}
        <div className="flex justify-center gap-16 mt-12">
          <div className="text-center">
            <div className="font-rajdhani text-mid-gray tracking-widest text-sm uppercase mb-2">Drag Coefficient</div>
            <div className="font-orbitron font-bold text-near-black text-4xl transition-all duration-300">
              {isTesting ? "0.31 Cd" : "0.36 Cd"}
            </div>
          </div>
          <div className="w-[1px] h-16 bg-border-gray" />
          <div className="text-center">
            <div className="font-rajdhani text-mid-gray tracking-widest text-sm uppercase mb-2">Downforce (280 km/h)</div>
            <div className="font-orbitron font-bold text-pagani-red text-4xl w-32">
              {downforce} kg
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
