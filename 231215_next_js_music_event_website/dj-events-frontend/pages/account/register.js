import { useState, useEffect, useContext } from 'react'
import { FaUser } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link'
import Layout from '@/components/Layout'
import AuthContext from '@/context/AuthContext'
import styles from '@/styles/AuthForm.module.css'

export default function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const { login, error } = useContext(AuthContext)

  const handleSubmit = e => {
    e.preventDefault()
    if (password !== passwordConfirm) return toast.error('Password do not match!')

    login({ username, email, password });
  }

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1><FaUser /> Login</h1>

        <ToastContainer />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">User Name</label>
            <input type="text" id="name" name="name" value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div>
            <label htmlFor="passwordComfirm">Confirm Password</label>
            <input type="password" id="passwordComfirm" name="passwordComfirm" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
          </div>

          <input type="submit" value="Login" className="btn" />
        </form>

        <p>
          Already have an account? <Link href="/account/login">Login</Link>
        </p>
      </div>
    </Layout>
  )
}
