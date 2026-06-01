import React from 'react';
import { Search, Edit2, Trash2, Eye } from 'lucide-react';
import styles from './AdminCourses.module.css';

export default function AdminCourses() {
  const dummyCourses = [
    { id: 1, title: 'Frontend Web Development with React', instructor: 'Dr. Sarah John', status: 'Published', created: 'March 10, 2026' },
    { id: 2, title: 'Full-Stack Node.js Masterclass', instructor: 'Eng. Mohamed Ali', status: 'Draft', created: 'April 02, 2026' },
    { id: 3, title: 'UI/UX Design Fundamentals for Web', instructor: 'Sarah John', status: 'Published', created: 'May 01, 2026' },
    { id: 4, title: 'Introduction to Git and GitHub', instructor: 'Kholood Mohamed', status: 'Published', created: 'May 15, 2026' }
  ];

  return (
    <div className={styles.coursesContainer}>
      <div className="mb-4">
        <h2 className={`h4 ${styles.title}`}>Courses Management</h2>
        <p className={styles.subtitle}>Manage all courses on the platform.</p>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.searchRow}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className={styles.searchInput}
            />
          </div>

          <select className={styles.statusSelect}>
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className={styles.customTable}>
            <thead>
              <tr>
                <th style={{ width: '35%' }}>Course</th>
                <th style={{ width: '25%' }}>Instructor</th>
                <th style={{ width: '15%' }}>Status</th>
                <th style={{ width: '15%' }}>Created</th>
                <th style={{ width: '10%', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyCourses.map((course) => (
                <tr key={course.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td className="py-3 fw-medium text-dark">{course.title}</td>
                  <td className="py-3 text-secondary">{course.instructor}</td>
                  <td className="py-3">
                    <span className={`badge ${
                      course.status === 'Published' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'
                    } px-2.5 py-1.5 rounded-3 fw-semibold`} style={{ fontSize: '0.75rem' }}>
                      {course.status}
                    </span>
                  </td>
                  <td className="py-3 text-secondary">{course.created}</td>
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