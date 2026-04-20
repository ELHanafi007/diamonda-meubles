"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const SIGNATURE_PIECES = [
  {
    id: 1,
    title: "Le Canapé Royal",
    subtitle: "Édition Velours de Soie",
    image: "/salon.jpeg",
    description: "Une pièce d'exception alliant confort moderne et artisanat traditionnel marocain."
  },
  {
    id: 2,
    title: "Table Basse Atlas",
    subtitle: "Marbre & Bronze",
    image: "/tabledebasse.jpeg",
    description: "L'élégance brute des montagnes de l'Atlas sculptée dans le marbre blanc."
  },
  {
    id: 3,
    title: "Console Diamant",
    subtitle: "Bois de Noyer",
    image: "/Console.jpeg",
    description: "Un jeu de facettes et de lumières pour sublimer vos entrées."
  }
];

export default function SignatureCollection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="py-32 md:py-64 bg-[#0A0A0A] text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 md:mb-40 gap-10">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-gold uppercase tracking-[0.5em] text-[10px] md:text-xs font-bold mb-6 block"
            >
              Collection Signature
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-8xl lg:text-9xl font-serif leading-[0.85] tracking-tighter"
            >
              L'Art de <br />
              <span className="italic text-gold/80 font-extralight ml-10 md:ml-20">l'Exception.</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="hidden md:block max-w-xs"
          >
            <p className="text-white/40 text-xs uppercase tracking-[0.3em] leading-relaxed">
              Des pièces numérotées, conçues pour ceux qui ne font aucun compromis sur l'élégance.
            </p>
          </motion.div>
        </div>

        <div className="space-y-40 md:space-y-80">
          {SIGNATURE_PIECES.map((piece, index) => (
            <div 
              key={piece.id}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16 md:gap-32`}
            >
              <motion.div 
                style={{ y: index % 2 === 0 ? y1 : y2 }}
                className="w-full md:w-3/5 aspect-[4/5] relative overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,0.5)]"
              >
                <Image 
                  src={piece.image} 
                  alt={piece.title}
                  fill
                  className="object-cover transition-transform duration-[3000ms] group-hover:scale-110 grayscale hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-1000" />
              </motion.div>

              <div className="w-full md:w-2/5 space-y-10">
                <div className="space-y-6">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "3rem" }}
                    viewport={{ once: true }}
                    className="h-[1px] bg-gold"
                  />
                  <div className="space-y-2">
                    <h3 className="text-4xl md:text-6xl font-serif tracking-tight">{piece.title}</h3>
                    <p className="text-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-medium">{piece.subtitle}</p>
                  </div>
                  <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed">
                    {piece.description}
                  </p>
                </div>
                
                <Link 
                  href="/shop"
                  className="group inline-flex items-center gap-6 py-4 border-b border-white/20 hover:border-gold transition-all duration-500"
                >
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Découvrir la pièce</span>
                  <ArrowRight size={16} className="text-gold group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
