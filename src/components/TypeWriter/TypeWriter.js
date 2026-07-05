"use client";

import { useState, useEffect } from "react";
import styles from "./TypeWriter.module.css";

const defaultTexts = [
  "AI/ML Engineer",
  "Generative AI Developer",
  "Machine Learning Specialist",
  "Full-Stack AI Builder",
  "LLM & RAG Architect",
];

export default function TypeWriter({ texts = defaultTexts, speed = 100, deleteSpeed = 50, pauseTime = 2000 }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = texts[currentTextIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
          if (currentText.length + 1 === fullText.length) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          setCurrentText(fullText.substring(0, currentText.length - 1));
          if (currentText.length === 0) {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, speed, deleteSpeed, pauseTime]);

  return (
    <span className={styles.typewriter}>
      {currentText}
      <span className={styles.cursor}>|</span>
    </span>
  );
}
