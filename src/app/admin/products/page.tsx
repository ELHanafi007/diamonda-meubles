"use client";

import { useState } from "react";
import { PRODUCTS, Product } from "@/lib/products";
import { CATEGORIES } from "@/lib/categories";
import { Plus, Search, Edit3, Trash2, Filter, Archive, X, Check, Package, Layers, Info, Ruler, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // Tab state: Active vs Archived
  const [activeTab, setActiveTab] = useState<'all' | 'archived'>('all');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // In a real app, products would have an 'archived' boolean
    // For now we'll simulate it with a mock field if it exists
    const isArchived = (p as any).status === 'archived';
    
    if (activeTab === 'archived') return matchesSearch && isArchived;
    return matchesSearch && !isArchived;
  });

  const handleDelete = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer définitivement cette pièce ?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const handleArchive = (id: string) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        return { ...p, status: (p as any).status === 'archived' ? 'active' : 'archived' } as any;
      }
      return p;
    }));
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-gold uppercase tracking-[0.4em] text-[10px] font-bold block mb-2">Gestion Excellence</span>
          <h1 className="text-4xl font-serif text-primary">Le Catalogue</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsCategoryModalOpen(true)}
            className="flex-1 bg-white border border-beige px-6 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-beige transition-all flex items-center justify-center gap-2"
          >
            <Layers size={14} /> Catégories
          </button>
          <button 
            onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
            className="flex-1 bg-black text-white px-6 py-4 text-[10px] uppercase tracking-widest font-bold hover:bg-gold transition-all flex items-center justify-center gap-2 shadow-xl"
          >
            <Plus size={14} /> Ajouter une pièce
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-beige">
        <button 
          onClick={() => setActiveTab('all')}
          className={cn(
            "px-8 py-4 text-[10px] uppercase tracking-widest font-bold border-b-2 transition-all",
            activeTab === 'all' ? "border-gold text-primary" : "border-transparent text-muted-foreground"
          )}
        >
          En Stock ({products.filter(p => (p as any).status !== 'archived').length})
        </button>
        <button 
          onClick={() => setActiveTab('archived')}
          className={cn(
            "px-8 py-4 text-[10px] uppercase tracking-widest font-bold border-b-2 transition-all",
            activeTab === 'archived' ? "border-red-400 text-primary" : "border-transparent text-muted-foreground"
          )}
        >
          Rupture / Archivé ({products.filter(p => (p as any).status === 'archived').length})
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Rechercher par nom ou catégorie..."
          className="w-full bg-white border border-beige px-12 py-5 outline-none focus:border-gold transition-colors text-sm font-light"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold" />
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white border border-beige overflow-hidden group hover:shadow-xl transition-all duration-500"
            >
              <div className="flex p-4 gap-4">
                <div className="w-24 h-32 bg-beige shrink-0 overflow-hidden relative">
                  <img src={product.image} alt="" className="w-full h-full object-cover" />
                  {(product as any).status === 'archived' && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-2 text-center">
                      <span className="text-[8px] text-white font-bold uppercase tracking-widest">Rupture</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                  <div className="space-y-1">
                    <span className="text-[8px] uppercase tracking-widest text-gold font-bold">{product.category}</span>
                    <h3 className="text-base font-serif text-primary truncate pr-2">{product.name}</h3>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest truncate">{product.material}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-sm font-bold text-primary italic">{product.price} MAD</p>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}
                        className="p-2 bg-[#FAFAFA] hover:bg-gold hover:text-white transition-colors text-muted-foreground"
                        title="Éditer"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button 
                        onClick={() => handleArchive(product.id)}
                        className={cn(
                          "p-2 transition-colors",
                          (product as any).status === 'archived' 
                            ? "bg-green-50 text-green-600 hover:bg-green-600 hover:text-white" 
                            : "bg-[#FAFAFA] text-muted-foreground hover:bg-amber-500 hover:text-white"
                        )}
                        title={(product as any).status === 'archived' ? "Remettre en stock" : "Marquer rupture"}
                      >
                        <Archive size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="p-2 bg-[#FAFAFA] hover:bg-red-500 hover:text-white transition-colors text-muted-foreground"
                        title="Supprimer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Full CRUD Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-end lg:items-center justify-center p-0 lg:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-white shadow-2xl overflow-hidden flex flex-col h-[95vh] lg:h-auto lg:max-h-[90vh]"
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-beige flex justify-between items-center bg-white sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold">
                    <Package size={20} />
                  </div>
                  <h2 className="text-2xl font-serif">{editingProduct ? "Éditer la pièce" : "Nouvelle Création"}</h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:rotate-90 transition-transform duration-500"><X size={24} /></button>
              </div>

              <form className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12" onSubmit={(e) => e.preventDefault()}>
                {/* Section 1: Base Info */}
                <div className="space-y-8">
                  <div className="flex items-center gap-2 text-gold">
                    <Info size={14} />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Informations Générales</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Nom du produit</label>
                      <input type="text" defaultValue={editingProduct?.name} className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors font-serif text-xl" placeholder="Ex: Table Grand Palais" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Prix Public (MAD)</label>
                      <input type="text" defaultValue={editingProduct?.price} className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors font-serif text-xl" placeholder="Ex: 28.500" />
                    </div>
                  </div>
                </div>

                {/* Section 2: Classification */}
                <div className="space-y-8">
                  <div className="flex items-center gap-2 text-gold">
                    <Layers size={14} />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Classification & Style</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Catégorie</label>
                      <select className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors font-serif text-lg appearance-none">
                        {CATEGORIES.map(c => <option key={c.id} selected={editingProduct?.category === c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Matériaux Nobles</label>
                      <input type="text" defaultValue={editingProduct?.material} className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors font-serif text-lg" placeholder="Ex: Noyer, Marbre, Bronze" />
                    </div>
                  </div>
                </div>

                {/* Section 3: Details Luxe */}
                <div className="space-y-8">
                  <div className="flex items-center gap-2 text-gold">
                    <Ruler size={14} />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Détails & Dimensions</span>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">URL de l'image haute définition</label>
                      <input type="text" defaultValue={editingProduct?.image} className="w-full bg-[#FAFAFA] border border-beige p-4 outline-none focus:border-gold transition-colors text-xs" placeholder="https://images.unsplash.com/..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Description éditoriale</label>
                      <textarea rows={4} defaultValue={editingProduct?.description} className="w-full bg-[#FAFAFA] border border-beige p-4 outline-none focus:border-gold transition-colors font-light text-sm resize-none" placeholder="Décrivez l'âme de cette pièce..." />
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-8 flex gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-[#FAFAFA] text-primary py-6 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-beige transition-all">Annuler</button>
                  <button type="submit" className="flex-[2] bg-black text-white py-6 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-gold transition-all duration-500 shadow-2xl">
                    {editingProduct ? "Confirmer les modifications" : "Publier au catalogue"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Category Modal */}
      <AnimatePresence>
        {isCategoryModalOpen && (
          <div className="fixed inset-0 z-[400] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCategoryModalOpen(false)} className="absolute inset-0 bg-black/80" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative bg-white p-10 max-w-md w-full shadow-2xl border border-gold/20">
              <h3 className="text-2xl font-serif mb-8">Ajouter un Univers</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Nom de la catégorie</label>
                  <input type="text" className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors font-serif text-lg" placeholder="Ex: Jardin d'Hiver" />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Icône (Emoji)</label>
                  <input type="text" className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors text-lg" placeholder="🛋️" />
                </div>
                <button onClick={() => setIsCategoryModalOpen(false)} className="w-full bg-black text-white py-5 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-gold transition-all">Créer la catégorie</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
