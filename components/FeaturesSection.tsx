'use client';

import { motion } from 'framer-motion';
import { huayraData } from '@/data/carData';

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-pure-white py-24 relative z-20 border-t border-border-gray">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <div className="w-16 h-[1px] bg-pagani-red mb-6" />
          <div className="font-orbitron text-pagani-red tracking-[0.2em] text-sm mb-4">ENGINEERING EXCELLENCE</div>
          <h2 className="font-orbitron font-black text-near-black text-4xl md:text-5xl uppercase tracking-tight">
            DEFINING <span className="text-pagani-red">FEATURES</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {huayraData.features.map((feature, i) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-white p-8 md:p-12 border-l-2 border-pagani-red shadow-sm hover:shadow-md transition-all duration-500 hover:bg-[#FFF5F5]"
            >
              <div className="font-orbitron font-bold text-pagani-red text-2xl mb-4 opacity-50">
                {feature.number}
              </div>
              <h3 className="font-orbitron font-bold text-near-black text-2xl mb-4 group-hover:text-pagani-red transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="font-rajdhani text-mid-gray text-lg leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
