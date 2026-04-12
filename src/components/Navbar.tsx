"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search, ChevronDown } from "lucide-react";
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[60] bg-white flex flex-col"
          >
            <div className="flex justify-between items-center px-6 py-8">
              <span className="text-lg font-serif italic text-gold tracking-tight">Diamond Meubles</span>
              <button 
                className="p-2 active:rotate-90 transition-transform duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="flex flex-col px-10 py-6 space-y-6 overflow-y-auto">
              {navLinks.map((link, idx) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => !link.hasDropdown && setMobileMenuOpen(false)}
                    className="text-2xl font-serif tracking-tight hover:text-gold transition-colors block"
                  >
                    {link.name}
                  </Link>
                  {link.hasDropdown && (
                    <div className="grid grid-cols-2 gap-4 mt-4 pl-4 border-l border-beige">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/category/${cat.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-[9px] uppercase tracking-widest text-muted-foreground"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto px-10 pb-16 space-y-8 bg-white">
              <div className="h-[1px] bg-beige w-full" />
              <div className="space-y-4">
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-semibold">Excellence & Luxe</p>
                <div className="flex flex-wrap gap-x-8 gap-y-4">
                  <span className="text-primary uppercase text-[10px] tracking-widest font-medium">Instagram</span>
                  <span className="text-primary uppercase text-[10px] tracking-widest font-medium">Showroom</span>
                  <span className="text-primary uppercase text-[10px] tracking-widest font-medium">Contact</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
