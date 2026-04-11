"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Zoom Animation */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-black/30 z-10" 
          aria-hidden="true"
        />
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000"
          alt="Luxury Living Room"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-white uppercase tracking-[0.3em] text-sm mb-4 block"
        >
          Bienvenue chez Diamond Meubles
        </motion.span>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-5xl md:text-8xl text-white font-serif mb-8 leading-tight"
        >
          L'Élégance <br />
          <span className="italic text-white/90">Redéfinie</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button className="bg-white text-primary px-10 py-4 uppercase tracking-widest text-xs hover:bg-gold hover:text-white transition-all duration-500">
            Explorer la Collection
          </button>
          <button className="border border-white text-white px-10 py-4 uppercase tracking-widest text-xs hover:bg-white hover:text-primary transition-all duration-500">
            Nos Ambiances
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] opacity-70">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown size={16} className="opacity-70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
