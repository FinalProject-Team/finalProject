import React from 'react'
import styles from './Topbar.module.css'
import { FaSearch } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import profileImg from "../../../assets/images/logo.jpg";


export default function Topbar() {

  return (

    <>

      <div className={styles.topbar}>

        <h2 className={styles.title}>
          Dashboard
        </h2>

        <div className={styles.rightSection}>

          <div className={styles.searchBox}>

            <FaSearch className={styles.searchIcon} />

            <input
              type="text"
              placeholder='Search...'
            />

          </div>

          <div className={styles.notification}>

            <IoNotificationsOutline />

          </div>

          <div className={styles.profile}>

            <img
              src={profileImg}
              alt="profile image"
            />

          </div>

        </div>

      </div>

    </>

  )
}