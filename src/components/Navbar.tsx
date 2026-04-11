"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "Salons", href: "/category/salons" },
  { name: "Chambres", href: "/category/chambres" },
  { name: "Salles à Manger", href: "/category/salles-a-manger" },
  { name: "Décoration", href: "/category/decoration" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md py-4 shadow-sm" 
          : "bg-transparent py-8"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-primary"
          onClick={() => setMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Navigation Links - Desktop Left */}
        <div className="hidden lg:flex items-center space-x-8 flex-1">
          {navLinks.slice(1, 3).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300",
                pathname === link.href ? "text-gold" : "text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl md:text-3xl font-serif tracking-tighter text-primary text-center flex-1"
        >
          DIAMOND <span className="text-gold font-light italic">MEUBLES</span>
        </Link>

        {/* Navigation Links - Desktop Right */}
        <div className="hidden lg:flex items-center justify-end space-x-8 flex-1">
          {navLinks.slice(3).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm uppercase tracking-widest hover:text-gold transition-colors duration-300",
                pathname === link.href ? "text-gold" : "text-primary"
              )}
            >
              {link.name}
            </Link>
          ))}
          <button className="text-primary hover:text-gold transition-colors">
            <Search size={20} />
          </button>
          <button className="text-primary hover:text-gold transition-colors">
            <ShoppingBag size={20} />
          </button>
        </div>

        {/* Mobile Icons */}
        <div className="flex lg:hidden items-center space-x-4">
          <button className="text-primary">
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-serif italic text-gold">Diamond Meubles</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>
            
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif tracking-wide hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto pt-12 border-t border-beige">
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">Suivez-nous</p>
              <div className="flex space-x-6">
                <span className="text-primary uppercase text-xs tracking-tighter">Instagram</span>
                <span className="text-primary uppercase text-xs tracking-tighter">Facebook</span>
                <span className="text-primary uppercase text-xs tracking-tighter">Pinterest</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
