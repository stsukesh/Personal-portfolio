import Link from "next/link";
import {
  AiFillGithub,
  AiOutlineLinkedin,
} from "react-icons/ai";
import { SiLeetcode } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.gradientLine} />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.socialLinks}>
            <Link
              href="https://github.com/stsukesh"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
              id="footer-github"
            >
              <AiFillGithub />
            </Link>
            <Link
              href="https://linkedin.com/in/sukeshst"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LinkedIn"
              id="footer-linkedin"
            >
              <AiOutlineLinkedin />
            </Link>
            <Link
              href="https://leetcode.com/stsukesh"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="LeetCode"
              id="footer-leetcode"
            >
              <SiLeetcode />
            </Link>
            <Link
              href="mailto:stsukesh@gmail.com"
              className={styles.socialLink}
              aria-label="Email"
              id="footer-email"
            >
              <HiOutlineMail />
            </Link>
          </div>

          <p className={styles.credit}>
            Designed & Built by{" "}
            <span className={styles.name}>Sukesh S T</span>
          </p>
          <p className={styles.copyright}>
            © {currentYear} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
