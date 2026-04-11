"use client";

import { motion } from "framer-motion";
import TextReveal from "./TextReveal";
import Link from "next/link";

export default function Atelier() {
  return (
    <section className="py-24 md:py-48 bg-white px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 items-center">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="space-y-12">
              <div className="space-y-4">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold block"
                >
                  L'Âme de la Maison
                </motion.span>
                <div className="flex flex-col">
                  <TextReveal 
                    text="L'Excellence du" 
                    className="text-4xl md:text-6xl lg:text-8xl font-serif leading-none tracking-tight text-primary"
                  />
                  <TextReveal 
                    text="Savoir-Faire." 
                    className="text-4xl md:text-6xl lg:text-8xl font-serif italic text-gold/80 leading-none tracking-tight"
                    delay={0.5}
                  />
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
                className="space-y-8"
              >
                <p className="text-muted-foreground leading-relaxed text-lg md:text-xl font-light">
                  Chaque pièce Diamond Meubles naît d'un dialogue entre la matière et la main de l'homme. Dans notre atelier, les traditions séculaires rencontrent l'innovation contemporaine pour créer l'exceptionnel.
                </p>
                <div className="grid grid-cols-2 gap-8 py-8 border-y border-beige">
                  <div className="space-y-2">
                    <span className="text-primary font-serif text-3xl">15+</span>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Maîtres Artisans</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-primary font-serif text-3xl">100%</span>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Fait à la Main</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <Link 
                  href="/about"
                  className="group relative inline-block border border-primary text-primary px-12 py-6 uppercase tracking-[0.3em] text-[10px] font-bold overflow-hidden transition-all duration-500"
                >
                  <span className="relative z-10">Explorer l'Atelier</span>
                  <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                  <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">Explorer l'Atelier</span>
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4 md:gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="aspect-[3/4] overflow-hidden"
              >
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800" 
                  alt="Craftsmanship" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="aspect-[3/4] overflow-hidden mt-12 md:mt-24"
              >
                <img 
                  src="https://images.unsplash.com/photo-1541534401786-227767794823?q=80&w=800" 
                  alt="Materials" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
