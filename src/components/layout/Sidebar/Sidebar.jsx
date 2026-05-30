import React from 'react'
import styles from './Sidebar.module.css'
import { Link } from 'react-router-dom'
import { MdDashboard, MdWork, MdLeaderboard } from "react-icons/md";
import { FaUser, FaRobot, FaChartBar } from "react-icons/fa";
import { BsBriefcaseFill } from "react-icons/bs";
import logo from '../../../assets/images/logo.png'

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>
        <img src={logo} alt="logo" /> Career Tech
      </h2>

      <nav className={styles.nav}>
        <Link to="/" className={styles.link}><MdDashboard/> Dashboard</Link>
        <Link to="/profile" className={styles.link}><FaUser/> Profile</Link>
        <Link to="/roadmap" className={styles.link}><MdWork/> Roadmap</Link>
        <Link to="/chatbot" className={styles.link}><FaRobot/> Ai Chatbot</Link>
        <Link to="/jobs" className={styles.link}><BsBriefcaseFill/> Jobs</Link>
        <Link to="/progress" className={styles.link}><FaChartBar/> Progress</Link>
        <Link to="/softSkills" className={styles.link}><FaUser/> Soft Skills</Link>
        <Link to="/dashboard/ranking" className={styles.link}><MdLeaderboard/> Ranking</Link>
        <Link to="/careertwin" className={styles.link}><FaRobot/> Career Twin</Link>
        <Link to="/register" className={styles.link}><FaRobot/> register</Link>
      </nav>
    </div>
  )
} 