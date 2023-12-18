import cookie from 'cookie'
import { API_URL } from "@/config/index"

const loginAPI = async (req, res) => {
  // POST 일 때만 동작
  if (req.method === 'POST') {
    const { identifier, password } = req.body
    console.log('@@ SERVER > loginAPI :: ', req.body);

    const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ identifier, password })
    })

    const data = await strapiRes.json()

    
    if (strapiRes.ok) {
      // Set Cookie
      // console.log('@@ SERVER > JWT :: ', data.jwt)
      res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60 * 24 * 7, // a week
        sameSite: 'strict',
        path: '/'
      }))

      res.status(200).json({ user: data.user })
    } else {
      console.log()
      const status = data.error.status
      const message = data.error.message
      res.status(status).json({ message })
    }

  } else {
    // 'http://localhost:3000/api/login' => FE/BE 서버 작동 후 브라우저에 URL 직접조회(GET)시 에러를 확인해볼 수 있음
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method + ' SOMTHING TEXT '} not allowed` })
  }
}

export default loginAPI