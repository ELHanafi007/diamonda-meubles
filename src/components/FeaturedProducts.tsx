"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import TextReveal from "./TextReveal";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
  className?: string;
}

export function ProductCard({ id, name, price, image, category, className }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group flex flex-col h-full", className)}
    >
      <Link 
        href={`/product/${id}`} 
        data-cursor="PLUS"
        className="block relative aspect-[3/4] overflow-hidden bg-beige mb-8"
      >
        {/* Subtle Image Zoom */}
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-all duration-1000 ease-in-out select-none"
        />

        {/* Favorite Button */}
        <button className="absolute top-5 right-5 z-20 text-white/70 hover:text-gold transition-colors duration-300 active:scale-90">
          <Heart size={18} strokeWidth={1.5} />
        </button>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out" />
        
        <div className="absolute inset-x-0 bottom-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out z-20">
          <button className="w-full bg-white/90 backdrop-blur-md text-primary py-4 uppercase tracking-[0.3em] text-[9px] font-bold hover:bg-gold hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-3">
            <Plus size={14} /> Aperçu Rapide
          </button>
        </div>
      </Link>
      
      <div className="flex flex-col space-y-3 mt-auto">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-gold font-semibold">{category}</span>
          <div className="h-[1px] bg-beige flex-1" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg md:text-xl font-serif tracking-tight text-primary leading-tight group-hover:text-gold transition-colors duration-500">{name}</h3>
          <p className="text-sm font-medium tracking-tight opacity-70 italic">{price} MAD</p>
        </div>
      </div>
    </motion.div>
  );
}

const featuredProducts = [
  {
    id: "1",
    name: "Canapé Royal Velours",
    price: "18.500",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800",
    category: "Salon",
  },
  {
    id: "2",
    name: "Table Basse Marbre Noir",
    price: "4.200",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800",
    category: "Salon",
  },
  {
    id: "3",
    name: "Lit King Size Prestige",
    price: "22.000",
    image: "https://images.unsplash.com/photo-1505693419148-de397e52b827?q=80&w=800",
    category: "Chambre",
  },
  {
    id: "4",
    name: "Fauteuil Pivotant Design",
    price: "3.800",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800",
    category: "Décoration",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-24 md:py-32 bg-white px-6 border-t border-beige overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-gold uppercase tracking-[0.4em] text-[10px] md:text-xs mb-4 block font-semibold"
            >
              Édition Limitée
            </motion.span>
            <TextReveal 
              text="Pièces Maîtresses" 
              className="text-4xl md:text-6xl font-serif leading-none text-primary"
            />
          </div>
          <Link 
            href="/shop" 
            data-cursor="TOUT"
            className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold pb-2 transition-all duration-300"
          >
            Voir la Collection
            <div className="relative overflow-hidden w-8 h-[1px] bg-primary group-hover:bg-gold transition-colors">
              <motion.div 
                animate={{ x: [-32, 32] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gold w-full h-full translate-x-[-100%]"
              />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20 lg:gap-x-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
