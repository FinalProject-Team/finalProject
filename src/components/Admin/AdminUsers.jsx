import React from 'react';
import { Search, Trash2, Edit2, ShieldAlert } from 'lucide-react';
import styles from './AdminUsers.module.css';

export default function AdminUsers() {
  const dummyUsers = [
    { id: 1, name: 'Ahmed Ali', email: 'ahmed.ali@gmail.com', role: 'Student', joined: 'May 12, 2026' },
    { id: 2, name: 'Dr. Sarah John', email: 'sarah.j@careertech.com', role: 'Instructor', joined: 'Jan 05, 2026' },
    { id: 3, name: 'Kholood Mohamed', email: 'kholood.m@careertech.com', role: 'Admin', joined: 'Feb 18, 2026' },
    { id: 4, name: 'Omar Hassan', email: 'omar.hassan@outlook.com', role: 'Student', joined: 'May 25, 2026' }
  ];

  return (
    <div className={styles.usersContainer}>
      <div className="mb-4">
        <h2 className={`h4 ${styles.title}`}>Users Management</h2>
        <p className={styles.subtitle}>Manage all users, students, and instructors on the platform.</p>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.searchRow}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input 
              type="text" 
              placeholder="Search users by name or email..." 
              className={styles.searchInput}
            />
          </div>

          <select className={styles.roleSelect}>
            <option value="all">All Roles</option>
            <option value="student">Students</option>
            <option value="instructor">Instructors</option>
            <option value="admin">Admins</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className={styles.customTable}>
            <thead>
              <tr>
                <th style={{ width: '25%' }}>User</th>
                <th style={{ width: '30%' }}>Email</th>
                <th style={{ width: '15%' }}>Role</th>
                <th style={{ width: '15%' }}>Joined</th>
                <th style={{ width: '15%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td className="py-3 fw-medium text-dark">{user.name}</td>
                  <td className="py-3 text-secondary">{user.email}</td>
                  <td className="py-3">
                    <span className={`badge ${
                      user.role === 'Admin' ? 'bg-danger-subtle text-danger' :
                      user.role === 'Instructor' ? 'bg-primary-subtle text-primary' :
                      'bg-success-subtle text-success'
                    } px-2.5 py-1.5 rounded-3 fw-semibold`} style={{ fontSize: '0.75rem' }}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3 text-secondary">{user.joined}</td>
                  <td className="py-3 text-end">
                    <button className="btn btn-link text-primary p-1 me-2" title="Edit"><Edit2 size={16} /></button>
                    <button className="btn btn-link text-danger p-1" title="Delete"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}