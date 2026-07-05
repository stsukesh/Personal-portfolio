"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import TypeWriter from "@/components/TypeWriter/TypeWriter";
import { FiArrowRight, FiDownload, FiExternalLink, FiGithub } from "react-icons/fi";
import { AiFillGithub, AiOutlineLinkedin } from "react-icons/ai";
import { SiLeetcode } from "react-icons/si";
import { HiOutlineMail, HiOutlineAcademicCap, HiOutlineBriefcase, HiOutlineBadgeCheck, HiOutlineCode, HiOutlineLightBulb } from "react-icons/hi";
import {
  SiPython, SiPytorch, SiOpencv, SiDocker, SiFastapi, SiNumpy, SiPandas,
  SiMysql, SiGit, SiJavascript, SiHtml5, SiCss, SiCplusplus,
} from "react-icons/si";
import { FaJava, FaBrain, FaRobot, FaEye, FaLaptopCode, FaSalesforce, FaCloud, FaShieldAlt } from "react-icons/fa";
import { TbLink } from "react-icons/tb";
import styles from "./page.module.css";

/* ===== PROJECT DATA ===== */
const projects = [
  {
    icon: <FaBrain />,
    title: "Enterprise Research Agent",
    tagline: "Multi-Agent AI Research Pipeline",
    color: "cyan",
    context: "Enterprise teams need comprehensive research reports, but manually gathering, analyzing, and synthesizing information from multiple sources is extremely time-consuming and inconsistent.",
    objective: "Build an intelligent, multi-agent AI system that automates the entire research pipeline — from planning queries to generating polished, cited reports — with human oversight at critical decision points.",
    approach: "Engineered a stateful, multi-agent pipeline using LangGraph, orchestrating Planner, Researcher, Extractor, Writer, and Reviewer agents. Implemented Human-in-the-Loop (HITL) checkpointing for dynamic re-routing. Developed concurrent async tool-calling across Tavily, Arxiv, and Wikipedia. Deployed on Hugging Face Spaces via FastAPI, SQLite, and Docker.",
    impact: "Delivered a fully autonomous research system that generates comprehensive, multi-source reports with source attribution. Human-in-the-loop feedback ensures research quality while reducing manual effort by 80%+.",
    techStack: ["LangGraph", "LangChain", "FastAPI", "Python", "SQLite", "Docker", "Tavily", "Arxiv"],
    liveDemo: "https://huggingface.co/spaces/stsukesh/enterprise-research-agent",
    github: "https://github.com/stsukesh/deep-research-agent",
  },
  {
    icon: <FaRobot />,
    title: "Flex Policies RAG Chatbot",
    tagline: "Retrieval-Augmented Generation System",
    color: "violet",
    context: "Employees at Flex struggled to quickly find relevant information across hundreds of corporate policy documents, leading to compliance risks and wasted time.",
    objective: "Create an AI-powered chatbot that enables natural language querying of corporate policy documents with accurate, source-attributed responses in real time.",
    approach: "Built a RAG pipeline using LangChain, ChromaDB, and SentenceTransformers for semantic search across policy documents. Developed a ChatGPT-style web interface with FastAPI backend, real-time similarity search, and markdown-rendered responses. Deployed as a Dockerized app on Hugging Face Spaces with Groq-hosted LLaMA 3.1 for low-latency inference.",
    impact: "Created a production-ready chatbot with sub-second response times, source document attribution, and 95%+ answer relevance. Reduced policy lookup time from minutes to seconds.",
    techStack: ["LangChain", "ChromaDB", "SentenceTransformers", "FastAPI", "LLaMA 3.1", "Groq", "Docker", "Python"],
    liveDemo: "https://huggingface.co/spaces/stsukesh/flex-rag-chatbot",
    github: "https://github.com/stsukesh/Flex_Polices_RAG",
  },
  {
    icon: <FaEye />,
    title: "Scratch & Dent Detection System",
    tagline: "AI-Powered Visual Quality Control",
    color: "emerald",
    context: "At Flex Pvt Ltd, manual visual inspection of manufactured parts for scratches and dents was slow, inconsistent, and costly — leading to quality control bottlenecks on the production line.",
    objective: "Develop an automated defect detection system that identifies scratches and dents in real-time using computer vision, reducing dependence on manual inspection.",
    approach: "Built a detection system using YOLOv11, Python, and OpenCV. Trained custom object detection models on labeled defect datasets. Implemented real-time image processing pipelines for continuous quality monitoring on the factory floor.",
    impact: "Reduced manual inspection time by 40% via AI-driven quality control. Achieved real-time defect identification with high precision, enabling faster production throughput.",
    techStack: ["YOLOv11", "Python", "OpenCV", "Machine Learning", "Computer Vision"],
    liveDemo: null,
    github: "https://github.com/stsukesh/Scratch-and-Dent-Detection-MODEL",
  },
  {
    icon: <FaShieldAlt />,
    title: "Face Authentication System",
    tagline: "🏆 1st Place — Internal Smart India Hackathon",
    color: "pink",
    context: "Traditional password-based authentication systems are vulnerable to phishing, brute-force attacks, and credential theft. Organizations needed a more secure, frictionless authentication method.",
    objective: "Design and build a secure facial authentication system that provides reliable identity verification with anti-spoofing capabilities for the Internal Smart India Hackathon.",
    approach: "Designed a multi-layer facial authentication pipeline using Python, YOLO for face detection, and OpenCV for feature extraction. Implemented advanced recognition algorithms with liveness detection to prevent spoofing attacks.",
    impact: "Won 1st Place at the Internal Smart India Hackathon. Delivered a robust authentication system with high accuracy and real-time performance suitable for enterprise deployment.",
    techStack: ["Python", "YOLO", "OpenCV", "Machine Learning", "Deep Learning"],
    liveDemo: null,
    github: null,
  },
];

