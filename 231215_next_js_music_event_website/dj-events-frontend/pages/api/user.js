import cookie from 'cookie'
import { API_URL } from "@/config/index"

const checkUserLoggedInAPI = async (req, res) => {
  // GET 일 때만 동작
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' })
      return
    }

    const { token } = cookie.parse(req.headers.cookie)

    const strapiRes = await fetch(`${API_URL}/api/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const user = await strapiRes.json()
    if (strapiRes.ok) res.status(200).json({ user })
    else res.status(403).json({ message: 'User Forbidden' })
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method + ' SOMTHING TEXT '} not allowed` })
  }
}

export default checkUserLoggedInAPI