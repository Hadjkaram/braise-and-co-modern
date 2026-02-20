"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";

// Types pour la gestion des étapes
type Step = "ambiance" | "details" | "confirm";

export default function ReservationPage() {
  const [step, setStep] = useState<Step>("ambiance");
  const [selectedAmbiance, setSelectedAmbiance] = useState("");

  return (
    <main className="min-h-screen bg-black text-white font-[family-name:var(--font-montserrat)] overflow-hidden">
      <Navbar />

      <div className="relative pt-32 pb-10 px-6 md:px-20 h-full flex flex-col items-center">
        {/* Progress Bar Minimaliste */}
        <div className="flex gap-4 mb-12">
          {["ambiance", "details", "confirm"].map((s, i) => (
            <div 
              key={s}
              className={`h-1 w-12 rounded-full transition-all duration-500 ${
                step === s ? "bg-orange-600 w-20" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === "ambiance" && (
            <motion.div 
              key="ambiance"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center max-w-5xl"
            >
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-12">
                Choisir <br/> <span className="text-orange-600 italic">L'atmosphère</span>
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: "chef", title: "Face au Chef", desc: "Le spectacle des braises", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800" },
                  { id: "lounge", title: "Lounge Intime", desc: "Confort et discrétion", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800" },
                  { id: "group", title: "Grande Tablée", desc: "Pour les tribus", img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800" },
                ].map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -10 }}
                    onClick={() => { setSelectedAmbiance(item.id); setStep("details"); }}
                    className="group relative h-[400px] cursor-pointer overflow-hidden rounded-[30px] border border-white/5"
                  >
                    <img src={item.img} className="h-full w-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-700" alt={item.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 text-left">
                      <h3 className="text-2xl font-black uppercase italic">{item.title}</h3>
                      <p className="text-zinc-500 text-xs uppercase tracking-widest mt-2">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {step === "details" && (
            <motion.div 
              key="details"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-full max-w-2xl bg-zinc-900/50 p-10 rounded-[40px] border border-white/5 backdrop-blur-xl"
            >
              <h2 className="text-4xl font-black uppercase mb-8 tracking-tighter text-center">Finaliser</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <input type="date" className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-orange-600 transition-colors" />
                  <input type="time" className="bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-orange-600 transition-colors" />
                </div>
                <input type="number" placeholder="Nombre de personnes" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-orange-600 transition-colors" />
                <input type="text" placeholder="Votre nom" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-orange-600 transition-colors" />
                
                <button 
                  onClick={() => setStep("confirm")}
                  className="w-full bg-orange-600 py-6 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  Confirmer la Braise
                </button>
                <button onClick={() => setStep("ambiance")} className="w-full text-zinc-500 text-xs uppercase tracking-widest mt-4">Retour au choix</button>
              </div>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div 
              key="confirm"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-orange-600/50">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-6xl font-black uppercase tracking-tighter mb-4">C'est réservé.</h2>
              <p className="text-zinc-500 uppercase tracking-widest text-sm max-w-sm mx-auto">
                Un email de confirmation vient de s'envoler vers vous. À très vite chez Braise & Co.
              </p>
              <button 
                onClick={() => window.location.href = "/"}
                className="mt-12 text-orange-600 font-bold uppercase tracking-widest border-b border-orange-600 pb-2"
              >
                Retour à l'accueil
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}