/* ===== WHAT I DO DATA ===== */
const whatIDo = [
  { icon: <FaBrain />, title: "Generative AI & LLMs", description: "Building intelligent applications powered by Large Language Models, prompt engineering, and fine-tuning for domain-specific use cases.", color: "cyan" },
  { icon: <FaRobot />, title: "Agentic AI Systems", description: "Designing multi-agent pipelines with LangGraph — coordinating Planner, Researcher, and Writer agents with human-in-the-loop workflows.", color: "violet" },
  { icon: <FaEye />, title: "Computer Vision & ML", description: "Developing real-time detection and recognition systems using YOLOv11, OpenCV, and classical machine learning algorithms.", color: "emerald" },
  { icon: <FaLaptopCode />, title: "Full-Stack AI Applications", description: "End-to-end AI product development with FastAPI backends, modern web frontends, Docker deployments, and cloud infrastructure.", color: "pink" },
];

/* ===== SKILLS DATA ===== */
const skillCategories = [
  { title: "Languages", skills: [{ name: "Python", icon: <SiPython /> }, { name: "Java", icon: <FaJava /> }, { name: "C++", icon: <SiCplusplus /> }, { name: "JavaScript", icon: <SiJavascript /> }] },
  { title: "AI / ML", skills: [{ name: "PyTorch", icon: <SiPytorch /> }, { name: "LangChain", icon: <TbLink /> }, { name: "LangGraph", icon: <FaBrain /> }, { name: "RAG", icon: <FaRobot /> }, { name: "OpenCV", icon: <SiOpencv /> }, { name: "YOLOv11", icon: <FaEye /> }, { name: "NumPy", icon: <SiNumpy /> }, { name: "Pandas", icon: <SiPandas /> }, { name: "Machine Learning", icon: <FaBrain /> }, { name: "SentenceTransformers", icon: <FaRobot /> }] },
  { title: "Databases", skills: [{ name: "MySQL", icon: <SiMysql /> }, { name: "ChromaDB", icon: <FaBrain /> }, { name: "FAISS", icon: <FaRobot /> }] },
  { title: "Web & APIs", skills: [{ name: "FastAPI", icon: <SiFastapi /> }, { name: "HTML", icon: <SiHtml5 /> }, { name: "CSS", icon: <SiCss /> }] },
  { title: "Tools & Platforms", skills: [{ name: "Docker", icon: <SiDocker /> }, { name: "Hugging Face", icon: <FaCloud /> }, { name: "Git", icon: <SiGit /> }] },
  { title: "CRM", skills: [{ name: "Salesforce", icon: <FaSalesforce /> }] },
];

