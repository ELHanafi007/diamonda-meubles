"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Slow Cinematic Zoom */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute inset-0 bg-black/35 z-10" 
          aria-hidden="true"
        />
        <img
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000"
          alt="Luxury Living Room"
          className="h-full w-full object-cover select-none"
        />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 md:space-y-10"
        >
          <span className="text-white/80 uppercase tracking-[0.5em] text-[10px] md:text-xs font-medium block">
            L'Excellence du Mobilier Marocain
          </span>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl text-white font-serif leading-[1.1] md:leading-[1.05] tracking-tight">
            L'Élégance <br />
            <span className="italic font-extralight text-white/95">Redéfinie</span>
          </h1>

          <p className="text-white/70 text-xs md:text-sm uppercase tracking-[0.3em] font-light max-w-md mx-auto leading-relaxed hidden sm:block">
            Créateur d'espaces d'exception et de moments inoubliables.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 pt-8"
          >
            <button className="w-full sm:w-auto bg-white text-primary px-12 py-5 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-gold hover:text-white transition-all duration-700 ease-in-out shadow-xl">
              La Collection
            </button>
            <button className="w-full sm:w-auto border border-white/40 text-white px-12 py-5 uppercase tracking-[0.25em] text-[10px] font-bold hover:bg-white hover:text-primary transition-all duration-700 ease-in-out backdrop-blur-sm">
              Nos Ambiances
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 text-white flex flex-col items-center gap-4"
      >
        <div className="h-16 w-[1px] bg-gradient-to-b from-white/0 via-white/50 to-white/0 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 64] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
          />
        </div>
        <span className="text-[9px] uppercase tracking-[0.4em] opacity-50 font-medium">Découvrir</span>
      </motion.div>
    </section>
  );
}
