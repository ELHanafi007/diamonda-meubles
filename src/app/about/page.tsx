"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/TextReveal";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <section className="px-6 mb-24">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gold uppercase tracking-[0.4em] text-[10px] md:text-xs font-bold block mb-4"
            >
              Notre Héritage
            </motion.span>
            <div className="flex flex-col gap-2">
              <TextReveal 
                text="L'Histoire de" 
                className="text-5xl md:text-8xl font-serif leading-none tracking-tight text-primary"
              />
              <TextReveal 
                text="Diamond Meubles." 
                className="text-5xl md:text-8xl font-serif italic text-gold/80 leading-none tracking-tight"
                delay={0.5}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 mb-32">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="aspect-square overflow-hidden bg-beige shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?q=80&w=1000" 
                alt="Our Workshop" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
            <div className="space-y-8">
              <h3 className="text-3xl font-serif text-primary">Une Passion Transmise</h3>
              <p className="text-muted-foreground leading-relaxed text-lg font-light">
                Depuis plus de deux décennies, Diamond Meubles s'est imposé comme une référence du mobilier de prestige au Maroc. Notre voyage a commencé dans un petit atelier de Casablanca, avec une vision simple : transformer des matériaux nobles en pièces d'exception.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg font-light">
                Aujourd'hui, nous collaborons avec les meilleurs artisans et designers pour créer des collections qui allient le raffinement marocain à l'innovation internationale. Chaque meuble est une promesse de durabilité et de beauté.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-black text-white px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <span className="text-gold font-serif text-5xl">2001</span>
              <p className="text-[10px] uppercase tracking-widest opacity-60">Année de Fondation</p>
            </div>
            <div className="space-y-4">
              <span className="text-gold font-serif text-5xl">5000+</span>
              <p className="text-[10px] uppercase tracking-widest opacity-60">Projets Réalisés</p>
            </div>
            <div className="space-y-4">
              <span className="text-gold font-serif text-5xl">100%</span>
              <p className="text-[10px] uppercase tracking-widest opacity-60">Engagement Qualité</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
