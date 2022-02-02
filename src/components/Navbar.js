/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// styles
import styles from './Navbar.module.css'

export default function navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  return (

      <nav className={styles.navbar}>
        <ul>
          <li className={styles.title}>MyMoney</li>

          {!user && (
            <>
              <li><NavLink className={styles['navbar-item']} to="/login">Login</NavLink></li>
              <li><NavLink className={styles['navbar-item']} to="/signup">Signup</NavLink></li>
            </>
          )}

          {user && (
            <><li style={{marginRight: '30px'}}>hello, { user.displayName}</li>
              <li>
                <button className="btn" onClick={logout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>

  )
}
