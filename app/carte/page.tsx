"use client";

import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const PLATS = [
  { id: 1, nom: "T-Bone d'Exception", prix: "34€", desc: "Maturation 45 jours", img: "https://images.unsplash.com/photo-1546241072-48010ad28c2c?q=80&w=1000&auto=format&fit=crop" },
  { id: 2, nom: "Côte de Bœuf", prix: "68€", desc: "Cuisson chêne vert", img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop" },
  { id: 3, nom: "Travers de Porc", prix: "22€", desc: "Laqué au miel", img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=1000&auto=format&fit=crop" },
  { id: 4, nom: "Magret de Canard", prix: "26€", desc: "Braisé rosé", img: "https://images.unsplash.com/photo-1511910849309-0dffb8785146?q=80&w=1000&auto=format&fit=crop" },
  { id: 5, nom: "Entrecôte Argentine", prix: "42€", desc: "Persillée à souhait", img: "https://images.unsplash.com/photo-1558030006-45c25093473c?q=80&w=1000&auto=format&fit=crop" },
];

export default function CartePage() {
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  
  // Effet de torsion plus subtil
  const skewX = useTransform(springX, (latest) => (latest % 100) / 15);

  return (
    <main className="h-screen w-full bg-black text-white overflow-hidden font-[family-name:var(--font-montserrat)]">
      <Navbar />

      {/* Titre "La Carte" - Mieux positionné et visible */}
      <div className="absolute top-24 left-10 md:left-20 z-10 pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-9xl font-black uppercase leading-none tracking-tighter"
        >
          La <span className="text-orange-600">Carte.</span>
        </motion.h1>
      </div>

      {/* Slider Interactif */}
      <div className="relative h-full w-full flex items-center overflow-hidden cursor-grab active:cursor-grabbing">
        <motion.div 
          drag="x"
          // On augmente la contrainte à gauche (-2500) pour laisser sortir le bloc final
          dragConstraints={{ left: -2500, right: 0 }} 
          style={{ x: springX, skewX }}
          className="flex gap-8 md:gap-12 px-[10vw] pt-20"
        >
          {PLATS.map((plat) => (
            <motion.div 
              key={plat.id}
              className="relative w-[320px] md:w-[420px] shrink-0"
            >
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[30px] bg-zinc-900 border border-white/5">
                <img 
                  src={plat.img} 
                  alt={plat.nom}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="text-orange-600 font-bold tracking-[0.3em] text-[10px] uppercase mb-2 block">
                    Grillade au feu de bois
                  </span>
                  <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-4">
                    {plat.nom}
                  </h2>
                  <div className="flex justify-between items-center border-t border-white/10 pt-4">
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest">{plat.desc}</p>
                    <span className="text-xl font-light italic text-orange-600">{plat.prix}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Bloc de fin - Maintenant bien visible à la fin du drag */}
          <div className="w-[350px] md:w-[500px] shrink-0 flex flex-col justify-center px-10 ml-10">
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
                Prêt à <br/> <span className="italic text-zinc-400">déguster ?</span>
              </h3>
              <Link href="#" className="w-fit px-12 py-5 bg-orange-600 text-white font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-2xl shadow-orange-600/20">
                Réserver ma table
              </Link>
          </div>
        </motion.div>
      </div>

      {/* Barre de progression discrète en bas */}
      <div className="absolute bottom-12 left-10 md:left-20 right-10 md:right-20 h-[1px] bg-white/10">
        <motion.div 
          className="h-full bg-orange-600 origin-left"
          style={{ scaleX: useTransform(springX, [0, -2500], [0, 1]) }}
        />
      </div>
    </main>
  );
}