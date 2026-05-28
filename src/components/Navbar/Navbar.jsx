import { Menu, X, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom'; // 👈 ضفنا الـ Link هنا عشان التنقل
import styles from './Navbar.module.css';

export default function Navbar({ theme, toggleTheme }) {
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
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <a href="#home" onClick={() => setIsOpen(false)}>Home</a>
          <a href="#tracks" onClick={() => setIsOpen(false)}>Tracks</a>
          <a href="#courses" onClick={() => setIsOpen(false)}>Courses</a>
          <a href="#about" onClick={() => setIsOpen(false)}>About</a>
          <a href="#jobs" onClick={() => setIsOpen(false)}>Apply Job</a>
        </div>

        <div className={styles.authButtons}>
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className={styles.loginBtn}>Login</button>
          
          {/* 👈 هنا حولنا الزرار لـ Link واديناه نفس الـ class بتاعها بالظبط عشان الديزاين ما يتأثرش نهائي */}
          <Link to="/register" className={styles.signupBtn}>
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}