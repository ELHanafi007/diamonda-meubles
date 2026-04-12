"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/FeaturedProducts";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, LayoutGrid, List } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

const allProducts = [
  {
    id: "1",
    name: "Canapé Royal Velours",
    price: "18.500",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800",
    category: "Salon",
    subCategory: "Canapés",
  },
  {
    id: "2",
    name: "Table Basse Marbre Noir",
    price: "4.200",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800",
    category: "Salon",
    subCategory: "Tables basses",
  },
  {
    id: "3",
    name: "Lit King Size Prestige",
    price: "22.000",
    image: "https://images.unsplash.com/photo-1505693419148-de397e52b827?q=80&w=800",
    category: "Chambre",
    subCategory: "Lits",
  },
  {
    id: "4",
    name: "Fauteuil Pivotant Design",
    price: "3.800",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800",
    category: "Décoration",
    subCategory: "Fauteuils",
  },
  {
    id: "5",
    name: "Table à Manger Chêne Massif",
    price: "12.500",
    image: "https://images.unsplash.com/photo-1530018607912-eff2df114f11?q=80&w=800",
    category: "Salle à manger",
    subCategory: "Tables à manger",
  },
  {
    id: "6",
    name: "Console Entrée Dorée",
    price: "5.400",
    image: "https://images.unsplash.com/photo-1513519247388-19345420d4c4?q=80&w=800",
    category: "Décoration",
    subCategory: "Objets décoratifs",
  },
];

export default function ShopPage({ initialCategory = "Tous" }: { initialCategory?: string }) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState("Tous");

  const categoryNames = ["Tous", ...CATEGORIES.map(c => c.name)];
  
  const currentCategory = useMemo(() => 
    CATEGORIES.find(c => c.name === selectedCategory),
    [selectedCategory]
  );

  const subCategories = useMemo(() => 
    currentCategory ? ["Tous", ...currentCategory.subCategories.map(s => s.name)] : [],
    [currentCategory]
  );

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;
    
    if (selectedCategory !== "Tous") {
      filtered = filtered.filter(p => p.category === selectedCategory);
      
      if (selectedSubCategory !== "Tous") {
        filtered = filtered.filter(p => p.subCategory === selectedSubCategory);
      }
    }
    
    return filtered;
  }, [selectedCategory, selectedSubCategory]);

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen bg-[#FAFAFA]">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold uppercase tracking-[0.4em] text-[10px] mb-4 block font-semibold"
          >
            Collections Exclusive
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-serif mb-12 tracking-tight text-primary"
          >
            {selectedCategory === "Tous" ? "Nos Créations" : selectedCategory}
          </motion.h1>
          
          <div className="space-y-8">
            {/* Main Categories */}
            <div className="flex flex-wrap gap-2 md:gap-3 border-b border-beige pb-8">
              {categoryNames.map((cat, idx) => (
                <motion.button
                  key={cat}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.03 }}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedSubCategory("Tous");
                  }}
                  className={`text-[10px] uppercase tracking-[0.2em] px-5 py-2.5 transition-all duration-500 font-medium ${
                    selectedCategory === cat 
                      ? "bg-primary text-white scale-105 shadow-lg shadow-black/5" 
                      : "bg-white text-muted-foreground hover:bg-beige/50 border border-beige/50"
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            {/* Sub Categories */}
            <AnimatePresence mode="wait">
              {subCategories.length > 0 && (
                <motion.div 
                  key={selectedCategory}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 pt-2">
                    {subCategories.map((sub, idx) => (
                      <motion.button
                        key={sub}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.02 }}
                        onClick={() => setSelectedSubCategory(sub)}
                        className={`text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-full transition-all duration-300 ${
                          selectedSubCategory === sub 
                            ? "bg-gold text-white" 
                            : "bg-beige/30 text-muted-foreground hover:bg-beige/50"
                        }`}
                      >
                        {sub}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Toolbar */}
            <div className="flex items-center justify-between py-4 border-t border-beige/30">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                {filteredProducts.length} PIÈCES TROUVÉES
              </p>
              
              <div className="flex items-center gap-8">
                <div className="hidden md:flex items-center gap-4 border-r border-beige pr-8">
                  <button className="text-primary hover:text-gold transition-colors"><LayoutGrid size={16} /></button>
                  <button className="text-muted-foreground hover:text-gold transition-colors"><List size={16} /></button>
                </div>
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest hover:text-gold transition-colors font-semibold">
                    <Filter size={14} /> Filtrer
                  </button>
                  <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest hover:text-gold transition-colors font-semibold">
                    Trier <ChevronDown size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="py-32 text-center bg-white border border-beige/50 rounded-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="text-primary font-serif italic text-2xl mb-4">Une page blanche...</p>
              <p className="text-muted-foreground text-xs uppercase tracking-widest">Nous n'avons pas encore de pièces dans cette collection.</p>
              <button 
                onClick={() => { setSelectedCategory("Tous"); setSelectedSubCategory("Tous"); }}
                className="mt-8 text-gold uppercase tracking-widest text-[10px] font-bold border-b border-gold pb-1 hover:text-primary hover:border-primary transition-all"
              >
                Voir toutes les collections
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
