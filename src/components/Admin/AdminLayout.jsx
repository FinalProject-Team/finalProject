import React from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import AdminDashboard from './AdminDashboard';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  return (
    <div className={styles.layoutWrapper}>
      <AdminSidebar />
      
      <div className={styles.mainContent}>
        <AdminTopbar />
        <main>
          <AdminDashboard />
        </main>
      </div>
    </div>
  );
}