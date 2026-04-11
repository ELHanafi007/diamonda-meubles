"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  {
    title: "Les Salons",
    subtitle: "Confort & Prestige",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=1000",
    href: "/category/salons",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Chambres",
    subtitle: "Sérénité Absolue",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1000",
    href: "/category/chambres",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Salles à Manger",
    subtitle: "Art de la Table",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1000",
    href: "/category/salles-a-manger",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    title: "Décoration",
    subtitle: "Détails d'Émotion",
    image: "https://images.unsplash.com/photo-1513519247388-19345420d4c4?q=80&w=1000",
    href: "/category/decoration",
    span: "md:col-span-2 md:row-span-1",
  },
];

export default function Categories() {
  return (
    <section className="py-24 bg-white px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.2em] text-xs mb-4 block">Collections</span>
          <h2 className="text-4xl md:text-5xl font-serif">Inspiration par Pièce</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={cat.span}
            >
              <Link
                href={cat.href}
                className="group relative block w-full h-full overflow-hidden bg-beige"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                  />
                </motion.div>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                
                <div className="absolute bottom-10 left-10 z-20 text-white">
                  <p className="text-[10px] uppercase tracking-[0.3em] mb-2 opacity-80">{cat.subtitle}</p>
                  <h3 className="text-3xl font-serif">{cat.title}</h3>
                  <motion.div 
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    className="h-px bg-gold mt-4 origin-left"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
