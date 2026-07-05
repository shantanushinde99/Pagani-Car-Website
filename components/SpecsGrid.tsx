'use client';

import { motion } from 'framer-motion';
import { huayraData } from '@/data/carData';

export default function SpecsGrid() {
  return (
    <section id="specs" className="bg-pure-white py-24 relative z-20">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <div className="w-16 h-[1px] bg-pagani-red mb-6" />
          <div className="font-orbitron text-pagani-red tracking-[0.2em] text-sm mb-4">TECHNICAL DATA</div>
          <h2 className="font-orbitron font-black text-near-black text-4xl md:text-5xl uppercase tracking-tight">
            PERFORMANCE <span className="text-pagani-red">SPECIFICATIONS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {huayraData.specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white border border-border-gray p-8 relative overflow-hidden transition-colors duration-300 hover:border-pagani-red"
            >
              <div className="font-rajdhani text-mid-gray tracking-widest text-sm uppercase mb-4">
                {spec.label}
              </div>
              <div className="flex items-baseline gap-2">
                <div className="font-orbitron font-bold text-near-black text-3xl group-hover:text-pagani-red transition-colors duration-300">
                  {spec.value}
                </div>
                <div className="font-orbitron text-mid-gray text-sm tracking-widest">
                  {spec.unit}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 h-[2px] bg-pagani-red w-0 group-hover:w-full transition-all duration-500 ease-out" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
