"use client";

import { use, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, ArrowLeft, Heart, Share2, Ruler, ShieldCheck, Truck, ShoppingBag, 
  ChevronLeft, ChevronRight, Star, Clock, CheckCircle, X, Zap
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import Recommendations from "@/components/Recommendations";
import { Product } from "@/lib/products";
import { useWishlist } from "@/lib/WishlistContext";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";

// Breadcrumb Component
function Breadcrumbs({ product }: { product: Product }) {
  return (
    <nav aria-label="Fil d'Ariane" className="mb-8">
      <ol className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
        <li><Link href="/" className="hover:text-gold transition-colors">Accueil</Link></li>
        <li aria-hidden="true">/</li>
        <li><Link href="/shop" className="hover:text-gold transition-colors">Collections</Link></li>
        <li aria-hidden="true">/</li>
        <li><Link href={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-gold transition-colors">{product.category}</Link></li>
        <li aria-hidden="true">/</li>
        <li className="text-primary font-bold" aria-current="page">{product.name}</li>
      </ol>
    </nav>
  );
}

// Star Rating Component
function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={cn(
              "transition-colors",
              star <= Math.floor(rating) ? "fill-gold text-gold" : "text-beige"
            )}
          />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">
        {rating}/5 ({reviews} avis)
      </span>
    </div>
  );
}

// Image Gallery Component
function ImageGallery({ images, productName }: { images: string[]; productName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="aspect-[4/5] overflow-hidden bg-beige shadow-2xl relative group cursor-zoom-in"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex]}
              alt={`${productName} - Vue ${currentIndex + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold hover:text-white"
              aria-label="Image précédente"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur-sm p-3 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gold hover:text-white"
              aria-label="Image suivante"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 z-20 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 text-[10px] uppercase tracking-widest">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </motion.div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "aspect-square overflow-hidden border-2 transition-all duration-300",
                currentIndex === idx ? "border-gold shadow-lg" : "border-transparent hover:border-beige"
              )}
              aria-label={`Vue ${idx + 1} de ${productName}`}
            >
              <Image
                src={img}
                alt={`${productName} - Miniature ${idx + 1}`}
                width={150}
                height={150}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isFavorite = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        // Fetch product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', resolvedParams.id)
          .single();

        if (productError) throw productError;
        setProduct(productData);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [resolvedParams.id]);

  const toggleWishlist = () => {
    if (!product) return;
    if (isFavorite) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  if (loading) {
    return (
      <div className="pt-64 pb-32 flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 border-4 border-beige border-t-gold rounded-full animate-spin"></div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground animate-pulse">Chargement de la pièce d'exception...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-64 pb-32 text-center">
        <h1 className="text-4xl font-serif mb-8">Pièce introuvable</h1>
        <Link href="/shop" className="text-gold uppercase tracking-widest text-xs border-b border-gold pb-1">Retour aux collections</Link>
      </div>
    );
  }

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-7xl">
        {/* Breadcrumbs */}
        <Breadcrumbs product={product} />

        {/* Back Button */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest mb-12 hover:text-gold transition-colors font-bold">
          <ArrowLeft size={14} /> Retour aux collections
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <ImageGallery images={productImages} productName={product.name} />
          </div>

          {/* Info */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-gold uppercase tracking-[0.4em] text-[10px] mb-4 block font-bold"
              >
                {product.category} — {product.sub_category}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-6xl font-serif mb-6 leading-tight text-primary tracking-tight"
              >
                {product.name}
              </motion.h1>
              
              {/* Rating */}
              {(product.rating || 0) > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <StarRating rating={product.rating || 0} reviews={product.reviews || 0} />
                </motion.div>
              )}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-serif italic text-gold"
              >
                {product.price} MAD
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground leading-relaxed text-lg font-light"
            >
              {product.description}
            </motion.p>

            {/* Specifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6 border-y border-beige py-10"
            >
              <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-primary mb-6">Spécifications</h3>
              
              <div className="grid grid-cols-2 gap-6">
                {product.dimensions && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-gold shrink-0">
                      <Ruler size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">Dimensions</span>
                      <span className="text-sm font-medium">{product.dimensions}</span>
                    </div>
                  </div>
                )}

                {product.weight && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-gold shrink-0">
                      <ShieldCheck size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">Poids</span>
                      <span className="text-sm font-medium">{product.weight}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-gold shrink-0">
                    <ShieldCheck size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">Matériau</span>
                    <span className="text-sm font-medium">{product.material}</span>
                  </div>
                </div>

                {product.warranty && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-gold shrink-0">
                      <CheckCircle size={18} strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">Garantie</span>
                      <span className="text-sm font-medium">{product.warranty}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-gold shrink-0">
                  <Truck size={18} strokeWidth={1.5} />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">Livraison</span>
                  <span className="text-sm font-medium">{product.deliveryTime || "Sur devis"}</span>
                </div>
              </div>

              {product.customizable && (
                <div className="flex items-center gap-6 pt-2">
                  <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-gold shrink-0">
                    <Zap size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground block mb-1">Personnalisation</span>
                    <span className="text-sm font-medium text-gold">Disponible sur demande</span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Actions */}
            <div className="flex flex-col gap-6">
              <button
                onClick={toggleWishlist}
                className={cn(
                  "group relative w-full py-7 uppercase tracking-[0.3em] text-[10px] font-bold overflow-hidden transition-all duration-500 hover:shadow-2xl flex items-center justify-center gap-4",
                  isFavorite ? "bg-gold text-white" : "bg-black text-white hover:bg-gold"
                )}
              >
                <span className="relative z-10 flex items-center justify-center gap-4">
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  {isFavorite ? "Dans votre panier" : "Ajouter au Panier"}
                </span>
                {!isFavorite && <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />}
              </button>

              <div className="flex gap-4">
                <a
                  href={`https://wa.me/212707951123?text=${encodeURIComponent("Bonjour, je souhaite plus d'informations sur le produit : " + product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 border border-beige py-5 flex items-center justify-center gap-3 hover:border-gold transition-all duration-500 uppercase tracking-[0.2em] text-[10px] font-bold"
                >
                  <MessageCircle size={16} /> Consulter un expert
                </a>
                <button className="flex-1 border border-beige py-5 flex items-center justify-center gap-3 hover:border-gold transition-all duration-500 uppercase tracking-[0.2em] text-[10px] font-bold">
                  <Share2 size={16} /> Partager
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <Recommendations currentProduct={product} />
      </div>
    </div>
  );
}
