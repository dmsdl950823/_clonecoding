import Layout from '@/components/Layout'
import Link from 'next/link'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout>
      <h1>Home</h1>


      <Link href="/about">About</Link>
    </Layout>
  )
}
