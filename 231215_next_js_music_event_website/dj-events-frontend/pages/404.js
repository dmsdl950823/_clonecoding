import { FaExclamationTriangle } from 'react-icons/fa'
import Link from 'next/link'
import Layout from "@/components/Layout"
import styles from '@/styles/404.module.css'

export default function NotFoutPage() {
  return (
    <Layout>
      <div className={styles.error}>
        <h1><FaExclamationTriangle /> 404</h1>
        <h1>Sorry, there is nothing here.</h1>
        <Link href="/">Go Back Home</Link>
      </div>
    </Layout>
  )
}