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
  metadataBase: new URL("https://sukeshst.pro"),

  title: {
    default: "Sukesh S T | AI/ML Engineer & Full-Stack Developer Portfolio",
    template: "%s | Sukesh S T",
  },

  description:
    "Sukesh S T — AI/ML Engineer & Full-Stack Developer from Chennai, India. Specializing in Generative AI, Agentic AI, LLMs, LangGraph, RAG, Next.js, and React. View projects, skills, and resume.",

  keywords: [
    "Sukesh S T",
    "Sukesh ST",
    "Sukesh S",
    "Sukesh",
    "sukesh s t",
    "sukesh st",
    "sukesh s t portfolio",
    "sukesh st portfolio",
    "sukeshst",
    "sukeshst.pro",
    "AI Engineer",
    "ML Engineer",
    "Machine Learning Engineer",
    "Generative AI",
    "Agentic AI",
    "LangChain",
    "LangGraph",
    "RAG",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "AI Developer India",
    "ML Engineer Chennai",
    "Portfolio",
    "Computer Science Engineer",
    "Python Developer",
    "LLM Engineer",
  ],

  authors: [{ name: "Sukesh S T", url: "https://sukeshst.pro" }],
  creator: "Sukesh S T",
  publisher: "Sukesh S T",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },

  alternates: {
    canonical: "https://sukeshst.pro",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sukeshst.pro",
    siteName: "Sukesh S T Portfolio",
    title: "Sukesh S T | AI/ML Engineer & Full-Stack Developer",
    description:
      "Portfolio of Sukesh S T — AI/ML Engineer specializing in Generative AI, Agentic AI, LLMs, RAG, and full-stack web development with Next.js and React.",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "Sukesh S T — AI/ML Engineer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sukesh S T | AI/ML Engineer & Full-Stack Developer",
    description:
      "AI/ML Engineer specializing in Generative AI, Agentic AI, and full-stack web development. View projects, resume, and more.",
    images: ["/favicon.png"],
  },

  verification: {
    // Add your Google Search Console verification code here after setup:
    // google: "your-verification-code",
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
