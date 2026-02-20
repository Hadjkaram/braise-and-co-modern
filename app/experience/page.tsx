"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-black text-white font-[family-name:var(--font-montserrat)]">
      <Navbar />

      <section className="pt-40 pb-20 px-6 md:px-20">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="max-w-6xl"
        >
          <h1 className="text-6xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.8] mb-16">
            L'Âme <br/> <span className="text-orange-600 italic">du Feu.</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Grand bloc texte */}
            <div className="md:col-span-7">
              <p className="text-xl md:text-3xl font-light leading-tight text-zinc-300">
                À Biganos, nous ne cuisons pas seulement de la viande. Nous honorons une tradition ancestrale. 
                Chaque morceau est sélectionné pour sa qualité, puis confié à la chaleur brute du bois de chêne. 
                C'est une danse entre la patience et l'intensité.
              </p>
              <div className="mt-16 grid grid-cols-2 gap-10">
                <div>
                  <h3 className="text-orange-600 font-bold text-4xl">100%</h3>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 mt-2">Feu de bois naturel</p>
                </div>
                <div>
                  <h3 className="text-orange-600 font-bold text-4xl">45 Jours</h3>
                  <p className="text-xs uppercase tracking-widest text-zinc-500 mt-2">Maturation minimale</p>
                </div>
              </div>
            </div>

            {/* Image asymétrique */}
            <div className="md:col-span-5 pt-10 md:pt-40">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="rounded-[40px] overflow-hidden border border-white/10 aspect-[3/4]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800" 
                  alt="Maitre d'hotel" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}