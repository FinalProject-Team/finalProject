import React, { useState } from 'react';
import styles from './LiveSession.module.css';

export default function LiveSession() {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const tabs = ['All', 'Live Now', 'Upcoming', 'Completed', 'Workshops', 'Mentoring'];
  const sessionsData = [
    {
      id: 1,
      type: 'Workshop',
      status: 'Live Now',
      title: 'Advanced React Patterns Workshop',
      subtitle: 'Modern React Development',
      instructor: 'Sarah Chen',
      desc: 'Deep dive into compound components, render props, and custom hooks patterns.',
      date: 'Jun 1, 2026 • 10:00 AM',
      duration: '120 minutes',
      btnText: 'Join Session',
      btnStatus: 'live'
    },
    {
      id: 2,
      type: 'Workshop',
      status: 'Completed',
      title: 'UI/UX Design Workshop',
      subtitle: 'Design Systems & Principles',
      instructor: 'Lisa Anderson',
      desc: 'Learn to create consistent, accessible, and beautiful user interfaces.',
      date: 'May 25, 2026 • 10:10 AM',
      duration: '120 minutes',
      btnText: 'Session Ended',
      btnStatus: 'ended'
    },
    {
      id: 3,
      type: 'Mentoring',
      status: 'Upcoming',
      title: 'Career Mentoring Session',
      subtitle: 'Professional Development',
      instructor: 'Michael Rodriguez',
      desc: 'One-on-one guidance on career transitions and skill development strategies.',
      date: 'Jun 1, 2026 • 12:10 PM',
      duration: '60 minutes',
      timeToStart: 'Starts in 1h 52m',
      btnText: 'Not Started Yet',
      btnStatus: 'upcoming'
    },
    {
      id: 4,
      type: 'Live Coding',
      status: 'Upcoming',
      title: 'Building RESTful APIs Live',
      subtitle: 'Backend Development Masterclass',
      instructor: 'James Kim',
      desc: 'Build a production-ready API with authentication, validation, and best practices.',
      date: 'Jun 2, 2026 • 10:10 AM',
      duration: '90 minutes',
      timeToStart: 'Starts in 23h 52m',
      btnText: 'Not Started Yet',
      btnStatus: 'upcoming'
    },
    {
      id: 5,
      type: 'Project Review',
      status: 'Upcoming',
      title: 'Final Project Review & Feedback',
      subtitle: 'Full Stack Web Development',
      instructor: 'Emily Thompson',
      desc: 'Get personalized feedback on your capstone project and improvement suggestions.',
      date: 'Jun 4, 2026 • 10:10 AM',
      duration: '45 minutes',
      timeToStart: 'Starts in 2d 23h',
      btnText: 'Not Started Yet',
      btnStatus: 'upcoming'
    },
    {
      id: 6,
      type: 'Q&A',
      status: 'Upcoming',
      title: 'JavaScript Q&A Session',
      subtitle: 'JavaScript Fundamentals',
      instructor: 'David Park',
      desc: 'Ask anything about closures, async/await, prototypes, and ES6+ features.',
      date: 'Jun 6, 2026 • 10:10 AM',
      duration: '75 minutes',
      timeToStart: 'Starts in 4d 23h',
      btnText: 'Not Started Yet',
      btnStatus: 'upcoming'
    }
  ];

  const filteredSessions = sessionsData.filter(function(session) {
    const matchesSearch = session.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          session.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className={`container-fluid ${styles.sessionsWrapper}`}>
      <div className="container" style={{ maxWidth: '1140px' }}>
        
        <div className="row mb-4">
          <div className={`col-12 ${styles.headerSection}`}>
            <h2>Interactive Sessions</h2>
            <p>Join your live workshops, mentoring sessions, and real-time learning experiences.</p>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <div className={styles.searchWrapper}>
              <span className={styles.searchIcon}>🔍</span>
              <input 
                type="text" 
                placeholder="Search sessions by title or course name..." 
                className={styles.searchInput} 
                value={searchQuery}
                onChange={function(e) { setSearchQuery(e.target.value); }}
              />
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12 d-flex flex-wrap gap-2">
            {tabs.map(function(tab) {
              return (
                <button
                  key={tab}
                  className={activeTab === tab ? styles.tabItemActive : styles.tabItem}
                  onClick={function() { setActiveTab(tab); }}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        <div className="row g-4">
          {filteredSessions.length > 0 ? (
            filteredSessions.map(function(session) {
              return (
                <div key={session.id} className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
                  <div className={`${styles.sessionCard} ${session.status === 'Live Now' ? styles.liveCardBorder : ''} w-100`}>
                    
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className={`${styles.typeBadge} ${styles[session.type.replace(/\s+/g, '').toLowerCase()] || styles.defaultType}`}>
                        {session.type}
                      </span>
                      {session.status === 'Live Now' && (
                        <span className={styles.liveStatusBadge}>
                          <span className={styles.pulseDot}></span> Live Now
                        </span>
                      )}
                      {session.status === 'Completed' && (
                        <span className={styles.completedStatusBadge}>Completed</span>
                      )}
                      {session.status === 'Upcoming' && (
                        <span className={styles.upcomingStatusBadge}>Upcoming</span>
                      )}
                    </div>

                    <h3 className={styles.cardTitle}>{session.title}</h3>
                    <p className={styles.cardSubtitle}>{session.subtitle}</p>
                    
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span className={styles.userIcon}>👤</span>
                      <span className={styles.instructorName}>{session.instructor}</span>
                    </div>

                    <p className={styles.cardDesc}>{session.desc}</p>

                    <div className={`mt-auto pt-3 ${styles.metaInfo}`}>
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span>📅</span> <p className="m-0 font-sm">{session.date}</p>
                      </div>
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <span>⏳</span> <p className="m-0 font-sm">{session.duration}</p>
                      </div>
                    </div>

                    {session.timeToStart && (
                      <div className={styles.countdownText}>
                        <span>📹</span> {session.timeToStart}
                      </div>
                    )}

                    <button className={`${styles.actionBtn} ${styles[session.btnStatus]}`}>
                      {session.btnStatus === 'live' && <span>📹 </span>}
                      {session.btnText}
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center py-5">
              <div className="mb-3" style={{ fontSize: '40px' }}>🔍❌</div>
              <h4 style={{ color: '#ffffff', fontWeight: '600' }}>No Sessions Found</h4>
              <p style={{ color: '#525f77', fontSize: '14px' }}>We couldn't find any session matching "{searchQuery}"</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}