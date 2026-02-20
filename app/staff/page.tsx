"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function StaffPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinCode, setPinCode] = useState("");
  
  const [clientId, setClientId] = useState("");
  const [scannedClient, setScannedClient] = useState<any>(null); // Stocke le client trouvé
  const [additionAmount, setAdditionAmount] = useState("");
  
  const [statusMessage, setStatusMessage] = useState("");
  const [rewardAlert, setRewardAlert] = useState(false); // Gère l'alerte des 1000 points

  // 1. Connexion du serveur
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode === "2026") setIsAuthenticated(true);
    else { setStatusMessage("Code PIN incorrect"); setTimeout(() => setStatusMessage(""), 2000); }
  };

  // 2. Recherche du client via l'ID scanné
  const handleSearchClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage("Recherche en cours...");
    const { data: client, error } = await supabase.from('clients').select('*').eq('id', clientId).single();
    
    if (client) {
      setScannedClient(client);
      setStatusMessage("");
    } else {
      setStatusMessage("Code QR Invalide ou Client introuvable.");
    }
  };

  // 3. Ajout des points
  const handleAddPoints = async (e: React.FormEvent) => {
    e.preventDefault();
    const pointsGagnes = Math.floor(Number(additionAmount) * 10);
    const nouveauxPoints = scannedClient.points + pointsGagnes;

    const { error } = await supabase.from('clients').update({ points: nouveauxPoints }).eq('id', scannedClient.id);

    if (error) {
      setStatusMessage("Erreur réseau.");
    } else {
      if (nouveauxPoints >= scannedClient.max_points) {
        // ALERTE RÉCOMPENSE !
        setRewardAlert(true);
      } else {
        setStatusMessage(`Succès : ${pointsGagnes} °C ajoutés !`);
        setTimeout(() => resetTerminal(), 3000);
      }
    }
  };

  const resetTerminal = () => {
    setClientId("");
    setScannedClient(null);
    setAdditionAmount("");
    setRewardAlert(false);
    setStatusMessage("");
  };

  return (
    <main className="min-h-screen bg-black text-white font-[family-name:var(--font-montserrat)] flex items-center justify-center p-6">
      <AnimatePresence mode="wait">
        
        {/* === ÉCRAN 1 : CONNEXION === */}
        {!isAuthenticated ? (
          <motion.div key="login" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="w-full max-w-md bg-zinc-900 p-10 rounded-3xl border border-white/10">
            <h1 className="text-3xl font-black uppercase text-center mb-8">Accès <span className="text-orange-600">Staff</span></h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <input type="password" placeholder="CODE PIN" value={pinCode} onChange={(e) => setPinCode(e.target.value)} className="w-full bg-black border border-white/20 py-4 text-center text-2xl tracking-[0.5em] rounded-xl outline-none focus:border-orange-600" />
              <button className="w-full py-4 bg-orange-600 font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all">Déverrouiller</button>
            </form>
            {statusMessage && <p className="text-red-500 text-center mt-4 text-xs font-bold uppercase">{statusMessage}</p>}
          </motion.div>
        ) : (
          
          /* === ÉCRAN 2 : TERMINAL STAFF === */
          <motion.div key="dashboard" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg bg-zinc-900 p-8 rounded-3xl border border-white/10 relative overflow-hidden">
            
            {/* Si une récompense est atteinte, l'écran devient ROUGE FEU */}
            {rewardAlert && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-orange-600 z-50 flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-5xl font-black uppercase mb-4 text-white">🔥 PALIER <br/> ATTEINT !</h2>
                <p className="text-white font-bold text-lg mb-8">Proposez une récompense VIP au client :<br/>1 Bouteille de Vin ou 1 Côte de Bœuf.</p>
                <button onClick={resetTerminal} className="bg-white text-orange-600 px-8 py-4 font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform">
                  Clôturer l'addition
                </button>
              </motion.div>
            )}

            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
              <h2 className="text-xl font-black uppercase tracking-tighter">Terminal <span className="text-orange-600">Braise</span></h2>
              <button onClick={() => setIsAuthenticated(false)} className="text-xs text-zinc-500 uppercase hover:text-white">Déconnexion</button>
            </div>

            {/* Étape A : Scanner le client */}
            {!scannedClient ? (
              <form onSubmit={handleSearchClient} className="space-y-4">
                <label className="text-xs uppercase tracking-widest text-zinc-500 block">Scanner ou coller l'ID du Client</label>
                <input type="text" placeholder="ID de la carte..." value={clientId} onChange={(e) => setClientId(e.target.value)} className="w-full bg-black border border-white/20 py-4 px-6 rounded-xl outline-none focus:border-orange-600" required />
                <button className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-orange-600 hover:text-white transition-all">Rechercher</button>
                {statusMessage && <p className="text-red-500 text-center mt-2 text-xs font-bold uppercase">{statusMessage}</p>}
              </form>
            ) : (
              
              /* Étape B : Client trouvé -> Ajouter les points */
              <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleAddPoints} className="space-y-6">
                <div className="bg-black border border-orange-600/30 p-6 rounded-xl text-center">
                  <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">Client détecté</p>
                  <p className="text-2xl font-black text-white uppercase">{scannedClient.nom}</p>
                  <p className="text-orange-500 font-bold mt-2">🔥 {scannedClient.points} / {scannedClient.max_points} °C</p>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-zinc-500 mb-2 block">Montant de l'addition (€)</label>
                  <input type="number" placeholder="Ex: 85" value={additionAmount} onChange={(e) => setAdditionAmount(e.target.value)} className="w-full bg-black border border-white/20 py-4 px-6 rounded-xl outline-none focus:border-orange-600 text-2xl font-bold text-center" required />
                </div>

                <div className="flex gap-4">
                  <button type="button" onClick={resetTerminal} className="w-1/3 py-4 bg-transparent border border-white/20 font-bold uppercase tracking-widest text-xs rounded-xl hover:text-white text-zinc-500">Annuler</button>
                  <button type="submit" className="w-2/3 py-4 bg-orange-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all">Valider l'addition</button>
                </div>
              </motion.form>
            )}

            {statusMessage && !rewardAlert && (
              <div className="mt-4 p-4 rounded-xl text-center text-xs font-bold uppercase bg-green-500/20 text-green-500">
                {statusMessage}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}