"use client";

import { useState } from "react";
import { PRODUCTS, Product } from "@/lib/products";
import { Plus, Search, Edit3, Trash2, Filter, MoreVertical, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer cette pièce ?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex justify-between items-end">
        <div>
          <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold block mb-2">Gestion</span>
          <h1 className="text-4xl font-serif text-primary">Catalogue</h1>
        </div>
        <button 
          onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
          className="bg-black text-white p-4 rounded-full shadow-xl hover:bg-gold transition-all duration-500 lg:rounded-sm lg:px-8 lg:py-4"
        >
          <Plus size={20} className="lg:hidden" />
          <span className="hidden lg:inline text-[10px] uppercase tracking-widest font-bold">Ajouter une pièce</span>
        </button>
      </header>

      {/* Search & Filter */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Rechercher une pièce..."
            className="w-full bg-white border border-beige px-12 py-4 outline-none focus:border-gold transition-colors text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
        <button className="bg-white border border-beige p-4 text-primary">
          <Filter size={18} />
        </button>
      </div>

      {/* Product List - Mobile Optimized Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white border border-beige p-4 flex gap-4 relative group"
            >
              <div className="w-24 h-32 bg-beige shrink-0 overflow-hidden">
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[8px] uppercase tracking-widest text-gold font-bold">{product.category}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}
                        className="p-1 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-1 text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <h3 className="text-sm font-serif text-primary truncate pr-4">{product.name}</h3>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">{product.material}</p>
                </div>
                <p className="text-sm font-bold text-primary italic">{product.price} MAD</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add/Edit Modal (Slide up on mobile) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-end lg:items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white p-8 lg:p-12 shadow-2xl lg:rounded-sm overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-10 pb-4 border-b border-beige">
                <h2 className="text-2xl font-serif">{editingProduct ? "Modifier la pièce" : "Nouvelle création"}</h2>
                <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
              </div>

              <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Nom de la pièce</label>
                    <input type="text" defaultValue={editingProduct?.name} className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors font-serif text-lg" placeholder="Ex: Table Marble Elite" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Prix (MAD)</label>
                    <input type="text" defaultValue={editingProduct?.price} className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors font-serif text-lg" placeholder="Ex: 12.500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Catégorie</label>
                    <select className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors font-serif text-lg appearance-none">
                      <option>Salon</option>
                      <option>Chambre</option>
                      <option>Salle à manger</option>
                      <option>Éclairage</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Matériau principal</label>
                    <input type="text" defaultValue={editingProduct?.material} className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors font-serif text-lg" placeholder="Ex: Chêne, Marbre, Velours" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">URL de l'image</label>
                  <input type="text" defaultValue={editingProduct?.image} className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors text-sm" placeholder="https://images.unsplash.com/..." />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground">Description luxe</label>
                  <textarea rows={3} defaultValue={editingProduct?.description} className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors font-light text-sm resize-none" placeholder="Décrivez l'exceptionnalité de cette pièce..." />
                </div>

                <div className="pt-8">
                  <button type="submit" className="w-full bg-black text-white py-6 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-gold transition-all duration-500 shadow-xl">
                    Enregistrer les modifications
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
