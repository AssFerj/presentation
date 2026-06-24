import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Guia de Treinamento — Cadastro de Pessoa | Famol Móveis e Eletros",
  description: "Guia completo de treinamento da equipe de Crédito da Famol Móveis e Eletros para o cadastro de Pessoa Física, Jurídica e Estrangeira.",
  openGraph: {
    title: "Guia de Treinamento — Cadastro de Pessoa",
    description: "Material de treinamento da equipe de Crédito da Famol Móveis e Eletros.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
