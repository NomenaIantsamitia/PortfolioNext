import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Garden",
  description: "Ton espace personnel de notes connectées 🌱",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  
      <html lang="fr">
        <body>{children}</body>
      </html>
   
  );
}
