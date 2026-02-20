"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white font-[family-name:var(--font-montserrat)] overflow-x-hidden">
      <Navbar />

      <section className="pt-40 pb-20 px-6 md:px-20">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-20"
        >
          Nous <br/> <span className="text-orange-600">Trouver.</span>
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Infos de contact avec micro-interactions */}
          <div className="space-y-12">
            <motion.div whileHover={{ x: 20 }} className="cursor-pointer">
              <p className="text-orange-600 uppercase tracking-widest text-xs font-bold mb-2">Adresse</p>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                174 Bis Av. de la Côte d'Argent <br/> 33380 Biganos
              </h2>
            </motion.div>

            <motion.div whileHover={{ x: 20 }} className="cursor-pointer">
              <p className="text-orange-600 uppercase tracking-widest text-xs font-bold mb-2">Téléphone</p>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                09.86.12.97.14
              </h2>
            </motion.div>

            <div className="pt-10 border-t border-white/10">
              <p className="text-zinc-500 uppercase tracking-widest text-[10px] mb-6">Suivez l'aventure</p>
              <div className="flex gap-8 text-2xl font-black italic uppercase">
                <a href="#" className="hover:text-orange-600 transition-colors underline decoration-orange-600">Instagram</a>
                <a href="#" className="hover:text-orange-600 transition-colors underline decoration-orange-600">Facebook</a>
              </div>
            </div>
          </div>

          {/* Bloc Formulaire "Invisible" */}
          <div className="bg-zinc-900/30 p-10 rounded-[40px] border border-white/5 backdrop-blur-md">
            <h3 className="text-2xl font-black uppercase mb-8 italic">Une question ?</h3>
            <form className="space-y-6">
              <input type="text" placeholder="NOM" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-orange-600 transition-colors font-bold uppercase" />
              <input type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-orange-600 transition-colors font-bold uppercase" />
              <textarea placeholder="MESSAGE" rows={4} className="w-full bg-transparent border-b border-white/20 py-4 outline-none focus:border-orange-600 transition-colors font-bold uppercase" />
              <button className="mt-8 px-12 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-orange-600 hover:text-white transition-all">
                Envoyer
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}