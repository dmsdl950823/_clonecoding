import { useContext } from "react"
import Link from 'next/link'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import Search from './Search'
import AuthContext from '@/context/AuthContext'
import styles from '@/styles/Header.module.css'

export default function Header() {
  const { user, logout } = useContext(AuthContext)

  return (
    <header className={styles.header}>
        <div className={styles.logo}>
          <Link href="/">DJ Events</Link>
        </div>

        <Search />

        <nav>
          <ul>
            <li><Link href="/events">Events</Link></li>
            { user ? 
              // If Logged In
              <>
                <li><Link href="/events/add">Add Event</Link></li>
                <li><Link href="/account/dashboard">Dashboard</Link></li>
                <li><button className="btn-secondary btn-icon" onClick={e => logout()}><FaSignInAlt /> Logout </button></li>
              </>
              // If Logged Out
              : <li><Link href="/account/login" className="btn-secondary btn-icon"><FaSignInAlt /> Login </Link></li>
            }
          </ul>
        </nav>
    </header>
  )
}
