import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ParticleBackground from "@/components/ParticleBackground/ParticleBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "Sukesh S T | AI/ML Engineer & Full-Stack Developer",
  description:
    "Portfolio of Sukesh S T — AI/ML Engineer specializing in Generative AI, Agentic AI, LLMs, RAG, and full-stack AI applications. Building production-ready intelligent systems.",
  keywords: [
    "Sukesh S T",
    "AI Engineer",
    "ML Engineer",
    "Machine Learning",
    "Generative AI",
    "LangChain",
    "LangGraph",
    "RAG",
    "Full Stack Developer",
    "Portfolio",
  ],
  authors: [{ name: "Sukesh S T" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Sukesh S T | AI/ML Engineer",
    description:
      "AI/ML Engineer specializing in Generative AI, Agentic AI, and full-stack AI applications.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        <ParticleBackground />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
