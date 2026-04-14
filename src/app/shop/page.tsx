"use client";

import { useState, useMemo, useEffect } from "react";
import { ProductCard } from "@/components/FeaturedProducts";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronDown, LayoutGrid, List, X } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

export default function ShopPage({ initialCategory = "Tous" }: { initialCategory?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState("Tous");
  const [selectedMaterial, setSelectedMaterial] = useState("Tous");
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoryNames = ["Tous", ...CATEGORIES.map(c => c.name)];
  
  const materials = useMemo(() => {
    const allMaterials = products.map(p => p.material).filter(Boolean);
    return ["Tous", ...Array.from(new Set(allMaterials))];
  }, [products]);

  const currentCategory = useMemo(() => 
    CATEGORIES.find(c => c.name === selectedCategory),
    [selectedCategory]
  );

  const subCategories = useMemo(() => 
    currentCategory ? ["Tous", ...currentCategory.subCategories.map(s => s.name)] : [],
    [currentCategory]
  );

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const categoryMatch = selectedCategory === "Tous" || p.category === selectedCategory;
      const subCategoryMatch = selectedSubCategory === "Tous" || p.subCategory === selectedSubCategory;
      const materialMatch = selectedMaterial === "Tous" || p.material === selectedMaterial;
      const priceValue = parseInt(p.price.replace(".", "").replace(/\s/g, ""));
      const priceMatch = priceValue <= maxPrice;
      
      return categoryMatch && subCategoryMatch && materialMatch && priceMatch;
    });
  }, [products, selectedCategory, selectedSubCategory, selectedMaterial, maxPrice]);

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

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between py-4 border-t border-beige/30 gap-6">
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium border-r border-beige pr-4">
                  {filteredProducts.length} PIÈCES TROUVÉES
                </p>
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold transition-colors",
                    showFilters ? "text-gold" : "text-primary hover:text-gold"
                  )}
                >
                  <Filter size={14} /> {showFilters ? "Fermer Filtres" : "Affiner la recherche"}
                </button>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="hidden md:flex items-center gap-4 border-r border-beige pr-8">
                  <button className="text-primary hover:text-gold transition-colors"><LayoutGrid size={16} /></button>
                  <button className="text-muted-foreground hover:text-gold transition-colors"><List size={16} /></button>
                </div>
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest hover:text-gold transition-colors font-semibold">
                    Trier <ChevronDown size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden bg-white border border-beige/50 p-8 shadow-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Sub-categories */}
                    <div className="space-y-6">
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Sous-Catégories</p>
                      <div className="flex flex-wrap gap-2">
                        {subCategories.length > 0 ? subCategories.map((sub) => (
                          <button
                            key={sub}
                            onClick={() => setSelectedSubCategory(sub)}
                            className={`text-[9px] uppercase tracking-widest px-4 py-2 border transition-all ${
                              selectedSubCategory === sub 
                                ? "bg-primary text-white border-primary" 
                                : "bg-transparent border-beige text-muted-foreground hover:border-gold"
                            }`}
                          >
                            {sub}
                          </button>
                        )) : (
                          <p className="text-[10px] italic text-muted-foreground">Sélectionnez une catégorie principale</p>
                        )}
                      </div>
                    </div>

                    {/* Materials */}
                    <div className="space-y-6">
                      <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Matériaux</p>
                      <div className="flex flex-wrap gap-2">
                        {materials.map((mat) => (
                          <button
                            key={mat}
                            onClick={() => setSelectedMaterial(mat)}
                            className={`text-[9px] uppercase tracking-widest px-4 py-2 border transition-all ${
                              selectedMaterial === mat 
                                ? "bg-primary text-white border-primary" 
                                : "bg-transparent border-beige text-muted-foreground hover:border-gold"
                            }`}
                          >
                            {mat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold">Budget Max</p>
                        <span className="text-xs font-serif">{maxPrice.toLocaleString()} MAD</span>
                      </div>
                      <input 
                        type="range" 
                        min="1000" 
                        max="100000" 
                        step="1000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        className="w-full accent-gold h-1 bg-beige rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-[8px] uppercase tracking-widest text-muted-foreground">
                        <span>1.000 MAD</span>
                        <span>100.000 MAD</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-beige/30 flex justify-end">
                    <button 
                      onClick={() => {
                        setSelectedSubCategory("Tous");
                        setSelectedMaterial("Tous");
                        setMaxPrice(100000);
                      }}
                      className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <X size={10} /> Réinitialiser les filtres
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-beige border-t-gold rounded-full animate-spin"></div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Récupération de la collection...</p>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-10 md:gap-y-20">
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
                  <p className="text-primary font-serif italic text-2xl mb-4">Aucune pièce trouvée...</p>
                  <p className="text-muted-foreground text-xs uppercase tracking-widest">Essayez d'ajuster vos filtres pour trouver votre bonheur.</p>
                  <button 
                    onClick={() => { 
                      setSelectedCategory("Tous"); 
                      setSelectedSubCategory("Tous"); 
                      setSelectedMaterial("Tous");
                      setMaxPrice(100000);
                    }}
                    className="mt-8 text-gold uppercase tracking-widest text-[10px] font-bold border-b border-gold pb-1 hover:text-primary hover:border-primary transition-all"
                  >
                    Voir toutes les collections
                  </button>
                </motion.div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
