import React from 'react';
import { LayoutDashboard, Users, BookOpen, GraduationCap } from 'lucide-react';
import styles from './AdminSidebar.module.css';

export default function AdminSidebar() {
  return (
    <div className={`${styles.sidebar} d-flex flex-column justify-content-between p-3`}>
      <div>
        <div className={`${styles.logoContainer} d-flex align-items-center gap-3 pb-3 mb-4`}>
          <div className={styles.logoIcon}>
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className={styles.logoTitle}>E-Learn Admin</h1>
            <span className={styles.logoSubtitle}>Management Portal</span>
          </div>
        </div>

        <nav className="d-flex flex-column gap-1">
          <a href="#dashboard" className={`${styles.navLink} ${styles.activeLink}`}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </a>
          <a href="#users" className={styles.navLink}>
            <Users size={20} />
            <span>Users</span>
          </a>
          <a href="#courses" className={styles.navLink}>
            <BookOpen size={20} />
            <span>Courses</span>
          </a>
          <a href="#lessons" className={styles.navLink}>
            <GraduationCap size={20} />
            <span>Lessons</span>
          </a>
        </nav>
      </div>

      <div className={`${styles.statusContainer} p-3 rounded-3`}>
        <span className="text-secondary d-block mb-1" style={{ fontSize: '0.75rem' }}>System Status</span>
        <div className="d-flex align-items-center gap-2 text-white fw-medium font-sm">
          <span className={styles.statusDot}></span>
          <span style={{ color: '#34d399', fontSize: '0.875rem' }}>Operational</span>
        </div>
      </div>
    </div>
  );
}