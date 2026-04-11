"use client";

import { useState } from "react";
import { ProductCard } from "@/components/FeaturedProducts";
import { motion } from "framer-motion";
import { Filter, ChevronDown } from "lucide-react";

const allProducts = [
  {
    id: "1",
    name: "Canapé Royal Velours",
    price: "18.500",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800",
    category: "Salons",
  },
  {
    id: "2",
    name: "Table Basse Marbre Noir",
    price: "4.200",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800",
    category: "Salons",
  },
  {
    id: "3",
    name: "Lit King Size Prestige",
    price: "22.000",
    image: "https://images.unsplash.com/photo-1505693419148-de397e52b827?q=80&w=800",
    category: "Chambres",
  },
  {
    id: "4",
    name: "Fauteuil Pivotant Design",
    price: "3.800",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800",
    category: "Décoration",
  },
  {
    id: "5",
    name: "Table à Manger Chêne Massif",
    price: "12.500",
    image: "https://images.unsplash.com/photo-1530018607912-eff2df114f11?q=80&w=800",
    category: "Salles à Manger",
  },
  {
    id: "6",
    name: "Console Entrée Dorée",
    price: "5.400",
    image: "https://images.unsplash.com/photo-1513519247388-19345420d4c4?q=80&w=800",
    category: "Décoration",
  },
];

const categories = ["Tous", "Salons", "Chambres", "Salles à Manger", "Décoration"];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredProducts = selectedCategory === "Tous" 
    ? allProducts 
    : allProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-16">
          <span className="text-gold uppercase tracking-[0.3em] text-xs mb-4 block">Collections</span>
          <h1 className="text-5xl md:text-7xl font-serif mb-8">Nos Créations</h1>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-beige pb-8">
            <div className="flex flex-wrap gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs uppercase tracking-widest px-6 py-2 border transition-all duration-300 ${
                    selectedCategory === cat 
                      ? "bg-black text-white border-black" 
                      : "border-beige hover:border-gold text-muted-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-xs uppercase tracking-widest">
                <Filter size={14} /> Filtrer
              </button>
              <button className="flex items-center gap-2 text-xs uppercase tracking-widest">
                Trier <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-muted-foreground font-serif italic text-xl">Aucun produit trouvé dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
}
