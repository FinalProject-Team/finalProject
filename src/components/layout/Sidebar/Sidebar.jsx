import React from 'react'
import styles from './Sidebar.module.css'
import { Link } from 'react-router-dom'
import { MdDashboard, MdWork, MdLeaderboard } from "react-icons/md";
import { FaUser, FaRobot, FaChartBar, FaVideo } from "react-icons/fa";
import { BsBriefcaseFill } from "react-icons/bs";
import logo from '../../../assets/images/logo.png'

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>
        <img src={logo} alt="logo" /> Career Tech
      </h2>

      <nav className={styles.nav}>
        <Link to="/dashboard/dashboard" className={styles.link}><MdDashboard /> Dashboard</Link>
        <Link to="/dashboard/profile" className={styles.link}><FaUser /> Profile</Link>
        <Link to="/dashboard/roadmap" className={styles.link}><MdWork /> Roadmap</Link>
        <Link to="/dashboard/chatbot" className={styles.link}><FaRobot /> Ai Chatbot</Link>
        <Link to="/dashboard/jobs" className={styles.link}><BsBriefcaseFill /> Jobs</Link>
        <Link to="/dashboard/progress" className={styles.link}><FaChartBar /> Progress</Link>
        <Link to="/dashboard/softSkills" className={styles.link}><FaUser /> Soft Skills</Link>
        <Link to="/dashboard/ranking" className={styles.link}><MdLeaderboard /> Ranking</Link>
        <Link to="/dashboard/community" className={styles.link}><FaRobot /> Community</Link>
        <Link to="/dashboard/careertwin" className={styles.link}><FaRobot /> Career Twin</Link>

        <Link to="/dashboard/register" className={styles.link}><FaRobot /> Register</Link>
        <Link to="/dashboard/live-session" className={styles.link}><FaVideo /> Live Session</Link>
      </nav>
    </div>
  )
}