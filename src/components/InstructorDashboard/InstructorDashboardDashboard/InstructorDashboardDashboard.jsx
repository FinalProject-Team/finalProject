import { BookOpen, FileText, Users, Video } from "lucide-react";
import styles from "./InstructorDashboardDashboard.module.css";

function InstructorDashboardDashboard() {
  const stats = [
    { title: "Total Courses", value: 3, icon: BookOpen },
    { title: "Total Lessons", value: 12, icon: FileText },
    { title: "Total Students", value: 50, icon: Users },
  ];

  const activities = [
    { title: "New enrollment", course: "React Masterclass", time: "2 hours ago" },
    { title: "Lesson completed", course: "JavaScript Fundamentals", time: "5 hours ago" },
    { title: "New enrollment", course: "Web Development Bootcamp", time: "1 day ago" },
  ];

  const sessions = [
    { title: "Q&A Session - React Hooks", course: "React Masterclass", time: "Today at 3:00 PM" },
    { title: "Live Coding: Build a Dashboard", course: "Web Development Bootcamp", time: "Tomorrow at 10:00 AM" },
    { title: "CSS Grid Workshop", course: "Advanced CSS", time: "May 31 at 2:00 PM" },
  ];

  return (
    <section className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your courses.</p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div className={styles.statCard} key={item.title}>
              <div>
                <p>{item.title}</p>
                <h2>{item.value}</h2>
              </div>

              <div className={styles.iconBox}>
                <Icon size={26} />
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.bottomGrid}>
        <div className={styles.panel}>
          <h3>Recent Activity</h3>

          <div className={styles.list}>
            {activities.map((item) => (
              <div className={styles.listItem} key={item.title + item.time}>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.course}</p>
                </div>

                <span>{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.panel}>
          <h3>Upcoming Interactive Sessions</h3>

          <div className={styles.list}>
            {sessions.map((item) => (
              <div className={styles.sessionItem} key={item.title}>
                <div className={styles.smallIcon}>
                  <Video size={18} />
                </div>

                <div>
                  <h4>{item.title}</h4>
                  <p>{item.course}</p>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default InstructorDashboardDashboard;