/* ===== RESUME DATA ===== */
const certifications = [
  { name: "Salesforce Platform App Builder", issuer: "Simplilearn", date: "Aug 2025" },
  { name: "AWS Certification", issuer: "Prepsinsta", date: "2025" },
  { name: "Matlab Onramp", issuer: "MathWorks", date: "2024" },
];

export default function Home() {
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -50px 0px" }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className={styles.page}>
      {/* ==================== HERO ==================== */}
      <section className={styles.hero} id="home">
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <p className={`${styles.greeting} animate-fade-in-up`}>
              <span className={styles.wave}>👋</span> Hi There!
            </p>
            <h1 className={`${styles.heroTitle} animate-fade-in-up delay-1`}>
              I&apos;M <span className={styles.nameGradient}>SUKESH S T</span>
            </h1>
            <div className={`${styles.typewriterContainer} animate-fade-in-up delay-2`}>
              <TypeWriter />
            </div>
            <p className={`${styles.heroDescription} animate-fade-in-up delay-3`}>
              Specializing in <strong>Generative AI</strong>,{" "}
              <strong>Agentic AI</strong>, and <strong>Machine Learning</strong> —
              building production-ready intelligent systems with LLMs, LangGraph,
              RAG, and modern AI frameworks.
            </p>
            <div className={`${styles.heroCta} animate-fade-in-up delay-4`}>
              <a href="#projects" className={styles.btnPrimary} id="cta-projects">
                View Projects <FiArrowRight />
              </a>
              <Link href="/resume.pdf" target="_blank" className={styles.btnOutline} id="cta-resume">
                Download Resume <FiDownload />
              </Link>
            </div>
            <div className={`${styles.heroSocials} animate-fade-in-up delay-5`}>
              <Link href="https://github.com/stsukesh" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub"><AiFillGithub /></Link>
              <Link href="https://linkedin.com/in/sukeshst" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn"><AiOutlineLinkedin /></Link>
              <Link href="https://leetcode.com/stsukesh" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LeetCode"><SiLeetcode /></Link>
              <Link href="mailto:stsukesh@gmail.com" className={styles.socialIcon} aria-label="Email"><HiOutlineMail /></Link>
            </div>
          </div>
          <div className={`${styles.heroVisual} animate-slide-right delay-2`}>
            <div className={styles.aiOrb}>
              <div className={styles.orbCore} />
              <div className={styles.orbRing1} />
              <div className={styles.orbRing2} />
              <div className={styles.orbRing3} />
              <div className={styles.orbGlow} />
            </div>
          </div>
        </div>
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollMouse}><div className={styles.scrollDot} /></div>
          <span>Scroll Down</span>
        </div>
      </section>

      {/* ==================== PROJECTS ==================== */}
      <section className={styles.section} id="projects">
        <div className="container">
          <h2 className="section-title" ref={addRef} data-animate>My Projects</h2>
          <p className="section-subtitle">Here&apos;s what I&apos;ve been building — from multi-agent AI systems to real-time computer vision</p>
          <div className={styles.projectsList}>
            {projects.map((project, index) => (
              <div
                key={index}
                className={`${styles.projectCard} ${styles[project.color]}`}
                ref={addRef}
                id={`project-${index}`}
              >
                <div className={styles.cardHeader}>
                  <div className={`${styles.projectIcon} ${styles[`icon${project.color}`]}`}>{project.icon}</div>
                  <div className={styles.headerText}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectTagline}>{project.tagline}</p>
                  </div>
                  <div className={styles.cardLinks}>
                    {project.liveDemo && (
                      <Link href={project.liveDemo} target="_blank" rel="noopener noreferrer" className={styles.cardLinkBtn} title="Live Demo">
                        <FiExternalLink /> <span>Live Demo</span>
                      </Link>
                    )}
                    {project.github && (
                      <Link href={project.github} target="_blank" rel="noopener noreferrer" className={styles.cardLinkBtn} title="Source Code">
                        <FiGithub /> <span>Code</span>
                      </Link>
                    )}
                  </div>
                </div>

                <div className={styles.projectBody}>
                  <div className={styles.projectBlock}>
                    <h4>The Problem</h4>
                    <p>{project.context}</p>
                  </div>
                  <div className={styles.projectBlock}>
                    <h4>The Goal</h4>
                    <p>{project.objective}</p>
                  </div>
                  <div className={styles.projectBlock}>
                    <h4>How I Built It</h4>
                    <p>{project.approach}</p>
                  </div>
                  <div className={styles.projectBlock}>
                    <h4>The Impact</h4>
                    <p>{project.impact}</p>
                  </div>
                </div>

                <div className={styles.techStack}>
                  {project.techStack.map((tech, i) => (
                    <span key={i} className={styles.techTag}>{tech}</span>
                  ))}
                </div>

                <div className={styles.projectMobileLinks}>
                  {project.liveDemo && (
                    <Link href={project.liveDemo} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
                      <FiExternalLink /> Live Demo
                    </Link>
                  )}
                  {project.github && (
                    <Link href={project.github} target="_blank" rel="noopener noreferrer" className={styles.btnOutline}>
                      <FiGithub /> Source Code
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section className={styles.section} id="about">
        <div className="container">
          <h2 className="section-title" ref={addRef} data-animate>Know Who I Am</h2>
          <p className="section-subtitle">A passionate AI/ML Engineer from Chennai, India</p>

          <div className={styles.aboutContent} ref={addRef}>
            <div className={styles.aboutText}>
              <p>I&apos;m <strong>Sukesh S T</strong>, an <strong>AI/ML Engineer</strong> specializing in <strong>Generative AI</strong>, <strong>Agentic AI</strong>, and <strong>Machine Learning</strong>. Currently pursuing my B.E. in Computer Science at Vel Tech Engineering College, Chennai with a CGPA of 8.15/10.</p>
              <p>I&apos;m passionate about building <strong>production-ready intelligent systems</strong> using LLMs, LangGraph, RAG, and modern AI frameworks. From designing multi-agent research pipelines to real-time defect detection systems, I thrive on turning cutting-edge AI research into scalable, real-world solutions.</p>
              <p>When I&apos;m not coding, I enjoy exploring new AI research papers, contributing to open-source projects, and solving problems on LeetCode.</p>
            </div>
            <div className={styles.aboutHighlights}>
              <div className={styles.highlightCard}>
                <HiOutlineAcademicCap className={styles.highlightIcon} />
                <div><h4>B.E. Computer Science</h4><p>Vel Tech Engineering College</p><span>2022 — 2026 | CGPA: 8.15</span></div>
              </div>
              <div className={styles.highlightCard}>
                <FaRobot className={styles.highlightIcon} />
                <div><h4>ML Intern — Flex Pvt Ltd</h4><p>YOLOv11 Defect Detection</p><span>Jan 2025</span></div>
              </div>
              <div className={styles.highlightCard}>
                <FaBrain className={styles.highlightIcon} />
                <div><h4>1st Place — Internal SIH</h4><p>Face Authentication System</p><span>2024</span></div>
              </div>
            </div>
          </div>

          {/* What I Do */}
          <h2 className={`section-title ${styles.subSectionTitle}`} ref={addRef} data-animate>What I Do</h2>
          <div className={styles.whatIDoGrid} ref={addRef}>
            {whatIDo.map((item, index) => (
              <div key={index} className={`${styles.whatIDoCard} glass-card`}>
                <div className={`${styles.cardIconBox} ${styles[item.color]}`}>{item.icon}</div>
                <h3 className={styles.cardTitleSmall}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <h2 className={`section-title ${styles.subSectionTitle}`} ref={addRef} data-animate>Tech Stack</h2>
          <div className={styles.skillsContainer} ref={addRef}>
            {skillCategories.map((category, catIndex) => (
              <div key={catIndex} className={styles.skillCategory}>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <div className={styles.skillsGrid}>
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="skill-badge">
                      <span className={styles.skillIconInline}>{skill.icon}</span>
                      {skill.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== RESUME ==================== */}
      <section className={styles.section} id="resume">
        <div className="container">
          <h2 className="section-title" ref={addRef} data-animate>My Resume</h2>
          <p className="section-subtitle">Education, experience, and qualifications</p>

          <div className={styles.downloadRow}>
            <Link href="/resume.pdf" target="_blank" className={styles.btnPrimary} id="download-resume">
              <FiDownload /> Download Resume PDF
            </Link>
          </div>

          {/* Career Objective */}
          <div className={styles.resumeBlock} ref={addRef}>
            <div className={styles.blockHeader}>
              <FaBrain className={styles.blockIcon} />
              <h3 className={styles.blockTitle}>Career Objective</h3>
            </div>
            <p className={styles.objectiveText}>
              AI/ML Engineer specializing in <strong>Generative AI</strong>, <strong>Agentic AI</strong>, and <strong>full-stack AI applications</strong>. Experienced in building production-ready intelligent systems using LLMs, LangGraph, RAG, and modern AI frameworks, with a strong focus on scalable, real-world solutions.
            </p>
          </div>

          {/* Education */}
          <div className={styles.resumeBlock} ref={addRef}>
            <div className={styles.blockHeader}>
              <HiOutlineAcademicCap className={styles.blockIcon} />
              <h3 className={styles.blockTitle}>Education</h3>
            </div>
            <div className={styles.timeline}>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <h4>Bachelor of Engineering in Computer Science</h4>
                    <span className={styles.timelineBadge}>CGPA: 8.15/10</span>
                  </div>
                  <p className={styles.timelineInst}>Vel Tech High Tech Dr. Rangarajan Dr. Sakunthala Engineering College, Chennai</p>
                  <p className={styles.timelinePeriod}>2022 — 2026</p>
                  <p className={styles.coursework}><strong>Relevant Coursework:</strong> Data Structures, Algorithms, Machine Learning, DBMS, Networks, OOAD</p>
                </div>
              </div>
              <div className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineContent}>
                  <div className={styles.timelineHeader}>
                    <h4>Higher Secondary Education (HSC)</h4>
                    <span className={styles.timelineBadge}>74.83%</span>
                  </div>
                  <p className={styles.timelineInst}>SRKBVMHSS, Kulasekharam, Kanniyakumari</p>
                  <p className={styles.timelinePeriod}>2022</p>
                </div>
              </div>
            </div>
          </div>

          {/* Internship */}
          <div className={styles.resumeBlock} ref={addRef}>
            <div className={styles.blockHeader}>
              <HiOutlineBriefcase className={styles.blockIcon} />
              <h3 className={styles.blockTitle}>Internship</h3>
            </div>
            <div className={styles.expCard}>
              <div className={styles.expHeader}>
                <div>
                  <h4>Machine Learning Intern <span className={styles.companyName}>@ Flex Pvt Ltd</span></h4>
                  <p className={styles.timelinePeriod}>6 Jan — 20 Jan 2025</p>
                </div>
                <Link href="https://github.com/stsukesh/Scratch-and-Dent-Detection-MODEL" target="_blank" rel="noopener noreferrer" className={styles.expLink}>
                  <FiExternalLink /> GitHub
                </Link>
              </div>
              <ul className={styles.highlightsList}>
                <li>Built Scratch and Dent Detection System using YOLOv11, Python, and OpenCV</li>
                <li>Reduced manual inspection time by 40% via AI-driven quality control</li>
                <li>Implemented real-time image processing for defect identification</li>
              </ul>
            </div>
          </div>

          {/* Certifications */}
          <div className={styles.resumeBlock} ref={addRef}>
            <div className={styles.blockHeader}>
              <HiOutlineBadgeCheck className={styles.blockIcon} />
              <h3 className={styles.blockTitle}>Certifications</h3>
            </div>
            <div className={styles.certGrid}>
              {certifications.map((cert, index) => (
                <div key={index} className={styles.certCard}>
                  <h4>{cert.name}</h4>
                  <p>{cert.issuer}</p>
                  <span>{cert.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
