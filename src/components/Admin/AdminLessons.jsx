import React from 'react';
import { Search, Edit2, Trash2 } from 'lucide-react';
import styles from './AdminLessons.module.css';

export default function AdminLessons() {
  const dummyLessons = [
    { id: 1, title: 'Introduction to React Components', course: 'Frontend Web Development', duration: '15 mins', order: 1, created: 'May 12, 2026' },
    { id: 2, title: 'State vs Props in React', course: 'Frontend Web Development', duration: '22 mins', order: 2, created: 'May 14, 2026' },
    { id: 3, title: 'Setting Up Node.js Environment', course: 'Full-Stack Node.js Masterclass', duration: '10 mins', order: 1, created: 'May 18, 2026' },
    { id: 4, title: 'Understanding Git Branching', course: 'Introduction to Git and GitHub', duration: '18 mins', order: 3, created: 'May 20, 2026' }
  ];

  return (
    <div className={styles.lessonsContainer}>
      <div className="mb-4">
        <h2 className={`h4 ${styles.title}`}>Lessons Management</h2>
        <p className={styles.subtitle}>Manage all lessons across the platform.</p>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.searchRow}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input 
              type="text" 
              placeholder="Search lessons..." 
              className={styles.searchInput}
            />
          </div>

          <select className={styles.courseSelect}>
            <option value="all">All Courses</option>
            <option value="frontend">Frontend Web Development</option>
            <option value="node">Full-Stack Node.js</option>
            <option value="git">Introduction to Git</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className={styles.customTable}>
            <thead>
              <tr>
                <th style={{ width: '30%' }}>Lesson</th>
                <th style={{ width: '25%' }}>Course</th>
                <th style={{ width: '15%' }}>Duration</th>
                <th style={{ width: '10%' }}>Order</th>
                <th style={{ width: '10%' }}>Created</th>
                <th style={{ width: '10%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyLessons.map((lesson) => (
                <tr key={lesson.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td className="py-3 fw-medium text-dark">{lesson.title}</td>
                  <td className="py-3 text-secondary">{lesson.course}</td>
                  <td className="py-3 text-secondary">{lesson.duration}</td>
                  <td className="py-3"><span className="badge bg-light text-dark border px-2 py-1">{lesson.order}</span></td>
                  <td className="py-3 text-secondary">{lesson.created}</td>
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