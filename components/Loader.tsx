"use client";
import { motion } from "framer-motion";

export default function Loader({ finishLoading }: { finishLoading: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
    >
      <div className="text-center">
        {/* LOGO IMAGE ICI */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <img src="/Braise&coLogo.png" alt="Logo Braise & Co" className="h-16 md:h-24 w-auto object-contain" />
        </motion.div>

        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          onAnimationComplete={finishLoading}
          className="h-[2px] bg-orange-600 mt-6 mx-auto"
        />
        <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-zinc-500">L'art du feu s'allume...</p>
      </div>
    </motion.div>
  );
}