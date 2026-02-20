import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700", "900"], // On prend le 900 pour le titre
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${montserrat.variable}`}>
      <body className="font-sans antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}