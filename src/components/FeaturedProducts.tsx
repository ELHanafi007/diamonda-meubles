"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Plus } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string;
}

export function ProductCard({ id, name, price, image, category }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group"
    >
      <Link href={`/product/${id}`} className="block relative aspect-[4/5] overflow-hidden bg-beige mb-6">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8 }}
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full text-primary hover:bg-gold hover:text-white transition-colors duration-300">
            <Plus size={20} />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-white/40 backdrop-blur-sm">
          <p className="text-[10px] uppercase tracking-widest text-primary mb-1">Aperçu Rapide</p>
        </div>
      </Link>
      
      <div className="flex flex-col space-y-1">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{category}</span>
        <h3 className="text-lg font-serif group-hover:text-gold transition-colors duration-300">{name}</h3>
        <p className="text-sm font-medium">{price} MAD</p>
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
    <section className="py-24 bg-white px-6 border-t border-beige">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-gold uppercase tracking-[0.2em] text-xs mb-4 block">Exclusivités</span>
            <h2 className="text-4xl md:text-5xl font-serif">Pièces Maîtresses</h2>
          </div>
          <Link href="/shop" className="text-xs uppercase tracking-widest border-b border-primary pb-2 hover:text-gold hover:border-gold transition-all duration-300">
            Voir Toute la Collection
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
