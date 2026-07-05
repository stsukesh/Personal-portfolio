"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineHome } from "react-icons/ai";
import { BsPerson, BsCodeSlash, BsFileEarmarkText } from "react-icons/bs";
import { RiMenu3Fill, RiCloseFill } from "react-icons/ri";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "#projects", label: "Projects", icon: <BsCodeSlash /> },
  { href: "#about", label: "About", icon: <BsPerson /> },
  { href: "#resume", label: "Resume", icon: <BsFileEarmarkText /> },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ["home", "projects", "about", "resume"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveHash(`#${sections[i]}`);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`} id="main-nav">
      <div className={styles.navContainer}>
        <a href="#home" className={styles.logo} aria-label="Home" onClick={(e) => handleNavClick(e, "#home")}>
          <AiOutlineHome className={styles.logoIcon} />
        </a>

        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`${styles.navLink} ${activeHash === link.href ? styles.active : ""}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <span className={styles.navIcon}>{link.icon}</span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={styles.mobileToggle}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          id="mobile-nav-toggle"
        >
          {mobileOpen ? <RiCloseFill /> : <RiMenu3Fill />}
        </button>

        <div className={`${styles.mobileNav} ${mobileOpen ? styles.mobileOpen : ""}`}>
          <ul className={styles.mobileLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`${styles.mobileLink} ${activeHash === link.href ? styles.active : ""}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span className={styles.navIcon}>{link.icon}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
