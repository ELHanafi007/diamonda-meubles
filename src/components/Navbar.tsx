"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search, ChevronDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/lib/categories";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Collections", href: "/shop", hasDropdown: true },
  { name: "L'Atelier", href: "/#atelier" },
  { name: "Showroom", href: "/#showroom" },
  { name: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isScrolled 
          ? "bg-white/90 backdrop-blur-xl py-3 shadow-[0_2px_20px_-10px_rgba(0,0,0,0.1)]" 
          : "bg-transparent py-8 md:py-10"
      )}
      onMouseLeave={() => setShowMegaMenu(false)}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-primary p-2 -ml-2 transition-transform active:scale-95"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Menu"
        >
          <Menu size={22} />
        </button>

        {/* Navigation Links - Desktop Left */}
        <div className="hidden lg:flex items-center space-x-10 flex-1">
          {navLinks.slice(1, 3).map((link) => (
            <div 
              key={link.name}
              onMouseEnter={() => link.hasDropdown && setShowMegaMenu(true)}
              className="relative py-2"
            >
              <Link
                href={link.href}
                className={cn(
                  "text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-500 hover:text-gold flex items-center gap-1 group",
                  pathname === link.href ? "text-gold" : "text-primary/80"
                )}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown size={10} className={cn("transition-transform duration-500", showMegaMenu && "rotate-180")} />}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-500 ease-out",
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            </div>
          ))}
        </div>

        {/* Logo */}
        <Link
          href="/"
          className="flex-1 flex justify-center"
        >
          <motion.div
            animate={{ scale: isScrolled ? 0.9 : 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl lg:text-3xl font-serif tracking-[-0.05em] text-primary whitespace-nowrap"
          >
            DIAMOND <span className="text-gold font-extralight italic">MEUBLES</span>
          </motion.div>
        </Link>

        {/* Navigation Links - Desktop Right */}
        <div className="hidden lg:flex items-center justify-end space-x-10 flex-1">
          {navLinks.slice(3).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-500 hover:text-gold relative group",
                pathname === link.href ? "text-gold" : "text-primary/80"
              )}
            >
              {link.name}
              <span className={cn(
                "absolute -bottom-1 left-0 h-[1px] bg-gold transition-all duration-500 ease-out",
                pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
          <div className="flex items-center space-x-6 ml-4">
            <button className="text-primary/70 hover:text-gold transition-colors duration-300 active:scale-90">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button className="text-primary/70 hover:text-gold transition-colors duration-300 active:scale-90">
              <ShoppingBag size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Mobile Icons */}
        <div className="flex lg:hidden items-center">
          <button className="text-primary/80 p-2 -mr-2 active:scale-90 transition-transform">
            <ShoppingBag size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Mega Menu */}
      <AnimatePresence>
        {showMegaMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-t border-beige shadow-2xl overflow-hidden"
            onMouseEnter={() => setShowMegaMenu(true)}
          >
            <div className="container mx-auto px-6 py-12">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-10">
                {CATEGORIES.map((cat, idx) => (
                  <motion.div 
                    key={cat.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="space-y-4"
                  >
                    <Link 
                      href={`/category/${cat.slug}`}
                      onClick={() => setShowMegaMenu(false)}
                      className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary hover:text-gold transition-colors block border-b border-beige pb-2"
                    >
                      {cat.icon} {cat.name}
                    </Link>
                    <ul className="space-y-2">
                      {cat.subCategories.slice(0, 5).map((sub) => (
                        <li key={sub.slug}>
                          <Link 
                            href={`/category/${cat.slug}`}
                            onClick={() => setShowMegaMenu(false)}
                            className="text-[9px] uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-6 border-b border-beige">
              <span className="text-xl font-serif tracking-tighter text-primary">
                DIAMOND <span className="text-gold italic font-extralight">MEUBLES</span>
              </span>
              <button 
                className="p-2 active:rotate-90 transition-transform duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="space-y-8">
                {/* Primary Links */}
                <div className="space-y-6">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-3xl font-serif tracking-tight">Accueil</Link>
                  <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block text-3xl font-serif tracking-tight">Toutes les Collections</Link>
                </div>

                <div className="h-[1px] bg-beige w-full" />

                {/* Categories Accordion */}
                <div className="space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold mb-6">Nos Univers</p>
                  <div className="space-y-2">
                    {CATEGORIES.map((cat) => (
                      <div key={cat.id} className="border-b border-beige/50 last:border-0">
                        <button 
                          onClick={() => setActiveMobileTab(activeMobileTab === cat.id ? null : cat.id)}
                          className="w-full flex items-center justify-between py-4 text-left group"
                        >
                          <span className="text-lg font-serif tracking-tight group-hover:text-gold transition-colors">
                            {cat.icon} <span className="ml-2">{cat.name}</span>
                          </span>
                          <ChevronDown size={16} className={cn("transition-transform duration-500 text-gold", activeMobileTab === cat.id && "rotate-180")} />
                        </button>
                        
                        <AnimatePresence>
                          {activeMobileTab === cat.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden bg-[#FAFAFA]"
                            >
                              <div className="grid grid-cols-1 py-4 pl-8 space-y-3">
                                <Link 
                                  href={`/category/${cat.slug}`} 
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-[11px] uppercase tracking-widest text-primary font-bold"
                                >
                                  Tout voir dans {cat.name}
                                </Link>
                                {cat.subCategories.map((sub) => (
                                  <Link
                                    key={sub.slug}
                                    href={`/category/${cat.slug}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground hover:text-gold transition-colors"
                                  >
                                    {sub.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#FAFAFA] border-t border-beige space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-widest font-bold">Showroom Casablanca</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Ouvert 7j/7 • 10h - 20h</p>
                </div>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white border border-beige rounded-full">
                  <MapPin size={18} className="text-gold" />
                </Link>
              </div>
              <div className="flex gap-6">
                <span className="text-[10px] uppercase tracking-widest font-bold text-gold hover:text-primary transition-colors cursor-pointer">Instagram</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-gold hover:text-primary transition-colors cursor-pointer">WhatsApp</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
