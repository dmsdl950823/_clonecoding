import { createContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { NEXT_URL } from "@/config/index"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  // Register User
  const register = async (user) => {
    console.log(user)
  }

  // Login User => pages/api/login.js API 와 연결
  const login = async ({ email: identifier, password }) => {
    console.log('@@ Try To Login :: ', { identifier, password })

    const res = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identifier, password })
    })

    const data = await res.json()

    // 올바른 || 잘못된 정보를 입력해도 동작함
    console.log('@@ CLIENT > Login Response :: ', '\n- data : ', data, '\n- res : ', res)

    if (res.ok) {
      setUser(data.user)
    } else {
      setError(data.message)
      // console.log(data.message, 'ㅎㅎ')
      setTimeout(() => setError(null), 100)
    }
  }

  // Logout user
  const logout = async (user) => {
    console.log('Logout')
  }

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    console.log('Check!')
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext