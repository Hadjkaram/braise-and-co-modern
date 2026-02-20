"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: { x: "100%", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    opened: { x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full z-[100] flex justify-between items-center px-6 md:px-12 py-6 bg-transparent"
      >
        {/* LOGO IMAGE ICI */}
        <Link href="/" className="flex items-center">
          <img src="/Braise&coLogo.png" alt="Logo Braise & Co" className="h-8 md:h-12 w-auto object-contain" />
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-white/90 text-[11px] uppercase tracking-[0.2em] font-bold">
          <Link href="/" className="hover:text-orange-600 transition-colors">Accueil</Link>
          <Link href="/experience" className="hover:text-orange-600 transition-colors">L'Expérience</Link>
          <Link href="/carte" className="hover:text-orange-600 transition-colors">La Carte</Link>
          <Link href="/reservation" className="hover:text-orange-600 transition-colors">Réservation</Link>
          <Link href="/contact" className="hover:text-orange-600 transition-colors">Contact</Link>
        </div>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[110] md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 bg-orange-600 rounded-full"
        >
          <motion.span animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-white block rounded-full" />
          <motion.span animate={isOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-0.5 bg-white block rounded-full" />
          <motion.span animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-white block rounded-full" />
        </button>

        <Link 
          href="/reservation" 
          className="hidden md:block bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all"
        >
          Réserver
        </Link>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            className="fixed inset-0 z-[90] bg-zinc-950 flex flex-col justify-center items-center gap-8 md:hidden"
          >
            <Link href="/" onClick={() => setIsOpen(false)} className="text-4xl font-black uppercase tracking-tighter hover:text-orange-600 transition-colors">Accueil</Link>
            <Link href="/experience" onClick={() => setIsOpen(false)} className="text-4xl font-black uppercase tracking-tighter hover:text-orange-600 transition-colors">L'Expérience</Link>
            <Link href="/carte" onClick={() => setIsOpen(false)} className="text-4xl font-black uppercase tracking-tighter hover:text-orange-600 transition-colors">La Carte</Link>
            <Link href="/reservation" onClick={() => setIsOpen(false)} className="text-4xl font-black uppercase tracking-tighter hover:text-orange-600 transition-colors">Réservation</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="text-4xl font-black uppercase tracking-tighter hover:text-orange-600 transition-colors">Contact</Link>
            
            <Link 
              href="/reservation"
              onClick={() => setIsOpen(false)}
              className="mt-8 bg-orange-600 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm"
            >
              Réserver une table
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}