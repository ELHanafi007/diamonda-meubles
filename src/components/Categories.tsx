"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import TextReveal from "./TextReveal";

const categories = [
  {
    title: "Les Salons",
    subtitle: "Confort & Prestige",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000",
    href: "/category/salons",
    className: "md:col-span-8 md:row-span-2 aspect-[16/9] md:aspect-auto",
  },
  {
    title: "Chambres",
    subtitle: "Sérénité Absolue",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1000",
    href: "/category/chambres",
    className: "md:col-span-4 md:row-span-1 aspect-square md:aspect-auto",
  },
  {
    title: "Art de la Table",
    subtitle: "Salles à Manger",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000",
    href: "/category/salles-a-manger",
    className: "md:col-span-4 md:row-span-1 aspect-square md:aspect-auto",
  },
  {
    title: "Détails d'Émotion",
    subtitle: "Décoration",
    image: "https://images.unsplash.com/photo-1513519247388-19345420d4c4?q=80&w=1000",
    href: "/category/decoration",
    className: "md:col-span-12 md:row-span-1 aspect-[21/9] md:aspect-auto",
  },
];

export default function Categories() {
  return (
    <section className="py-24 md:py-32 bg-white px-6 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 block font-semibold"
            >
              L'Art du Design
            </motion.span>
            <TextReveal 
              text="Inspiration par Pièce" 
              className="text-4xl md:text-6xl font-serif leading-tight text-primary"
            />
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-muted-foreground text-xs md:text-sm uppercase tracking-widest max-w-xs leading-relaxed"
          >
            Chaque espace est une page blanche que nous sublimons avec élégance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-3 gap-4 md:gap-6 md:h-[120vh]">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={cn("relative group overflow-hidden bg-beige", cat.className)}
            >
              <Link
                href={cat.href}
                data-cursor="VOIR"
                className="block w-full h-full"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full"
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000 ease-in-out"
                  />
                </motion.div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700 z-10 pointer-events-none" />
                
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20 text-white pointer-events-none">
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-2 md:mb-4 opacity-70 font-medium"
                  >
                    {cat.subtitle}
                  </motion.p>
                  <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif tracking-tight leading-none group-hover:text-gold transition-colors duration-500">
                    {cat.title}
                  </h3>
                  <div className="h-[1px] bg-white/30 w-full mt-6 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
