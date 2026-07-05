'use client';

import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';
import Lenis from '@studio-freight/lenis';
import Navbar from '@/components/Navbar';
import HuayraScrollCanvas from '@/components/HuayraScrollCanvas';
import HuayraExperience from '@/components/HuayraExperience';
import EngineSection from '@/components/EngineSection';
import SpecsGrid from '@/components/SpecsGrid';
import FeaturesSection from '@/components/FeaturesSection';
import AeroVisualization from '@/components/AeroVisualization';
import ExplodedAeroSection from '@/components/ExplodedAeroSection';
import Footer from '@/components/Footer';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main style={{ backgroundColor: '#FFFFFF' }}>
      <Navbar />
      
      {/* SCROLL SEQUENCE — locked for 600vh */}
      <section ref={containerRef} style={{ height: '600vh', position: 'relative' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-pure-white">
          {/* Layer 0: Canvas z-0 */}
          <HuayraScrollCanvas 
            scrollYProgress={scrollYProgress} 
            totalFrames={120} 
            imageFolderPath="/images/huayra-sequence" 
          />
          {/* Layer 1: Subtle vignette — very light, just enough for text contrast */}
          <div style={{ 
            position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.5) 0%, transparent 15%, transparent 80%, rgba(255,255,255,0.7) 100%)'
          }} />
          {/* Layer 2: HUD z-10 */}
          <HuayraExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* REST OF SITE — scrolls naturally */}
      <div style={{ position: 'relative', zIndex: 20, backgroundColor: '#FFFFFF' }}>
        <EngineSection />
        <SpecsGrid />
        <FeaturesSection />
        <AeroVisualization />
        <ExplodedAeroSection />
        <Footer />
      </div>
    </main>
  );
}
