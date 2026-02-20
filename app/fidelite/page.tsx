"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import QRCode from "react-qr-code";
import { supabase } from "@/lib/supabase";

export default function FidelitePage() {
  // --- ÉTATS POUR L'UTILISATEUR ---
  const [clientData, setClientData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // États pour le formulaire
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // --- VARIABLES 3D ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);
  const [isFlipped, setIsFlipped] = useState(false);

  // --- CHARGEMENT AU DÉMARRAGE ---
  useEffect(() => {
    const savedId = localStorage.getItem('braise_client_id');
    if (savedId) {
      fetchClient(savedId);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchClient = async (id: string) => {
    const { data } = await supabase.from('clients').select('*').eq('id', id).single();
    if (data) setClientData(data);
    setIsLoading(false);
  };

  // --- LOGIQUE D'INSCRIPTION / CONNEXION ---
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. On cherche si l'email existe déjà
    const { data: existingClient } = await supabase.from('clients').select('*').eq('email', email).single();

    if (existingClient) {
      // Le client existe : on le connecte
      localStorage.setItem('braise_client_id', existingClient.id);
      setClientData(existingClient);
    } else {
      // Nouveau client : on le crée
      if (!nom) {
        alert("Veuillez entrer votre nom pour créer la carte.");
        setIsLoading(false);
        return;
      }
      const { data: newClient, error } = await supabase.from('clients').insert([{ nom, email, points: 0, max_points: 1000 }]).select().single();
      
      if (newClient) {
        localStorage.setItem('braise_client_id', newClient.id);
        setClientData(newClient);
      }
    }
    setIsLoading(false);
  };

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem('braise_client_id');
    setClientData(null);
    setIsFlipped(false);
  };

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }

  function handleMouseLeave() {
    x.set(0); y.set(0);
  }

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Chargement du feu...</div>;

  return (
    <main className="min-h-screen bg-black text-white font-[family-name:var(--font-montserrat)] overflow-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 px-6 md:px-20 min-h-screen flex flex-col lg:flex-row items-center justify-between gap-16">
        
        {/* TEXTES */}
        <div className="flex-1 z-10">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="text-orange-600 font-bold tracking-[0.4em] text-xs uppercase mb-6 block">
              Programme Privilège
            </span>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
              Le Cercle <br /> <span className="text-zinc-500 italic">des Braises.</span>
            </h1>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg mb-12">
              Votre fidélité n'est pas un numéro, c'est un rang. Obtenez votre carte pour débloquer l'accès à la table du Chef et à notre cave privée.
            </p>

            {clientData && (
              <div className="flex gap-4">
                <button onClick={() => setIsFlipped(!isFlipped)} className="px-8 py-4 bg-orange-600 text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-white hover:text-black transition-all">
                  {isFlipped ? "Voir la carte" : "Afficher le QR Code"}
                </button>
                <button onClick={handleLogout} className="px-6 py-4 border border-white/20 text-zinc-500 font-bold uppercase tracking-widest text-xs rounded-full hover:text-white transition-all">
                  Déconnexion
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* AFFICHAGE CONDITIONNEL : FORMULAIRE OU CARTE */}
        <div className="flex-1 flex justify-center z-10 w-full perspective-[1000px]">
          {!clientData ? (
            
            /* FORMULAIRE D'INSCRIPTION / CONNEXION */
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl p-10 rounded-3xl border border-white/10 shadow-2xl">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">Générer ma carte</h2>
              <p className="text-zinc-400 text-xs mb-8">Entrez votre email. Si vous n'avez pas de carte, elle sera créée instantanément.</p>
              
              <form onSubmit={handleAuth} className="space-y-4">
                <input 
                  type="email" placeholder="Votre Email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-white/10 py-4 px-6 rounded-xl outline-none focus:border-orange-600 text-sm transition-colors"
                />
                <input 
                  type="text" placeholder="Votre Nom (Nouveau client)" value={nom} onChange={(e) => setNom(e.target.value)}
                  className="w-full bg-black border border-white/10 py-4 px-6 rounded-xl outline-none focus:border-orange-600 text-sm transition-colors"
                />
                <button className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-orange-600 hover:text-white transition-all shadow-xl">
                  Créer / Consulter ma carte
                </button>
              </form>
            </motion.div>

          ) : (
            
            /* LA CARTE 3D HOLOGRAPHIQUE (Une fois connecté) */
            <motion.div
              onMouseMove={handleMouse}
              onMouseLeave={handleMouseLeave}
              onClick={() => setIsFlipped(!isFlipped)}
              className="relative w-full max-w-[400px] aspect-[1.6/1] cursor-pointer"
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* FACE RECTO */}
                <div className="absolute inset-0 rounded-3xl p-8 shadow-2xl flex flex-col justify-between" style={{ backfaceVisibility: "hidden", background: "linear-gradient(135deg, #1a1a1a 0%, #000000 100%)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/5 to-transparent opacity-50 pointer-events-none" />
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <h3 className="text-white font-black text-2xl tracking-tighter">BRAISE & CO</h3>
                      <p className="text-zinc-500 uppercase text-[8px] tracking-[0.3em] mt-1">Membre Privilège</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-orange-600/30 flex items-center justify-center bg-orange-600/10">
                      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 2 }} className="w-4 h-4 rounded-full bg-orange-600 shadow-[0_0_15px_rgba(234,88,12,0.8)]" />
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-end mb-2">
                      <p className="font-bold text-sm uppercase tracking-widest text-white">{clientData.nom}</p>
                      <p className="text-orange-600 font-black italic">{clientData.points} <span className="text-zinc-500 text-xs font-normal not-italic">/ {clientData.max_points} °C</span></p>
                    </div>
                    <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-white/10">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(clientData.points / clientData.max_points) * 100}%` }} transition={{ duration: 1.5 }} className="h-full bg-gradient-to-r from-orange-800 to-orange-500" />
                    </div>
                    <p className="text-right text-[9px] uppercase tracking-widest text-zinc-500 mt-2">Touchez pour le QR Code</p>
                  </div>
                </div>

                {/* FACE VERSO (QR CODE) */}
                <div className="absolute inset-0 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(135deg, #0a0a0a 0%, #111111 100%)", border: "1px solid rgba(234, 88, 12, 0.3)" }}>
                  <div className="bg-white p-4 rounded-2xl shadow-[0_0_30px_rgba(234,88,12,0.15)] relative z-10">
                    <QRCode value={clientData.id} size={150} level="H" bgColor="#ffffff" fgColor="#000000" />
                  </div>
                  <p className="text-zinc-400 text-[10px] uppercase tracking-[0.2em] mt-6 text-center">Présentez ce code <br/> à votre serveur</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none z-0" />
      </section>
    </main>
  );
}