import cookie from 'cookie'
import { API_URL } from "@/config/index"

const logoutAPI = async (req, res) => {
  // POST 일 때만 동작
  if (req.method === 'POST') {
    // Destroy Cookie
    res.setHeader('Set-Cookie', cookie.serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      expire: new Date(0),
      sameSite: 'strict',
      path: '/'
    }))

    res.status(200).json({ message: 'SUCCESS' })

  } else {
    // 'http://localhost:3000/api/logout' => FE/BE 서버 작동 후 브라우저에 URL 직접조회(GET)시 에러를 확인해볼 수 있음
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method + ' SOMTHING TEXT '} not allowed` })
  }
}

export default logoutAPI