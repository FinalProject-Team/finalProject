import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.logoSection}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>✦</div>
            <span>CareerTech</span>
          </div>
        </div>

        <button
          className={styles.menuToggle}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <a href="#home">Home</a>
          <a href="#tracks">Tracks</a>
          <a href="#about">About</a>
          <a href="#jobs">Apply Job</a>
        </div>

        <div className={styles.authButtons}>
          <button className={styles.loginBtn}>Login</button>
          <button className={styles.signupBtn}>Sign Up</button>
        </div>
      </div>
    </nav>
  );
}
