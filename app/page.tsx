"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import Loader from "@/components/Loader"; 

// --- SOUS-COMPOSANTS ---

function MenuPreview() {
  return (
    <section className="relative z-20 py-24 px-6 md:px-20 bg-black">
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-zinc-900">
          <img src="/photo-grillade-1.jpg" alt="Nos Grillades" className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">Les Braises</h3>
            <p className="mt-2 text-orange-600 font-bold tracking-widest text-[10px] uppercase">Voir la sélection</p>
          </div>
        </div>

        <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-zinc-900 md:mt-20">
          <img src="/photo-grillade-2.jpg" alt="L'ambiance" className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">Le Lieu</h3>
            <p className="mt-2 text-orange-600 font-bold tracking-widest text-[10px] uppercase">Immersion</p>
          </div>
        </div>

        <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl bg-zinc-900">
          <img src="/photo-grillade-3.jpg" alt="Vins et Cave" className="h-full w-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8">
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white">La Cave</h3>
            <p className="mt-2 text-orange-600 font-bold tracking-widest text-[10px] uppercase">Carte des vins</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function TextReveal() {
  return (
    <section className="py-32 md:py-48 px-6 md:px-20 bg-white text-black">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-4xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
          L'instinct sauvage, <br />
          <span className="text-orange-600 italic font-light">maîtrisé</span> <br />
          par le feu.
        </h2>
        <p className="mt-10 text-lg md:text-2xl font-medium leading-relaxed text-zinc-500 max-w-2xl">
          Une sélection de viandes d'exception sublimée par une cuisson ancestrale au bois de chêne. 
          Le goût brut, l'élégance du geste.
        </p>
      </motion.div>
    </section>
  );
}

function ReservationSection() {
  return (
    <section className="relative h-[70vh] md:h-screen w-full overflow-hidden bg-black">
      <motion.div 
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img src="/photo-grillade-2.jpg" alt="Reservation" className="w-full h-full object-cover opacity-40" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-orange-600 font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase mb-6"
        >
          L'expérience commence ici
        </motion.span>
        <h2 className="text-5xl md:text-9xl font-black text-white uppercase leading-none mb-12">
          Réserver <br /> une table
        </h2>
        
        <Link href="/reservation" className="group relative inline-block bg-white text-black px-10 md:px-16 py-5 rounded-full font-black uppercase tracking-widest text-xs md:text-sm overflow-hidden transition-all duration-500 hover:bg-orange-600 hover:text-white">
          <span className="relative z-10">Vérifier les disponibilités</span>
          <div className="absolute inset-0 translate-y-full bg-black group-hover:translate-y-0 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
}

// --- PAGE PRINCIPALE ---

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Loader finishLoading={() => setLoading(false)} />}
      </AnimatePresence>

      <main className="relative min-h-screen w-full overflow-x-hidden bg-black font-[family-name:var(--font-montserrat)]">
        
        <Navbar />

        {/* 1. HERO SECTION */}
        <div className="relative h-screen w-full">
          <div className="absolute inset-0 z-0">
            <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-60">
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
          </div>

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            
            {/* LOGO IMAGE ICI (Au lieu du grand texte H1) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center"
            >
              <img src="/Braise&coLogo.png" alt="Logo Braise & Co" className="h-24 md:h-48 lg:h-56 w-auto object-contain" />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-8 max-w-lg text-base md:text-2xl text-zinc-400 font-light"
            >
              L'expérience ultime de la grillade au feu de bois.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-12">
              <Link href="/reservation" className="inline-block px-10 py-4 bg-orange-600 text-white text-xs md:text-sm font-black uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-black transition-all duration-300">
                Réserver maintenant
              </Link>
            </motion.div>
          </div>

          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="w-[1px] h-16 bg-gradient-to-b from-orange-600 to-transparent" />
          </motion.div>
        </div>

        {/* 2. SECTIONS SUIVANTES */}
        <MenuPreview />
        <TextReveal />
        <ReservationSection />

        {/* FOOTER */}
        <footer className="py-20 bg-black border-t border-white/5 px-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            {/* LOGO IMAGE ICI (Au lieu du texte) */}
            <div className="flex items-center">
               <img src="/Braise&coLogo.png" alt="Logo Braise & Co" className="h-8 md:h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex gap-8 text-zinc-500 text-[10px] uppercase tracking-widest">
              <span>Biganos, France</span>
              <span>Instagram</span>
              <span>Mentions Légales</span>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}