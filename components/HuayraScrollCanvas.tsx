'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, MotionValue } from 'framer-motion';

interface Props {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
}

export default function HuayraScrollCanvas({ scrollYProgress, totalFrames, imageFolderPath }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(-1);

  // Preload images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const frameString = i.toString().padStart(6, '0');
      img.src = `${imageFolderPath}/frame_${frameString}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      images.push(img);
    }
    
    imagesRef.current = images;
  }, [totalFrames, imageFolderPath]);

  // Draw frame logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFrame = (frameIndex: number) => {
      if (frameIndex === currentFrameRef.current) return;
      if (!imagesRef.current[frameIndex]) return;

      const img = imagesRef.current[frameIndex];
      if (!img.complete) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      // Fill background
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, rect.width, rect.height);

      // Object fit contain logic
      const hRatio = rect.width / img.width;
      const vRatio = rect.height / img.height;
      const ratio = Math.min(hRatio, vRatio);
      
      const centerShift_x = (rect.width - img.width * ratio) / 2;
      const centerShift_y = (rect.height - img.height * ratio) / 2;

      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );

      currentFrameRef.current = frameIndex;
    };

    // Initial draw once loaded
    if (imagesLoaded > 0 && imagesRef.current[0]?.complete) {
      drawFrame(0);
    }

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.floor(latest * totalFrames)
      );
      requestAnimationFrame(() => drawFrame(frameIndex));
    });

    const observer = new ResizeObserver(() => {
      // Force redraw on resize
      const current = currentFrameRef.current;
      currentFrameRef.current = -1; 
      drawFrame(Math.max(0, current));
    });
    
    observer.observe(canvas);

    return () => {
      unsubscribe();
      observer.disconnect();
    };
  }, [scrollYProgress, totalFrames, imagesLoaded]);

  const loadProgress = Math.floor((imagesLoaded / totalFrames) * 100);

  return (
    <>
      {imagesLoaded < totalFrames && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-pure-white">
          <svg width="240" height="80" viewBox="0 0 240 80" className="mb-8">
            <motion.path
              d="M 20 60 C 30 60 40 50 50 35 C 70 10 110 5 150 15 C 180 25 190 35 210 45 C 220 50 230 55 240 55"
              fill="transparent"
              strokeWidth="3"
              stroke="var(--color-pagani-red)"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </svg>
          <div className="font-orbitron text-pagani-red tracking-widest text-xl mb-4">LOADING</div>
          <div className="w-64 h-1 bg-border-gray overflow-hidden">
            <div 
              className="h-full bg-pagani-red transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div className="font-rajdhani text-mid-gray mt-2">{loadProgress}%</div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
    </>
  );
}
