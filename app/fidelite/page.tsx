"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";

export default function FidelitePage() {
  // Variables pour l'effet 3D de la carte au survol de la souris
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  // Simulation des points de fidélité (pour la démo)
  const [points, setPoints] = useState(750);
  const maxPoints = 1000;
  const progress = (points / maxPoints) * 100;

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <main className="min-h-screen bg-black text-white font-[family-name:var(--font-montserrat)] overflow-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 px-6 md:px-20 min-h-screen flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* TEXTES ET EXPLICATIONS */}
        <div className="flex-1 z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-orange-600 font-bold tracking-[0.4em] text-xs uppercase mb-6 block">
              Programme Privilège
            </span>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Le Cercle <br /> <span className="text-zinc-500 italic">des Braises.</span>
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg mb-12">
              Votre fidélité n'est pas un numéro, c'est un rang. Cumulez de la chaleur à chaque visite et débloquez l'accès à la table du Chef, aux viandes hors-carte et à notre cave privée.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <button className="px-8 py-4 bg-orange-600 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-black transition-all">
                Rejoindre le Cercle
              </button>
              <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-black uppercase tracking-widest text-xs rounded-full hover:border-orange-600 hover:text-orange-600 transition-all flex items-center justify-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-1.09v-.27a1.61 1.61 0 0 1-.09-.23h-1.12a2.76 2.76 0 0 1-.32-.5h-1a6.6 6.6 0 0 1-.74-.5h-1a9.23 9.23 0 0 1-1.3-.5H6.55v.5H4.27v2h2.28v.5H4.27v2h2.28v.5H4.27v2h2.28v.5H4.27v2h2.28v.5H4.27v2h2.28v.5H4.27v2h2.28v.5H5.8v.28c.1.1.2.2.3.29v.21h1.06c.16.15.34.28.52.41v.09h1.12c.2.14.41.27.63.38v.12h1.12c.26.13.52.24.79.33v.17h1.12c.31.09.62.15.95.19v.31H15.6a4.278 4.278 0 0 1 1.06-2.82s-.51.5 0 0a4.278 4.278 0 0 0 0-6 4.278 4.278 0 0 0 0-6Z" /></svg>
                Ajouter au Wallet
              </button>
            </div>
          </motion.div>
        </div>

        {/* LA CARTE DE FIDÉLITÉ 3D */}
        <div className="flex-1 flex justify-center z-10 w-full perspective-[1000px]">
          <motion.div
            style={{ rotateX, rotateY }}
            onMouseMove={handleMouse}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[400px] aspect-[1.6/1] rounded-3xl p-8 cursor-pointer shadow-2xl transition-shadow duration-300 hover:shadow-orange-600/20"
            style={{
              background: "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)",
              boxShadow: "0 25px 50px -12px rgba(234, 88, 12, 0.25)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              transformStyle: "preserve-3d"
            }}
          >
            {/* Effet de reflet holographique */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none" style={{ transform: "translateZ(1px)" }} />
            
            {/* Contenu de la carte */}
            <div className="relative h-full flex flex-col justify-between" style={{ transform: "translateZ(30px)" }}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-black text-2xl tracking-tighter">BRAISE & CO</h3>
                  <p className="text-zinc-500 uppercase text-[8px] tracking-[0.3em] mt-1">Membre Privilège</p>
                </div>
                {/* Icône de "Feu" ou Puce NFC */}
                <div className="w-10 h-10 rounded-full border border-orange-600/30 flex items-center justify-center bg-orange-600/10">
                  <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="w-4 h-4 rounded-full bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.8)]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <p className="font-bold text-sm uppercase tracking-widest text-white">Jean Dupont</p>
                  <p className="text-orange-600 font-black italic">{points} <span className="text-zinc-500 text-xs font-normal not-italic">/ {maxPoints} °C</span></p>
                </div>
                
                {/* Jauge de progression de la chaleur */}
                <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-white/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-orange-800 to-orange-500 relative"
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px]" />
                  </motion.div>
                </div>
                
                <p className="text-right text-[9px] uppercase tracking-widest text-zinc-500 mt-2">
                  Prochain palier : Maître du Feu
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* EFFET DE FOND (Glow) */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
      </section>
    </main>
  );
}