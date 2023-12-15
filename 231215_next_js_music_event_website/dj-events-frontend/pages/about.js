import Layout from '@/components/Layout'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <Layout>
      <h1>About</h1>

      <p>This os an app to find the latest DJ and other musical events</p>
      <p>Version 1.0</p>
      <Link href="/">Home</Link>
    </Layout>
  )
}
