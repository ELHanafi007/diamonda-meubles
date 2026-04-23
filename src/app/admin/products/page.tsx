"use client";

import { useState, useEffect, useCallback } from "react";
import { Product } from "@/lib/products";
import { CATEGORIES } from "@/lib/categories";
import { Plus, Search, Edit3, Trash2, Filter, Archive, X, Check, Package, Layers, Info, Ruler, MapPin, Upload, Image as ImageIcon, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedSubCategoryName, setSelectedSubCategoryName] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Dimension states
  const [dimL, setDimL] = useState("");
  const [dimW, setDimW] = useState("");
  const [dimH, setDimH] = useState("");
  
  // Tab state: Active vs Archived
  const [activeTab, setActiveTab] = useState<'all' | 'archived'>('all');

  // Helper to parse dimensions
  const parseDimensions = (dimStr: string | undefined) => {
    if (!dimStr) return { l: "", w: "", h: "" };
    const l = dimStr.match(/L(\d+)/)?.[1] || "";
    const w = dimStr.match(/[Pl](\d+)/)?.[1] || "";
    const h = dimStr.match(/H(\d+)/)?.[1] || "";
    return { l, w, h };
  };

  useEffect(() => {
    if (editingProduct) {
      const { l, w, h } = parseDimensions(editingProduct.dimensions);
      setDimL(l);
      setDimW(w);
      setDimH(h);
      setImagePreviews(editingProduct.images && editingProduct.images.length > 0 ? editingProduct.images : [editingProduct.image]);
      setImageFiles([]);
      setSelectedCategoryName(editingProduct.category);
      setSelectedSubCategoryName(editingProduct.sub_category);
    } else {
      setDimL("");
      setDimW("");
      setDimH("");
      setImagePreviews([]);
      setImageFiles([]);
      setSelectedCategoryName(CATEGORIES[0].name);
      setSelectedSubCategoryName("");
    }
  }, [editingProduct, isModalOpen]);

  const fetchProducts = useCallback(async () => {
    try {
      setFetchLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setFetchLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setImageFiles(prev => [...prev, ...files]);
      
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const isFile = index >= (imagePreviews.length - imageFiles.length);
    if (isFile) {
      const fileIndex = index - (imagePreviews.length - imageFiles.length);
      setImageFiles(prev => prev.filter((_, i) => i !== fileIndex));
    }
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('product_images')
      .upload(fileName, file);

    if (error) throw error;
    
    const { data: publicUrlData } = supabase.storage
      .from('product_images')
      .getPublicUrl(fileName);
      
    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    
    try {
      let finalImageUrls: string[] = [];
      
      const existingUrls = imagePreviews.filter(p => p.startsWith('http'));
      const newUploads = await Promise.all(
        imageFiles.map(file => handleImageUpload(file))
      );

      finalImageUrls = [...existingUrls, ...newUploads];

      if (finalImageUrls.length === 0) {
        alert("Veuillez ajouter au moins une image");
        setLoading(false);
        return;
      }

      const dimensionsStr = dimL || dimW || dimH ? `L${dimL} x P${dimW} x H${dimH} cm` : "";

      const productData = {
        name: formData.get('name'),
        price: formData.get('price'),
        category: formData.get('category'),
        sub_category: formData.get('sub_category') || "",
        material: formData.get('material'),
        dimensions: dimensionsStr,
        weight: formData.get('weight'),
        image: finalImageUrls[0],
        images: finalImageUrls,
        description: formData.get('description'),
      };

      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        if (error) throw error;
      }

      setIsModalOpen(false);
      setImageFiles([]);
      setImagePreviews([]);
      fetchProducts();
      alert("Produit sauvegardé avec succès");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la sauvegarde: " + (err as any).message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const isArchived = (p as any).status === 'archived';
    
    if (activeTab === 'archived') return matchesSearch && isArchived;
    return matchesSearch && !isArchived;
  });

  const handleDelete = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer définitivement cette pièce ?")) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        setProducts(products.filter(p => p.id !== id));
      } catch (err) {
        console.error("Error deleting product:", err);
        alert("Erreur lors de la suppression");
      }
    }
  };

  const handleArchive = async (id: string) => {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const newStatus = (product as any).status === 'archived' ? 'active' : 'archived';

    try {
      const { error } = await supabase
        .from('products')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      setProducts(products.map(p => {
        if (p.id === id) {
          return { ...p, status: newStatus } as any;
        }
        return p;
      }));
    } catch (err) {
      console.error("Error archiving product:", err);
      alert("Erreur lors de la modification du statut");
    }
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
        {fetchLoading ? (
          <div className="col-span-full py-20 flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 border-4 border-beige border-t-gold rounded-full animate-spin"></div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground animate-pulse">Chargement du catalogue...</p>
          </div>
        ) : (
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
        )}
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

              <form className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12" onSubmit={handleSubmit}>
                {/* Section 1: Base Info */}
                <div className="space-y-8">
                  <div className="flex items-center gap-2 text-gold">
                    <Info size={14} />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Informations Générales</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Nom du produit</label>
                      <input name="name" type="text" defaultValue={editingProduct?.name} className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors font-serif text-xl" placeholder="Ex: Table Grand Palais" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Prix Public (MAD)</label>
                      <input name="price" type="text" defaultValue={editingProduct?.price} className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors font-serif text-xl" placeholder="Ex: 28.500" />
                    </div>
                  </div>
                </div>

                {/* Section 2: Classification */}
                <div className="space-y-8">
                  <div className="flex items-center gap-2 text-gold">
                    <Layers size={14} />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Classification & Style</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Catégorie</label>
                      <select 
                        name="category" 
                        value={selectedCategoryName}
                        onChange={(e) => {
                          setSelectedCategoryName(e.target.value);
                          setSelectedSubCategoryName(""); // Reset sub-category when category changes
                        }}
                        className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors font-serif text-lg appearance-none"
                      >
                        {CATEGORIES.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Sous-Catégorie</label>
                      <select 
                        name="sub_category" 
                        value={selectedSubCategoryName}
                        onChange={(e) => setSelectedSubCategoryName(e.target.value)}
                        className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors font-serif text-lg appearance-none"
                      >
                        <option value="">Sélectionner...</option>
                        {CATEGORIES.find(c => c.name === selectedCategoryName)?.subCategories.map(s => (
                          <option key={s.slug} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Matériaux Nobles</label>
                      <input name="material" type="text" defaultValue={editingProduct?.material} className="w-full bg-transparent border-b border-beige py-3 outline-none focus:border-gold transition-colors font-serif text-lg" placeholder="Ex: Noyer, Marbre, Bronze" />
                    </div>
                  </div>
                </div>

                {/* Section 3: Details Luxe */}
                <div className="space-y-8">
                  <div className="flex items-center gap-2 text-gold">
                    <Ruler size={14} />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Détails & Dimensions</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1 block">Dimensions (cm)</label>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <span className="text-[8px] uppercase text-muted-foreground">Longueur</span>
                          <input type="text" value={dimL} onChange={(e) => setDimL(e.target.value)} className="w-full bg-transparent border-b border-beige py-2 outline-none focus:border-gold transition-colors font-serif text-lg" placeholder="L" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] uppercase text-muted-foreground">Profondeur</span>
                          <input type="text" value={dimW} onChange={(e) => setDimW(e.target.value)} className="w-full bg-transparent border-b border-beige py-2 outline-none focus:border-gold transition-colors font-serif text-lg" placeholder="P" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[8px] uppercase text-muted-foreground">Hauteur</span>
                          <input type="text" value={dimH} onChange={(e) => setDimH(e.target.value)} className="w-full bg-transparent border-b border-beige py-2 outline-none focus:border-gold transition-colors font-serif text-lg" placeholder="H" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Poids</label>
                      <input name="weight" type="text" defaultValue={editingProduct?.weight} className="w-full bg-transparent border-b border-beige py-7 outline-none focus:border-gold transition-colors font-serif text-lg" placeholder="Ex: 15 kg" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Galerie Photos</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <AnimatePresence>
                          {imagePreviews.map((preview, index) => (
                            <motion.div 
                              key={index} 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="relative aspect-square rounded-sm overflow-hidden border border-beige group"
                            >
                              <img src={preview} alt="" className="w-full h-full object-cover" />
                              <button 
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash size={12} />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        <label className="aspect-square border-2 border-dashed border-beige hover:border-gold transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer group bg-[#FAFAFA]">
                          <Plus className="text-gold group-hover:scale-110 transition-transform" />
                          <span className="text-[8px] uppercase tracking-widest font-bold text-muted-foreground">Ajouter</span>
                          <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="hidden" />
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest font-bold text-muted-foreground ml-1">Description éditoriale</label>
                      <textarea name="description" rows={4} defaultValue={editingProduct?.description} className="w-full bg-[#FAFAFA] border border-beige p-6 outline-none focus:border-gold transition-colors font-light text-sm resize-none" placeholder="Décrivez l'âme de cette pièce..." />
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-8 flex gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-[#FAFAFA] text-primary py-6 uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-beige transition-all">Annuler</button>
                  <button type="submit" disabled={loading} className="flex-[2] bg-black text-white py-6 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-gold transition-all duration-500 shadow-2xl">
                    {loading ? "Traitement..." : (editingProduct ? "Confirmer les modifications" : "Publier au catalogue")}
                  </button>
                </div>
              </form>            </motion.div>
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
