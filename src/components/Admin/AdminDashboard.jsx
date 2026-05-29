import React from 'react';
import { Users, GraduationCap, UserCheck, BookOpen, FileText, TrendingUp, Activity } from 'lucide-react';
import styles from './AdminDashboard.module.css';

export default function AdminDashboard() {
  const cards = [
    { title: 'Total Users', count: 0, icon: <Users size={22} />, bgClass: styles.bgCyan },
    { title: 'Students', count: 0, icon: <GraduationCap size={22} />, bgClass: styles.bgEmerald },
    { title: 'Instructors', count: 0, icon: <UserCheck size={22} />, bgClass: styles.bgOrange },
    { title: 'Total Courses', count: 0, icon: <BookOpen size={22} />, bgClass: styles.bgIndigo },
    { title: 'Total Lessons', count: 0, icon: <FileText size={22} />, bgClass: styles.bgCyanDark },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <div className="mb-4">
        <h2 className={`h4 ${styles.title}`}>Dashboard Overview</h2>
        <p className={styles.subtitle}>Welcome back! Here's what's happening with your platform.</p>
      </div>

      <div className="row g-3 mb-4 flex-nowrap overflow-auto">
        {cards.map((card, i) => (
          <div key={i} className="col" style={{ minWidth: '200px' }}>
            <div className={`${styles.statCard} p-3 d-flex align-items-center justify-content-between`}>
              <div>
                <span className={`${styles.cardTitle} d-block mb-1`}>{card.title}</span>
                <span className={styles.cardCount}>{card.count}</span>
              </div>
              <div className={`${styles.iconBox} ${card.bgClass}`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-md-8">
          <div className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>Platform Activity</h3>
            <div>
              <div className={styles.activityRow}>
                <div className="d-flex align-items-center gap-3">
                  <span className={styles.bullet} style={{ backgroundColor: '#34d399' }}></span>
                  <span className="text-secondary" style={{ fontSize: '0.875rem' }}>New users registered today</span>
                </div>
                <span className="fw-bold text-dark" style={{ fontSize: '0.875rem' }}>24</span>
              </div>
              <div className={styles.activityRow}>
                <div className="d-flex align-items-center gap-3">
                  <span className={styles.bullet} style={{ backgroundColor: '#22d3ee' }}></span>
                  <span className="text-secondary" style={{ fontSize: '0.875rem' }}>Courses published this week</span>
                </div>
                <span className="fw-bold text-dark" style={{ fontSize: '0.875rem' }}>7</span>
              </div>
              <div className={styles.activityRow}>
                <div className="d-flex align-items-center gap-3">
                  <span className={styles.bullet} style={{ backgroundColor: '#818cf8' }}></span>
                  <span className="text-secondary" style={{ fontSize: '0.875rem' }}>Lessons completed</span>
                </div>
                <span className="fw-bold text-dark" style={{ fontSize: '0.875rem' }}>1,234</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>Quick Stats</h3>
            <div className="row g-3">
              <div className="col-6">
                <div className={`${styles.quickStatBox} ${styles.growthBox}`}>
                  <TrendingUp style={{ color: '#06b6d4', marginBottom: '12px' }} size={20} />
                  <span className="text-muted d-block mb-1" style={{ fontSize: '0.75rem' }}>Growth Rate</span>
                  <span className="fw-bold" style={{ color: '#0891b2', fontSize: '1.125rem' }}>+12.5%</span>
                </div>
              </div>
              <div className="col-6">
                <div className={`${styles.quickStatBox} ${styles.activeUsersBox}`}>
                  <Activity style={{ color: '#10b981', marginBottom: '12px' }} size={20} />
                  <span className="text-muted d-block mb-1" style={{ fontSize: '0.75rem' }}>Active Users</span>
                  <span className="fw-bold" style={{ color: '#059669', fontSize: '1.125rem' }}>156</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}